---
title: MedTech Backend
emoji: 🏥
colorFrom: blue
colorTo: cyan
sdk: docker
app_file: app.py
pinned: false
---

# MedTech Backend - Image Processing API

Python Flask backend for processing medical images with arterial and venous phase simulations.

## Features

- **Arterial Phase**: Increases image contrast by 50% to simulate arterial enhancement
- **Venous Phase**: Applies Gaussian blur (radius=3) to simulate venous smoothing

## Local Development

### Prerequisites
- Python 3.9+
- pip

### Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
python app.py
```

The server will run on `http://localhost:5000`

### API Endpoints

#### POST /process
Process a medical image with the selected phase.

**Request:**
- `image` (file): Image file (JPG/PNG)
- `phase` (form data): Either "arterial" or "venous"

**Response:**
- Processed image file (PNG format)

#### GET /health
Health check endpoint.

**Response:**
```json
{"status": "healthy"}
```

## Deployment to Hugging Face Spaces

1. Create a new Space on Hugging Face
2. Select "Docker" as the SDK
3. Create a `Dockerfile`:

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

EXPOSE 7860

CMD ["gunicorn", "--bind", "0.0.0.0:7860", "--workers", "2", "--timeout", "60", "app:app"]
```

4. Push the code to your Space
5. Update the frontend `BACKEND_URL` environment variable with your Space URL

## Alternative Deployment Options

### Render.com
1. Create a new Web Service
2. Connect your GitHub repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `gunicorn --bind 0.0.0.0:$PORT app:app`

### Railway.app
1. Create a new project
2. Deploy from GitHub
3. Railway will auto-detect the Python app

### Heroku
1. Create a new app
2. Add a `Procfile`:
```
web: gunicorn app:app
```
3. Deploy via Git

## Testing

Test the API with curl:

```bash
# Test health endpoint
curl http://localhost:5000/health

# Test image processing (arterial)
curl -X POST http://localhost:5000/process \
  -F "image=@test_image.jpg" \
  -F "phase=arterial" \
  --output result_arterial.png

# Test image processing (venous)
curl -X POST http://localhost:5000/process \
  -F "image=@test_image.jpg" \
  -F "phase=venous" \
  --output result_venous.png
```

## Notes

- All image processing is done server-side using Python and PIL
- No client-side processing is performed
- Images are processed in memory and not stored on disk
- CORS is enabled to allow frontend communication
