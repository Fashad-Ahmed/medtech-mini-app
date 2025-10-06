# Dockerfile for deploying the MedTech Image Processing backend
# Uses Python 3.9 slim image to minimize container size while maintaining compatibility

# Use official Python image as base
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy and install Python dependencies
# requirements.txt contains Flask, Pillow, and other necessary packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app.py .

# Expose port 7860 (Hugging Face Spaces default)
EXPOSE 7860

# Run with gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:7860", "--workers", "2", "--timeout", "60", "app:app"]
