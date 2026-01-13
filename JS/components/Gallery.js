import React from 'react';

const Gallery = () => {
    const categories = ['Bridal', 'Party', 'Editorial', 'HD'];
    return (
        <section className="gallery" id="gallery">
            <div className="container">
                <h2 className="section-title">Portfolio</h2>
                <div className="gallery-grid">
                    {categories.map((category, index) => (
                        <div key={index} className="gallery-item">
                            <div className="gallery-placeholder">{category}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;