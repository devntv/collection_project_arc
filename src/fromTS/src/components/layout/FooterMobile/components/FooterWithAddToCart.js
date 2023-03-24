import React, { useRef } from 'react';
import { Button } from '@material-ui/core';
import Link from 'next/link';
import { ProductCardBuy } from 'components/organisms';
import styles from '../styles.module.css';

const FooterWithAddToCart = ({ product }) => {
  const searchInput = useRef([]);

  return (
    <div className={styles.fwc_wrapper}>
      <div className={styles.fwc_container}>
        <div className={styles.addtocartmb}>
          <ProductCardBuy searchInput={searchInput} {...product} product={product} />
        </div>
        <div>
          <Link href="/cart" prefetch={false}>
            <Button classes={{ label: styles.label, outlined: styles.outlined, root: styles.btn_mb }} variant="outlined">
              Xem giỏ hàng
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FooterWithAddToCart);
