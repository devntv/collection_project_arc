import { Button } from '@material-ui/core';
import { palette } from 'constants/Colors';
import React, { forwardRef } from 'react';
import styled from 'styled-components';

const CustomButton = forwardRef((props, ref) => {
  const { btnType, children, className, suffix, color, backgroundColor, ...rest } = props;
  return (
    <Button className={className} ref={ref} {...rest}>
      {children}
      {suffix}
    </Button>
  );
});

const buttonTypes = ({ theme, backgroundColor, color }) => ({
  primary: {
    color: color || theme.button.color.primary,
    background: backgroundColor || theme.button.background.primary,
  },
  success: {
    color: color || theme.button.color.primary,
    background: backgroundColor || theme.button.background.success,
  },
  warning: {
    color: color || theme.button.color.secondary,
    background: backgroundColor || theme.button.background.warning,
  },
  disabled: {
    background: backgroundColor || theme.button.background.disabled,
    color: '#212529',
  },
  payment: {
    color: '#212529',
    background: '#f9b514',
    borderColor: '#f9b514',
  },
  tags: {
    color: color || '#000',
    background: '#fff',
  },
});

const StyledButton = styled(CustomButton)`
  color: ${({ theme, btnType = 'primary', color, disabled }) => buttonTypes({ theme, color })[disabled ? 'disabled' : btnType].color} !important;
  background-color: ${({ theme, btnType = 'primary', backgroundColor, disabled }) =>
    buttonTypes({ theme, backgroundColor })[disabled ? 'disabled' : btnType].background} !important;

  &.my-order__button {
    border-radius: 20px;
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    width: 9rem;
    margin: 0.25em;
    text-transform: none !important;
    background-color: transparent !important;

    &--secondary {
      color: #212529 !important;
      border: 1px solid #f9b514 !important;
      background-color: #f9b514 !important;
      &:hover {
        background: #fff !important;
      }

      &.Mui-disabled {
        color: #212529 !important;
        opacity: 0.65 !important;
      }
    }

    &--blue {
      border: 1px solid #17a2b8 !important;
      background: #17a2b8 !important;
      color: #fff !important;
      transition: 0.2s;
      &:hover {
        color: #17a2b8 !important;
        background: #fff !important;
      }
    }
    &--orange {
      color: #fff !important;
      background-color: #ff9933 !important;
      border: 1px solid #ff9933 !important;
      &:hover {
        color: #ff9933 !important;
        background-color: #fff !important;
      }
      &.Mui-disabled {
        color: #212529 !important;
        opacity: 0.65 !important;
        background: ${palette.grey.default} !important;
        border: 1px solid ${palette.grey.default} !important;
      }
    }
    &--green {
      color: #fff !important;
      background-color: #00b46e !important;
      border: 1px solid #00b46e !important;
      &:hover {
        color: #00b46e !important;
        background-color: #fff !important;
      }

      &.Mui-disabled {
        color: #212529 !important;
        opacity: 0.65 !important;
        background: ${palette.grey.default} !important;
        border: 1px solid ${palette.grey.default} !important;
      }
    }
  }

  &.promo__button {
    color: #fff !important;
    background-color: #00b46e !important;
    border-color: #00b46e !important;
    text-transform: none !important;
    width: 100%;

    &.Mui-disabled {
      color: #212529 !important;
      opacity: 0.65 !important;
      background: ${palette.grey.default} !important;
      border: 1px solid ${palette.grey.default} !important;
    }
  }

  &.payment_button {
    width: 100%;
    border-radius: 50px !important;
    text-transform: capitalize !important;
    font-size: 16px !important;
    justify-content: center;
    text-transform: unset !important;
    font-weight: 500;
    margin: 10px;
    &.Mui-disabled {
      color: #212529 !important;
      opacity: 0.65 !important;
      background: ${palette.grey.default} !important;
      border: 1px solid ${palette.grey.default} !important;
    }
  }

  &.response__button--upload {
    margin: 15px 0 !important;
    padding: 30px !important;
    width: 100%;
    background: #fff !important;
    color: rgba(0, 0, 0, 0.23) !important;
    border: 1px solid rgba(0, 0, 0, 0.23) !important;
    &.Mui-disabled {
      color: #212529 !important;
      opacity: 0.65 !important;
      background: ${palette.grey.default} !important;
      border: 1px solid ${palette.grey.default} !important;
    }
  }

  &.response__button--send {
    padding: 10px 30px !important;
    color: #fff !important;
    background-color: #007bff !important;
    border-color: #007bff !important;
  }
  &.response__button--send {
    padding: 10px 30px !important;
    color: #fff !important;
    background-color: #007bff !important;
    border-color: #007bff !important;
  }
  &.edit_invoice {
    border: 1px solid #0e1983;
    border-radius: 30px;
    padding: 7px 14px;
    color: #0e1983 !important;
    background-color: #fff !important;
  }
  &.edit_invoice [class*='label'] {
    gap: 8px;
  }
  &.edit_invoice [class*='titleInvoice'] {
    font-family: googlesansregular;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    text-transform: capitalize;
    color: #0e1983;
  }
  &.edit_invoice [class*='titleEndInvoice'] {
    font-family: googlesansregular;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    text-transform: capitalize;
    color: #d4323b;
  }
  &.edit_invoice [class*='titleEndInvoiceBG'] {
    font-family: googlesansregular;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    text-transform: capitalize;
    color: #dcdbdb;
  }
  &.edit_invoice [class*='iconEndInvoice'] {
    font-size: 16px;
    color: #d4323b;
  }
  &.edit_invoice [class*='iconEndInvoiceBG'] {
    font-size: 16px;
    color: #dcdbdb;
  }
  &.edit_invoice [class*='iconEditInvoice'] {
    font-size: 16px;
    width: 16px;
    height: 16px;
  }
  &.view_more {
    color: #0e1983 !important;
    background-color: transparent !important;
    display: flex;
    justify-content: flex-start;
    font-family: googlesansmedium;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    text-transform: capitalize;
    padding: 0 !important;
    margin: 8px 0px;
  }
  &.view_more [class*='label'] {
    gap: 8px;
  }
`;

export default React.memo(StyledButton);

export const ButtonHeader = React.memo(styled(StyledButton)`
  margin-right: 10px !important;
  border-radius: 50px !important;
`);

export const ButtonDefault = styled(StyledButton)`
  padding: 6px 16px;
  border-radius: 8px;
`;

export const ButtonDefaultLogin = styled(StyledButton)`
  padding: 6px 16px;
  border-radius: 8px;
  margin: 15px;
`;

export const ModalButton = styled(Button)`
  border: 1px solid #0cba69;
  border-radius: 100px;
  margin: 10px;
  span {
    padding: 4px 16px;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    font-family: googlesansmedium;
  }
`;
