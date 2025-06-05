// FE/src/layouts/MainLayout/Header/OrderModal.jsx
import OrderTour from '@/components/tour/OrderTour';
import PropTypes from 'prop-types';

const OrderModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[800px] max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Đơn hàng </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          <OrderTour />
        </div>
      </div>
    </div>
  );
};

OrderModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OrderModal;