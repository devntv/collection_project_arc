import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from './styles.module.css';

const Container = forwardRef(({ children, className, styleContainer }, ref) => (
  <div ref={ref} className={clsx(styles.root, className)} style={styleContainer}>
    {children}
  </div>
));

export default Container;
