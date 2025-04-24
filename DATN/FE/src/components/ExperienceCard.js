import React from 'react';

const ExperienceCard = ({ image, title, description }) => (
    <div className="bg-white shadow rounded-lg overflow-hidden">
        <img src={image} alt="Experience Image" className="w-full h-48 object-cover" width="300" height="200" />
        <div className="p-4">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);

export default ExperienceCard;