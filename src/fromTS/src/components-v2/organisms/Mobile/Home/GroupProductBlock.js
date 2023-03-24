import { Button } from '@material-ui/core';
import { getData } from 'clients';
import Container from 'components-v2/atoms/Mobile/Container';
import { ProductCardVertical } from 'components-v2/mocules/mobile/CardProduct';
import ProductPreview from 'components-v2/mocules/mobile/SliderMobile/ProductPreview';
import { LinkComp } from 'components/atoms';
import { MAP_BTN_TITLE_BY_REDIRECT_URL } from 'constants/data';
import { useCart, useProduct } from 'context';
import PropTypes from 'prop-types';
import { memo, useEffect, useState } from 'react';
import { TAG_NEW } from 'sysconfig';
import { gtag } from 'utils';
import styles from './styles.module.css';

const GroupProductBlock = ({ icon, name, type, redirectUrl, provinceCode }) => {
  const { filterProductByTag } = useProduct();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { mapDataProduct } = useCart();

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      setLoading(true);
      let products = [];
      switch (type) {
        case 'BANCHAY':
          products = await filterProductByTag({ filter: { tag: 'BANCHAY' }, getPrice: true, limit: 20 });
          break;
        case TAG_NEW:
          products = await filterProductByTag({ filter: { tag: TAG_NEW }, getPrice: true, limit: 20 });
          break;
        case 'DEALS':
          products = await filterProductByTag({ getDealOnly: true, getPrice: true, limit: 20 });
          break;
        case 'MEGA-SALE':
          products = await filterProductByTag({ filter: { tags: ['DOCQUYENGIATOT', `PROVINCE_${provinceCode}`] } });
          // products = { ...products, data: getData(products)?.filter(item => item)?.map((child) => ({ ...(child || {}), isExclusive: true })) }; // temporary hidden, wait to create new source tracking for this line product
          break;
        default:
      }
      const dataMapQuantity = mapDataProduct(getData(products));
      setData(dataMapQuantity);
      setLoading(false);
    })();
    return () => {
      abortController.abort();
    };
  }, []);
  const ListProducts = data?.map((prd) => {
    const styleContainer = { margin: '5px' }; // spacing giữa 2 product
    return (
      <ProductCardVertical
        isCampaignPage
        key={`product-item-${prd.slug}`}
        {...prd}
        isHalfProgress={type === 'DEALS'}
        styleContainer={styleContainer}
      />
    );
  });

  // Incase MageSale, will hide if section don't have product
  if (type === 'MEGA-SALE' && ListProducts.length === 0) {
    return <></>;
  }

  return (
    <div style={{ backgroundColor: 'white', padding: '20px 3px' }}>
      <Container>
        <div className={styles.headerProduct}>
          <div className={styles.headerProductTitle}>
            {icon}
            <strong className={`${styles.textHeader} lineLimit1`}>{name}</strong>
          </div>
        </div>
      </Container>
      <div style={{ margin: '0px 8px' }}>
        <ProductPreview slideItems={ListProducts} isLoading={loading} />
      </div>
      <Button
        className={styles.mobileWrapperLink}
        onClick={() => {
          gtag.clickViewAllPromotion(redirectUrl);
        }}
      >
        <LinkComp href={redirectUrl} className={styles.viewMore}>
          {MAP_BTN_TITLE_BY_REDIRECT_URL[redirectUrl] || 'Xem tất cả'}
        </LinkComp>
      </Button>
    </div>
  );
};

GroupProductBlock.propTypes = {
  icon: PropTypes.node,
  name: PropTypes.string,
  type: PropTypes.string,
};

export default memo(GroupProductBlock);
