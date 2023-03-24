import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import MV2PaginationV2 from 'components-v2/organisms/NewPaginationV2/mobile';
import { AlertRequestLogin } from 'components/mocules';
import ProductCardNew from 'components/mocules/ProductCardNew';
import { palette } from 'constants/Colors';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useMobileV2 from 'zustand-lib/storeMobile';
import { v4 as uuidv4 } from 'uuid';
import MV2LoadingText from '../LoadingText';
import styles from './styles.module.css';

const MV2ProductChildListing = ({
  isAuthenticated,
  mobileProducts,
  searchQuery,
  tagOption,
  drugOption,
  manufacturerOption,
  filterWithOption,
  isHasMore,
  nextFetch,
  handleChangePage,
  isHideFilterInfo = false,
  isInit = false,
}) => {
  const mobileProductScrolling = useMobileV2((state) => state.mobileProductScrolling);
  const formatHeadMessage = () => {
    const HEAD_MESSAGE = ` ${`${tagOption?.code !== '' ? `${tagOption.name} -` : ''}`} ${`${drugOption.code !== '' ? `${drugOption.name} -` : ''}`} ${
      manufacturerOption.code !== '' ? `${manufacturerOption.name} -` : ''
    } ${filterWithOption.code !== '' ? `${filterWithOption.name} -` : ''}`;
    let title = '';
    if (HEAD_MESSAGE.trim().at(-1) === '-') {
      title = HEAD_MESSAGE.trim().slice(0, HEAD_MESSAGE.trim().length - 1);
    } else {
      title = HEAD_MESSAGE.trim();
    }
    return title;
  };
  const LoaderContainer = (
    <div className={clsx(styles.mobile_loader, mobileProducts?.searchProduct.length < 30 && styles.loader_hidden)}>
      <MV2LoadingText />
    </div>
  );
  const END_MESSAGE = (
    <div className={clsx(styles.mobile_endMessage)}>
      {searchQuery ? `Đã xem hết sản phẩm với từ khóa tìm kiếm "${searchQuery}"` : 'Đã xem hết sản phẩm'}
    </div>
  );

  if (isInit) {
    return <MV2LoadingText />;
  }
  return (
    <>
      {mobileProducts?.searchProduct.length > 0 ? (
        <div className={styles.mobileProduct_grid_wrapper}>
          <>
            {isHideFilterInfo && (
              <Typography className={styles.mobile_headMessage}>
                Đang tìm kiếm theo bộ lọc <br /> <span className={styles.mobileFilterOption_name}>{formatHeadMessage()}</span>
              </Typography>
            )}
            {mobileProductScrolling ? (
              <>
                <InfiniteScroll
                  inverse={false}
                  dataLength={mobileProducts?.searchProduct.length}
                  hasMore={isHasMore}
                  loader={LoaderContainer}
                  next={nextFetch}
                  endMessage={END_MESSAGE}
                  className={styles.mobileProduct_list}
                  scrollThreshold={0.6}
                >
                  {mobileProducts?.searchProduct.length !== 0 && (
                    <Grid container>
                      {mobileProducts?.searchProduct.map((item, index) => (
                        <Grid item className={styles.customGrid} xs={6} md={3} key={`item-product-container-${item.slug}-${item.productId}`}>
                          <ProductCardNew
                            product={item}
                            key={`item-product-${item.slug}`}
                            index={index}
                            value={item.quantity || 0}
                            tag
                            category
                            isMobile="true"
                            isHalfProgress
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </InfiniteScroll>
              </>
            ) : (
              <>
                <div className={styles.pagging}>
                  <MV2PaginationV2
                    key={uuidv4()}
                    totalPage={mobileProducts?.totalPage}
                    curPage={mobileProducts?.numPage}
                    handleChange={handleChangePage}
                  />
                </div>
                <Grid container>
                  {mobileProducts?.searchProduct.map((item, index) => (
                    <Grid item className={styles.customGrid} xs={6} md={3} key={`item-product-container-${item.slug}-${item.productId}`}>
                      <ProductCardNew
                        product={item}
                        key={`item-product-${item.slug}`}
                        index={index}
                        value={item.quantity || 0}
                        tag
                        category
                        isMobile="true"
                        isHalfProgress
                      />
                    </Grid>
                  ))}
                </Grid>
                <div className={styles.bottomPagging}>
                  <MV2PaginationV2
                    key={uuidv4()}
                    totalPage={mobileProducts?.totalPage}
                    curPage={mobileProducts?.numPage}
                    handleChange={handleChangePage}
                  />
                </div>
              </>
            )}
          </>
        </div>
      ) : (
        <>
          {!isAuthenticated ? (
            <AlertRequestLogin bgColor={palette.error.lighter} />
          ) : (
            <Typography variant="body1" className={clsx(styles.empty, styles.mobileEmpty)}>
              Không có sản phẩm
            </Typography>
          )}
        </>
      )}
    </>
  );
};

export default React.memo(MV2ProductChildListing);
