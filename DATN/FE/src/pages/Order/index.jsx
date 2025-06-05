import OrderTour from '@/components/tour/OrderTour';

const Orders = () => {
  return (
    <div className="flex flex-col w-full mx-auto mt-10 border border-gray-200 rounded-lg shadow-md h-full container max-w-[900px] min-h-[500px] bg-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Đơn hàng của tôi</h1>
        <OrderTour />
      </div>
    </div>
  );
};

export default Orders; 