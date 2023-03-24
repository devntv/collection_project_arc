import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { InfoTabs } from 'components/mocules';
import styles from './styles.module.css';

const useStyles = makeStyles(() => ({
  tabRoot: {
    width: '100%',
    height: '40px!important',
    padding: '0',
    minHeight: '40px!important',
  },
  tabSelected: {
    color: '#00b46e',
  },
  root: {
    flexGrow: 1,
    backgroundColor: 'inherit',
    display: 'flex',
    padding: '50px 0',
  },
  tabs: {
    width: '35%',
  },
  indicator: {
    display: 'none',
  },
  tabWrapper: {
    '& > span': {
      display: 'flex',
      flexDirection: 'row!important',
      justifyContent: 'flex-start',
      height: '40px',

      '& > svg': {
        marginRight: '10px',
      },
    },
    textTransform: 'none!important',
  },
}));

export default function InfoContainer({ children, value, title, balance, name, isMobile }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <InfoTabs value={value} balance={balance} name={name} />

      <div className={styles.grid_wapper}>
        {!isMobile && (
          <Grid item xs={12}>
            <div className={styles.title}>{title}</div>
          </Grid>
        )}
        <Grid container direction="column" value={value} spacing={1}>
          {children}
        </Grid>
      </div>
    </div>
  );
}
