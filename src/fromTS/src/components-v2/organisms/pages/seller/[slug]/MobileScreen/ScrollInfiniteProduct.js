import { Box, Grid } from '@material-ui/core';
import { ProductCardVertical } from 'components-v2/mocules/mobile/CardProduct';
import ProductCardVerticalSkeleton from 'components-v2/mocules/mobile/Skeleton/ProductCardVertical';
import { memo } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './styles.module.css';

const ScrollInfiniteProduct = ({ hasMore, products, handleFetchMore }) => {
  const loader = () => (
    <>
      <Box sx={{ display: 'flex', gap: '15px', padding: '15px' }}>
        <ProductCardVerticalSkeleton />
        <ProductCardVerticalSkeleton />
      </Box>
      <Box sx={{ display: 'flex', gap: '15px', padding: '15px' }}>
        <ProductCardVerticalSkeleton />
        <ProductCardVerticalSkeleton />
      </Box>
      <Box sx={{ display: 'flex', gap: '15px', padding: '15px' }}>
        <ProductCardVerticalSkeleton />
        <ProductCardVerticalSkeleton />
      </Box>
    </>
  );
  const endMessage = products.length > 0 ? 'Bạn đã xem hết sản phẩm' : 'Không có sản phẩm nào';

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={handleFetchMore}
      hasMore={hasMore}
      loader={loader()}
      style={{ overflow: 'hidden' }}
      endMessage={<div style={{ textAlign: 'center', fontFamily: 'ggsm', margin: '10px 0px' }}>{endMessage}</div>}
    >
      <Grid container className={styles.listProductSection} spacing={1}>
        {products?.map((product) => (
          <Grid key={`product-vertical-seller-${product?.slug}`} item xs={6}>
            <ProductCardVertical {...product} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
};

export default memo(ScrollInfiniteProduct);
