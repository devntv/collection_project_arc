import { Badge, Box, Container, Grid, IconButton, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { withLogin } from 'HOC';
import { CartClientV2, SupplierClient, getData, getFirst, isValid, isValidWithoutData } from 'clients';
import clsx from 'clsx';
import { Button, LinkComp } from 'components/atoms';
import Template from 'components/layout/Template';
import { CustomModal } from 'components/mocules';
import CardInfo from 'components/mocules/CardInfo';
import { LoadingScreen, ProductCartList } from 'components/organisms';
import { ERROR_CODE_CART } from 'constants/ErrorCart';
import { CARTV2_ICON } from 'constants/Images';
import { CART_URL, QUICK_ORDER } from 'constants/Paths';
import { useCart, useProduct } from 'context';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { CartService } from 'services';
import { doWithServerSide } from 'services/SsrService';
import { screenOrientation } from 'utils';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { getTitle } from 'utils/SEOUtils';
import useMobileV2 from 'zustand-lib/storeMobile';
import useGetTagPromotion from 'zustand-lib/useGetTagPromotion';
import styles from './style.module.css';

const title = getTitle('Giỏ hàng');

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => {
      const cartRes = await CartService.getCartInfoWithProduct({ ctx });

      let mapInvoice = [];
      if (isValid(cartRes)) {
        const cartInfo = getFirst(cartRes);
        const { cartItems = [] } = cartInfo;
        const listSellerCode = [];
        cartItems.forEach((ele) => {
          listSellerCode.push(ele?.sellerCode);
        });

        const invoiceRes = await SupplierClient.getSellerConfig({ ctx, sellerCodes: listSellerCode.join() });
        let data = [];
        if (isValid(invoiceRes)) {
          data = getData(invoiceRes);
        }
        // minInvoice5pc là field cho BE xử lý = MinInvoice * 1.1
        mapInvoice = data.map(({ sellerCode, minInvoice5pc }) => ({ sellerCode, minInvoice5pc }));
      }
      return {
        props: {
          mapInvoice,
          SEO_CONFIG: {
            title,
          },
        },
      };
    },
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
}

const StickyCart = ({ handleScroll, totalQuantity = 0 }) => {
  const divRef = useRef(null);

  return (
    <div ref={divRef} className={styles.sticky_cart}>
      <Box>
        <IconButton onClick={handleScroll} className={styles.btn_sticky_cart}>
          <Badge badgeContent={totalQuantity} max={1000} color="secondary" overlap="rectangular">
            <ImageFallbackStatic src={CARTV2_ICON} width="20px" height="24px" layout="fixed" />
          </Badge>
        </IconButton>
      </Box>
    </div>
  );
};

function Cart({ isMobile, user, mapInvoice = [] }) {
  const [mobile, setMobile] = useState(isMobile);
  const [showModal, toggleModal] = useState(false);
  const [, setCartList] = useState();

  const {
    cartItems = [],
    isLoadingCart,
    totalQuantity = 0,
    updateCart,
    removeCartItem,
    isItemInArrayRemove,
    isErrorCartItem = false,
    messageOverWeightOrVolume,
    isOverWeightOrVolume,
    isHaveProductDeal,
    totalQuantitySelected = 0,
  } = useCart();
  const beta = useMobileV2((state) => state.beta);
  const { clearMapProduct } = useProduct();
  const cartRef = useRef(null);

  // const minVATDefault = 200000;
  /*
logic quan trọng của giỏ hàng nằm đây
- map lại giá tiền từ price 
*/
  const numberItemChangePrice = cartItems.filter(({ errorCode }) => errorCode === ERROR_CODE_CART.CHANGED_PRICE).length;
  const isShowModal = numberItemChangePrice > 0;

  useEffect(() => {
    toggleModal(isShowModal);
  }, [isShowModal]);
  const confirm = async () => {
    const confirmResult = await CartClientV2.confirmChangePrice({ skus: [] });
    if (isValidWithoutData(confirmResult)) {
      toggleModal(false);
    }
  };

  useEffect(() => {
    const landscape = screenOrientation(window);
    if (landscape) {
      setMobile(false);
    }
    clearMapProduct();
    updateCart();
  }, []);

  useEffect(() => {
    const landscape = screenOrientation(window);
    window.addEventListener(
      'orientationchange',
      () => {
        if (landscape) {
          setMobile(true);
        } else {
          setMobile(false);
        }
      },
      false,
    );
  }, [mobile]);

  // promo tag gift

  const { getPromoLists } = useGetTagPromotion();
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getPromoLists({ getVoucherInfo: false, signal });

    return () => controller.abort();
  }, []);

  // updateCart();
  const router = useRouter();
  const isPageCart = router.pathname === CART_URL;

  const pageTitle = `Giỏ hàng (${isPageCart ? totalQuantitySelected : totalQuantity})`;
  const pageName = 'cart';

  const handleScroll = () => {
    cartRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
  };

  if (isLoadingCart && cartItems?.length === 0) return <LoadingScreen />;
  return (
    <Template
      overrideMV2Options={{ title: 'Giỏ hàng', iconRightHeader: { home: true } }}
      isMobile={mobile}
      pageName={pageName}
      pageTitle={pageTitle}
      point={user?.point || 0}
      balance={user?.balance}
    >
      <Container className={clsx(styles.wrapper, 'cartpage', beta ? styles.isBottomMobile : '')} maxWidth="lg">
        {user?.isQuest && mobile && (
          <Alert className={styles.alert} severity="error">
            Đây là tài khoản dùng thử. Giỏ hàng sẽ không thể lưu và thanh toán được. Xin bạn vui lòng tạo tài khoản cá nhân để sử dụng tính năng này!
            Cảm ơn!
          </Alert>
        )}
        {!user?.isActive && mobile && (
          <Alert className={styles.alert} severity="error">
            Tạm thời chưa thanh toán được vì tài khoản chưa được kích hoạt. Quý khách vui lòng liên hệ bộ phận chăm sóc khách hàng qua số điện thoại
            <a href="tel:02873008840"> 028 7300 8840</a> để được hỗ trợ.
          </Alert>
        )}
        {isOverWeightOrVolume && isMobile && (
          <Alert className={styles.alert} severity="error">
            {messageOverWeightOrVolume}
          </Alert>
        )}

        {cartItems && cartItems.length > 0 ? (
          <>
            {!mobile && (
              <>
                <div style={{ marginBottom: '12px' }}>
                  <Typography className={styles.cart_title} variant="h5" component="h3" data-test="cart-title">
                    Giỏ hàng
                  </Typography>
                </div>
              </>
            )}

            <Grid container spacing={3}>
              <Grid className={isMobile ? styles.leftSide : ''} md={8} item>
                {/* san pham  */}

                {isHaveProductDeal && (
                  <div className={mobile ? '' : styles.instruction_text}>
                    <Alert className={styles.alert} severity="info">
                      Lưu ý: Giỏ hàng có <b>sản phẩm khuyến mãi</b>. Sau khi thanh toán, đơn hàng sẽ <b>không thể chỉnh sửa</b> được.
                    </Alert>
                  </div>
                )}
                <ProductCartList
                  setCartList={setCartList}
                  products={cartItems}
                  isMobile={mobile}
                  removeCartItem={removeCartItem}
                  isErrorCartItem={isErrorCartItem}
                  isItemInArrayRemove={isItemInArrayRemove}
                  updateCart={updateCart}
                  mapInvoice={mapInvoice}
                />
                {!mobile && <div ref={cartRef} />}
              </Grid>
              {!mobile && (
                <>
                  <Grid md={4} item className={styles.cart_info_container}>
                    {/* gio hang */}
                    <CardInfo user={user} className={styles.card_info} cart promo isMobile={isMobile} />
                  </Grid>
                  <StickyCart handleScroll={handleScroll} totalQuantity={totalQuantity} />
                </>
              )}
            </Grid>
          </>
        ) : (
          <Container>
            <Typography className={styles.card_title_empty} data-test="cart-text-empty">
              Giỏ hàng của bạn trống
            </Typography>
            <div style={{ justifyContent: 'center', display: 'flex' }}>
              <LinkComp href={QUICK_ORDER}>
                <Button
                  className={styles.card_button_empty}
                  variant="contained"
                  color="#fff"
                  style={{ marginRight: '0 !important' }}
                  data-test="btn-go-quick-order"
                >
                  Về trang đặt hàng nhanh
                </Button>
              </LinkComp>
            </div>
          </Container>
        )}
        <CustomModal
          visible={showModal}
          title="Thông báo!"
          content={`Trong giỏ hàng có ${numberItemChangePrice} sản phẩm thay đổi giá. Vui lòng kiểm tra lại trước khi đặt hàng`}
          btnOk="Tôi đã hiểu"
          btnCloseRender={null}
          onClickOk={confirm}
        />
      </Container>
    </Template>
  );
}

export default withLogin(Cart);
