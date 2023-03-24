import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import styles from './styles.module.css';

// menu dropdown item include icon + text
const MenuDropDownItem = ({ handleClick, children, text }) => (
  <MenuItem onClick={handleClick} className={styles.root}>
    {/* children = icon of menu item */}
    <ListItemIcon>{children}</ListItemIcon>
    {text}
  </MenuItem>
);

export default MenuDropDownItem;
