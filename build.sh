#!/usr/bin/env bash
# exit on error
set -o errexit

echo "--- Building Frontend (React + Vite) ---"
cd frontend
npm install
npm run build

echo "--- Building Backend (Django) ---"
cd ../backend
pip install -r requirements.txt

# Collect static files for Django Admin & WhiteNoise
python manage.py collectstatic --noinput

# Run migrations
python manage.py migrate