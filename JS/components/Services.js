import React from 'react';

const Services = () => {
    const services = [
        { icon: 'fa-ring', title: 'Bridal Makeup', description: 'Complete bridal makeover with HD finish, hairstyling, and pre-wedding trial', price: '₹25,000' },
        { icon: 'fa-cocktail', title: 'Party Makeup', description: 'Glamorous party looks perfect for any celebration or evening event', price: '₹3,000' },
        { icon: 'fa-camera', title: 'Photoshoot', description: 'Professional makeup for fashion, editorial, and portfolio shoots', price: '₹12,000' },
        { icon: 'fa-heart', title: 'Engagement', description: 'Elegant and sophisticated looks for your special engagement ceremony', price: '₹10,000' },
        { icon: 'fa-video', title: 'HD Makeup', description: 'Professional HD makeup for films, photos, and events', price: '₹10,000' },
        { icon: 'fa-spray-can', title: 'Airbrush Makeup', description: 'Long-lasting HD airbrush makeup for flawless finish', price: '₹12,000' },
        { icon: 'fa-star', title: 'Custom Package', description: 'Personalized makeup services tailored to your specific needs', price: 'Contact' }
    ];

    return (
        <section className="services" id="services">
            <div className="container">
                <h2 className="section-title">Services & Pricing</h2>
                <div className="service-cards">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <i className={`fas ${service.icon}`}></i>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <div className="price">{service.price}</div>
                            <button className="btn btn-primary" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
                                Book Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;