import BookingTourModal from '@/components/tour/BookingTourModal';
import ItineraryDay from '@/components/tour/ItineraryDay';
import { useAuthState } from '@/contexts/AuthContext';
import { useItineraryState } from '@/contexts/ItineraryContext';
import { useTourState } from '@/contexts/TourContext';
import { useItineraryActions } from '@/hooks/useItineraryActions';
import { useTourActions } from '@/hooks/useTourActions';
import { formatCurrency } from '@/utils/format';
import { Calendar, Map } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFeedbacksByTourId } from '@/services/tour.service';
import { IMAGE_CONSTANT } from '@/constants/image.constant';
import { useBookingState } from '@/contexts/BookingContext';
import { useBookingActions } from '@/hooks/useBookingActions';
import QuestionSection from '@/components/tour/QuestionSection';
import ReviewTourModal from '@/components/tour/ReviewTourModal';
import mainRequest from '@/api/mainRequest';

const TourDetails = () => {
  const { id } = useParams();
  const { fetchTourById } = useTourActions();
  const { fetchItineraries } = useItineraryActions();
  const { tour } = useTourState();
  const { itineraries } = useItineraryState();
  const { user } = useAuthState();
  const [isBookingTourModalOpen, setIsBookingTourModalOpen] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [activeTab, setActiveTab] = useState('feedback');
  const navigate = useNavigate();
  const { booking } = useBookingState();
  const { fetchMyBookings } = useBookingActions();
  const hasBooked = booking.some(b => String(b.tourId) === String(id));
  const isCustomer = user?.roles?.some((role) => role.name === 'USER' || role.name === 'CUSTOMER');
  const canBookTour = () => {
    if (!tour) return false;
    return tour.status === 'APPROVED' && new Date(tour.endDate) > new Date();
  };
  const getStatusMessage = () => {
    if (!tour) return null;
    
    switch (tour.status) {
      case 'PENDING':
        return 'Tour đang chờ duyệt';
      case 'REJECTED':
        return 'Tour đã bị từ chối';
      case 'INACTIVE':
        return 'Tour đã hết hạn';
      case 'CANCELLED':
        return 'Tour đã bị hủy';
      default:
        return null;
    }
  };
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const eligibleBooking = booking.find(b => String(b.tourId) === String(id) && b.status === 'PAID' && new Date(b.tourDate) <= new Date());
  const [hasFeedback, setHasFeedback] = useState(false);
  useEffect(() => {
    if (id) {
      fetchTourById(id);
      fetchItineraries(id);
      getFeedbacksByTourId(id).then((res) => setFeedbacks(res.result || []));
    }
  }, [id]);
  useEffect(() => {
    if (user) {
      fetchMyBookings();
    }
  }, [user]);
  useEffect(() => {
    if (eligibleBooking) {
      mainRequest.get(`/api/feedbacks/exists?bookingId=${eligibleBooking.bookingId}`)
        .then(res => setHasFeedback(res?.data?.result))
        .catch(() => setHasFeedback(false));
    }
  }, [eligibleBooking?.bookingId]);

  return (
    <div className="container max-w-[1160px] mx-auto mt-10 flex flex-col gap-5 w-full px-4">
      <div className="max-w-6xl mx-auto py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Image + Video */}
        <div className="md:col-span-2 space-y-4">
          <div className="relative w-full aspect-[3/2]">
            <img
              src={tour?.tourBanner}
              alt={tour?.tourName}
              className="w-full h-full object-cover rounded-2xl shadow-md"
            />
          </div>
        </div>

        {/* Right: Info */}
        <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4 border border-gray-100">
          <h1 className="text-xl font-semibold leading-snug">{tour?.tourName}</h1>

          <div className="text-sm text-gray-500">{tour?.duration}</div>

          <div className="flex items-start gap-2 text-gray-700 text-sm">
            <Calendar className="mt-1" />
            <div>
              <strong>Khởi hành đến {tour?.destination}</strong>
              <div>
                Bắt đầu:{' '}
                {tour?.startDate ? new Date(tour?.startDate).toLocaleDateString('vi-VN') : ''}
              </div>
              <div>
                Kết thúc: {tour?.endDate ? new Date(tour?.endDate).toLocaleDateString('vi-VN') : ''}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-700 text-sm">
            <Map className="mt-1" />
            <p>{tour?.location}</p>
          </div>
          <div className="space-y-1">
            {tour?.discount && (
              <div className="line-through text-gray-400 text-sm">
                {formatCurrency(tour?.price)}
              </div>
            )}
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(tour?.price - (tour?.discount || 0))}
            </div>
          </div>

          {/* Nút đặt tour và đơn hàng */}
          {canBookTour() ? (
            <>
              <button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg"
                onClick={() => setIsBookingTourModalOpen(true)}
              >
                {user ? 'Đặt Tour' : 'Gửi yêu cầu'}
              </button>
              {hasBooked && isCustomer && (
                <button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg mt-2"
                  onClick={() => navigate('/orders')}
                >
                  Đơn hàng của bạn
                </button>
              )}
            </>
          ) : (
            <button
              className="w-full bg-gray-400 text-white font-semibold py-2 rounded-lg cursor-not-allowed"
              disabled
            >
              Không thể đặt tour
            </button>
          )}
          {getStatusMessage() && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
            {getStatusMessage()}
          </div>
        )}
        </div>
      </div>
      <BookingTourModal
        open={isBookingTourModalOpen}
        onClose={() => setIsBookingTourModalOpen(false)}
        tourId={id}
        onBookedSuccess={() => setIsBooked(true)}
      />
      {tour?.description && (
        <div className="w-full">
          <h2 className="text-2xl font-bold">Mô tả</h2>
          <div className="text-gray-500">{tour?.description}</div>
        </div>
      )}
      <div className="w-full">
        <h2 className="text-2xl font-bold">Thông tin lịch trình</h2>
        {itineraries?.map((item) => (
          <ItineraryDay key={item.id} itinerary={item} />
        ))}
      </div>
      {/* Tabs section */}
      <div className="w-full mt-8 mb-12">
        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 font-semibold focus:outline-none border-b-2 transition-all duration-150 ${activeTab === 'feedback' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
            onClick={() => setActiveTab('feedback')}
          >
            Đánh giá từ khách hàng
          </button>
          <button
            className={`px-4 py-2 font-semibold focus:outline-none border-b-2 transition-all duration-150 ${activeTab === 'qna' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'}`}
            onClick={() => setActiveTab('qna')}
          >
            Hỏi đáp về tour
          </button>
        </div>
        {activeTab === 'feedback' && (
          <div className="bg-white rounded-xl p-5 shadow border border-gray-100">
            <h2 className="text-2xl font-bold mb-4">Đánh giá từ khách hàng</h2>
            {eligibleBooking && !hasFeedback && (
              <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setIsReviewModalOpen(true)}
              >
                Đánh giá tour
              </button>
            )}
            <ReviewTourModal open={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} bookingId={eligibleBooking?.bookingId?.toString() || ''} />
            {feedbacks.length === 0 && <div>Chưa có đánh giá nào cho tour này.</div>}
            <div className="flex flex-col gap-4">
              {feedbacks.map((fb) => (
                <div key={fb.feedbackId} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={IMAGE_CONSTANT.AVATAR_DEFAULT}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{fb.userFullname || 'Ẩn danh'}</div>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-4 h-4 ${star <= fb.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-700 mb-2">{fb.comment}</div>
                  {fb.images && fb.images.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-2">
                      {fb.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img.url}
                          alt="feedback-img"
                          className="w-45 h-30 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'qna' && (
          <div className="w-full">
            <QuestionSection tourId={id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TourDetails;
