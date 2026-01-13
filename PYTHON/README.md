# Makeup Artist Website Backend

A simple Python Flask backend for handling bookings and contact form submissions.

## 📋 Features

- ✅ Booking form submission handling
- ✅ Contact form submission handling
- ✅ Data stored in JSON files
- ✅ CORS enabled for frontend integration
- ✅ RESTful API endpoints
- ✅ Easy to understand code

## 🚀 Installation

### Step 1: Install Python
Make sure you have Python 3.7+ installed. Check with:
```bash
python --version
```

### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

## ▶️ Running the Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Health Check
```
GET /api/health
```
Returns server status

### Bookings

#### Submit a Booking
```
POST /api/bookings
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 1234567890",
  "service": "bridal",
  "date": "2026-02-14",
  "time": "10:00",
  "message": "Optional message"
}
```

#### Get All Bookings
```
GET /api/bookings
```

#### Get Single Booking
```
GET /api/bookings/{booking_id}
```

#### Update Booking Status
```
PUT /api/bookings/{booking_id}/status
Content-Type: application/json

{
  "status": "confirmed"
}
```
Status options: `pending`, `confirmed`, `completed`, `cancelled`

### Contacts

#### Submit Contact Message
```
POST /api/contacts
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+91 9876543210",
  "message": "I have a question..."
}
```

#### Get All Contacts
```
GET /api/contacts
```

## 📁 Data Storage

All data is stored in JSON files in the `data/` directory:
- `data/bookings.json` - All booking submissions
- `data/contacts.json` - All contact form submissions

## 🔧 Configuration

- **Port**: Default is `5000` (change in `app.py`)
- **Host**: Default is `0.0.0.0` (accessible from network)
- **Debug Mode**: Enabled by default (disable for production)

## 🌐 Frontend Integration

Update your JavaScript to send requests to the backend:

```javascript
// Example: Submit booking
async function submitBooking(formData) {
    const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    console.log(result);
}
```

## 📝 Notes

- This is a simple backend suitable for small-scale applications
- For production, consider using a proper database (PostgreSQL, MongoDB)
- Add authentication for admin endpoints
- Implement email notifications for new bookings
- Add input validation and sanitization

## 🛡️ Security Considerations

For production deployment:
1. Disable debug mode
2. Add rate limiting
3. Implement authentication
4. Use environment variables for sensitive data
5. Add input validation and sanitization
6. Use HTTPS
7. Implement proper error logging
