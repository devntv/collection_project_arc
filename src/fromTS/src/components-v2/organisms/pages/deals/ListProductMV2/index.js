import { Grid } from '@material-ui/core';
import { getData } from 'clients';
import { ProductCardVertical } from 'components-v2/mocules/mobile/CardProduct';
import ProductCardVerticalSkeleton from 'components-v2/mocules/mobile/Skeleton/ProductCardVertical';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProductServiceV2 } from 'services';
import productsWithPriority from '../productsWithPriority';

const ListProductMV2 = () => {
  const [page, setPage] = useState(1);
  const [listProduct, setListProduct] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await ProductServiceV2.getDealsClient({ query: {page} });
      const products = getData(res);
      if (products.length > 0) {
        const productsPriority = productsWithPriority(products);
        setListProduct([...listProduct, ...productsPriority]);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    })();
  }, [page]);

  const handleChangeNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const Loader = () => (
    <Grid container spacing={1}>
      <Grid item xs={6} sm={4} md={3} lg={3} xl={2}>
        <ProductCardVerticalSkeleton />
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={3} xl={2}>
        <ProductCardVerticalSkeleton />
      </Grid>
    </Grid>
  );

  return (
    <InfiniteScroll
      hasMore={hasMore}
      next={handleChangeNextPage}
      dataLength={listProduct?.length}
      loader={<Loader />}
      style={{ overflow: 'hidden !important' }}
      endMessage={<h3 style={{ textAlign: 'center' }}>Bạn đã xem hết sản phẩm khuyến mãi</h3>}
    >
      <div>
        <Grid container spacing={1}>
          {listProduct.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid key={`products-${index}`} item xs={6} sm={4} md={3} lg={3} xl={2}>
              <ProductCardVertical {...item} isCampaignPage />
            </Grid>
          ))}
        </Grid>
      </div>
    </InfiniteScroll>
  );
};

export default ListProductMV2;
