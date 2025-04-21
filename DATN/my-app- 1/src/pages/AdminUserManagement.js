import React from 'react';
import UserTable from '../components/tour-management/UserTable';

const AdminUserManagement = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user || user.role !== "Admin") {
        return <h2 className="text-red-500 text-center mt-10">Bạn không có quyền truy cập trang này</h2>;
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-4 text-center">Quản lý người dùng</h1>
            <UserTable />
        </div>
    );
};

export default AdminUserManagement;
