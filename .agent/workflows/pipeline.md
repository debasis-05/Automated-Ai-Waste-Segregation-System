---
description: Pipeline for making and verifying code changes
---

// turbo-all

Follow this pipeline whenever you modify the UI or Backend:

1. **Lint/Check**: Verify Python syntax.

```bash
python3 -m py_compile backend/app.py backend/waste_classifier.py
```

2. **UI Audit**: Check if templates are in the correct directory.

```bash
ls -F templates/
```

3. **Status Check**: Verify if the backend model file exists.

```bash
ls -lh backend/waste_model_trained.pth
```

4. **Launch**: Use `/run` to start the app.
