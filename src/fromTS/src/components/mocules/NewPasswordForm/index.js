import React from 'react';
import styled from 'styled-components';
import NewPasswordForm from './NewPasswordForm';

const styledNewPasswordForm = styled(NewPasswordForm)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .form-forget-password {
    margin-top: 10px;
  }

  .form-control {
    width: ${({ width = 450 }) => width}px;
    margin-bottom: 10px;
  }

  .btnForgetPassword {
    background: linear-gradient(102.04deg, #00b46e 0%, #9ac100 100%);
    height: 50px;
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.08);
    width: 100%;
    padding: 1.5rem;
    border-radius: 50px;
  }
  .action {
    margin-top: 10px;
    max-width: 200px;
    width: 100%;
  }
  .desc {
    font-size: 16px;
    margin: 15px auto;
    max-width: 450px;
  }
  .forget-password {
    width: 100%;
  }
`;

export default React.memo(styledNewPasswordForm);
