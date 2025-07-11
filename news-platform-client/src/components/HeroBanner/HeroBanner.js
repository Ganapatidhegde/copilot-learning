import React from 'react';
import './HeroBanner.css';

const HeroSection = ({ image, title, subtitle }) => {
    return (
        <div className="hero-section" style={{ backgroundImage: `url(${image})` }}>
            <div className="overlay" />
            <div className="hero-content">
                <h1 className="hero-title">{title}</h1>
                <p className="hero-subtitle">{subtitle}</p>
            </div>
        </div>
    );
};

export default HeroSection;
