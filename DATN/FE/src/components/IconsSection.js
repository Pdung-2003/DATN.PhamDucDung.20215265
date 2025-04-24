import React from "react";

const IconsSection = () => {
  return (
    <section className="bg-white py-8">
      <div className="container mx-auto flex justify-around">
        <div className="text-center">
          <i className="fas fa-plane text-4xl text-blue-500"></i>
          <p className="mt-2">Tour giá rẻ</p>
        </div>
        <div className="text-center">
          <i className="fas fa-hotel text-4xl text-green-500"></i>
          <p className="mt-2">Khách sạn</p>
        </div>
        <div className="text-center">
          <i className="fas fa-utensils text-4xl text-red-500"></i>
          <p className="mt-2">Ẩm thực</p>
        </div>
        <div className="text-center">
          <i className="fas fa-map text-4xl text-yellow-500"></i>
          <p className="mt-2">Điểm đến</p>
        </div>
      </div>
    </section>
  );
};

export default IconsSection;