import React from 'react';

const About = () => {
  const specialties = ['Bridal Makeup', 'Party Makeup', 'HD Makeup', 'Airbrush', 'Editorial'];

  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Hello! I'm a certified professional makeup artist with over 8 years of 
              experience in transforming dreams into reality. My passion lies in enhancing 
              natural beauty and creating looks that make every client feel confident and stunning.
            </p>
            <p>
              With specialized training in advanced makeup techniques and a keen eye for detail, 
              I ensure every bride, party-goer, and photoshoot model looks absolutely flawless.
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
                <i className="fas fa-palette"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
