# MedTech Surgical Planning - Image Processing Web App

A full-stack web application for simulating medical image processing phases (arterial and venous) for surgical planning purposes.

## 🎯 Overview

This application allows users to:
1. Upload a 2D medical image (JPG/PNG)
2. Select a processing phase (Arterial or Venous)
3. View original and processed images side-by-side

**Image Processing Types:**
- **Arterial Phase**: Increases contrast to simulate arterial enhancement
- **Venous Phase**: Applies Gaussian smoothing for venous visualization

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Tailwind CSS (hosted on Lovable/GitHub Pages)
- **Backend**: Python Flask API (to be deployed on Hugging Face Space or similar)

All image processing is performed server-side using Python, with no client-side operations.

## 🚀 Live Demo

**Frontend URL**: 

**Backend URL**: To be deployed (see Backend Deployment section)

## 📁 Project Structure

```
├── src/                    # Frontend React application
│   ├── components/         # React components
│   │   ├── ImageUpload.tsx
│   │   ├── PhaseSelector.tsx
│   │   └── ImageComparison.tsx
│   ├── pages/
│   │   └── Index.tsx       # Main application page
│   └── assets/             # Static assets
│       └── sample-ct.jpg   # Sample CT scan image
├── backend/                # Python Flask backend
│   ├── app.py             # Flask application
│   ├── requirements.txt   # Python dependencies
│   └── README.md          # Backend deployment guide
└── README.md              # This file
```

## 🛠️ Local Development

### Frontend

The frontend is already running in Lovable. To run locally:

```bash
npm install
npm run dev
```

### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Flask server:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

4. Update the frontend to point to local backend:
```typescript
// In src/pages/Index.tsx, line 46
const BACKEND_URL = "http://localhost:5000";
```

## 🌐 Backend Deployment

The backend needs to be deployed to a separate server. Recommended options:

### Option 1: Hugging Face Spaces (Recommended)

1. Create a new Space at [huggingface.co/spaces](https://huggingface.co/spaces)
2. Select "Docker" as SDK
3. Upload backend files and create a Dockerfile (see backend/README.md)
4. Copy your Space URL
5. Update frontend environment variable with backend URL

### Option 2: Render.com

1. Create account at [render.com](https://render.com)
2. Create new Web Service from GitHub repo
3. Configure:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn --bind 0.0.0.0:$PORT app:app`
   - Root Directory: `backend`

### Option 3: Railway.app

1. Create account at [railway.app](https://railway.app)
2. Create new project from GitHub
3. Set root directory to `backend`
4. Railway auto-detects Python and deploys

**After deployment, update the frontend:**

```typescript
// Update BACKEND_URL in src/pages/Index.tsx
const BACKEND_URL = "https://your-backend-url.com";
```

## 🧪 Testing

1. Upload a medical image (sample CT scan included in `src/assets/sample-ct.jpg`)
2. Select either Arterial or Venous phase
3. Click "Process Image"
4. View the processed result next to the original

## 📋 Requirements Met

✅ Upload and display original image  
✅ Phase selection (arterial/venous)  
✅ Backend image processing in Python  
✅ Side-by-side image comparison  
✅ Complete frontend codebase  
✅ Complete backend codebase  
✅ Clear README with instructions  
✅ Deployed frontend (Lovable)  
⏳ Backend deployment (pending - see Backend Deployment section)

## 🔧 Technologies Used

**Frontend:**
- React 18
- TypeScript
- Tailwind CSS
- Shadcn UI components
- Lucide icons

**Backend:**
- Python 3.9+
- Flask
- Pillow (PIL) for image processing
- Flask-CORS

## 📝 Notes

- This is a simulation tool for demonstration purposes only
- Not intended for actual clinical use
- All image processing happens server-side
- Sample CT scan image included for testing

## 👨‍💻 Development Time

Completed within the 4-hour timeframe as per assignment requirements.

## 📄 License

This project is for educational/assessment purposes.
