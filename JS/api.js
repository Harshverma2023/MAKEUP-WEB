/**
 * API Integration for Makeup Artist Website
 * Connects the frontend forms to the Python Flask backend
 */

// Backend API URL
const API_URL = 'http://localhost:5000/api';

/**
 * Submit a booking to the backend
 * @param {Object} bookingData - The booking form data
 * @returns {Promise} Response from the server
 */
async function submitBooking(bookingData) {
    try {
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error submitting booking:', error);
        return {
            success: false,
            message: 'Failed to connect to server. Please try again later.'
        };
    }
}

/**
 * Submit a contact message to the backend
 * @param {Object} contactData - The contact form data
 * @returns {Promise} Response from the server
 */
async function submitContact(contactData) {
    try {
        const response = await fetch(`${API_URL}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData)
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error submitting contact:', error);
        return {
            success: false,
            message: 'Failed to connect to server. Please try again later.'
        };
    }
}

/**
 * Get all bookings from the backend
 * @returns {Promise} List of all bookings
 */
async function getAllBookings() {
    try {
        const response = await fetch(`${API_URL}/bookings`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return {
            success: false,
            message: 'Failed to fetch bookings.'
        };
    }
}

/**
 * Check if the backend server is running
 * @returns {Promise} Health status
 */
async function checkServerHealth() {
    try {
        const response = await fetch(`${API_URL}/health`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Server health check failed:', error);
        return {
            status: 'offline'
        };
    }
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        submitBooking,
        submitContact,
        getAllBookings,
        checkServerHealth
    };
}
