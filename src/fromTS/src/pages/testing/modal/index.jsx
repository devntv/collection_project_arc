import React, { useCallback } from 'react';

import { SignInModal, ForgetPasswordModal, SignUpModal } from 'components';
import { Button } from '@material-ui/core';
import useModal from 'hooks/useModal';

export default function ModalTest() {
  const [isShowModal, toggle] = useModal();
  const [isShowModalForgetPassword, toggleForgetPassword] = useModal();
  const [isShowModalSignUp, toggleSignUp] = useModal();

  const handleChangeForget = useCallback(() => {
    toggle();
    toggleForgetPassword();
  }, [toggle, toggleForgetPassword]);

  const handleChangeSignUp = useCallback(() => {
    toggle();
    toggleSignUp();
  }, [toggle, toggleSignUp]);

  const handleChangeSignIn = useCallback(() => {
    toggleSignUp();
    toggle();
  }, [toggleSignUp, toggle]);

  return (
    <>
      <div>
        <Button variant="contained" color="primary" onClick={toggle} onClose={toggle}>
          Show modal Login
        </Button>
      </div>
      <SignInModal
        className="hello"
        visible={isShowModal}
        onClose={toggle}
        onChangeForget={handleChangeForget}
        onChangeSignUp={handleChangeSignUp}
      >
        <div>
          <title>title</title>
          <body>heelloo</body>
        </div>
      </SignInModal>
      <div>
        <Button variant="contained" color="primary" onClick={toggleForgetPassword}>
          Show modal ForgetPassword
        </Button>
      </div>
      <ForgetPasswordModal visible={isShowModalForgetPassword} onClose={toggleForgetPassword} />
      <div>
        <Button variant="contained" color="secondary" onClick={toggleSignUp}>
          show modal SignUp
        </Button>
        <SignUpModal
          visible={isShowModalSignUp}
          onClose={toggleSignUp}
          onChangeSignIn={handleChangeSignIn}
        />
      </div>
    </>
  );
}
