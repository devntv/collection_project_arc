import { NewAuthModal, NewRegisterGuestForm } from 'components/mocules';
import { useAuth, useCart } from 'context';
import React, { useState } from 'react';

const NewRegisterGuestModal = ({ className, visible, onClose }) => {
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
    <NewAuthModal visible={visible} className={className} onClose={onClose} title="Đăng ký dùng thử" width="30rem">
      <NewRegisterGuestForm isLoading={isLoading} onClickRegister={onChangeRegisterGuest} />
    </NewAuthModal>
  );
};

export default React.memo(NewRegisterGuestModal);
