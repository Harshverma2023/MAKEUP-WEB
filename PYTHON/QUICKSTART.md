# 🚀 Quick Start Guide - Backend Setup

## Step 1: Install Python Dependencies

Open PowerShell in the PYTHON folder and run:

```powershell
pip install -r requirements.txt
```

## Step 2: Start the Backend Server

```powershell
python app.py
```

You should see:
```
==================================================
🎨 Makeup Artist Website Backend
==================================================
Server starting on http://localhost:5000
API Endpoints:
  - GET  /api/health
  - POST /api/bookings
  - GET  /api/bookings
  - POST /api/contacts
  - GET  /api/contacts
==================================================
```

## Step 3: Open Your Website

Open `HTML/INDEX.HTML` in your browser and test the booking form!

## 📝 What Happens When You Submit a Booking?

1. Form data is sent to the Python backend
2. Backend saves it to `data/bookings.json`
3. You get a success message with a Booking ID
4. Optionally, you can also send via WhatsApp

## 🔍 View Your Bookings

While the server is running, visit:
- http://localhost:5000/api/bookings - See all bookings
- http://localhost:5000/api/health - Check server status

## 📂 Data Storage

All bookings are saved in:
```
PYTHON/data/bookings.json
```

You can open this file to see all submissions!

## ⚠️ Troubleshooting

**Problem:** "pip is not recognized"
**Solution:** Install Python from python.org and make sure to check "Add Python to PATH"

**Problem:** "Module not found"
**Solution:** Run `pip install -r requirements.txt` again

**Problem:** "Port 5000 already in use"
**Solution:** Change the port in app.py (line 257) from 5000 to another number like 5001
