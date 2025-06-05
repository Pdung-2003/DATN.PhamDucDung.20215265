import Footer from './Footer';
import PropTypes from 'prop-types';
import Header from './Header';
import SupportPopup from '@/components/common/SupportPopup';

const MainLayout = ({ children }) => {
  return (
    <div className="h-full w-full">
      <Header />
      {children}
      <Footer />
      <SupportPopup />
    </div>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
