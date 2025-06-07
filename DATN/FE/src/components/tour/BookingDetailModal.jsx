import PropTypes from 'prop-types';
import { BOOKING_STATUS } from '@/constants/app.constant';
import { toast } from 'react-toastify';
import { useBookingActions } from '@/hooks/useBookingActions';

const BookingDetailModal = ({ open, onClose, booking, changeBookingStatus }) => {
  if (!open || !booking) return null;
  const { fetchMyBookings } = useBookingActions();

  const handleCancel = async () => {
    try {
      await changeBookingStatus(booking.bookingId, BOOKING_STATUS.CANCELLED);
      toast.success('Hủy đơn hàng thành công');
      await fetchMyBookings(); // Refresh danh sách đơn hàng
      onClose();
    } catch (error) {
      toast.error('Không thể hủy đơn hàng');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>✕</button>
        <h2 className="text-xl font-bold mb-2">Chi tiết đơn hàng</h2>
        <div className="mb-2">
          <span className="font-semibold">Tour:</span>{' '}
          <a
            href={`/tour-details/${booking.tourId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold"
          >
            {booking.tourName}
          </a>
        </div>
        <div className="mb-2">
          <span className="font-semibold">Mã đơn hàng:</span> {booking.bookingCode || booking.id}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Họ tên:</span> {booking.customerName}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Email:</span> {booking.email}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Điện thoại:</span> {booking.phone}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Địa điểm:</span> {booking.location}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Ngày đi:</span> {booking.tourDate}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Ngày về:</span> {booking.endDate || '---'}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Số lượng khách:</span> {booking.numberOfPeople}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Tổng tiền:</span> {booking.priceBooking?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Trạng thái:</span> {booking.status}
        </div>
        
        {(booking.status === BOOKING_STATUS.PENDING || booking.status === BOOKING_STATUS.CONFIRMED) && (
          <button
            className="absolute bottom-6 right-6 bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600"
            onClick={handleCancel}
          >
            Hủy đơn
          </button>
        )}
      </div>
    </div>
  );
};

BookingDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  booking: PropTypes.object,
  changeBookingStatus: PropTypes.func,
};

export default BookingDetailModal;


