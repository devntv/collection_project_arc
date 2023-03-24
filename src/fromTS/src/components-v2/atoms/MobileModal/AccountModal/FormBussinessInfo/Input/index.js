import { TextField } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import styles from './styles.module.css';

function CustomTextField(props) {
  const { type, select } = props;
  const useStylesTextField = makeStyles((theme) => ({
    root: {
      overflow: 'hidden',
      borderRadius: 8,
      backgroundColor: '#fcfcfb',
      height: 60,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      fontSize: '14px',
      '& input[id="mobile-input-date"]': {
        '-webkit-appearance': 'none',
      },
      '& input[id="mobile-input-date"]::-webkit-inner-spin-button,  input[id="mobile-input-date"]::-webkit-calendar-picker-indicator': {
        display: 'none',
        '-webkit-appearance': 'none',
      },
      '& ::-webkit-calendar-picker-indicator': {
        display: 'none',
      },
      '&:hover': {
        backgroundColor: '#fff',
      },
      '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
      '& input[id="type"], input[id="businessName"], input[id="legal"], input[id="address"]': {
        padding: '27px 12px 12px!important',
      },
      '& input[type="date"]::-webkit-inner-spin-button, input[type=date]::-webkit-calendar-picker-indicator': {
        '-webkit-appearance': 'none',
        display: 'none',
        visibility: 'hidden',
        opacity: '0',
      },
      '& input[type="date"]::-webkit-date-and-time-value': { textAlign: 'left' },
      '& input': {
        padding: '27px 3% 12px',
        textAlign: 'left',
        height: '60px',
        width: '100%',
      },
      '& select': {
        padding: '27px 10px 12px',
      },
      '& svg': {
        display: 'none',
      },
    },
    focused: {},
  }));
  const classes = useStylesTextField();

  return (
    <>
      <TextField
        InputProps={{
          classes,
          disableUnderline: true,
        }}
        InputLabelProps={{}}
        {...props}
      />
      {(type === 'date' || select) && (
        <span className={styles.mobileIcon}>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.17431 7.15134L0.330274 2.40421C0.110091 2.18966 0 1.92146 0 1.59962C0 1.29566 0.110091 1.0364 0.330274 0.82184C0.550458 0.60728 0.816513 0.5 1.12844 0.5C1.44037 0.5 1.70642 0.60728 1.92661 0.82184L6 4.79119L10.0459 0.82184C10.2661 0.60728 10.5413 0.5 10.8716 0.5C11.1835 0.5 11.4495 0.60728 11.6697 0.82184C11.8899 1.0364 12 1.29566 12 1.59962C12 1.92146 11.8899 2.18966 11.6697 2.40421L6.82569 7.15134C6.6055 7.38378 6.33027 7.5 6 7.5C5.66972 7.5 5.39449 7.38378 5.17431 7.15134Z"
              fill="#C0C0C0"
            />
          </svg>
        </span>
      )}
    </>
  );
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
      position: 'relative',
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
    '& .MuiInputLabel-filled.MuiInputLabel-shrink': {
      transform: theme.isSelect && 'translate(12px, 20px) scale(1)',
    },
    '& .MuiFormLabel-root': {
      lineHeight: '15px',
      color: '#797979',
      fontFamily: 'ggsr',
      fontWeight: 500,
      textTransform: 'capitalize',
      fontSize: '14px',
    },
  },
}));

const MobileInputV2 = ({ label, id = '', className = null, ...restProps }) => {
  const classes = useStyles();
  return (
    <>
      <CustomTextField label={label} className={className ? clsx(classes.root, className) : classes.root} variant="filled" id={id} {...restProps} />
    </>
  );
};

export default MobileInputV2;
