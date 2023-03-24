import TextField from '@material-ui/core/TextField';

export default function DatePicker({ label, id, defaultValue, onChange, InputLabelProps = {}, inputProps = {} }) {
  return (
    <TextField
      style={{ margin: '0 15px' }}
      id={id}
      name={id}
      label={label}
      format="dd/MM/yyyy"
      type="date"
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
      }}
      defaultValue={defaultValue}
      onChange={onChange}
      inputProps={inputProps}
    />
  );
}
