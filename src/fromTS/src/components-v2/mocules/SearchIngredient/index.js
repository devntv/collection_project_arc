import { Box, InputAdornment, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { SEARCHV2_ICON } from 'constants/Images';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import styles from './styles.module.css';

const CloseButton = ({ handleClose }) => <CloseIcon onClick={handleClose} className={styles.iconRemove} />;
const SearchIngredient = ({ value, handleChangeValue, handleClose, placeholder }) => {
  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.target.blur();
    }
  };

  return (
    <Box className={styles.searchContainer}>
      <TextField
        classes={{
          root: styles.root_input,
        }}
        onChange={handleChangeValue}
        value={value}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ImageFallbackStatic src={SEARCHV2_ICON} height="20px" width="20px" />
            </InputAdornment>
          ),
          endAdornment: <InputAdornment position="end">{value ? <CloseButton handleClose={handleClose} /> : ''}</InputAdornment>,
        }}
      />
    </Box>
  );
};

export default SearchIngredient;
