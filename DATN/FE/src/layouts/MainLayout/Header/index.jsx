import SearchDebounce from '@/components/common/SearchDebounce';
import { useTourDispatch, useTourState } from '@/contexts/TourContext';
import RightHeader from '@/layouts/MainLayout/Header/RightHeader';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/images/Logo.png';
import { Info, HelpCircle, BookOpen, Sparkles } from 'lucide-react';
import { useAuthState } from '@/contexts/AuthContext';

const Header = () => {
  const dispatch = useTourDispatch();
  const { filter } = useTourState();
  const navigate = useNavigate();
  const { user } = useAuthState();
  const isTourManager = user?.roles?.some((role) => role.name === 'TOUR_MANAGER');
  const isCustomer = user?.roles?.some((role) => role.name === 'USER' || role.name === 'CUSTOMER');

  const handleChangeValueInput = (value) => {
    dispatch({ type: 'SET_FILTER', payload: { ...filter, tourName: value } });
  };

  return (
    <div className="h-[65px] shadow w-full bg-white flex flex-row items-center justify-between px-4">
      {/* Left: Logo + Buttons + Search */}
      <div className="flex flex-row items-center gap-8 flex-shrink-0">
        <Link to="/" className="h-[80px] w-auto flex items-center">
          <img
            src={logo}
            alt="Logo Header"
            style={{
              objectFit: 'contain',
              height: '80px',
              width: 'auto',
              display: 'block',
            }}
          />
        </Link>
        <div className="flex flex-row gap-8 ml-4">
          <Link to="/about" className="flex flex-col items-center justify-center group cursor-pointer">
            <Info className="w-7 h-7 mb-1 text-gray-700 group-hover:text-orange-500" />
            <span className="font-bold text-gray-700 group-hover:text-orange-500 text-sm">Giới thiệu</span>
          </Link>
          <Link to="/faq" className="flex flex-col items-center justify-center group cursor-pointer">
            <HelpCircle className="w-7 h-7 mb-1 text-gray-700 group-hover:text-orange-500" />
            <span className="font-bold text-gray-700 group-hover:text-orange-500 text-sm">Câu hỏi thường gặp</span>
          </Link>
          <Link to="/suggest" className="flex flex-col items-center justify-center group cursor-pointer">
            <Sparkles className="w-7 h-7 mb-1 text-gray-700 group-hover:text-orange-500" />
            <span className="font-bold text-gray-700 group-hover:text-orange-500 text-sm">Gợi ý tour</span>
          </Link>
        </div>
        <div className="pl-8 w-[320px]">
          <SearchDebounce
            valueInput={filter?.searchKey}
            changeValueInput={handleChangeValueInput}
            className={''}
            onClickIcon={() => navigate('/tours')}
          />
        </div>
      </div>
      {/* Right: Other header items */}
      <div className="flex flex-row items-center flex-none justify-end">
        {isTourManager ? (
          <Link to="/tour-manager" className="flex flex-col items-center justify-center group cursor-pointer">
            <span className="font-bold text-gray-700 group-hover:text-orange-500 text-sm">Quản lý tour</span>
          </Link>
        ) : null}
        <RightHeader />
      </div>
    </div>
  );
};

export default Header;
