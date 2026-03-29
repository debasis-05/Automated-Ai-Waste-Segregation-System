
import os
import sys
import torch
import subprocess

def check_env():
    print("🔍 Checking Environment...")
    try:
        import flask
        import torch
        import torchvision
        print("  ✅ Flask, Torch, and Torchvision installed.")
    except ImportError as e:
        print(f"  ❌ Missing dependency: {e}")
        return False

    device = "mps" if torch.backends.mps.is_available() else ("cuda" if torch.cuda.is_available() else "cpu")
    print(f"  ✅ Compute Device: {device.upper()}")
    return True

def check_integrity():
    print("\n📦 Checking System Integrity...")
    required = [
        'backend/app.py',
        'backend/waste_classifier.py',
        'backend/waste_model_trained.pth',
        'templates/dashboard.html',
        'static/js/main.js'
    ]
    all_good = True
    for f in required:
        if os.path.exists(f):
            print(f"  ✅ {f} found.")
        else:
            print(f"  ❌ {f} MISSING!")
            all_good = False
    return all_good

def main():
    print("="*40)
    print(" BINIFY ENTERPRISE PIPELINE v2.0")
    print("="*40)
    
    if not check_env():
        sys.exit(1)
        
    if not check_integrity():
        print("\n System integrity check failed. Please restore missing files.")
        sys.exit(1)
        
    print("\n System is operational.")
    print("\nAvailable Commands:")
    print("  1. Start Server: python3 backend/app.py")
    print("  2. Retrain AI:   python3 tools/train.py")
    print("="*40)

if __name__ == "__main__":
    main()
