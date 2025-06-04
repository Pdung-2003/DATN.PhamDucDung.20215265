// FE/src/layouts/MainLayout/Header/RightHeader.jsx
import FavoritesDialog from '@/components/sections/FavoritesDialog';
import { useAuthState } from '@/contexts/AuthContext';
import AvatarProfile from '@/layouts/MainLayout/Header/AvatarProfile';
import LoginModal from '@/layouts/MainLayout/Header/LoginModal';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const RightHeader = () => {
  const { isAuthenticated } = useAuthState();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="flex flex-row items-center h-full">
      {isAuthenticated ? (
        <>
          <Link
            to="/orders"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg mr-2"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-sm font-medium">Đơn hàng</span>
          </Link>
          <AvatarProfile />
        </>
      ) : (
        <>
          <p
            className="p-2 text-lg font-semibold hover:cursor-pointer hover:text-gray-700"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Đăng nhập
          </p>
          <LoginModal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </>
      )}
      <FavoritesDialog open={false} onClose={() => {}} />
    </div>
  );
};

export default RightHeader;