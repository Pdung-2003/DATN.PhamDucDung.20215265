import { BOOKING_STATUS } from '@/constants/app.constant';
import { useBookingDispatch, useBookingState } from '@/contexts/BookingContext';
import { useBookingActions } from '@/hooks/useBookingActions';
import { bookingService } from '@/services';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ReviewTourModal from './ReviewTourModal';
import { Link } from 'react-router-dom';
import BookingDetailModal from './BookingDetailModal';

const STATUS_LABELS = {
  [BOOKING_STATUS.PENDING]: 'Đang chờ duyệt',
  [BOOKING_STATUS.CONFIRMED]: 'Đã được quản lý xác nhận',
  [BOOKING_STATUS.PAID]: 'Đã thanh toán',
  [BOOKING_STATUS.CANCELLED]: 'Đã hủy'
};

const OrderTour = () => {
  const dispatch = useBookingDispatch();
  const { booking } = useBookingState();
  const { fetchMyBookings } = useBookingActions();

  useEffect(() => {
    fetchMyBookings();
    return () => {
      dispatch({ type: 'RESET_STATE' });
    };
  }, []);

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-col space-y-3 overflow-y-auto max-h-[500px]">
        {booking.map((booking) => (
          <OrderTourItem key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

const OrderTourItem = ({ booking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const { changeBookingStatus } = useBookingActions();
  const isCanFeedback =
    booking?.status === BOOKING_STATUS.PAID &&
    booking?.tourDate &&
    new Date(booking?.tourDate) < new Date();

  const createPayment = async (bookingId) => {
    try {
      const response = await bookingService.createPayment(bookingId);
      if (response?.result?.paymentUrl) {
        window.location.href = response?.result?.paymentUrl;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Lỗi khi thanh toán hóa đơn');
      console.log(error);
    }
  };

  return (
    <div className="relative flex flex-col p-2 border rounded-lg shadow-sm min-h-[180px]">
      <div className="flex flex-col gap-1 pb-8">
        <a
          href={`/tour-details/${booking.tourId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-bold text-blue-700 hover:underline"
        >
          {booking?.tourName}
        </a>
        <p className="text-md font-bold mt-1 mb-2">Trạng thái: {STATUS_LABELS[booking?.status]}</p>
        <p className="text-sm text-gray-500">Mã đơn: {booking?.bookingCode || booking?.id}</p>
        <p className="text-sm text-gray-500">Số người: {booking?.numberOfPeople}</p>
        <p className="text-sm text-gray-500">Giá: {booking?.priceBooking?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
        <p className="text-sm text-gray-500">Ngày đi: {booking?.tourDate ? new Date(booking.tourDate).toLocaleDateString() : 'N/A'}</p>
      </div>
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 min-w-[160px] items-end">
        {booking?.status === BOOKING_STATUS.CONFIRMED && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-1 w-full"
            onClick={() => createPayment(booking?.bookingId)}
          >
            Thanh toán
          </button>
        )}
        {isCanFeedback && (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mb-1 w-full"
            onClick={() => setIsOpen(true)}
          >
            Đánh giá
          </button>
        )}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
          onClick={() => setShowDetail(true)}
        >
          Xem chi tiết
        </button>
        <ReviewTourModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          bookingId={booking?.bookingId}
        />
        <BookingDetailModal
          open={showDetail}
          onClose={() => setShowDetail(false)}
          booking={booking}
          changeBookingStatus={changeBookingStatus}
        />
      </div>
    </div>
  );
};

OrderTourItem.propTypes = {
  booking: PropTypes.object.isRequired,
};

export default OrderTour;
