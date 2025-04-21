import React, { useState } from "react";
import { signUp } from "../function/auth";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/main.css";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
        role: "customer",
    });
    
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Mật khẩu xác nhận không khớp!");
            return;
        }

        const result = await signUp(formData);
        if (result.success) {
            alert("Đăng ký thành công! Hãy đăng nhập.");
            navigate("/login");
        } else {
            setError(result.error || "Email đã tồn tại hoặc lỗi server!");
        }
    };

    return (
        <>
            <Header />
            <div className="auth-page">
                <div className="auth-container">
                    <h2>Đăng ký</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                        <input type="text" name="username" placeholder="Tên đăng nhập" onChange={handleChange} required />
                        <input type="password" name="password" placeholder="Mật khẩu" onChange={handleChange} required />
                        <input type="password" name="confirmPassword" placeholder="Xác nhận mật khẩu" onChange={handleChange} required />
                        <button type="submit">Đăng Ký</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
