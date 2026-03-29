# Procfile for Railway / Render / Heroku deployment
# Uses Gunicorn as the production WSGI server
web: gunicorn --chdir backend app:app --bind 0.0.0.0:$PORT --workers 2 --timeout 120
