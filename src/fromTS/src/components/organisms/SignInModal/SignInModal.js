import { AuthModal, SignInForm } from 'components/mocules';
import { useAuth, useCart } from 'context';
import React, { useState } from 'react';

const SignInModal = ({ className, visible, onClose, onChangeForget, onChangeSignUp }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogin } = useAuth();
  const { updateCart } = useCart();

  const handleOnClickLogin = (data) => {
    setIsLoading(true);
    //
    handleLogin({
      ...data,
      success: updateCart,
    });
  };
  return (
    <AuthModal visible={visible} className={className} onClose={onClose} title="Đăng nhập Thành viên" width="438">
      <SignInForm width="350" onClickForget={onChangeForget} onClickSignUp={onChangeSignUp} isLoading={isLoading} onClickLogin={handleOnClickLogin} />
    </AuthModal>
  );
};

export default React.memo(SignInModal);
