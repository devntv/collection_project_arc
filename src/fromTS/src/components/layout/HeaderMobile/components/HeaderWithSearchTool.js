import React, { memo } from 'react';
import { IconButton } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import styles from '../styles.module.css';

const HeaderWithSearchTool = memo(() => (
  <div className={styles.searchTool}>
    <div className={styles.search_input} />
    <IconButton className={styles.icon} aria-label="search">
      <Search />
    </IconButton>
  </div>
));

export default HeaderWithSearchTool;
