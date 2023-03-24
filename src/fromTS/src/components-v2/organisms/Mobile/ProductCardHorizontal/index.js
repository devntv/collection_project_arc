import { Card } from '@material-ui/core';
import clsx from 'clsx';
import ProductCardContent from 'components/mocules/ProductCardContent';
import { ProductCardBuy } from 'components/organisms';
import { memo, useRef } from 'react';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

// clone ProductCardHorizontal => restyle lại cho  mobile v2

const ProductCardHorizontal = ({ product, isMobile, type, index, wishlist = false, handleDelete }) => {
  const searchInput = useRef([]);
  const { isDeal } = product || {};
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  return (
    <div
      className={clsx({
        [styles.button_container]: true,
        [styles.button_container_mv2]: isMobileV2,
      })}
    >
      <div className={clsx(isMobileV2 ? styles.root_card_v2 : styles.root_card)}>
        <Card className={clsx(styles.product_card, isDeal ? styles.isdeal : '', isMobileV2 && styles.product_card_mv2)}>
          <div className={isMobileV2 ? styles.mobileRight_box : styles.rightBox}>
            <ProductCardContent mobileV2Horizontal tag cate isMobileV2={isMobileV2} {...product} product={product} isMobile={isMobile} />
            <ProductCardBuy
              searchInput={searchInput}
              index={index}
              {...product}
              product={product}
              type={type}
              wishlist={wishlist}
              handleDelete={handleDelete}
              isMobileV2={isMobileV2}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default memo(ProductCardHorizontal);
