import React from 'react';

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const testimonials = [
        { name: 'Priya Sharma', role: 'Bride', comment: 'Absolutely stunning! She made me feel like a princess on my wedding day. Highly recommend!' },
        { name: 'Anjali Patel', role: 'Party Client', comment: 'Amazing work! The makeup looked perfect in all photos and lasted the entire night.' },
        { name: 'Sneha Gupta', role: 'Film Project', comment: 'Professional, talented, and very cooperative. Highly recommended for any makeup needs!' },
        { name: 'Neha Singh', role: 'Bride', comment: 'Best decision! Bhawna understood exactly what I wanted and delivered beautifully.' }
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

export default Testimonials;