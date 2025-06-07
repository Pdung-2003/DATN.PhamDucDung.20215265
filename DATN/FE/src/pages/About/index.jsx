import { Briefcase, Users, Globe, Star, Phone, Mail, HeartHandshake, ShieldCheck, Rocket } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="w-full bg-white min-h-screen pb-10">
      {/* Banner lớn đầu trang */}
      <div className="relative w-full h-[340px] md:h-[420px] flex items-center justify-center bg-gradient-to-r from-blue-700 to-blue-400 overflow-hidden">
        <img
          src="https://ik.imagekit.io/tvlk/image/imageResource/2024/05/29/1716954047510-b8c65a608ff4ab24531b7457ed8d1de8.png?tr=q-75"
          alt="Banner TourXuyenViet"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-blue-800/60" />
        <div className="relative z-10 text-center w-full px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Nền tảng tour du lịch hàng đầu Việt Nam
          </h1>
          <p className="text-white text-lg md:text-2xl font-medium drop-shadow-md max-w-2xl mx-auto">
            Khám phá, đặt tour và tận hưởng hành trình trọn vẹn cùng TourXuyenViet – nơi hội tụ những trải nghiệm du lịch tuyệt vời nhất!
          </p>
        </div>
      </div>

      {/* Section 1: Ảnh trái, text phải */}
      <section className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 py-10 px-4">
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src="https://ik.imagekit.io/tvlk/image/imageResource/2024/05/29/1716954047510-b8c65a608ff4ab24531b7457ed8d1de8.png?tr=q-75"
            alt="TourXuyenViet - Du lịch khám phá"
            className="rounded-xl shadow-lg w-full max-w-md object-cover"
          />
        </div>
        <div className="md:w-1/2 w-full mt-6 md:mt-0">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">TourXuyenViet - Hành trình khám phá không giới hạn</h2>
          <p className="text-gray-700 text-lg mb-2">
            TourXuyenViet là nền tảng chuyên về tour du lịch, giúp bạn dễ dàng khám phá, đặt tour và tận hưởng những hành trình tuyệt vời trên khắp Việt Nam và Đông Nam Á. Chúng tôi mang đến đa dạng lựa chọn tour: khám phá thiên nhiên, văn hóa, ẩm thực, nghỉ dưỡng, mạo hiểm, tour gia đình, nhóm bạn, công ty... cùng nhiều dịch vụ đi kèm như hướng dẫn viên, xe đưa đón, vé tham quan, trải nghiệm địa phương.
          </p>
        </div>
      </section>

      {/* Section 2: Ảnh phải, text trái */}
      <section className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-8 py-6 px-4">
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src="https://ik.imagekit.io/tvlk/image/imageResource/2024/10/29/1730189648971-72395914ab5b35c4f6d840dafa24f1b1.png?tr=q-75"
            alt="TourXuyenViet - Dịch vụ khách hàng"
            className="rounded-xl shadow-lg w-full max-w-md object-cover"
          />
        </div>
        <div className="md:w-1/2 w-full mt-6 md:mt-0">
          <h2 className="text-2xl font-bold text-blue-700 mb-3">Dịch vụ tận tâm & Mạng lưới rộng khắp</h2>
          <p className="text-gray-700 text-lg mb-2">
            Được thành lập và phát triển bởi đội ngũ đam mê du lịch, TourXuyenViet không ngừng mở rộng mạng lưới đối tác, điểm đến và dịch vụ. Chúng tôi cam kết hỗ trợ khách hàng 24/7, thanh toán linh hoạt, minh bạch và luôn đồng hành cùng bạn trên mọi hành trình khám phá.
          </p>
        </div>
      </section>

      {/* Giá trị cốt lõi */}
      <section className="max-w-5xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Giá trị cốt lõi của TourXuyenViet</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <HeartHandshake className="w-10 h-10 text-pink-500 mb-2" />
            <h3 className="font-semibold text-lg mb-1">Tận tâm & Uy tín</h3>
            <p className="text-gray-600">Luôn đặt khách hàng làm trung tâm, cam kết chất lượng dịch vụ và sự hài lòng trên từng chuyến đi.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <ShieldCheck className="w-10 h-10 text-green-500 mb-2" />
            <h3 className="font-semibold text-lg mb-1">An toàn & Minh bạch</h3>
            <p className="text-gray-600">Thông tin rõ ràng, giá cả minh bạch, bảo hiểm du lịch và hỗ trợ 24/7.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Rocket className="w-10 h-10 text-blue-500 mb-2" />
            <h3 className="font-semibold text-lg mb-1">Đổi mới & Tiện ích</h3>
            <p className="text-gray-600">Không ngừng sáng tạo, ứng dụng công nghệ để tối ưu hóa trải nghiệm đặt tour và du lịch.</p>
          </div>
        </div>
      </section>

      {/* Số liệu ấn tượng */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">100,000+</div>
            <div className="text-gray-600">Khách hàng hài lòng</div>
          </div>
          <div>
            <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">63</div>
            <div className="text-gray-600">Tỉnh thành phục vụ</div>
          </div>
          <div>
            <Briefcase className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">500+</div>
            <div className="text-gray-600">Đối tác du lịch</div>
          </div>
          <div>
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">24/7</div>
            <div className="text-gray-600">Hỗ trợ khách hàng</div>
          </div>
        </div>
      </section>

      {/* Cam kết cộng đồng */}
      <section className="max-w-4xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Cam kết & Trách nhiệm cộng đồng</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Luôn minh bạch thông tin, giá cả và chính sách hoàn hủy.</li>
          <li>Hợp tác với các đối tác uy tín, đảm bảo chất lượng dịch vụ.</li>
          <li>Tham gia các hoạt động xã hội, bảo vệ môi trường và phát triển du lịch bền vững.</li>
        </ul>
      </section>

      {/* Liên hệ */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-2 text-blue-700">Liên hệ với chúng tôi</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2 justify-center">
              <Phone className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700 font-medium">Hotline: 1900 1234</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Mail className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700 font-medium">Email: support@tourxuyenviet.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 