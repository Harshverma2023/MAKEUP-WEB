import React from 'react';

const Contact = () => {
  const contactInfo = [
    { icon: 'fa-phone', title: 'Phone', info: '+91 70609 86289' },
    { icon: 'fa-envelope', title: 'Email', info: 'info@glamourstudios.com' },
    { icon: 'fa-map-marker-alt', title: 'Studio', info: '123 Beauty Lane, New Delhi' }
  ];

  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-info">
          {contactInfo.map((item, index) => (
            <div key={index} className="contact-card">
              <i className={`fas ${item.icon}`}></i>
              <h3>{item.title}</h3>
              <p>{item.info}</p>
            </div>
          ))}
        </div>

        <div className="social-links">
          <a href="https://wa.me/917060986289" target="_blank" rel="noreferrer">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
