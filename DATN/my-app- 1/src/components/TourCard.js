import React from 'react';

const TourCard = ({ image, title, description, price }) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={image} alt="Tour Image" className="w-full h-48 object-cover" width="400" height="300" />
        <div className="p-4">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-gray-600">{description}</p>
            <div className="mt-2 flex justify-between items-center">
                <span className="text-blue-500 font-bold">{price}</span>
                <button className="bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-600 transition">
                    Book Now
                </button>
            </div>
        </div>
    </div>
);

export default TourCard;
