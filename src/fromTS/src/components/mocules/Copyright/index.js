import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import getConfig from 'next/config';
import { ENV } from 'sysconfig';

const { publicRuntimeConfig } = getConfig();

const useStyle = makeStyles({
  root: {
    height: '56px',
    padding: '15px',
  },
});

const Copyright = () => {
  const classes = useStyle();
  const version = publicRuntimeConfig.buildId;

  return (
    <div className={classes.root}>
      <Typography variant="body2" color="textSecondary" align="center">
        © Bản quyền thuộc Công Ty TNHH Buymed - {ENV === 'prd' ? new Date().getFullYear() : version}
      </Typography>
    </div>
  );
};

export default React.memo(Copyright);
