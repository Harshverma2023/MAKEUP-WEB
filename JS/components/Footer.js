const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer>
            <p>&copy; {currentYear} Bhawna Sagar Makeover. All rights reserved.</p>
            <p>Designed with ❤️ for your beauty</p>
            <a href="https://wa.me/919876543210" className="whatsapp-float" target="_blank" rel="noreferrer">
                <i className="fab fa-whatsapp"></i>
            </a>
        </footer>
    );
};