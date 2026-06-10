#!/usr/bin/env bash
# exit on error
set -o errexit

echo "--- Building Frontend (React + Vite) ---"
cd frontend/saurabh-portfolio
npm install
npm run build

echo "--- Building Backend (Django) ---"
cd ../../backend
pip install -r requirements.txt

# Collect static files including React build
python manage.py collectstatic --noinput

# Run migrations (optional but recommended if using DB)
python manage.py migrate
