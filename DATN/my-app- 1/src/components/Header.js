import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Header.css"; // Import CSS
import logo from '../assets/Logo.png'; // Import logo

const Header = () => {
    const user = JSON.parse(localStorage.getItem("user")); // Lấy user từ localStorage
    const isAdmin = user?.role === "Admin"; // Kiểm tra vai trò

    return (
        <header className="header">
            <div className="container">
                {/* Logo và thương hiệu */}
                <div className="logo-container">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="logo-img" />
                    </Link>
                    <Link to="/" className="logo-text">
                        <h1>Tour Travel</h1>
                    </Link>
                </div>

                {/* Điều chỉnh: Menu đặt cạnh nút đăng nhập */}
                <div className="menu-auth-wrapper">
                    <nav className="nav">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li><Link to="/tours">Tours</Link></li>
                            <li><Link to="/blogs">Blogs</Link></li>
                            <li><Link to="/experience">Experience</Link></li>
                            {isAdmin && (
                                <>
                                    <li><Link to="/admin/users">Quản lý người dùng</Link></li>
                                    <li><Link to="/admin/tours">Quản lý tour</Link></li>
                                    <li><Link to="/admin/revenue">Doanh thu</Link></li>
                                </>
                            )}
                        </ul>
                    </nav>
                    
                    {/* Nút đăng nhập và đăng ký */}
                    <div className="auth-buttons">
                        {user ? (
                            <button className="logout-btn" onClick={() => { localStorage.removeItem("user"); window.location.reload(); }}>
                                Đăng xuất
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="login-btn">Đăng nhập</Link>
                                <Link to="/register" className="register-btn">Đăng ký</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
