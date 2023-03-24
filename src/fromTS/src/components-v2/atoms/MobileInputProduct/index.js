/* eslint-disable func-names */
import { Input } from '@material-ui/core';
import clsx from 'clsx';
import styles from './styles.module.css';

const MobileInputProduct = ({
  className,
  rootClass,
  name,
  searchInput,
  defaultValue,
  key,
  type = 'text',
  onChange = function () {},
  value,
  product,
  disabled = false,
  onBlur = function () {},
  onKeyDown = function () {},
  // eslint-disable-next-line no-unused-vars
  id = '', // tách property id khỏi rest
  ...rest
}) => (
  <Input
    type={type}
    min="0"
    step="1"
    pattern="\d*"
    name={name}
    key={key}
    inputRef={searchInput}
    classes={{
      root: clsx(styles.root_input, className, rootClass),
      input: styles.input,
      focused: styles.focus,
    }}
    disableUnderline
    placeholder="0"
    onChange={(e) => onChange(e, product)}
    onBlur={(e) => onBlur(e, product)}
    onKeyDown={(e) => onKeyDown(e, product)}
    value={value}
    defaultValue={defaultValue}
    disabled={disabled}
    {...rest}
  />
);

export default MobileInputProduct;
