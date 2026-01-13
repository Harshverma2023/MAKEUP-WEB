import React from 'react';

const Contact = () => {
    return (
        <section className="contact" id="contact">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>
                <div className="contact-info">
                    <div className="contact-card">
                        <i className="fas fa-phone"></i>
                        <h3>Phone</h3>
                        <p>+91 98765 43210</p>
                        <a href="tel:+919876543210" style={{ color: '#d4a574', textDecoration: 'none', fontWeight: '500' }}>Call Now</a>
                    </div>
                    <div className="contact-card">
                        <i className="fas fa-envelope"></i>
                        <h3>Email</h3>
                        <p>bhawna@makeoverstudio.com</p>
                        <a href="mailto:bhawna@makeoverstudio.com" style={{ color: '#d4a574', textDecoration: 'none', fontWeight: '500' }}>Send Email</a>
                    </div>
                    <div className="contact-card">
                        <i className="fas fa-map-marker-alt"></i>
                        <h3>Studio</h3>
                        <p>Mathura, Uttar Pradesh</p>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>Available for bridal bookings</p>
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: '#2c1810' }}>Follow Me</h3>
                    <div className="social-links">
                        <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fab fa-facebook"></i></a>
                        <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp"></i></a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;