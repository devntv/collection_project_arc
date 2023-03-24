import { Dialog, DialogContent, Grid, Slide } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Close';
import { getData, isValid, PromoClient } from 'clients';
import clsx from 'clsx';
import InputV2 from 'components-v2/atoms/InputV2';
import LoadingBM from 'components-v2/atoms/LoadingBM';
import CartCouponMobile from 'components-v2/mocules/CartCouponCardV2Mobile';
import { ENUM_TRACKING_ACTION } from 'constants/Enums';
import { ICON_SEARCH_PROMO_MOBILE_V2 } from 'constants/Icons';
import { useAuth } from 'context';
import { useDetectScrollModal } from 'hooks';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Tracking } from 'utils';
import { debounceFunc500 } from 'utils/debounce';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const TEXT_DEFAULT = '';
const OFFSET_DEFAULT = 0;
const Transition = React.forwardRef((props, ref) => <Slide direction="up" in ref={ref} {...props} />);
// TODO:PROMOTION
const PromoListV2Mobile = memo((props) => {
  const { onClose, visible, restProps, redeemCode, handleChangePromo, subPrice, currentPage, isMobile } = props;
  const {
    user: { accountID: accountId = '', customerID = '' },
  } = useAuth();
  const mountRef = useRef(false);

  const [promoList, setPromoList] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [text, setText] = useState('');
  const [offset, setOffset] = useState(OFFSET_DEFAULT);
  const [loading, setLoading] = useState(false);

  const handleUpdateText = useCallback(async (value) => {
    const result = await PromoClient.getVoucherActiveConfig({ offset: 0, search: value });
    setPromoList(getData(result));
  }, []);

  const handleChangeText = (e) => {
    const valueText = e.target.value;

    setText(valueText);
    debounceFunc500(() => {
      handleUpdateText(valueText);
      Tracking.trackingFunc(ENUM_TRACKING_ACTION.ON_CHANGE_SEARCH_VOUCHER_ON_CART_PAGE, {
        accountId,
        customerID,
        page: '/cart',
        currentPage,
        isMobile,
      });
    });
  };
  const handleRemoveText = () => {
    setText(TEXT_DEFAULT);
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    async function getConfigVoucherList() {
      if (text !== '') {
        setOffset(0);
      }
      if (!mountRef.current) {
        setLoading(true);
        mountRef.current = true;
      }
      const resultConfig = await PromoClient.getVoucherActiveConfig({ offset, search: text, signal });
      if (isValid(resultConfig)) {
        setPromoList(getData(resultConfig));
      }
      setLoading(false);
    }

    getConfigVoucherList();
    return () => controller.abort();
  }, [text === '', offset]);

  const searchPromo = useCallback(
    async (search) => {
      if (isSending) return;
      setIsSending(true);
      const searchRes = await PromoClient.getVoucherActiveConfig({ offset: 0, search });
      setPromoList(getData(searchRes));
      setIsSending(false);
    },
    [isSending],
  );

  const handleSearchButton = (event) => {
    if (event.keyCode === 13) {
      searchPromo(text);
      event.preventDefault();
      Tracking.trackingFunc(ENUM_TRACKING_ACTION.CLICK_SEARCH_VOUCHER_ON_CART_PAGE, {
        accountId,
        customerID,
        page: '/cart',
        currentPage,
        isMobile,
      });
    }
  };
  useEffect(() => {
    searchPromo(text);
  }, [visible]);

  const handleClickSearch = () => {
    searchPromo(text);
    Tracking.trackingFunc(ENUM_TRACKING_ACTION.CLICK_SEARCH_VOUCHER_ON_CART_PAGE, {
      accountId,
      customerID,
      page: '/cart',
      currentPage,
      isMobile,
    });
  };

  // tracking action mobile
  const [isScroll, refScroll, onScroll] = useDetectScrollModal(visible);
  useEffect(() => {
    if (isScroll)
      Tracking.trackingFunc(ENUM_TRACKING_ACTION.SCROLL_DOWN_FIRST_VOUCHER_POPUP_ON_CART_PAGE, {
        accountId,
        customerID,
        page: '/cart',
        currentPage,
        isMobile,
      });
  }, [isScroll]);

  // TODO:

  return (
    <Dialog className={styles.modalContainer} open={visible} {...restProps} onClose={onClose} fullScreen TransitionComponent={Transition}>
      <DialogContent
        id="scrollableDiv"
        className={clsx(styles.dialogContent, promoList?.length <= 0 && styles.unScrollY)}
        ref={refScroll}
        onScroll={onScroll}
      >
        {loading ? (
          <Grid className={clsx(styles.confirm_modal_wrap, loading && styles.wrapMoalLoad)}>
            <Grid className={styles.loadLogo}>
              <LoadingBM />
            </Grid>
          </Grid>
        ) : (
          <Grid className={styles.confirm_modal_wrap}>
            <Grid item xs={12} alignItems="center" container className={styles.wrapModal_title}>
              <Grid className={styles.title}>
                <ChevronLeftIcon onClick={onClose} />
              </Grid>
              <Grid className={styles.wrapSearchMobile} justifyContent="flex-end" container>
                <InputV2
                  type={null}
                  endAdornment={text === '' ? null : <CloseIcon onClick={handleRemoveText} className={styles.clearSearch} />}
                  placeholder="Nhập mã giảm giá cần tìm"
                  value={text}
                  onChange={handleChangeText}
                  onKeyDown={handleSearchButton}
                  style={{ height: 'auto' }}
                  className={styles.inputV2PromoActive}
                />
                <button onClick={handleClickSearch} className={styles.btnSearchMobile}>
                  <ICON_SEARCH_PROMO_MOBILE_V2 />
                </button>
              </Grid>
            </Grid>
            <div className={styles.counpon_list_wapper}>
              <div className={clsx(styles.counpon_list, promoList?.length <= 0 && styles.Notcode)}>
                {promoList?.length > 0 ? (
                  <Grid container spacing={1} className={styles.voucherList}>
                    {promoList?.map((voucher) => (
                      <Grid className={styles.coupon_card_grid} item key={uuidv4()} style={{ width: '100%' }}>
                        <CartCouponMobile
                          {...voucher}
                          redeemCode={redeemCode}
                          handleChangePromo={handleChangePromo}
                          subPrice={subPrice}
                          accountId={accountId}
                          customerID={customerID}
                          currentPage={currentPage}
                          isMobile={isMobile}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <div className={styles.not_yet}>
                    <span>Chưa có mã</span>
                  </div>
                )}
              </div>
            </div>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
});

export default PromoListV2Mobile;
