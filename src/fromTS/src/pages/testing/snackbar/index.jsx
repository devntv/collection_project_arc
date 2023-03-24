import React from 'react';
import { Button, SnackBar } from 'components';
import { useModal } from 'hooks';

const TestingSnackbar = () => {
  const [isShowSnackbar, setIsShowSnackbar] = useModal();
  return (
    <>
      <Button onClick={setIsShowSnackbar}>Show Snack bar</Button>
      <SnackBar open={isShowSnackbar}>aaaa bbbbb ccccc ddddd eeee ffff</SnackBar>
    </>
  );
};

export default TestingSnackbar;
