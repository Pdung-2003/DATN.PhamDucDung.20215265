import React from 'react';

const BlogCard = ({ image, title, description }) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={image} alt="Blog Image" className="w-full h-48 object-cover" width="400" height="300" />
        <div className="p-4">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);

export default BlogCard;
