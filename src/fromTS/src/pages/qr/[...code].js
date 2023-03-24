/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, Container, Divider, Grid, Tab, TextField, Typography } from '@material-ui/core';
import { LocalMallOutlined } from '@material-ui/icons';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { getData, getFirst, isValid, WishlistClient } from 'clients';
import QrCodeClient from 'clients/QrCodeClient';
import { Button as CustomButton, ButtonDefault, LinkComp } from 'components/atoms';
import NewTemplate from 'components/newlayout/template';
import { tabsProductData } from 'constants/data/index';
import { BRAND_NAME } from 'constants/Enums';
import { CATEGORIES, getPathProductBySlug, INGREDIENT, MANUFACTURERS } from 'constants/Paths';
import { useAuth, useCart, useSetting } from 'context';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { ProductServiceV2 } from 'services';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { QR_CODE_DOMAIN } from 'sysconfig';
import { formatCurrency } from 'utils/FormatNumber';
import NotifyUtils from 'utils/NotifyUtils';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

// tag product detail contain: giao hang nhanh,  freeship,...
// const CustomService = ({ children, src = '' }) => (
//   <Box className={styles.Wrapservice}>
//     <Box className={styles.serviceInfor}>
//       <img src={src} alt={src} />
//       {children}
//     </Box>
//   </Box>
// );

// Đây là server side ( tên nó nói lên tất cả )
// mọi page đều phải có getServerSideProps

const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false,
});
// TODO: translate
export async function getServerSideProps(ctx) {
  // path sẽ là thuocsi.vn/qr/[code]
  // đặt tên file là [code].js thì ta sẽ lấy dc code từ query
  const { code } = ctx.query;
  // data qrCode đây
  const qrCodeRes = await QrCodeClient.getInfoQrCode({ ctx, code });
  const qrCodeData = getFirst(qrCodeRes);
  // NotifyUtils.error('Không tìm thấy sản phẩm. Hãy liên hệ chúng tôi để hỏi thêm về sản phẩm này.');

  if (qrCodeData) {
    const { productId } = qrCodeData;

    const [productRes, productDescriptionRes, allSkuResult] = await Promise.all([
      ProductServiceV2.getProductsByIds({ ids: [productId], isBasic: true }),
      ProductServiceV2.getDescriptionByProductId({ ctx, productId, isBasic: true }),
      WishlistClient.getListSkuByProductId({ ctx, productIds: [productId].join() }),
    ]);

    const allSku = getData(allSkuResult);
    const skuListResult = await ProductServiceV2.getProductInfoFromSkus({ ctx, skus: allSku });

    if (isValid(skuListResult)) {
      qrCodeData.productInfo = skuListResult.data.find((item) => item?.sellerCode === qrCodeData?.sellerCode);
    } else if (isValid(productRes)) {
      const productInfo = getFirst(productRes);
      qrCodeData.productInfo = productInfo;
    }
    if (isValid(productDescriptionRes)) {
      qrCodeData.description = getFirst(productDescriptionRes);
    }
  }

  // return về cho page ProductScanner nhận dc
  return {
    props: {
      qrCodeData,
      code,
    },
  };
}

const previewStyle = {
  height: 240,
  width: 320,
};

// img slider settingss
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

// page product scanner ( là client side )
// props chứa qrCodeData ở phía trên truyền xuống
export default function ProductScannerQR(props) {
  const { qrCodeData, code } = props;
  const router = useRouter();
  if (!qrCodeData) {
    NotifyUtils.error(`${BRAND_NAME} không tìm thấy thông tin mã QR. Xin vui lòng kiểm tra lại.`);
    router.push('/qr/');
    return null;
  }
  const { mapManufactuers, mapIngredientsById, mapIngredientsProduct = null, mapIngredients = null, mapCategories, getNameSeller } = useSetting();
  const { isAuthenticated, toggleLogin } = useAuth();
  const { updateCartItem, updateCart } = useCart();
  const loadData = useCallback(() => {
    Router.push(`/qr/${code}`);
  });

  useEffect(() => {
    loadData();
  }, [isAuthenticated]);

  const { cartItems } = useCart();
  const quantityProduct =
    cartItems?.find((item) => item?.sellerCode === qrCodeData?.productInfo?.sellerCode && item?.productId === qrCodeData?.productId)?.quantity || 0;

  const sellerInfo = getNameSeller({ seller: { code: qrCodeData?.sellerCode, tags: qrCodeData?.productInfo?.tags || [] } });

  const [scanResultWebcam, setScanResultWebcam] = useState(code);
  const [errorQrCode, setErrorQrCode] = useState('');
  const handleErrorWebcam = (error) => {
    NotifyUtils.error(error);
  };

  const handleScanWebcam = (data) => {
    if (data) {
      if (data.match(QR_CODE_DOMAIN)) {
        setScanResultWebcam(data.replace(QR_CODE_DOMAIN, ''));
      } else {
        setErrorQrCode(`* Hệ thống chỉ hỗ trợ quét mã QR Code của ${BRAND_NAME}. Cảm ơn bạn.`);
      }
    }
  };

  const routeToPathCode = () => {
    const inputCode = document.getElementById('orderCode').value;
    router.push(`/qr/${inputCode}`);
  };
  // manu
  const manufacturer = mapManufactuers?.get(qrCodeData?.productInfo?.manufacturerCode) || '';

  // ingredients
  const { description = {}, ingredientCodes = [], productInfo } = qrCodeData || {};
  const { ingredients = [], categoryCodes } = productInfo || {};
  let ingredientValue = null;

  ingredientValue =
    ingredientCodes &&
    ingredientCodes?.map((ingredientCode, index) => {
      const { name: ingredientName, ingredientId = null } = mapIngredientsProduct?.get(ingredientCode) || {};
      const ingredientInfo = mapIngredientsById.get(ingredientId) || {};
      const isDisplayLinkIngredient = ingredientInfo && ingredientInfo.slug;

      if (isDisplayLinkIngredient) {
        return (
          <>
            <span>
              <LinkComp className={styles.text_capitalize} style={{ padding: '0px' }} href={`${INGREDIENT}/${ingredientInfo?.slug || ''}`}>
                {ingredientName}
                {index !== ingredientCodes.length - 1 && <span>,&nbsp;</span>}
              </LinkComp>
            </span>
          </>
        );
      }
      return (
        <>
          {ingredientName}
          {index !== ingredientCodes.length - 1 && <span>,&nbsp;</span>}
        </>
      );
    });

  if (!ingredientValue) {
    ingredientValue =
      ingredients &&
      ingredients?.map(({ ingredientCode, volume: ingredientVolume }) => {
        const { slug, name: ingredientName = '' } = mapIngredients?.get(ingredientCode) || {};
        return (
          <Box className={styles.ingredient} key={uuidv4()}>
            <LinkComp className={styles.ingredientName} href={`${INGREDIENT}/${slug}`}>
              {ingredientName}
            </LinkComp>
            <Typography align="left">{ingredientVolume}</Typography>
          </Box>
        );
      });
  }

  // tab infor
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabDataPanel = tabsProductData?.filter((item) => item.value === value)[0] || {};
  const descriptionValue = description && description[tabDataPanel.code];

  // thêm sản phẩm vào giỏ hàng
  const updateCartInItem = async (isReload = true) => {
    if (quantityProduct === 0) {
      await updateCartItem({ product: qrCodeData?.productInfo, q: 1 }, isReload);
      await updateCart();
    } else {
      NotifyUtils.error('Sản phẩm đã có trong giỏ hàng');
    }
  };

  const qrPermission = (
    <Container className={styles['permission-container']}>
      <Grid container justifyContent="center" spacing={2} style={{ marginTop: '30px' }}>
        <Grid item>
          <TextField variant="outlined" placeholder={scanResultWebcam} id="orderCode" name="orderCode" autoFocus>
            {scanResultWebcam}
          </TextField>
        </Grid>
        <Grid item>
          <Button className={styles.scan} onClick={routeToPathCode}>
            Tra cứu thông tin
          </Button>
        </Grid>
        {/* <Grid className={styles.serviceInfor}>
          <Button className={styles.scan} onClick={allowScan}>
            Quét mã QR
          </Button>
        </Grid> */}
      </Grid>
      <Grid container justifyContent="center">
        <Grid>{errorQrCode && <p className={styles.error}>{errorQrCode}</p>}</Grid>
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: '30px' }}>
        <Grid>
          <QrReader delay={10} style={previewStyle} onError={handleErrorWebcam} onScan={handleScanWebcam} />
        </Grid>
      </Grid>
    </Container>
  );

  const qrInformation = (
    <Box className={styles.wrapContainer}>
      <Container style={{ maxWidth: '1028px' }}>
        <Box className={styles.wrapInfor}>
          <Typography align="center" className={styles.title}>
            Thông tin
          </Typography>
          <Grid container justifyContent="center" spacing={4} style={{ padding: '20px' }}>
            <Grid item xs={12} md={4} className={`${styles.wrapProduct} product-scanner`}>
              <>
                <Slider {...settings}>
                  {qrCodeData?.productInfo?.imageUrls.map((item) => (
                    <Box className={styles.productImg} key={uuidv4()}>
                      <Image width="224px" height="224px" src={item} />
                    </Box>
                  ))}
                </Slider>
              </>
            </Grid>
            <Grid item md={7} className={styles.proudctInfor}>
              <LinkComp className={styles.titleProduct} href={getPathProductBySlug(qrCodeData?.productInfo?.slug)}>
                {qrCodeData?.productInfo?.name}
              </LinkComp>
              <Typography variant="subtitle2" className={styles.titleInfor}>
                {qrCodeData?.productInfo?.unit}
              </Typography>
              {/* <Box className={styles.inforIngredient}>
                {qrCodeData?.productInfo?.categoryCodes?.map((item) => (
                  <Typography key={uuidv4()} style={{ marginRight: '16px' }}>
                    {item}
                  </Typography>
                ))}
              </Box> */}
              {/* tag here -> off tag service so without API */}
              {/* <Box className={styles.Service}>
                <CustomService src={QUICK_BILL_ICON}>Hóa đơn nhanh</CustomService>
                <CustomService src={FREESHIP_ICON}>FreeShip</CustomService>
                <CustomService src={QUICK_ORDER_ICON}>Giao nhanh</CustomService>
              </Box> */}
              <Box className={styles.WrapGenInfor}>
                <Grid container justifyContent="center" alignItems="center" spacing={1}>
                  <Grid item xs={6} sm={4} className={styles.genInfor}>
                    Số lô:
                  </Grid>
                  <Grid item xs={6} sm={8} className={styles.genInforValue}>
                    {qrCodeData?.lot}
                  </Grid>
                  <Grid item xs={6} sm={4} className={styles.genInfor}>
                    Hạn sử dụng:
                  </Grid>
                  <Grid item xs={6} sm={8} className={styles.genInforValue}>
                    {qrCodeData?.expiredDate}
                  </Grid>
                  <Grid item xs={6} sm={4} className={styles.genInfor}>
                    Khối lượng:
                  </Grid>
                  <Grid item xs={6} sm={8} className={styles.genInforValue}>
                    {qrCodeData?.productInfo?.volume}
                  </Grid>
                  <Grid item xs={6} sm={4} className={styles.genInfor}>
                    Xuất xứ:
                  </Grid>
                  <Grid item xs={6} sm={8} className={styles.genInforValue}>
                    {qrCodeData?.productInfo?.origin}
                  </Grid>
                  <Grid item xs={6} sm={4} className={styles.genInfor}>
                    Nhà sản xuất:
                  </Grid>
                  <Grid item xs={6} sm={8} className={styles.genInforValue}>
                    <LinkComp className={styles.manuafacturer} href={`${MANUFACTURERS}/${manufacturer?.slug || ''}`}>
                      {manufacturer?.name}
                    </LinkComp>
                  </Grid>
                  <Grid item xs={6} sm={4} className={styles.genInfor}>
                    Cung cấp bởi:
                  </Grid>
                  <Grid item xs={6} sm={8} className={styles.genInforValue}>
                    {sellerInfo?.sellerName || ''}
                  </Grid>
                  <Grid item xs={6} sm={4} className={styles.genInfor}>
                    Danh mục sản phẩm:
                  </Grid>
                  <Grid item xs={6} sm={8} className={styles.genInforValue}>
                    <Box className={styles.category}>
                      {categoryCodes &&
                        categoryCodes?.map((item) => (
                          <LinkComp
                            key={uuidv4()}
                            className={styles.text_capitalize}
                            href={`${CATEGORIES}/${mapCategories.get(item)?.slug}`}
                            style={{ padding: '0px' }}
                          >
                            {mapCategories.get(item)?.name}
                          </LinkComp>
                        ))}
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={4} className={styles.genInfor}>
                    Hoạt chất:
                  </Grid>
                  <Grid item xs={6} sm={8} className={styles.genInforValue}>
                    {ingredientValue}
                  </Grid>
                  <Grid item xs={6} sm={4} className={styles.genInfor}>
                    Giá:
                  </Grid>
                  <Grid item xs={6} sm={8} className={styles.genInforValue}>
                    {!isAuthenticated ? (
                      <div className={styles.div_buttons}>
                        <CustomButton backgroundColor="#e1a006" className={styles.signin_btn} onClick={toggleLogin}>
                          Đăng nhập để xem giá
                        </CustomButton>
                      </div>
                    ) : (
                      <b>{formatCurrency(qrCodeData?.productInfo?.displayPrice) || ''}</b>
                    )}
                  </Grid>
                  {isAuthenticated && (
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <ButtonDefault className={styles.btn} onClick={updateCartInItem} startIcon={<LocalMallOutlined />}>
                          Thêm vào giỏ hàng
                        </ButtonDefault>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <LinkComp href={getPathProductBySlug(qrCodeData?.productInfo?.slug)}>
                          <Button className={`${styles.btn} ${styles.seedetail_btn}`}>Xem chi tiết</Button>
                        </LinkComp>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Divider style={{ marginTop: '20px' }} />
          <TabContext value={value}>
            <TabList onChange={handleChange} value={value} classes={{ indicator: styles.indicator }} variant="scrollable">
              {tabsProductData.map((tab) => (
                <Tab label={tab.label} value={tab.value} disableRipple key={uuidv4()} className={styles.tabInfor} />
              ))}
            </TabList>
            <Divider />
            <TabPanel key={uuidv4()} value={tabDataPanel?.value} className={styles.descContent}>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{
                  __html: descriptionValue || 'đang cập nhật',
                }}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </Box>
  );

  const qrPermissionAndInfo = (
    <Grid container>
      <Grid item xs={12} lg={3} style={{ paddingBottom: '80px' }}>
        {qrPermission}
      </Grid>
      <Grid item xs={12} lg={9}>
        {qrInformation}
      </Grid>
    </Grid>
  );

  return <NewTemplate>{qrPermissionAndInfo}</NewTemplate>;
}
