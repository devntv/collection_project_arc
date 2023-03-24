import React, { useState } from 'react';
import { Button } from 'components/atoms';
import PrintIcon from '@material-ui/icons/Print';
import PrintInvoiceModal from '../PrintInvoiceModal';

const PrintInvoiceButton = ({ disabled, orderCode, user }) => {
  const [val, setVal] = useState(false);
  const handleChangeVal = () => {
    setVal(!val);
  };
  return (
    <>
      <Button
        startIcon={<PrintIcon />}
        className="my-order__button my-order__button--secondary"
        disabled={disabled}
        onClick={handleChangeVal}
      >
        Xuất hoá đơn
      </Button>
      <PrintInvoiceModal
        visible={val}
        onClose={handleChangeVal}
        orderCode={orderCode}
        user={user}
      />
    </>
  );
};

export default React.memo(PrintInvoiceButton);
