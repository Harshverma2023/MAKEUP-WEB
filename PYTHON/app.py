"""
Makeup Artist Website Backend
A simple Flask server to handle bookings and contact form submissions
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from your HTML frontend

# Create data directory if it doesn't exist
DATA_DIR = 'data'
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

BOOKINGS_FILE = os.path.join(DATA_DIR, 'bookings.json')
CONTACTS_FILE = os.path.join(DATA_DIR, 'contacts.json')


# Helper function to read JSON file
def read_json_file(filename):
    """Read data from a JSON file"""
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            return json.load(f)
    return []


# Helper function to write JSON file
def write_json_file(filename, data):
    """Write data to a JSON file"""
    with open(filename, 'w') as f:
        json.dump(data, f, indent=4)


# Home route
@app.route('/')
def home():
    """Welcome message"""
    return jsonify({
        'message': 'Welcome to Bhawna Sagar Makeover Backend API',
        'status': 'running',
        'endpoints': {
            'bookings': '/api/bookings (GET, POST)',
            'contacts': '/api/contacts (GET, POST)',
            'health': '/api/health'
        }
    })


# Health check endpoint
@app.route('/api/health')
def health_check():
    """Check if the server is running"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })


# Booking endpoints
@app.route('/api/bookings', methods=['GET', 'POST'])
def handle_bookings():
    """Handle booking form submissions"""
    
    if request.method == 'POST':
        # Get booking data from request
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'phone', 'service', 'date', 'time']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({
                    'success': False,
                    'message': f'Missing required field: {field}'
                }), 400
        
        # Create booking object
        booking = {
            'id': datetime.now().strftime('%Y%m%d%H%M%S'),
            'name': data['name'],
            'email': data['email'],
            'phone': data['phone'],
            'service': data['service'],
            'date': data['date'],
            'time': data['time'],
            'message': data.get('message', ''),
            'status': 'pending',
            'created_at': datetime.now().isoformat()
        }
        
        # Read existing bookings
        bookings = read_json_file(BOOKINGS_FILE)
        
        # Add new booking
        bookings.append(booking)
        
        # Save to file
        write_json_file(BOOKINGS_FILE, bookings)
        
        return jsonify({
            'success': True,
            'message': 'Booking submitted successfully! We will contact you soon.',
            'booking_id': booking['id']
        }), 201
    
    else:  # GET request
        # Return all bookings
        bookings = read_json_file(BOOKINGS_FILE)
        return jsonify({
            'success': True,
            'count': len(bookings),
            'bookings': bookings
        })


# Contact endpoints
@app.route('/api/contacts', methods=['GET', 'POST'])
def handle_contacts():
    """Handle contact form submissions"""
    
    if request.method == 'POST':
        # Get contact data from request
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({
                    'success': False,
                    'message': f'Missing required field: {field}'
                }), 400
        
        # Create contact object
        contact = {
            'id': datetime.now().strftime('%Y%m%d%H%M%S'),
            'name': data['name'],
            'email': data['email'],
            'phone': data.get('phone', ''),
            'message': data['message'],
            'status': 'new',
            'created_at': datetime.now().isoformat()
        }
        
        # Read existing contacts
        contacts = read_json_file(CONTACTS_FILE)
        
        # Add new contact
        contacts.append(contact)
        
        # Save to file
        write_json_file(CONTACTS_FILE, contacts)
        
        return jsonify({
            'success': True,
            'message': 'Message sent successfully! We will get back to you soon.',
            'contact_id': contact['id']
        }), 201
    
    else:  # GET request
        # Return all contacts
        contacts = read_json_file(CONTACTS_FILE)
        return jsonify({
            'success': True,
            'count': len(contacts),
            'contacts': contacts
        })


# Get single booking by ID
@app.route('/api/bookings/<booking_id>', methods=['GET'])
def get_booking(booking_id):
    """Get a specific booking by ID"""
    bookings = read_json_file(BOOKINGS_FILE)
    
    for booking in bookings:
        if booking['id'] == booking_id:
            return jsonify({
                'success': True,
                'booking': booking
            })
    
    return jsonify({
        'success': False,
        'message': 'Booking not found'
    }), 404


# Update booking status
@app.route('/api/bookings/<booking_id>/status', methods=['PUT'])
def update_booking_status(booking_id):
    """Update booking status (pending, confirmed, completed, cancelled)"""
    data = request.get_json()
    new_status = data.get('status')
    
    if new_status not in ['pending', 'confirmed', 'completed', 'cancelled']:
        return jsonify({
            'success': False,
            'message': 'Invalid status. Must be: pending, confirmed, completed, or cancelled'
        }), 400
    
    bookings = read_json_file(BOOKINGS_FILE)
    
    for booking in bookings:
        if booking['id'] == booking_id:
            booking['status'] = new_status
            booking['updated_at'] = datetime.now().isoformat()
            write_json_file(BOOKINGS_FILE, bookings)
            
            return jsonify({
                'success': True,
                'message': f'Booking status updated to {new_status}',
                'booking': booking
            })
    
    return jsonify({
        'success': False,
        'message': 'Booking not found'
    }), 404


# Error handlers
@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        'success': False,
        'message': 'Endpoint not found'
    }), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({
        'success': False,
        'message': 'Internal server error'
    }), 500


# Run the server
if __name__ == '__main__':
    print("=" * 50)
    print("Makeup Artist Website Backend")
    print("=" * 50)
    print("Server starting on http://localhost:5000")
    print("API Endpoints:")
    print("  - GET  /api/health")
    print("  - POST /api/bookings")
    print("  - GET  /api/bookings")
    print("  - POST /api/contacts")
    print("  - GET  /api/contacts")
    print("=" * 50)
    
    app.run(debug=True, host='0.0.0.0', port=5000)
