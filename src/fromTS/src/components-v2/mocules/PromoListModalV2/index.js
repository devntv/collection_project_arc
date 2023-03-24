import { Grid, Modal, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { getData, isValid, PromoClient } from 'clients';
import clsx from 'clsx';
import ButtonV2 from 'components-v2/atoms/ButtonV2';
import InputV2 from 'components-v2/atoms/InputV2';
import LoadingBM from 'components-v2/atoms/LoadingBM';
import CartCouponCardV2 from 'components-v2/mocules/CartCouponCardV2';
import { ENUM_TRACKING_ACTION } from 'constants/Enums';
import { useDetectScrollModal } from 'hooks';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Tracking } from 'utils';
import { debounceFunc500 } from 'utils/debounce';
import { v4 as uuidv4 } from 'uuid';

import styles from './styles.module.css';

const TEXT_DEFAULT = '';
const OFFSET_DEFAULT = 0;
// TODO:PROMOTION
const PromoListModalV2 = memo((props) => {
  const { onClose, visible, restProps, redeemCode, handleChangePromo, subPrice, accountId, customerID, currentPage, isMobile, redeemApplyResult } =
    props;
  // const isMobileDevice
  const mountRef = useRef(false);
  const [promoList, setPromoList] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [text, setText] = useState('');
  const [offset, setOffset] = useState(OFFSET_DEFAULT);
  const [loading, setLoading] = useState(false);
  // const [isHasMore, setIsHasMore] = useState(true);
  // const [totalList, setTotalList] = useState([]);

  const handleUpdateText = useCallback(async (value) => {
    const result = await PromoClient.getVoucherActiveConfig({ offset: 0, search: value });
    setPromoList(getData(result));
    // if (text === '' || promoList.length >= 20) {
    //   setIsHasMore(true);
    // }
  }, []);

  const handleChangeText = (e) => {
    const valueText = e.target.value;
    // // mặc định api trả ra data length = 20 nếu nhỏ hơn thì ko load more
    // if (promoList?.length < 20) {
    //   setIsHasMore(false);
    // }
    setText(valueText);
    debounceFunc500(() => {
      handleUpdateText(valueText);
      Tracking.trackingFunc(ENUM_TRACKING_ACTION.ON_CHANGE_SEARCH_VOUCHER_ON_CART_PAGE, {
        accountId,
        customerID,
        page: '/cart',
        currentPage: window.location.href,
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
      // const { total = 0 } = resultConfig;
      // setTotalList(total);
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
      Tracking.trackingFunc(ENUM_TRACKING_ACTION.CLICK_SEARCH_VOUCHER_ON_CART_PAGE, { accountId, customerID, page: '/cart', currentPage, isMobile });
    }
  };
  // const nextFetch = () => {
  //   setOffset(offset + 20);
  //   // !totalList -> api k trả ra ngừng infinity scroll load
  //   if (promoList?.length === 0 || promoList?.length >= totalList || !totalList) {
  //     setIsHasMore(false);
  //   }
  // };
  useEffect(() => {
    if (visible) searchPromo(text);
  }, [visible]);

  const handleClickSearch = () => {
    searchPromo(text);
    Tracking.trackingFunc(ENUM_TRACKING_ACTION.CLICK_SEARCH_VOUCHER_ON_CART_PAGE, { accountId, customerID, page: '/cart', currentPage, isMobile });
  };

  // tracking scroll in modal
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
    <Modal className={styles.modalContainer} open={visible} {...restProps} onClose={onClose}>
      {loading ? (
        <Grid className={clsx(styles.confirm_modal_wrap, loading && styles.wrapMoalLoad)}>
          <Grid className={clsx(styles.modal_title, loading && styles.wrapTitleLoad)}>
            <Typography data-test="promo-text-modal">Mã giảm giá</Typography>
            <CloseIcon className={styles.close} onClick={onClose} data-test="ic-close-modal" />
          </Grid>
          <Grid className={styles.loadLogo}>
            <LoadingBM />
          </Grid>
        </Grid>
      ) : (
        <Grid className={styles.confirm_modal_wrap}>
          <Grid container className={styles.modal_title} item xs={12} justifyContent="space-between" alignItems="center">
            <Typography data-test="promo-text-modal">Mã giảm giá</Typography>
            <CloseIcon className={styles.close} onClick={onClose} data-test="ic-close-modal" />
          </Grid>

          <Grid container className={styles.wrapAction} item xs={12} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} sm={9}>
              <InputV2
                type={null}
                endAdornment={text === '' ? null : <CloseIcon onClick={handleRemoveText} className={styles.clearSearch} />}
                placeholder="Nhập mã giảm giá cần tìm"
                value={text}
                onChange={handleChangeText}
                onKeyDown={handleSearchButton}
                style={{ height: 'auto' }}
                className={styles.inputV2Promo}
                // autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={3} container justifyContent="flex-end" className={styles.wrapBtnSearch}>
              <ButtonV2 className={styles.button} onClick={handleClickSearch} tooltipTitle="Tìm kiếm mã giảm giá" hoverColor="#fff" hover>
                Tìm Kiếm
              </ButtonV2>
            </Grid>
          </Grid>
          <div className={styles.counpon_list_wapper}>
            <div
              className={clsx(styles.counpon_list, promoList?.length <= 0 && styles.notCode)}
              id="scrollableDiv"
              ref={refScroll}
              onScroll={onScroll}
            >
              {/* <InfiniteScroll
                inverse={false}
                next={promoList?.length < 20 ? null : nextFetch}
                dataLength={promoList?.length}
                hasMore={isHasMore}
                loader={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <div className={clsx(styles.loadMore, (promoList?.length < 20 || promoList?.length < 0) && styles.hiddenLoad)}>
                    <CircularProgress thickness={4} size={20} className={styles.LoadCircle} />
                    Đang tải...
                  </div>
                }
                scrollableTarget="scrollableDiv"
                endMessage={<div className={styles.loadMore} />}
              > */}
              {promoList?.length !== 0 ? (
                <Grid container spacing={1}>
                  {promoList?.map((voucher) => (
                    <Grid className={styles.coupon_card_grid} item key={uuidv4()} style={{ width: '100%' }} data-test="modal-item-promo">
                      <CartCouponCardV2
                        {...voucher}
                        redeemCode={redeemCode}
                        handleChangePromo={handleChangePromo}
                        subPrice={subPrice}
                        accountId={accountId}
                        customerID={customerID}
                        currentPage={currentPage}
                        isMobile={isMobile}
                        redeemApplyResult={redeemApplyResult}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <div className={styles.not_yet}>
                  <span data-test="modal-not-promo-text">Chưa có mã</span>
                </div>
              )}
              {/* {console.log(promoList?.length < 0)} */}
              {/* </InfiniteScroll> */}
            </div>
          </div>
        </Grid>
      )}
    </Modal>
  );
});

export default PromoListModalV2;
