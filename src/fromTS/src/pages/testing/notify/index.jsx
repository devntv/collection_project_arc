import React from 'react';
import { Button } from 'components';
import { NotifyUtils } from 'utils';

const TestingNotify = () => {
  //   const [isShowSnackbar, setIsShowSnackbar] = useModal();
  const handleShowPopup = () => {
    NotifyUtils.info('hello');
  };
  return (
    <>
      <Button onClick={handleShowPopup}>Show Snack bar</Button>
    </>
  );
};

export default TestingNotify;
