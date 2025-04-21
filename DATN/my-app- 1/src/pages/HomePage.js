import React from 'react';
import HeroSection from '../components/HeroSection';
import IconsSection from '../components/IconsSection';
import TourSection from '../components/TourSection';
import ExperienceSection from '../components/ExperienceSection';
import BlogSection from '../components/BlogSection';

const HomePage = () => {
    return (
        <div className="home-page">
            <HeroSection />
            <TourSection />
            <ExperienceSection />
            <BlogSection/>
        </div>
    );
};

export default HomePage;
