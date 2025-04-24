import React from 'react';
import '../styles/Footer.css';
import visa from '../assets/visa.png';
import mastercard from '../assets/mastercard.png';
import vnpay from '../assets/vnpay.png';
import jcb from '../assets/jcb.png';
import shopeepay from '../assets/shopeepay.png';
import momo from '../assets/momo.png';
import qr from '../assets/qr.png';
import googleplay from '../assets/googlePlay.png';
import appstore from '../assets/appstore.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Cột 1: Du lịch trong nước */}
        <div className="footer-section">
          <h3>Du lịch trong nước</h3>
          <ul>
            <li>Hà Nội</li>
            <li>Hạ Long</li>
            <li>Đà Nẵng</li>
            <li>Nha Trang</li>
            <li>Phan Thiết</li>
            <li>Phú Quốc</li>
            <li>Bắc Kạn</li>
            <li>Quy Nhơn</li>
          </ul>
        </div>

        {/* Cột 2: Du lịch nước ngoài */}
        <div className="footer-section">
          <h3>Du lịch nước ngoài</h3>
          <ul>
            <li>Trung Quốc</li>
            <li>Malaysia</li>
            <li>Hàn Quốc</li>
            <li>Hoa Kỳ</li>
            <li>Ấn Độ</li>
            <li>Đài Loan</li>
            <li>Na Uy</li>
            <li>Hà Lan</li>
          </ul>
        </div>

        {/* Cột 3: Tra cứu Booking */}
        <div className="footer-section">
          <h3>Tra cứu Booking</h3>
          <div className="search-box">
            <input type="text" placeholder="Nhập mã booking của quý khách" />
            <button>Tra cứu</button>
          </div>
        </div>

        {/* Cột 4: Ứng dụng di động */}
        <div className="footer-section">
          <h3>Ứng dụng di động</h3>
          <div className="app-buttons">
            <img src={googleplay} alt="Google Play" />
            <img src={appstore} alt="App Store" />
          </div>
          <div className="qr-codes">
            <img src={qr} alt="QR Code 1" />
            <img src={qr} alt="QR Code 2" />
          </div>
        </div>

        {/* Cột 4: Ứng dụng di động */}
        <div className="footer-section">
          <h3>Chấp nhận thanh toán</h3>
          <div className="payment-logos">
            <img src={visa} alt="Visa" />
            <img src={mastercard} alt="MasterCard" />
            <img src={vnpay} alt="VNPay" />
            <img src={jcb} alt="JCB" />
            <img src={shopeepay} alt="ShopeePay" />
            <img src={momo} alt="MoMo" />
          </div>
        </div>
      </div>

      {/* Phần cuối Footer */}
      <div className="footer-bottom">
        <p>© 2023 Công ty. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
