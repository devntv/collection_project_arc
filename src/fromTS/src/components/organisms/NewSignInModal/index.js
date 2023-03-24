import { NewAuthModal, NewSignInForm } from 'components/mocules';
import { useAuth, useCart } from 'context';
import React, { useState } from 'react';

const NewSignInModal = ({ className, visible, onClose, onChangeForget, onChangeSignUp }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogin } = useAuth();
  const { updateCart } = useCart();

  const handleOnClickLogin = (data) => {
    setIsLoading(true);
    handleLogin({
      ...data,
      success: updateCart,
      callback: () => {
        setIsLoading(false);
      },
    });
  };
  return (
    <NewAuthModal visible={visible} className={className} onClose={onClose} title="Đăng nhập Thành viên" width="30rem">
      <NewSignInForm onClickForget={onChangeForget} onClickSignUp={onChangeSignUp} onClickLogin={handleOnClickLogin} isLoading={isLoading} />
    </NewAuthModal>
  );
};

export default React.memo(NewSignInModal);
