import { AuthModal, RegisterGuestForm } from 'components/mocules';
import { useAuth, useCart } from 'context';
import React, { useState } from 'react';

const RegisterGuestModal = ({ className, visible, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleRegisterGuest } = useAuth();
  const { updateCart } = useCart();

  const onChangeRegisterGuest = (data) => {
    setIsLoading(true);
    handleRegisterGuest({
      ...data,
      success: updateCart,
    });
  };
  return (
    <AuthModal visible={visible} className={className} onClose={onClose} title="Đăng ký dùng thử" width="438">
      <RegisterGuestForm width="350" isLoading={isLoading} onClickRegister={onChangeRegisterGuest} />
    </AuthModal>
  );
};

export default React.memo(RegisterGuestModal);
