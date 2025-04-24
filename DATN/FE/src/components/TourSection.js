import React from 'react';
import TourCard from './TourCard';

const TourSection = () => (
    <section className="section">
        <h2 className="section-title">Tour giá chớt</h2>
        <div className="section-grid">
            <TourCard 
                image="https://storage.googleapis.com/a1aa/image/4GVxua-7UyWRZTbnafoRWD1imM7XKYIjkQBE97Javvw.jpg" 
                title="Tour 1" 
                description="Description of tour 1" 
                price="5,000,000₫" 
            />
            <TourCard 
                image="https://storage.googleapis.com/a1aa/image/4GVxua-7UyWRZTbnafoRWD1imM7XKYIjkQBE97Javvw.jpg" 
                title="Tour 2" 
                description="Description of tour 2" 
                price="6,000,000₫" 
            />
            <TourCard 
                image="https://storage.googleapis.com/a1aa/image/4GVxua-7UyWRZTbnafoRWD1imM7XKYIjkQBE97Javvw.jpg" 
                title="Tour 3" 
                description="Description of tour 3" 
                price="7,000,000₫" 
            />
        </div>
    </section>
);

export default TourSection;
