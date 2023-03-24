/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-expressions */
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { memo } from 'react';

import styles from './styles.module.css';

// export function usePrefetchOnHover(prefetch) {
//   const [shouldPrefetch, setShouldPrefetch] = useState(false);
//   if (prefetch === 'onHover') {
//     return {
//       prefetch: shouldPrefetch,
//       onMouseOver: () => setShouldPrefetch(undefined),
//       onFocus: () => setShouldPrefetch(undefined),
//     };
//   }
//   return { prefetch: prefetch ? undefined : prefetch };
// }

function LinkComp({
  className,
  name,
  children,
  href,
  onMouseOver,
  target,
  variant = 'body2',
  prefetch = false,
  stopProp = false,
  removeStyles = false, // make it similar to Link in NextJs
  onClick,
  padding = '',
  color = '',
  ...rest
}) {
  if (stopProp && typeof onClick !== 'function') {
    onClick = (e) => e.stopPropagation();
  }

  return (
    <Link href={href} className={clsx(!removeStyles && styles.mobile_linkRoot)} onMouseOver={onMouseOver} prefetch={prefetch} {...rest}>
      <a
        onClick={onClick}
        style={{ padding, color }}
        className={clsx(!removeStyles && styles.mobile_rootBase, className)}
        target={target && '_blank'}
        href={href}
        {...rest}
      >
        {children}
        {name && <Typography variant={variant}>{name}</Typography>}
      </a>
    </Link>
  );
}
export default memo(LinkComp);
