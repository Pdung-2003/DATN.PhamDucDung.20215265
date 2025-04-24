import React from "react";
import "../styles/main.css";
import bannerImage from "../assets/banner.png"; // Import hình ảnh banner

const HeroSection = () => {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "450px", // Đặt chiều cao của banner
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="hero-content">
        <h1 className="text-white text-3xl font-bold text-center">
          Trải nghiệm vui vẻ cho chuyến đi khó quên
        </h1>
        <div className="search-bar mt-4">
          <input
            type="text"
            placeholder="Tìm kiếm địa điểm hoặc hoạt động"
            className="p-3 rounded-l w-80 border border-gray-300"
          />
          <button className="bg-orange-500 text-white px-5 py-3 rounded-r">
            Tìm kiếm
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
