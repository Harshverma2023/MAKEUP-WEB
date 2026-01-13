import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import BookingForm from './components/BookingForm';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
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

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/917060986289"
        className="whatsapp-float"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
}

export default App;
