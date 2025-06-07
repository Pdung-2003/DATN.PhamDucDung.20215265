import { useNavigate } from 'react-router-dom';

const FAQ_LIST = [
  {
    slug: 'tim-va-dat-tour',
    title: 'Cách tìm và đặt tour du lịch trên web',
  },
  {
    slug: 'phuong-thuc-thanh-toan',
    title: 'Các phương thức thanh toán khi đặt tour',
  },
  {
    slug: 'huy-tour',
    title: 'Cách hủy tour sau khi đã đặt',
  },
  {
    slug: 'yeu-cau-huong-dan-vien',
    title: 'Cách yêu cầu hướng dẫn viên du lịch',
  },
  {
    slug: 'yeu-cau-dich-vu-bo-sung',
    title: 'Cách yêu cầu thêm dịch vụ trong tour',
  },
  {
    slug: 'nhan-uu-dai',
    title: 'Cách nhận thông tin ưu đãi hoặc khuyến mãi',
  },
  {
    slug: 'dieu-kien-tham-gia-tour',
    title: 'Các điều kiện về độ tuổi, sức khỏe khi tham gia tour',
  },
  {
    slug: 'bao-mat-thong-tin',
    title: 'Chính sách bảo mật và bảo vệ thông tin khách hàng',
  },
  {
    slug: 'chon-nhom-tham-gia',
    title: 'Cách chọn nhóm tham gia tour',
  },
];

const FAQPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-white pb-10">
      <div className="w-full bg-gradient-to-r from-blue-600 to-blue-400 py-10 text-center text-white mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Trung tâm Hỗ trợ TourXuyenViet</h1>
        <p className="text-lg">Mọi câu trả lời dành cho bạn</p>
      </div>
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-xl font-bold mb-4 text-black">Chủ đề phổ biến</h2>
        <div className="divide-y divide-gray-200 border rounded-lg bg-white shadow">
          {FAQ_LIST.map((item) => (
            <button
              key={item.slug}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-100 transition"
              onClick={() => navigate(`/faq/${item.slug}`)}
            >
              <span className="font-medium text-base text-gray-900">{item.title}</span>
              <span className="text-blue-500 text-lg">&gt;</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
