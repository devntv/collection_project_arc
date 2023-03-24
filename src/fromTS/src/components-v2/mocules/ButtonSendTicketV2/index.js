import { Tooltip } from '@material-ui/core';
import clsx from 'clsx';
import { ICON_FEEDBACK_ORDER } from 'constants/Images';
import React from 'react';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import styles from './styles.module.css';

const ButtonSendTicketV2 = ({ order, handleChangeOrderTicket, handleOpenModal, className, isMobile = false, isTablet = false }) => {
  const handleOnClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleChangeOrderTicket(order);
    handleOpenModal();
  };
  return (
    <Tooltip title="Phản hồi" arrow>
      {isMobile || isTablet ? (
        <div className={clsx(className, styles.center_item)}>
          <ImageFallbackStatic onClick={handleOnClick} src={`${ICON_FEEDBACK_ORDER}?size=origin`} width={20} height={20} priority />
        </div>
      ) : (
        <button className={className} onClick={handleOnClick}>
          <ImageFallbackStatic src={`${ICON_FEEDBACK_ORDER}?size=origin`} width={20} height={20} priority />
        </button>
      )}
    </Tooltip>
  );
};

export default React.memo(ButtonSendTicketV2);
