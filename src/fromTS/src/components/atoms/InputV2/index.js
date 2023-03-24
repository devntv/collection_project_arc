import { TextField } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStylesTextField = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: '#fcfcfb',
    height: 60,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontSize: '14px',
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
  focused: {},
}));

function CustomTextField(props) {
  const classes = useStylesTextField();

  return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '8px 0',
    border: '1px solid #e2e2e1',
    borderRadius: 8,
    width: '80%',
    '@media screen and (max-width: 767px)': {
      width: '100%',
      marginLeft: 0,
      marginRight: 0,
    },
    '& .MuiInputLabel-asterisk': {
      color: 'red',
    },
    '& .MuiSelect-select': {
      height: 60,
    },
    '& .MuiFilledInput-root': {
      backgroundColor: '#fff',
      height: 60,
      borderRadius: 8,
      '&:focus-within': {
        backgroundColor: '#fff',
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
      '&:before': {
        content: 'unset',
      },
      '&:after': {
        content: 'unset',
      },
    },
  },
}));

const InputV2 = ({ label, id = '', className = null, ...restProps }) => {
  const classes = useStyles();
  return (
    <CustomTextField label={label} className={className ? clsx(classes.root, className) : classes.root} variant="filled" id={id} {...restProps} />
  );
};

export default InputV2;
