import { Box, Button, Grid, Typography } from '@material-ui/core';
import { LinkComp } from 'components/atoms';
import { settingsNewProducts } from 'constants/data';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styled from 'styled-components';
import TestingProductCardNew from '../product-card';
import styles from './styles.module.css';

const Carousel = styled.div`
  margin: 60px 0;
  background: #ffffff;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  .slick-arrow {
    background: rgba(0, 0, 0, 0.15);
    height: 32px;
    width: 32px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      color: #fff;
    }
  }
  .slick-prev {
    left: -4px;
  }
  .slick-next {
    right: -4px;
  }
  .slick-next::before,
  .slick-prev::before {
    content: '';
  }
  .slick-list {
    margin: 30px 31px 10px 30px;
  }
  .slick-track {
    display: flex;
    overflow: hidden;
  }
  .slick-slide {
    flex: 1;
    height: auto;
    overflow: hidden;
  }

  .slick-slide > div:first-child {
    height: 100%;
  }
`;

const hardcode = {
  categoryCodes: null,
  deal: {
    autoOffSku: true,
    autoOnSkuCombo: true,
    code: '6RAV84FW',
    createdTime: '2021-08-04T13:29:58.186Z',
    dealID: 55893,
    dealType: 'DEAL',
    discountPercent: 10,
    endTime: '2021-08-14T13:28:00Z',
    imageUrls: null,
    lastUpdatedTime: '2021-08-04T13:34:55.265Z',
    maxDiscountValue: 0,
    maxQuantity: 50,
    name: 'COMBO_FIXED_REVENUE_001',
    owner: 'SELLER',
    price: 162000,
    pricingType: 'PERCENTAGE',
    quantity: 0,
    readyTime: '2021-08-04T13:28:00Z',
    sellerCode: 'QWBQ777777',
  },
  dealPrice: 162000,
  defaultImage: 'https://img-proxy.thuocsi.vn/thuocsi-testing/images/2021db8e224f250e8d6f027934ced172',
  description: null,
  displayPrice: 162000,
  documentFiles: [],
  errorMessageProduct: null,
  imageUrls: ['https://storage.googleapis.com/thuocsi-testing/images/2021db8e224f250e8d6f027934ced172'],
  imagesProxy: ['https://img-proxy.thuocsi.vn/thuocsi-testing/images/2021db8e224f250e8d6f027934ced172'],
  ingredientCodes: [],
  ingredients: [],
  isDeal: true,
  isGift: false,
  kind: 'FIXED_PRICE',
  manufacturerCode: '',
  maxQuantity: 50,
  name: 'COMBO_FIXED_REVENUE_001',
  origin: '',
  priority: 3,
  productId: 55892,
  productSkuType: 'COMBO',
  quantity: 0,
  salePrice: 180000,
  seller: { code: 'QWBQ777777', slug: 'qwbq777777-combo_fixed_revenue_001' },
  sellerCode: 'QWBQ777777',
  sku: 'QWBQ777777.4W2FW961',
  skuId: '4W2FW961',
  skus: (2)[({ productID: 55269, quantity: 1, sku: 'QWBQ777777.1EKAXHR2' }, { productID: 55125, quantity: 1, sku: 'QWBQ777777.REKAXHR2' })],
  slug: 'qwbq777777-combo_fixed_revenue_001',
  status: 'NORMAL',
  statusData: null,
  tags: ['V2U1', 'V2U1', 'V2U1', 'V2U1'],
  type: '',
  volume: '1 combo',
  weight: 0,
  unit: 'Hop',
};

// eslint-disable-next-line no-unused-vars
const NewProductSlider = ({ title, icon, products, redirect, isShowButtonSeeMore = true }) => {
  const ref = useRef({});
  const [value, setValue] = React.useState(1);
  const date = false;
  const time = true;
  const fromDate = true;
  const handleClick = (newValue) => {
    setValue(newValue);
  };
  return (
    <Carousel>
      {time ? (
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item xs={7}>
            <Box className={styles.wrapper_title_with_date}>
              {icon}
              <Typography className={styles.title}>{title}</Typography>
              <Box display="flex" flexDirection="row">
                {date && (
                  <>
                    <Box className={styles.wrapper_date}>
                      <Typography className={styles.date}>5 ngay</Typography>
                    </Box>
                    <Box className={styles.colon}>:</Box>
                  </>
                )}
                <Box className={styles.wrapper_time}>
                  <Typography className={styles.time}>05</Typography>
                </Box>
                <Box className={styles.colon}>:</Box>
                <Box className={styles.wrapper_time}>
                  <Typography className={styles.time}>35</Typography>
                </Box>
                <Box className={styles.colon}>:</Box>
                <Box className={styles.wrapper_time}>
                  <Typography className={styles.time}>26</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={5}>
            <Box className={styles.wrapper_buttons}>
              {fromDate ? (
                <Button className={styles.active_fromDate_btn}>
                  Tu &nbsp;<span> 20-1</span>&nbsp; Den &nbsp;<span>30-1</span>
                </Button>
              ) : (
                <>
                  <Button disabled className={styles.deactive_btn}>
                    <span>9H</span>&nbsp;Da dien ra
                  </Button>
                  <Button className={styles.active_btn} onClick={() => handleClick(1)}>
                    <span>20H</span>&nbsp; Dang dien ra
                  </Button>
                  <Button className={styles.will_active_btn} onClick={() => handleClick(2)}>
                    <span>9H</span>&nbsp;Sap dien ra
                  </Button>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box className={styles.wrapper_title}>
          {icon}
          <Typography className={styles.title}>{title}</Typography>
        </Box>
      )}

      {value === 1 && (
        <Slider ref={ref} {...settingsNewProducts}>
          <div>
            <TestingProductCardNew product={hardcode} />
          </div>
          <div>
            <TestingProductCardNew product={hardcode} />
          </div>
          <div>
            <TestingProductCardNew product={hardcode} />
          </div>
          <div>
            <TestingProductCardNew product={hardcode} />
          </div>
          <div>
            <TestingProductCardNew product={hardcode} />
          </div>
          <div>
            <TestingProductCardNew product={hardcode} />
          </div>
        </Slider>
      )}

      {value === 2 && (
        <Slider ref={ref} {...settingsNewProducts}>
          <div>
            <TestingProductCardNew product={hardcode} />
          </div>
          <div>
            <TestingProductCardNew product={hardcode} />
          </div>
          <div>
            <TestingProductCardNew product={hardcode} />
          </div>
          <div>
            <TestingProductCardNew product={hardcode} />
          </div>
          <div>
            <TestingProductCardNew product={hardcode} />
          </div>
          <div>
            <TestingProductCardNew product={hardcode} />
          </div>
        </Slider>
      )}

      {isShowButtonSeeMore && (
        <div className={styles.wrapper_see_all}>
          <LinkComp href={`${redirect}`} className={styles.see_all}>
            Xem tất cả
          </LinkComp>
        </div>
      )}
    </Carousel>
  );
};
export default NewProductSlider;
