"""
Backend API for MedTech Image Processing
Implements arterial (contrast enhancement) and venous (gaussian blur) phase simulations
"""

from flask import Flask, request, send_file
from flask_cors import CORS
from PIL import Image, ImageEnhance, ImageFilter
import io
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return {'status': 'healthy'}, 200

@app.route('/process', methods=['POST'])
def process_image():
    """
    Process medical image based on selected phase
    
    Request:
        - image: uploaded image file
        - phase: 'arterial' or 'venous'
    
    Returns:
        Processed image file
    """
    try:
        # Validate request
        if 'image' not in request.files:
            return {'error': 'No image file provided'}, 400
        
        if 'phase' not in request.form:
            return {'error': 'No phase specified'}, 400
        
        image_file = request.files['image']
        phase = request.form['phase']
        
        # Validate phase
        if phase not in ['arterial', 'venous']:
            return {'error': 'Invalid phase. Must be arterial or venous'}, 400
        
        # Open image
        img = Image.open(image_file.stream)
        
        # Convert to RGB if necessary
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Process based on phase
        if phase == 'arterial':
            # Arterial phase: Increase contrast
            processed_img = apply_arterial_phase(img)
        else:  # venous
            # Venous phase: Apply gaussian smoothing
            processed_img = apply_venous_phase(img)
        
        # Save to buffer
        img_buffer = io.BytesIO()
        processed_img.save(img_buffer, format='PNG')
        img_buffer.seek(0)
        
        return send_file(
            img_buffer,
            mimetype='image/png',
            as_attachment=True,
            download_name=f'processed_{phase}.png'
        )
    
    except Exception as e:
        print(f"Error processing image: {str(e)}")
        return {'error': f'Failed to process image: {str(e)}'}, 500

def apply_arterial_phase(img: Image.Image) -> Image.Image:
    """
    Simulate arterial phase by increasing contrast
    
    Args:
        img: Input PIL Image
    
    Returns:
        Processed PIL Image with enhanced contrast
    """
    # Increase contrast by 50%
    enhancer = ImageEnhance.Contrast(img)
    enhanced_img = enhancer.enhance(1.5)
    
    # Optionally increase brightness slightly
    brightness_enhancer = ImageEnhance.Brightness(enhanced_img)
    result = brightness_enhancer.enhance(1.1)
    
    return result

def apply_venous_phase(img: Image.Image) -> Image.Image:
    """
    Simulate venous phase by applying gaussian smoothing
    
    Args:
        img: Input PIL Image
    
    Returns:
        Processed PIL Image with gaussian blur applied
    """
    # Apply Gaussian blur with radius of 3
    blurred_img = img.filter(ImageFilter.GaussianBlur(radius=3))
    
    return blurred_img

if __name__ == '__main__':
    # Run the Flask app
    # In production, use a proper WSGI server like Gunicorn
    app.run(host='0.0.0.0', port=5000, debug=True)
