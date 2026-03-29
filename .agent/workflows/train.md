---
description: Retrain the Waste Classification model using current DATASET
---

Use this workflow when you add new images to `DATASET/DATASET/TRAIN/O` or `R`.

1. **Verify Dataset**: Ensure images are in `.jpg` format.

2. **Run Training Pipeline**: Execute the training script (which handles sorting and ResNet-18 optimization).

```bash
python3 train_model.py
```

3. **Validate**: Check the accuracy of the new weights.

```bash
python3 verify_new_model.py
```

4. **Integration**: If accuracy is > 85%, the model is automatically used by `waste_classifier.py`.
