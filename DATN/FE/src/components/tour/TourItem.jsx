import { Edit } from 'lucide-react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const TourItem = ({ tour, isManager = false }) => {
  const navigate = useNavigate();
  
  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: { color: 'bg-yellow-500', text: 'Chờ duyệt' },
      APPROVED: { color: 'bg-green-500', text: 'Đã duyệt' },
      REJECTED: { color: 'bg-red-500', text: 'Từ chối' },
      INACTIVE: { color: 'bg-gray-500', text: 'Hết hạn' },
      CANCELLED: { color: 'bg-red-600', text: 'Đã hủy' }
    };

    const config = statusConfig[status] || { color: 'bg-gray-500', text: status };
    return (
      <span className={`${config.color} text-white text-xs px-2 py-1 rounded-full`}>
        {config.text}
      </span>
    );
  };

  const canShowTour = () => {
    if (isManager) return true; // Tour manager thấy tất cả tour của mình
    if (tour.status === 'APPROVED') return true;
    if (tour.status === 'INACTIVE') {
      const endDate = new Date(tour.endDate);
      const twentyDaysAgo = new Date();
      twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);
      return endDate >= twentyDaysAgo;
    }
    return false;
  };

  if (!canShowTour()) return null;
  return (
    <div
      className="flex flex-row bg-white overflow-hidden border border-gray-200 h-full w-full cursor-pointer"
      onClick={() => navigate(`/tour-details/${tour?.tourId}`)}
    >
      {/* Image */}
      <div className="w-2/5 aspect-[3/2] bg-gray-100">
        <img src={tour?.tourBanner} alt="Tour Image" className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between w-3/5">
        {/* Title & Rating */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-gray-800 leading-tight hover:text-blue-600">
              {tour?.tourName}
            </h2>
            <p className="text-sm text-gray-500 italic line-clamp-2">{tour?.description}</p>
            <p className="text-sm text-gray-500">{tour?.manager?.fullName}</p>
          </div>
          {isManager && (
            <div className="flex items-center gap-2">
              <button className="text-blue-600 hover:text-blue-800">
                <Edit className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
          <div className="flex items-center gap-1">
            <i className="fa fa-map-marker-alt"></i> {tour?.location}
          </div>
          <div className="flex items-center gap-1">
            <i className="fa fa-calendar-alt"></i> {tour?.duration}
          </div>
        </div>

        {/* Buttons & Price */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-4">
          <div className="flex items-center gap-2">
            {tour?.discount && (
              <span className="line-through text-gray-400 text-sm">
                {tour?.price?.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </span>
            )}
            <span className="text-red-600 text-xl font-bold">
              {((tour?.price || 0) - (tour?.discount || 0))?.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourItem;

TourItem.propTypes = {
  tour: PropTypes.object.isRequired,
  isManager: PropTypes.bool,
};
