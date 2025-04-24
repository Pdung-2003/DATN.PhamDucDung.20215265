import React, { useState } from "react";
import { signIn } from "../function/auth";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/main.css";

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const result = await signIn(formData);
        if (result.success) {
            alert("Đăng nhập thành công!");
            navigate("/"); // Chuyển hướng về trang chủ sau khi đăng nhập
        } else {
            setError(result.error || "Email hoặc mật khẩu không đúng!");
        }
    };

    return (
        <>
            <Header />
            <div className="auth-page">
                <div className="auth-container">
                    <h2>Đăng nhập</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                        <input type="password" name="password" placeholder="Mật khẩu" onChange={handleChange} required />
                        <button type="submit">Đăng Nhập</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
