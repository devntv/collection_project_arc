import React from 'react';
import styled from 'styled-components';
import SignUpFormCustom from './SignUpForm';

const SignUpForm = styled(SignUpFormCustom)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .form-control {
    width: 100%;
  }
  .agree-term {
    align-self: flex-start;
    font-size: 13px;
  }
  a.forgetPassword {
    color: #00b46e;
    text-decoration: none;
    background-color: transparent;
  }
  .btn-register {
    background: linear-gradient(102.04deg, #00b46e 0%, #9ac100 100%);
    color: white;
    height: 50px;
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.08);
    width: 100%;
    padding: 1.5rem;
    margin: 1rem;
    border-radius: 50px;
  }
  .link-login {
    padding: 1rem;
  }
`;

export default React.memo(SignUpForm);
