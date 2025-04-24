const API_URL = process.env.REACT_APP_BACKEND_API || "http://localhost:5000/api";

export const signIn = async (formData) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const result = await response.json();

        if (response.ok) {
            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result.user));
            return { success: true, token: result.token, user: result.user };
        } else {
            return { success: false, error: result.error, status: response.status };
        }
    } catch (error) {
        return { success: false, error: "Có lỗi xảy ra, vui lòng thử lại!" };
    }
};

export const signUp = async (formData) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const result = await response.json();

        if (response.ok) {
            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result.user));
            return { success: true, token: result.token, user: result.user };
        } else {
            return { success: false, error: result.error, status: response.status };
        }
    } catch (error) {
        return { success: false, error: "Có lỗi xảy ra, vui lòng thử lại!" };
    }
};


// Kiểm tra người dùng đã đăng nhập hay chưa
export const isSignedIn = () => {
    return !!localStorage.getItem("token");
};

// Lấy thông tin người dùng từ localStorage
export const getUserInfo = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

// Đăng xuất
export const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};
