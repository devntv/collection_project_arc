import React from 'react';
import { Card, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    backgroundColor: 'rgb(14, 90, 48) !important',
    borderRadius: '10px',
    color: 'white',
    padding: '5px',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function Tag(props) {
  const { name } = props;
  const classes = useStyles();
  return <Card className={classes.root}>{name}</Card>;
}

export default React.memo(Tag);
