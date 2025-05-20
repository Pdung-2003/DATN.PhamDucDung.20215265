import TextField from '@/components/common/TextFieldControl';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { authService } from '@/services';

const ForgotPasswordForm = ({ onSuccess }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: INIT_VALUES,
  });

  const onSubmit = async (data) => {
    try {
      const response = await authService.forgotPassword(data);
      if (response?.code === 1000) {
        toast.success('Vui lòng kiểm tra email của bạn để đặt lại mật khẩu');
        onSuccess?.();
        reset(INIT_VALUES);
      } else {
        toast.error(response?.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <TextField
          label="Email"
          rules={{
            required: 'Vui lòng nhập email',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Email không hợp lệ',
            },
          }}
          control={control}
          name="email"
          placeholder="Email"
        />
      </div>
      <button type="submit" className="btn-primary">
        Gửi yêu cầu
      </button>
    </form>
  );
};

export default ForgotPasswordForm;

const INIT_VALUES = {
  email: '',
}; 