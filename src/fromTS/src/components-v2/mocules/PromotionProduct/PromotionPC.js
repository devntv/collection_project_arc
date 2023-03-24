import { Box, Grid, Typography } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';
import { VOUCHER_TITLE_TS_DETAIL } from 'constants/Icons';

import { useEffect, useState } from 'react';
import { Navigation, Pagination, Virtual } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';
import ListPromoGift from '../ListPromoGift';
import styles from './styles.module.css';

function PromotionPC({ loading = false, listsPromo = [], handleOpen, listPromoProduct = [] }) {
  const [, setSwiperRef] = useState(null);
  const [isLoadingListPromo, setIsLoadingListPromo] = useState(true);
  useEffect(() => {
    if (loading) {
      setIsLoadingListPromo(true);
    }
    if (!loading) {
      setTimeout(() => {
        setIsLoadingListPromo(false);
      }, 800);
    }
  }, [loading]);

  if (loading)
    return (
      <span>
        <Skeleton width={260} height={30} />
      </span>
    );

  return listsPromo?.length > 0 ? (
    <>
      <Box className={styles.gift}>
        <VOUCHER_TITLE_TS_DETAIL />
        <Typography className={styles.titleGift}>Quà Tặng</Typography>
        <Typography className={styles.titleDetail} onClick={handleOpen}>
          Xem chi tiết <KeyboardArrowRightIcon style={{ color: '#0E1983', fontSize: '18px', fontWeight: 'bold' }} />
        </Typography>
      </Box>
      {isLoadingListPromo ? (
        <Skeleton width={300} height={64} />
      ) : (
        <Grid container direction="row" className={clsx(styles.wrapPromoList, listPromoProduct?.length > 3 && styles.listSwipperPromo)}>
          <Grid>
            <Swiper onSwiper={setSwiperRef} slidesPerView={3} navigation modules={[Pagination, Navigation, Virtual]}>
              {listPromoProduct?.map((item) => (
                <SwiperSlide>
                  <ListPromoGift
                    key={uuidv4()}
                    slugProduct={item.slug}
                    link={`/product/${item?.slug || ''}`}
                    srcImagesProxy={item?.imagesProxy}
                    width={48}
                    height={48}
                    imageName={item.name}
                    lengthList={listPromoProduct.length}
                    name={item.name}
                  />
                  <span slot="wrapper-end" className={clsx(styles.plus, listPromoProduct?.length <= 3 && styles.listResize)}>
                    +
                  </span>
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
        </Grid>
      )}
    </>
  ) : (
    ''
  );
}

export default PromotionPC;
