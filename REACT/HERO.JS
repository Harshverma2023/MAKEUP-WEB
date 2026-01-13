import React from 'react';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>Enhancing Beauty, Creating Confidence</h1>
        <p>Professional makeup artistry for your special moments</p>
        <div className="cta-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book Now
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
