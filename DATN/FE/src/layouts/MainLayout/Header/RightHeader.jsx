// FE/src/layouts/MainLayout/Header/RightHeader.jsx
import FavoritesDialog from '@/components/sections/FavoritesDialog';
import { useAuthState } from '@/contexts/AuthContext';
import AvatarProfile from '@/layouts/MainLayout/Header/AvatarProfile';
import LoginModal from '@/layouts/MainLayout/Header/LoginModal';
import { ShoppingBag, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNotifications, getUnreadNotificationCount, markAllNotificationsAsRead } from '@/services/notification.service';

const RightHeader = () => {
  const { isAuthenticated, user } = useAuthState();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const isTourManager = user?.roles?.some((role) => role.name === 'TOUR_MANAGER');
  const isCustomer = user?.roles?.some((role) => role.name === 'USER' || role.name === 'CUSTOMER');
  const [showBell, setShowBell] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user?.id) {
      getUnreadNotificationCount(user.id).then(setUnreadCount);
    }
  }, [user?.id, showBell]);

  const handleBellClick = async () => {
    setShowBell((prev) => !prev);
    if (!showBell && user?.id) {
      await markAllNotificationsAsRead(user.id);
      const data = await getNotifications(user.id);
      setNotifications(data);
      getUnreadNotificationCount(user.id).then(setUnreadCount);
    }
  };

  return (
    <div className="flex flex-row items-center h-full">
      {isAuthenticated ? (
        <>
          {isCustomer && (
            <Link
              to="/orders"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg mr-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-sm font-medium">Đơn hàng</span>
            </Link>
          )}
          {isTourManager && (
            <div className="relative">
              <Bell className="w-6 h-6 mx-2 cursor-pointer text-gray-700 hover:text-orange-500" onClick={handleBellClick} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {unreadCount}
                </span>
              )}
              {showBell && (
                <div className="absolute right-0 top-full mt-2 bg-white shadow-md rounded-lg min-w-[320px] w-96 z-50 border border-gray-300 max-h-[400px] overflow-y-auto">
                  <div className="font-bold text-lg px-4 py-2 border-b">Thông báo</div>
                  <ul className="divide-y divide-gray-200">
                    {notifications.length === 0 && <li className="p-4 text-gray-500">Không có thông báo</li>}
                    {notifications.map((n) => (
                      <li key={n.id} className="px-4 py-3 flex flex-col">
                        <span className="text-sm">{n.content}</span>
                        <span className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleString('vi-VN')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {isCustomer && !isTourManager && (
            <div className="relative">
              <Bell className="w-6 h-6 mx-2 cursor-pointer text-gray-700 hover:text-orange-500" onClick={handleBellClick} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {unreadCount}
                </span>
              )}
              {showBell && (
                <div className="absolute right-0 top-full mt-2 bg-white shadow-md rounded-lg min-w-[320px] w-96 z-50 border border-gray-300 max-h-[400px] overflow-y-auto">
                  <div className="font-bold text-lg px-4 py-2 border-b">Thông báo</div>
                  <ul className="divide-y divide-gray-200">
                    {notifications.length === 0 && <li className="p-4 text-gray-500">Không có thông báo</li>}
                    {notifications.map((n) => (
                      <li key={n.id} className="px-4 py-3 flex flex-col">
                        <span className="text-sm">{n.content}</span>
                        <span className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleString('vi-VN')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
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