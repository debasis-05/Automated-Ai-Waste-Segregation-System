---
description: Start the EcoScan AI platform for production or development
---

Follow these steps to launch the application:

1. **Environment Setup**: Ensure your Python dependencies are installed.

```bash
pip install flask flask-sqlalchemy flask-login flask-bcrypt torch torchvision pillow
```

2. **Clean Data**: Remove any temporary upload artifacts.
   // turbo

```bash
rm -rf backend/uploads/*
```

3. **Start Server**: Run the Flask application.
   // turbo

```bash
python3 backend/app.py
```

4. **Verify**: Open your browser at `http://localhost:5001`.
