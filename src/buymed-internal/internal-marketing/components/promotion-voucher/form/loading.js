import React from "react";
import PropTypes from "prop-types";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const LoadingPage = (props) => {
  const { isLoading } = props;

  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

LoadingPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default LoadingPage;
