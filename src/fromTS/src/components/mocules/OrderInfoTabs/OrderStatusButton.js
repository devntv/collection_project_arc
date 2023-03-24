import { ENUM_ORDER_STATUS_LABEL, ENUM_ORDER_STATUS_COLOR } from 'constants/Enums';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  text-transform: none !important;
  padding: 0px 5px !important;
  font-size: 18px !important;
  color: white !important;
  &.btn--default {
    background-color: #919aa3 !important;
  }
  &.btn--delivery {
    background-color: yellow !important;
    color: #919aa3 !important;
  }
  &.btn--delivered {
    background-color: #2e9afe !important;
  }
  &.btn--complete {
    background-color: #00c9a7 !important;
  }

  &.btn--cancel {
    background-color: #c34a36 !important;
  }
`;

const OrderStatusButton = ({ className, status, handleSetOrderStatus }) => (
  <StyledButton variant="contained" className={`${className} ${ENUM_ORDER_STATUS_COLOR[status]}`} onClick={() => handleSetOrderStatus(status)}>
    {ENUM_ORDER_STATUS_LABEL[status]}
  </StyledButton>
);

export default OrderStatusButton;
