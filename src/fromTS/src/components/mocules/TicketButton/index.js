import InsertCommentIcon from '@material-ui/icons/InsertComment';
import { Button } from 'components/atoms';
import React from 'react';

const TicketButton = ({ order, handleChangeOrderTicket, handleOpenModal }) => {
  const handleOnClick = () => {
    handleChangeOrderTicket(order);
    handleOpenModal();
  };
  return (
    <Button startIcon={<InsertCommentIcon />} className="my-order__button my-order__button--blue" onClick={handleOnClick}>
      Gửi phản hồi
    </Button>
  );
};

export default React.memo(TicketButton);
