import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import os

device = torch.device("mps" if torch.backends.mps.is_available() else ("cuda" if torch.cuda.is_available() else "cpu"))

class WasteClassifier:
    def __init__(self):
        self.classes = ['wet', 'dry', 'plastic']
        
        # The system is being upgraded to ResNet-34. 
        # We try loading ResNet-34 weights first, then fallback to ResNet-18 if that's what's currently on disk.
        model_path = os.path.join(os.path.dirname(__file__), 'waste_model_trained.pth')
        
        # Check model file size to guess the architecture: 
        # ResNet-18 is ~44MB, ResNet-34 is ~87MB
        use_resnet34 = False
        if os.path.exists(model_path):
            size_mb = os.path.getsize(model_path) / (1024 * 1024)
            if size_mb > 60: # Threshold for ResNet-34
                use_resnet34 = True
                print(f"Detected High-Capacity Model (ResNet-34, {size_mb:.1f}MB)")
            else:
                print(f"Detected Standard Model (ResNet-18, {size_mb:.1f}MB)")
                
        if use_resnet34:
            self.model = models.resnet34()
        else:
            self.model = models.resnet18()
            
        num_ftrs = self.model.fc.in_features
        self.model.fc = nn.Linear(num_ftrs, 3) 
        
        if os.path.exists(model_path):
            print(f"Loading specialized waste model...")
            self.model.load_state_dict(torch.load(model_path, map_location=device))
        else:
            print("Trained model not found. Using pre-trained ResNet-18 head for initialization.")
            self.model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)
            num_ftrs = self.model.fc.in_features
            self.model.fc = nn.Linear(num_ftrs, 3)
            
        self.model = self.model.to(device)
        self.model.eval()
        
        self.preprocess = transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
        ])

    def predict(self, image_path):
        """
        Classifies an image using the trained model.
        Returns: (category_key, display_name, confidence)
        """
        try:
            img = Image.open(image_path).convert('RGB')
            img_t = self.preprocess(img)
            batch_t = torch.unsqueeze(img_t, 0).to(device)
            
            with torch.no_grad():
                out = self.model(batch_t)
                prob = torch.nn.functional.softmax(out, dim=1)
                conf, index = torch.max(prob, 1)
                
                category_key = self.classes[index.item()]
                confidence = round(conf.item() * 100, 2)
                
                # Prettier names for UI
                name_map = {'wet': 'Organic / Wet', 'dry': 'Dry Recyclable', 'plastic': 'Plastic Waste'}
                display_name = name_map.get(category_key, category_key.title())
                
                return category_key, display_name, confidence
        except Exception as e:
            print(f"Prediction Error: {e}")
            return 'dry', 'Unknown Waste', 0.0

from torchvision.models.detection import ssdlite320_mobilenet_v3_large, SSDLite320_MobileNet_V3_Large_Weights

class WasteDetector:
    def __init__(self):
        # Using a pre-trained Lightweight SSDLite model for multi-object detection
        self.weights = SSDLite320_MobileNet_V3_Large_Weights.DEFAULT
        self.model = ssdlite320_mobilenet_v3_large(weights=self.weights)
        self.model = self.model.to(device)
        self.model.eval()
        
        self.preprocess = self.weights.transforms()
        self.classes = self.weights.meta["categories"]
        
        # Mapping COCO dataset classes to Binify categories (Plastic, Dry, Wet)
        self.COCO_TO_BINIFY = {
            'bottle': 'plastic', 'bowl': 'plastic', 'cup': 'plastic',
            'fork': 'dry', 'knife': 'dry', 'spoon': 'dry',
            'banana': 'wet', 'apple': 'wet', 'sandwich': 'wet', 'orange': 'wet', 'broccoli': 'wet', 'carrot': 'wet',
            'book': 'dry', 'keyboard': 'dry', 'cell phone': 'dry', 'laptop': 'dry',
            'chair': 'dry', 'table': 'dry', 'umbrella': 'dry', 'handbag': 'dry',
            'sports ball': 'dry', 'scissors': 'dry', 'backpack': 'dry'
        }

    def detect_many(self, image_path, threshold=0.5):
        """
        Detects multiple items and returns a list of results.
        Returns: [{'box': [x,y,w,h], 'label': 'plastic', 'display_name': 'Plastic Bottle', 'conf': 92.5}]
        """
        try:
            img = Image.open(image_path).convert('RGB')
            img_t = self.preprocess(img).to(device)
            batch_t = [img_t]
            
            with torch.no_grad():
                outputs = self.model(batch_t)
            
            results = []
            output = outputs[0]
            
            for score, label_idx, box in zip(output['scores'], output['labels'], output['boxes']):
                if score >= threshold:
                    full_label = self.classes[label_idx]
                    category_key = self.COCO_TO_BINIFY.get(full_label, 'dry')
                    
                    # Convert box tensor to list [x, y, w, h] for UI
                    x1, y1, x2, y2 = box.tolist()
                    bbox = [int(x1), int(y1), int(x2 - x1), int(y2 - y1)]
                    
                    # Pretty naming
                    name_map = {'wet': 'Organic / Wet', 'dry': 'Dry Recyclable', 'plastic': 'Plastic Waste'}
                    display_name = f"{full_label.title()} ({name_map.get(category_key, 'Dry')})"
                    
                    results.append({
                        'bbox': bbox,
                        'category': category_key,
                        'display_name': display_name,
                        'confidence': round(score.item() * 100, 2),
                        'title': display_name,
                        'color': '#3b82f6' if category_key == 'plastic' else ('#10b981' if category_key == 'wet' else '#6b7280')
                    })
            
            # If nothing detected, fallback to the specialized single-class classifier
            return results
        except Exception as e:
            print(f"Detection Error: {e}")
            return []

if __name__ == "__main__":
    # Test identifying a random sample image from the dataset
    test_classifier = WasteClassifier()
    test_detector = WasteDetector()
    import os, random
    test_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "DATASET/DATASET/TEST/R")
    if os.path.exists(test_path):
        sample_img = random.choice(os.listdir(test_path))
        full_path = os.path.join(test_path, sample_img)
        print(f"Testing image: {sample_img}")
        res = test_detector.detect_many(full_path)
        print(f"Results: {len(res)} items detected.")
        for r in res:
            print(f"  - {r['display_name']} ({r['confidence']}%) at {r['bbox']}")
    else:
        print("Dataset not found for standalone testing.")
