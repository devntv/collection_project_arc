import { Avatar, Chip } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

export const CustomServiceWithImg = ({ label, icon }) => <StyledChipWithImg label={label} avatar={<Avatar alt="Natacha" src={icon} />} />;

export const CustomService = ({ label }) => <StyledChip label={label} />;

const StyledChipWithImg = styled(Chip)`
  background-color: #f2f4fd;
  border-radius: 4px;
  color: #09884d;
  height: auto;
  justify-content: center;
  align-items: center;
  .MuiChip-avatar {
    margin-left: 0;
    width: auto;
  }
  .MuiAvatar-img {
    width: 18px;
    height: auto;
    padding-right: 3px;
  }
  .MuiChip-label {
    font-size: 10px;
    padding: 2px 4px;
  }
  @media (min-width: 768px) {
    .MuiChip-label {
      font-size: 12px;
      padding: 2px 8px;
    }
  }
  @media (min-width: 1280px) {
    .MuiChip-label {
      font-size: 11px;
      padding: 2px 4px;
    }
  }
`;

const StyledChip = styled(Chip)`
  width: 25px;
  height: 25px;
  background-color: #f2f4fd;
  border-radius: 50%;
  color: #09884d;
  justify-content: center;
  align-items: center;
  .MuiChip-label {
    font-size: 12px;
    padding: 2px 4px;
  }

  @media (min-width: 1280px) {
    .MuiChip-label {
      font-size: 11px;
      padding: 2px 0px;
    }
  }
`;
