/* eslint-disable func-names */
import { Input } from '@material-ui/core';
import clsx from 'clsx';
import { memo } from 'react';
import styles from './styles.module.css';

const NewInputProduct = memo(
  ({
    className,
    name,
    searchInput,
    defaultValue,
    onChange = function () {},
    value,
    product,
    disabled = false,
    onBlur = function () {},
    onKeyDown = function () {},
    onFocus = function () {},
    ...restProps
  }) => (
    <Input
      type="text"
      min="0"
      step="1"
      pattern="\d*"
      name={name}
      inputRef={searchInput}
      classes={{
        root: clsx(styles.root_input, className),
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
      onFocus={onFocus}
      {...restProps}
    />
  ),
);

export default NewInputProduct;
