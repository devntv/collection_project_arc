import { CardActions, CircularProgress, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import ImageFallback from 'utils/ImageFallback';
import styles from './styles.module.css';

// có 2 cách sử dụng component
// 1. Truyền vào onClick => là Button
// 2. Không truyền vào onClick => là Input

export default function MInput({ leftIcon, placeholder, onClick, value = '', onChange, width = 100, ...restProps }) {
  const { loadingFetch = false, onClear } = restProps;
  const ipRef = useRef();
  const valueOptional = {};
  if (onClick) {
    valueOptional.defaultValue = value;
  } else {
    valueOptional.value = value;
  }
  return (
    <CardActions
      style={{ padding: 0 }}
      className={styles.wrapper}
      onClick={() => {
        if (typeof onClick === 'function') {
          onClick();
          ipRef.current.blur();
        }
      }}
    >
      {leftIcon && (
        <div className={styles.icon}>
          <ImageFallback src={leftIcon} width="16px" height="16px" />{' '}
        </div>
      )}
      <input ref={ipRef} placeholder={placeholder} {...valueOptional} onChange={onChange} style={{ width: `${width}%` }} />
      {loadingFetch && (
        <span className={styles.loadingContainer}>
          <CircularProgress size={15} />
        </span>
      )}
      {!loadingFetch && value !== '' && (
        <IconButton className={styles.clearIcon} onClick={onClear}>
          <ClearIcon className={styles.iconClearText} />
        </IconButton>
      )}
    </CardActions>
  );
}

MInput.propTypes = {
  leftIcon: PropTypes.any,
  placeholder: PropTypes.string,
};
