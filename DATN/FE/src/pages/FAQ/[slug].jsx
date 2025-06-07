import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const FAQ_DETAILS = {
  'tim-va-dat-tour': {
    title: 'Cách tìm và đặt tour du lịch trên web',
    content: `
      <h3 class="text-xl font-semibold mb-4">Các bước đặt tour:</h3>
      <ol class="list-decimal pl-6 space-y-2">
        <li>Tìm kiếm tour phù hợp với nhu cầu của bạn</li>
        <li>Xem chi tiết tour và lịch trình</li>
        <li>Chọn ngày đi và số lượng người</li>
        <li>Điền thông tin liên hệ và gửi yêu cầu đặt tour</li>
        <li>Chờ quản lý xác nhận đơn đặt tour của bạn</li>
        <li>Nhận thông báo và thực hiện thanh toán</li>
        <li>Nhận email xác nhận với chi tiết đơn hàng sau khi thanh toán thành công</li>
      </ol>
      <p class="mt-4 text-gray-600">Lưu ý: Thời gian xác nhận đơn thường từ 1-2 giờ làm việc. Vui lòng kiểm tra email thường xuyên để không bỏ lỡ thông báo.</p>
    `,
  },
  'phuong-thuc-thanh-toan': {
    title: 'Các phương thức thanh toán khi đặt tour',
    content: `
      <h3 class="text-xl font-semibold mb-4">Chúng tôi chấp nhận các phương thức thanh toán sau:</h3>
      <ul class="list-disc pl-6 space-y-2">
        <li>Chuyển khoản ngân hàng</li>
        <li>Thanh toán qua thẻ tín dụng/ghi nợ</li>
        <li>Ví điện tử (Momo, VNPay, ZaloPay)</li>
        <li>Thanh toán tại văn phòng</li>
      </ul>
      <p class="mt-4 text-gray-600">Sau khi thanh toán thành công, bạn sẽ nhận được email xác nhận với chi tiết đơn hàng và hướng dẫn tiếp theo.</p>
    `,
  },
  'huy-tour': {
    title: 'Cách hủy tour sau khi đã đặt',
    content: `
      <h3 class="text-xl font-semibold mb-4">Chính sách hủy tour:</h3>
      <ul class="list-disc pl-6 space-y-2">
        <li>Hủy trước 7 ngày: Hoàn tiền 100%</li>
        <li>Hủy trước 3-7 ngày: Hoàn tiền 70%</li>
        <li>Hủy trước 1-3 ngày: Hoàn tiền 50%</li>
        <li>Hủy trong vòng 24h: Không hoàn tiền</li>
      </ul>
      <p class="mt-4 text-gray-600">Để hủy tour, vui lòng liên hệ hotline hoặc gửi email yêu cầu hủy tour với mã đơn hàng của bạn.</p>
    `,
  },
  'yeu-cau-huong-dan-vien': {
    title: 'Cách yêu cầu hướng dẫn viên du lịch',
    content: `
      <h3 class="text-xl font-semibold mb-4">Quy trình yêu cầu hướng dẫn viên:</h3>
      <ol class="list-decimal pl-6 space-y-2">
        <li>Đặt tour và chọn dịch vụ hướng dẫn viên</li>
        <li>Điền thông tin yêu cầu về hướng dẫn viên (ngôn ngữ, kinh nghiệm, v.v.)</li>
        <li>Chờ xác nhận từ quản lý tour</li>
        <li>Nhận thông tin hướng dẫn viên qua email</li>
      </ol>
      <p class="mt-4 text-gray-600">Lưu ý: Phí hướng dẫn viên sẽ được tính thêm vào giá tour. Vui lòng kiểm tra chi tiết trong email xác nhận.</p>
    `,
  },
  'yeu-cau-dich-vu-bo-sung': {
    title: 'Cách yêu cầu thêm dịch vụ trong tour',
    content: `
      <h3 class="text-xl font-semibold mb-4">Các dịch vụ bổ sung có sẵn:</h3>
      <ul class="list-disc pl-6 space-y-2">
        <li>Dịch vụ đưa đón sân bay</li>
        <li>Dịch vụ chụp ảnh chuyên nghiệp</li>
        <li>Dịch vụ ăn uống đặc biệt</li>
        <li>Dịch vụ spa và massage</li>
      </ul>
      <p class="mt-4 text-gray-600">Để yêu cầu dịch vụ bổ sung, vui lòng liên hệ với chúng tôi qua hotline hoặc email ít nhất 3 ngày trước ngày khởi hành.</p>
    `,
  },
  'nhan-uu-dai': {
    title: 'Cách nhận thông tin ưu đãi hoặc khuyến mãi',
    content: `
      <h3 class="text-xl font-semibold mb-4">Các cách nhận ưu đãi:</h3>
      <ul class="list-disc pl-6 space-y-2">
        <li>Đăng ký nhận bản tin qua email</li>
        <li>Theo dõi fanpage Facebook</li>
        <li>Tham gia chương trình khách hàng thân thiết</li>
        <li>Sử dụng mã giảm giá từ các đối tác</li>
      </ul>
      <p class="mt-4 text-gray-600">Các ưu đãi thường được gửi qua email hoặc thông báo trên website. Vui lòng kiểm tra thường xuyên để không bỏ lỡ cơ hội.</p>
    `,
  },
  'dieu-kien-tham-gia-tour': {
    title: 'Các điều kiện về độ tuổi, sức khỏe khi tham gia tour',
    content: `
      <h3 class="text-xl font-semibold mb-4">Điều kiện tham gia tour:</h3>
      <ul class="list-disc pl-6 space-y-2">
        <li>Độ tuổi: Từ 2 tuổi trở lên</li>
        <li>Sức khỏe: Đảm bảo đủ sức khỏe cho các hoạt động trong tour</li>
        <li>Trẻ em dưới 2 tuổi: Miễn phí (không bao gồm dịch vụ)</li>
        <li>Người cao tuổi: Cần có người thân đi cùng</li>
      </ul>
      <p class="mt-4 text-gray-600">Vui lòng thông báo trước nếu bạn có vấn đề về sức khỏe đặc biệt để chúng tôi có thể hỗ trợ tốt nhất.</p>
    `,
  },
  'bao-mat-thong-tin': {
    title: 'Chính sách bảo mật và bảo vệ thông tin khách hàng',
    content: `
      <h3 class="text-xl font-semibold mb-4">Cam kết bảo mật:</h3>
      <ul class="list-disc pl-6 space-y-2">
        <li>Bảo mật thông tin cá nhân</li>
        <li>Mã hóa dữ liệu thanh toán</li>
        <li>Không chia sẻ thông tin với bên thứ ba</li>
        <li>Tuân thủ quy định về bảo vệ dữ liệu</li>
      </ul>
      <p class="mt-4 text-gray-600">Chúng tôi cam kết bảo vệ thông tin của bạn theo đúng quy định của pháp luật và tiêu chuẩn quốc tế.</p>
    `,
  },
  'chon-nhom-tham-gia': {
    title: 'Cách chọn nhóm tham gia tour',
    content: `
      <h3 class="text-xl font-semibold mb-4">Hướng dẫn chọn nhóm:</h3>
      <ul class="list-disc pl-6 space-y-2">
        <li>Tour gia đình: Phù hợp cho các gia đình có trẻ em</li>
        <li>Tour nhóm bạn: Dành cho nhóm từ 4 người trở lên</li>
        <li>Tour công ty: Có thể tùy chỉnh theo yêu cầu</li>
        <li>Tour riêng: Dành cho nhóm nhỏ muốn riêng tư</li>
      </ul>
      <p class="mt-4 text-gray-600">Mỗi loại nhóm sẽ có chương trình và dịch vụ phù hợp riêng. Vui lòng liên hệ để được tư vấn chi tiết.</p>
    `,
  },
};

const FAQDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const faq = FAQ_DETAILS[slug];

  if (!faq) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Không tìm thấy câu hỏi</h1>
        <button
          onClick={() => navigate('/faq')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Quay lại trang FAQ
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/faq')}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Quay lại
      </button>
      
      <h1 className="text-3xl font-bold mb-6">{faq.title}</h1>
      
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: faq.content }}
      />
    </div>
  );
};

export default FAQDetail; 