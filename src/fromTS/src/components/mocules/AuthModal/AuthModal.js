import React, { memo } from 'react';
import { Modal } from 'components/atoms';
import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const AuthModal = memo((props) => {
  const { onClose, visible, children, title, className, restProps } = props;

  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className="auth-modal-content">
        <div className="auth-modal-header">
          <header className="auth-modal-title">{title}</header>
          <IconButton aria-label="close" className="auth-modal-close" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        </div>
        <div className="auth-modal-body">{children}</div>
      </div>
    </Modal>
  );
});

export default AuthModal;
