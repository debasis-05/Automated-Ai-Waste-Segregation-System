# Deployment Guide for BINIFY

This project is optimized for deployment on platforms like **Railway.app**, **Render.com**, or **Heroku**.

## 1. Environment Variables

Ensure the following variables are set in your platform's dashboard:

- `SECRET_KEY`: A long, random string to secure sessions.
- `DEFAULT_ADMIN_USER`: The username for the initial admin account (defaults to `admin`).
- `DEFAULT_ADMIN_PASSWORD`: The password for the initial admin account (defaults to `admin123`).
- `PORT`: Usually automatically set by the platform (BINIFY defaults to 5005 locally).
- `FLASK_DEBUG`: Set to `False`.

## 2. Infrastructure & Assets

- **AI Model**: The weights file (`backend/waste_model_trained.pth`) is listed in `.gitignore` by default because of its size (~82MB). For deployment, you must:
  - Either remove it from `.gitignore` and commit it (Git LFS recommended).
  - Or upload it manually to your production server's `backend/` directory.
- **Memory**: The system loads this ResNet-34 model. Ensure your instance has at least **512MB RAM** (1GB recommended for smooth inference).
- **Disk**: The app uses SQLite. Persistent storage/volumes should be enabled for `/backend/instance` if you want data (bins, history, users) to persist across deployments.

## 3. Configuration Files

- `Procfile`: Already included. Uses Gunicorn for production-grade performance.
- `requirements.txt`: Includes all necessary AI and Web libraries.
- `runtime.txt`: Specifies the Python environment.

## 4. Deployment Steps (Example: Railway)

1.  Connect your GitHub repository to Railway.
2.  Add a **New Service** from the Repo.
3.  Add the **Variables** listed above.
4.  Railway will automatically detect the `Procfile` and start the Gunicorn server.

## 5. Local Production Test

To test the production configuration locally, run:

```bash
gunicorn --chdir backend app:app --bind 0.0.0.0:5005 --workers 2 --timeout 120
```
