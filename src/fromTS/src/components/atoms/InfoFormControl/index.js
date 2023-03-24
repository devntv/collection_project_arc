import { FormControl, FormHelperText, Grid, InputLabel } from '@material-ui/core';
import styles from './styles.module.css';

const InfoFormControl = ({ xs, md, isRequired, children, label, htmlFor, error }) => (
  <Grid className="info_form_grid" item xs={xs} md={md}>
    <FormControl className={styles.form_control}>
      <InputLabel shrink htmlFor={htmlFor} className={styles.input_label}>
        {label} {isRequired ? <span className={styles.required}> * </span> : <></>}
      </InputLabel>
      {children}
      {error && <FormHelperText className={styles.error}>{error}</FormHelperText>}
    </FormControl>
  </Grid>
);

export default InfoFormControl;
