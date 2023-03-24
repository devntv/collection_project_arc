/* eslint-disable jsx-a11y/anchor-is-valid */
import { Breadcrumbs, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import clsx from 'clsx';
import Link from 'next/link';
import styles from './styles.module.css';

export default function NewBreadcrumbs({ breadcrumbs = [] }) {
  const last = breadcrumbs.length > 0 ? breadcrumbs.length - 1 : 0;

  return (
    <>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {breadcrumbs &&
          breadcrumbs.length > 0 &&
          breadcrumbs.map((item, i) =>
            i === last ? (
              <Typography key={item.name} className={clsx(styles.item_breadcrumb, styles.last_breadcrumb)}>
                {item.name}
              </Typography>
            ) : (
              <Link href={item.url} key={item.name}>
                <a className={styles.item_breadcrumb}>{item.name}</a>
              </Link>
            ),
          )}
      </Breadcrumbs>
    </>
  );
}
