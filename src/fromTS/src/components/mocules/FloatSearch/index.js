import React from 'react';
import { Grid, Fab } from '@material-ui/core';
import { Input } from 'components/atoms';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import styles from './styles.module.css';

const IngredientInput = ({ className, ...rest }) => <Input className={className} {...rest} />;

const StyledIngredientInput = styled(IngredientInput)`
  cursor: pointer;
  padding: 10px 10px;
  width: 275px;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  border: none;
  color: #919aa3;
  z-index: 1;
  height: 45px !important;
  transition: width 1s, background-color 0.3s;
  &.Mui-focused {
    width: 350px;
    background: rgba(255, 255, 255, 0.9);
    z-index: 4;
    transition: width 1s, background-color 0.3s;
    outline: none;
  }
`;

const StyledFab = styled(Fab)`
  background: #00b46e;
  color: white;
  &:hover {
    background: white;
    color: #00b46e;
  }
`;

const CloseButton = ({ handleClose }) => <CloseIcon onClick={handleClose} />;
const FloatSearch = ({ value, handleChangeValue, handleClose, placeholder }) => {
  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.target.blur();
    }
  };

  return (
    <Grid className={styles.searchBox} container spacing={0} alignItems="baseline" justifyContent="center">
      <Grid item>
        <StyledIngredientInput
          placeholder={placeholder}
          value={value}
          onChange={handleChangeValue}
          onKeyPress={handleKeyPress}
          endAdornment={value ? <CloseButton handleClose={handleClose} /> : null}
          className={styles.searchInput}
        />
      </Grid>
      <Grid item>
        <StyledFab size="medium">
          <SearchIcon />
        </StyledFab>
      </Grid>
    </Grid>
  );
};

export default FloatSearch;
