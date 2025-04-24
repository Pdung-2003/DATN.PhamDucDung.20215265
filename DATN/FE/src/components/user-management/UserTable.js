import React from 'react';
import UserRow from './UserRow';
import userData from './userData';

const UserTable = () => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 border">Vai trò</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map(user => (
                        <UserRow key={user.id} user={user} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
