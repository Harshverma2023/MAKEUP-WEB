import React, { useState } from 'react';

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    alert('Thank you for your booking request! I will contact you soon.');
    setFormData({ name: '', email: '', phone: '', date: '', service: '', message: '' });
  };

  return (
    <section className="booking" id="booking">
      <div className="container">
        <h2 className="section-title">Book Your Appointment</h2>
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <select name="service" value={formData.service} onChange={handleChange} required>
              <option value="">Select Service</option>
              <option value="bridal">Bridal Makeup</option>
              <option value="party">Party Makeup</option>
              <option value="hd">HD Makeup</option>
              <option value="airbrush">Airbrush Makeup</option>
              <option value="bridal-party">Bridal Party</option>
              <option value="special">Special Effects</option>
            </select>
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Additional Details..."
              value={formData.message}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Book Now</button>
        </form>
      </div>
    </section>
  );
}