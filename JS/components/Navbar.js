import React, { useState, useEffect } from 'react';

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
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsMobileMenuOpen(false);
    };

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'services', label: 'Services' },
        { id: 'gallery', label: 'Gallery' },
        { id: 'testimonials', label: 'Reviews' },
        { id: 'contact', label: 'Contact' }
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <div className="logo" onClick={() => scrollToSection('home')}>
                    <h1>✨ BHAWNA SAGAR MAKEOVER</h1>
                </div>
                <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    {navItems.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
                <div
                    className="mobile-menu"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;