import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import BookingForm from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';

const { useState, useEffect } = React;

// ============ NAVBAR COMPONENT ============
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo">✨ BHAWNA SAGAR</div>
        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <li onClick={() => scrollToSection('home')}>Home</li>
          <li onClick={() => scrollToSection('about')}>About</li>
          <li onClick={() => scrollToSection('services')}>Services</li>
          <li onClick={() => scrollToSection('gallery')}>Gallery</li>
          <li onClick={() => scrollToSection('testimonials')}>Reviews</li>
          <li onClick={() => scrollToSection('booking')}>Booking</li>
          <li onClick={() => scrollToSection('contact')}>Contact</li>
        </ul>
        <div className="mobile-menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </nav>
  );
};

// ============ HERO COMPONENT ============
const Hero = () => {
  const scrollToBooking = () => {
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>Enhancing Your Natural Beauty</h1>
        <p>Professional Makeup Artistry for Every Occasion</p>
        <div className="cta-buttons">
          <button className="btn btn-primary" onClick={scrollToBooking}>Book Now</button>
          <button className="btn btn-secondary" onClick={scrollToServices}>Explore Services</button>
        </div>
      </div>
    </section>
  );
};

// ============ ABOUT COMPONENT ============
const About = () => {
  const specialties = ['Bridal Makeup', 'Party Makeup', 'HD Makeup', 'Airbrush', 'Editorial'];

  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Hello! I'm Bhawna Sagar, a certified professional makeup artist with 8+ years of experience 
              in creating stunning looks for weddings, parties, events, and special occasions.
            </p>
            <p>
              I specialize in bridal makeup, party makeup, HD makeup, and theatrical makeup. My passion is 
              to enhance your natural beauty and boost your confidence for your special moments.
            </p>
            <div className="specialties">
              {specialties.map((specialty, index) => (
                <span key={index} className="specialty-tag">{specialty}</span>
              ))}
            </div>
          </div>
          <div className="about-image">
            <div className="gallery-item">
              <div className="placeholder-icon">
                <i className="fas fa-image"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============ SERVICES COMPONENT ============
const Services = () => {
  const services = [
    {
      icon: 'fa-ring',
      title: 'Bridal Makeup',
      description: 'Complete bridal makeover with long-lasting, flawless finish',
      price: '₹5,000+'
    },
    {
      icon: 'fa-party-horn',
      title: 'Party Makeup',
      description: 'Glamorous makeup for parties, engagements, and celebrations',
      price: '₹2,500+'
    },
    {
      icon: 'fa-video',
      title: 'HD Makeup',
      description: 'Professional HD makeup for films, photos, and events',
      price: '₹3,500+'
    },
    {
      icon: 'fa-wand-magic-sparkles',
      title: 'Airbrush Makeup',
      description: 'Flawless airbrush application for perfect coverage',
      price: '₹4,000+'
    },
    {
      icon: 'fa-users',
      title: 'Bridal Party',
      description: 'Coordinated makeup for bridesmaids and wedding parties',
      price: '₹3,000+ per person'
    },
    {
      icon: 'fa-sparkles',
      title: 'Special Effects',
      description: 'Creative makeup for themed events and special occasions',
      price: '₹4,500+'
    }
  ];

  return (
    <section className="services" id="services">
      <div className="container">
        <h2 className="section-title">My Services</h2>
        <div className="service-cards">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <i className={`fas ${service.icon}`}></i>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="price">{service.price}</div>
              <button className="btn btn-primary">Learn More</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ GALLERY COMPONENT ============
const Gallery = () => {
  const images = [
    { id: 1, title: 'Bridal Look 1' },
    { id: 2, title: 'Party Makeup 1' },
    { id: 3, title: 'HD Makeup 1' },
    { id: 4, title: 'Bridal Look 2' },
    { id: 5, title: 'Party Makeup 2' },
    { id: 6, title: 'Editorial Look' }
  ];

  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <h2 className="section-title">Gallery</h2>
        <div className="gallery-grid">
          {images.map((image) => (
            <div key={image.id} className="gallery-item">
              <div className="gallery-placeholder">
                <i className="fas fa-image"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ TESTIMONIALS COMPONENT ============
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Priya Singh',
      role: 'Bride',
      comment: 'Bhawna made me feel so confident on my wedding day. My makeup was flawless and lasted the entire event!'
    },
    {
      name: 'Anjali Sharma',
      role: 'Party Client',
      comment: 'Amazing work! The makeup looked perfect in all photos and lasted the entire night.'
    },
    {
      name: 'Sneha Patel',
      role: 'Film Project',
      comment: 'Professional, talented, and very cooperative. Highly recommended for any makeup needs!'
    },
    {
      name: 'Neha Gupta',
      role: 'Bride',
      comment: 'Best decision! Bhawna understood exactly what I wanted and delivered beautifully.'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title">Client Reviews</h2>
        <div className="testimonial-slider">
          <div className="testimonial">
            <p>"{current.comment}"</p>
            <h4 className="testimonial-author">{current.name}</h4>
            <p style={{ color: '#d4a574', fontWeight: '500' }}>{current.role}</p>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button className="btn btn-secondary" onClick={prevTestimonial}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <span style={{ alignSelf: 'center', fontWeight: '600' }}>
              {currentIndex + 1} / {testimonials.length}
            </span>
            <button className="btn btn-secondary" onClick={nextTestimonial}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============ BOOKING COMPONENT ============
const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      date: '',
      time: '',
      message: ''
    });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="booking" id="booking">
      <div className="container">
        <h2 className="section-title">Book Your Appointment</h2>
        {submitted && (
          <div style={{
            background: '#d4a574',
            color: 'white',
            padding: '1rem',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <p><i className="fas fa-check"></i> Thank you! I will contact you shortly.</p>
          </div>
        )}
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Select Service *</label>
            <select name="service" value={formData.service} onChange={handleChange} required>
              <option value="">Choose a service</option>
              <option value="bridal">Bridal Makeup</option>
              <option value="party">Party Makeup</option>
              <option value="hd">HD Makeup</option>
              <option value="airbrush">Airbrush Makeup</option>
              <option value="bridal-party">Bridal Party</option>
              <option value="special">Special Effects</option>
            </select>
          </div>
          <div className="form-group">
            <label>Preferred Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Preferred Time *</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Additional Details</label>
            <textarea
              name="message"
              placeholder="Tell me about your makeup preferences..."
              value={formData.message}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            <i className="fas fa-calendar-check"></i> Book Appointment
          </button>
        </form>
      </div>
    </section>
  );
};

// ============ CONTACT COMPONENT ============
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
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              <a href="tel:+919876543210" style={{ color: '#d4a574', textDecoration: 'none' }}>Call Now</a>
            </p>
          </div>
          <div className="contact-card">
            <i className="fas fa-envelope"></i>
            <h3>Email</h3>
            <p>bhawnasagar@makeover.com</p>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
              <a href="mailto:bhawnasagar@makeover.com" style={{ color: '#d4a574', textDecoration: 'none' }}>Send Email</a>
            </p>
          </div>
          <div className="contact-card">
            <i className="fas fa-map-marker-alt"></i>
            <h3>Location</h3>
            <p>City, State</p>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Available for bridal bookings</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#2c1810' }}>Follow Me</h3>
          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============ FOOTER COMPONENT ============
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <p>&copy; {currentYear} Bhawna Sagar Makeover. All rights reserved.</p>
        <p>Designed with ❤️ for your beauty</p>
      </div>
    </footer>
  );
};

// ============ WHATSAPP FLOATING BUTTON ============
const WhatsAppButton = () => {
  return (
    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="whatsapp-float">
      <i className="fab fa-whatsapp"></i>
    </a>
  );
};

// ============ MAIN APP COMPONENT ============
const App = () => {
    return (
        <div className="App">
            <Navbar />
            <Hero />
            <About />
            <Services />
            <BookingForm />
            <Gallery />
            <Testimonials />
            <Contact />
            <Footer />
        </div>
    );
};

// Render App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);