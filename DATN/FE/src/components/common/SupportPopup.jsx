import React, { useState } from 'react';

const SupportPopup = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {open && (
        <div className="bg-white shadow-lg rounded-lg p-4 mb-2 w-72 border border-gray-200 animate-fade-in">
          <div className="flex items-center mb-2">
            <img
              src="https://www.bestprice.vn/assets/img/icon/ho-tro.png"
              alt="icon"
              width={38}
              height={38}
              className="mr-2"
            />
            <div>
              <p className="text-lg font-semibold text-red-800">1900 2605</p>
              <p className="text-sm">(024/028) 7307 2605</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">Hỗ trợ khách hàng 24/7. Gọi ngay để được tư vấn!</div>
        </div>
      )}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg p-3 flex items-center justify-center focus:outline-none"
        title="Hỗ trợ khách hàng"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0 4.97 4.53 9 10.125 9 .621 0 1.23-.045 1.822-.132a.75.75 0 00.553-.36l1.2-2.1a.75.75 0 00-.07-.84l-1.272-1.272a.75.75 0 01-.073-.97l2.1-2.625a.75.75 0 01.97-.073l1.272 1.272a.75.75 0 00.84.07l2.1-1.2a.75.75 0 00.36-.553A9.003 9.003 0 0021.75 12c0-4.97-4.53-9-10.125-9S2.25 7.03 2.25 12z" />
        </svg>
      </button>
    </div>
  );
};

export default SupportPopup; 