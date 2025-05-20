import AppModal from '@/components/common/AppModal';
import PropTypes from 'prop-types';
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';

const LoginModal = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');

  if (!open) return null;

  const handleClose = () => {
    setActiveTab('login');
    onClose();
  };

  const renderTitle = () => {
    switch (activeTab) {
      case 'login':
        return 'Đăng nhập';
      case 'register':
        return 'Đăng ký';
      case 'forgot-password':
        return 'Quên mật khẩu';
      default:
        return '';
    }
  };

  const renderTabs = () => {
    if (activeTab === 'forgot-password') return null;

    return (
      <div className="flex flex-row space-x-2 bg-[#f4f4f5] text-[#71717a] rounded-lg p-1">
        <button
          className={`w-full p-1 rounded-lg cursor-pointer ${activeTab === 'login' ? 'bg-white text-black' : 'bg-transparent'}`}
          onClick={() => setActiveTab('login')}
        >
          Đăng nhập
        </button>
        <button
          className={`w-full p-1 rounded-lg cursor-pointer ${activeTab === 'register' ? 'bg-white text-black' : 'bg-transparent'}`}
          onClick={() => setActiveTab('register')}
        >
          Đăng ký
        </button>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'login':
        return <LoginForm onForgotPassword={() => setActiveTab('forgot-password')} />;
      case 'register':
        return <RegisterForm onSuccess={() => setActiveTab('login')} />;
      case 'forgot-password':
        return <ForgotPasswordForm onSuccess={() => setActiveTab('login')} />;
      default:
        return null;
    }
  };

  return (
    <AppModal
      open={open}
      onClose={handleClose}
      title={renderTitle()}
      titleProps={{ className: 'text-center' }}
      paperProps={{
        className: 'max-w-lg',
      }}
      content={
        <div className="flex flex-col gap-4">
          {renderTabs()}
          <div className="flex flex-col p-5 bg-white">
            {renderContent()}
          </div>
        </div>
      }
    />
  );
};

export default LoginModal;

LoginModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
