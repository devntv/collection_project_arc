import { makeStyles, Button, Tooltip } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  default: {
    background: 'transparent',
  },
  btnType: ({ btnType, hover, hoverColor }) => ({
    backgroundColor: theme.palette[btnType]?.main || 'transparent',
    padding: '6px 0px',
    borderRadius: '20px',
    fontFamily: 'googlesansmedium',
    textAlign: 'center',
    '&:hover': {
      backgroundColor: hover ? theme.palette[hover]?.light : 'transparent',
      transition: 'all 0.2s ease-in',
      color: hoverColor || 'unset',
    },
  }),
  startIcon: {
    marginRight: '4px',
    marginBottom: '2px',
  },
  endIcon: {
    marginLeft: '4px',
    marginBottom: '2px',
  },
}));

function ButtonV2({ tooltipTitle = '', children, startIcon, endIcon, className, btnType, hover = false, hoverColor, ...restProps }) {
  const classes = useStyles({ btnType, hover, hoverColor });
  return (
    <Tooltip title={tooltipTitle} disableHoverListener={!tooltipTitle && true} arrow>
      <Button
        className={clsx(classes.btnType, className)}
        classes={{ startIcon: classes.startIcon, endIcon: classes.endIcon }}
        startIcon={startIcon}
        endIcon={endIcon}
        {...restProps}
      >
        {children}
      </Button>
    </Tooltip>
  );
}

export default ButtonV2;
// btnType contain: 'success' , 'warning', 'info', 'error', 'primary', 'secondary'
// hover contain: default is false, true will obey light color with btnType color
