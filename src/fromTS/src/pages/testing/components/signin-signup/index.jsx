import { Button } from '@material-ui/core';
import NewForgetPasswordModal from 'components/organisms/NewForgetPasswordModal';
import NewSignInModal from 'components/organisms/NewSignInModal';
// import { ForgetPasswordModal, SignInModal } from 'components';
import NewSignUpModal from 'components/organisms/NewSignUpModal';
import useModal from 'hooks/useModal';
import React, { useCallback } from 'react';

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
      <NewSignInModal
        className="hello"
        visible={isShowModal}
        onClose={toggle}
        onChangeForget={handleChangeForget}
        onChangeSignUp={handleChangeSignUp}
      />

      <div>
        <Button variant="contained" color="primary" onClick={toggleForgetPassword}>
          Show modal ForgetPassword
        </Button>
      </div>
      <NewForgetPasswordModal visible={isShowModalForgetPassword} onClose={toggleForgetPassword} />
      <div>
        <Button variant="contained" color="secondary" onClick={toggleSignUp}>
          show modal SignUp
        </Button>
        <NewSignUpModal visible={isShowModalSignUp} onClose={toggleSignUp} onChangeSignIn={handleChangeSignIn} />
      </div>
    </>
  );
}
