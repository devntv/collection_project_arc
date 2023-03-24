import { Grid } from '@material-ui/core';
import { ProductCardVertical } from 'components-v2/mocules/mobile/CardProduct';
import ProductCardVSkeleton from 'components-v2/mocules/mobile/Skeleton/ProductCardVertical';
import { memo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const Loader = () => (
  <>
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <ProductCardVSkeleton />
      </Grid>
      <Grid item xs={6}>
        <ProductCardVSkeleton />
      </Grid>
    </Grid>
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <ProductCardVSkeleton />
      </Grid>
      <Grid item xs={6}>
        <ProductCardVSkeleton />
      </Grid>
    </Grid>
  </>
);

const ProductSection = ({ products, hasMore, fetchMoreProducts, loading = false, endMessage }) => {
  if (loading) {
    return <Loader />;
  }

  return (
    <InfiniteScroll
      style={{ overflow: 'hidden' }}
      dataLength={products.length}
      hasMore={hasMore}
      next={fetchMoreProducts}
      loader={<Loader />}
      endMessage={<p style={{ textAlign: 'center', fontFamily: 'ggsm', fontWeight: '600' }}>{endMessage}</p>}
    >
      <Grid container spacing={1}>
        {products?.map((product) => (
          <Grid key={`product-card-promotion-vertical-${product?.sku}`} item xs={6}>
            <ProductCardVertical isCampaignPage {...product} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
};

export default memo(ProductSection);
