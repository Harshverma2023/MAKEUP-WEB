const BookingForm = () => {
    const [formData, setFormData] = React.useState({
        name: '', email: '', phone: '', service: '', date: '', time: '', message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const whatsappMessage = `New Booking Request:%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AService: ${formData.service}%0ADate: ${formData.date}%0ATime: ${formData.time}%0AMessage: ${formData.message}`;
        window.open(`https://wa.me/919876543210?text=${whatsappMessage}`, '_blank');
        alert('Thank you! Your booking request has been sent.');
        setFormData({ name: '', email: '', phone: '', service: '', date: '', time: '', message: '' });
    };

    return (
        <section className="booking" id="booking">
            <div className="container">
                <h2 className="section-title">Book Your Appointment</h2>
                <form className="booking-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number *</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="service">Select Service *</label>
                        <select id="service" name="service" value={formData.service} onChange={handleChange} required>
                            <option value="">Choose a service</option>
                            <option value="bridal">Bridal Makeup</option>
                            <option value="party">Party Makeup</option>
                            <option value="photoshoot">Photoshoot</option>
                            <option value="engagement">Engagement</option>
                            <option value="airbrush">Airbrush Makeup</option>
                            <option value="custom">Custom Package</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Preferred Date *</label>
                        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="time">Preferred Time *</label>
                        <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Additional Details</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Any special requests or questions..."></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Confirm Booking</button>
                </form>
            </div>
        </section>
    );
};