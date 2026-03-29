import os
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import models, transforms, datasets
from torch.utils.data import DataLoader, Dataset
from PIL import Image
import random

# ----------------- CONFIGURATION -----------------
# Paths derived from this file's location — works on any machine
_BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # project root
DATA_DIR = os.path.join(_BASE, "DATASET", "DATASET", "TRAIN")
MODEL_SAVE_PATH = os.path.join(_BASE, "backend", "waste_model_trained.pth")
device = torch.device("mps" if torch.backends.mps.is_available() else ("cuda" if torch.cuda.is_available() else "cpu"))

# Classes: 0: Wet, 1: Dry, 2: Plastic
CLASSES = ['wet', 'dry', 'plastic']

# ----------------- TEACHER LOGIC (IMPROVED) -----------------
teacher_model = models.resnet50(weights=models.ResNet50_Weights.DEFAULT).to(device)
teacher_model.eval()
teacher_categories = models.ResNet50_Weights.DEFAULT.meta["categories"]

# Highly specific plastic list
PLASTIC_KEYWORDS = [
    'bottle', 'shampoo', 'detergent', 'soda bottle', 'water bottle', 
    'plastic bag', 'bubble wrap', 'vial', 'bucket', 'pitcher', 'container',
    'tub', 'jar', 'beaker', 'flask', 'syringe', 'pill bottle'
]

def teacher_classify(img_path):
    try:
        img = Image.open(img_path).convert('RGB')
        preprocess = transforms.Compose([
            transforms.Resize(256), transforms.CenterCrop(224), transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ])
        img_t = preprocess(img).unsqueeze(0).to(device)
        with torch.no_grad():
            out = teacher_model(img_t)
            # Use Top-5 to catch plastic hints
            probs, indices = torch.topk(torch.nn.functional.softmax(out, dim=1), 5)
            
            top_labels = [teacher_categories[idx.item()].lower() for idx in indices[0]]
            
            # If ANY of the top 5 suggest plastic, prioritize it
            if any(any(k in label for k in PLASTIC_KEYWORDS) for label in top_labels):
                return 2 # Plastic
            return 1 # Dry
    except:
        return 1

# ----------------- DATASET -----------------
class WasteDataset(Dataset):
    def __init__(self, root_dir, transform=None, samples_per_class=3000):
        self.root_dir = root_dir
        self.transform = transform
        self.samples = []
        
        # O folder -> Wet (Direct Map)
        o_dir = os.path.join(root_dir, 'O')
        if os.path.exists(o_dir):
            files = [os.path.join(o_dir, f) for f in os.listdir(o_dir) if f.endswith('.jpg')]
            random.shuffle(files)
            for f in files[:samples_per_class]: self.samples.append((f, 0))
            
        # R folder -> Teacher decides Dry vs Plastic
        r_dir = os.path.join(root_dir, 'R')
        if os.path.exists(r_dir):
            files = [os.path.join(r_dir, f) for f in os.listdir(r_dir) if f.endswith('.jpg')]
            random.shuffle(files)
            # Take more from R because it's split into two classes
            print(f"Sorting {samples_per_class*2} images from R using improved teacher...")
            for f in files[:samples_per_class*2]:
                label = teacher_classify(f)
                self.samples.append((f, label))

    def __len__(self): return len(self.samples)
    def __getitem__(self, idx):
        path, label = self.samples[idx]
        img = Image.open(path).convert('RGB')
        if self.transform: img = self.transform(img)
        return img, label

# ----------------- TRAINING -----------------
def train():
    # Augmented transforms for better generalization (water bottles, etc.)
    train_transform = transforms.Compose([
        transforms.Resize(256),
        transforms.RandomResizedCrop(224),
        transforms.RandomHorizontalFlip(),
        transforms.ColorJitter(brightness=0.2, contrast=0.2),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    
    dataset = WasteDataset(DATA_DIR, transform=train_transform, samples_per_class=3000)
    dataloader = DataLoader(dataset, batch_size=32, shuffle=True)
    
    # Use ResNet-34 for slightly more capacity than ResNet-18
    model = models.resnet34(weights=models.ResNet34_Weights.DEFAULT)
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, 3) 
    model = model.to(device)
    
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.0001) # Lower learning rate for fine-tuning
    
    print(f"Training on {len(dataset)} images (Wet/Dry/Plastic)...")
    model.train()
    for epoch in range(3): # 3 epochs
        running_loss = 0.0
        for i, (inputs, labels) in enumerate(dataloader):
            inputs, labels = inputs.to(device), labels.to(device)
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            running_loss += loss.item()
            if i % 20 == 0:
                print(f"Epoch {epoch+1}, Batch {i}, Loss: {loss.item():.4f}")
            
    torch.save(model.state_dict(), MODEL_SAVE_PATH)
    print(f"Upgraded Model saved to {MODEL_SAVE_PATH}")

if __name__ == "__main__":
    train()
