import { Divider, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { getData, isValid, PromoClient } from 'clients';
import clsx from 'clsx';
import CartCouponCardV2 from 'components-v2/mocules/CartCouponCardV2';
import { Modal } from 'components/atoms';
import LoadingScreen from 'components/organisms/LoadingScreen';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { debounceFunc500 } from 'utils/debounce';
import { v4 as uuidv4 } from 'uuid';
import Button from './Button';
import Input from './Input';
import styles from './styles.module.css';

const TEXT_DEFAULT = '';
const OFFSET_DEFAULT = 0;
// TODO:PROMOTION
const PromoListModalV2 = memo((props) => {
  const { onClose, visible, className, restProps, redeemCode, handleChangePromo, subPrice } = props;
  const mountRef = useRef(false);
  const [promoList, setPromoList] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [text, setText] = useState('');
  const [offset, setOffset] = useState(OFFSET_DEFAULT);
  const [loading, setLoading] = useState(false);
  const [isHasMore, setIsHasMore] = useState(true);
  const [totalList, setTotalList] = useState([]);

  const handleUpdateText = useCallback(async (value) => {
    const result = await PromoClient.getVoucherActiveConfig({ offset: 0, search: value });

    setPromoList(getData(result));
    if (text === '' || promoList.length >= 20) {
      setIsHasMore(true);
    }
  }, []);

  const handleChangeText = (e) => {
    const valueText = e.target.value;
    // // mặc định api trả ra data length = 20 nếu nhỏ hơn thì ko load more
    if (promoList?.length < 20) {
      setIsHasMore(false);
    }
    setText(valueText);
    debounceFunc500(() => handleUpdateText(valueText));
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
      const { total = 0 } = resultConfig;
      setTotalList(total);
      if (isValid(resultConfig)) {
        setPromoList([...promoList, ...getData(resultConfig)]);
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
    }
  };
  const nextFetch = () => {
    setOffset(offset + 20);
    // !totalList -> api k trả ra ngừng infinity scroll load
    if (promoList?.length === 0 || promoList?.length >= totalList || !totalList) {
      setIsHasMore(false);
    }
  };
  useEffect(() => {
    searchPromo(text);
  }, [visible]);

  // TODO:

  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      {loading ? (
        <div className={styles.confirm_modal_wrap}>
          <div className={styles.modal_title}>
            <h2>Mã giảm giá</h2>
            <CloseIcon className={styles.close} onClick={onClose} data-test="ic-close-modal" />
          </div>
          <LoadingScreen />
        </div>
      ) : (
        <div className={styles.confirm_modal_wrap}>
          <div className={styles.modal_title}>
            <h2 data-test="promo-text-modal">Mã giảm giá</h2>
            <CloseIcon className={styles.close} onClick={onClose} data-test="ic-close-modal" />
          </div>
          <Divider />
          <Grid container>
            <Grid item xs={9} md={10}>
              <Input
                endAdornment={text === '' ? null : <CloseIcon onClick={handleRemoveText} />}
                placeholder="Nhập mã cần tìm"
                value={text}
                onChange={handleChangeText}
                onKeyDown={handleSearchButton}
                style={{ height: 'auto' }}
                // autoFocus
              />
            </Grid>

            <Grid item xs={3} md={2}>
              <Button className={styles.button} onClick={() => searchPromo(text)} />
            </Grid>
          </Grid>
          <div className={styles.counpon_list_wapper}>
            <div className={styles.counpon_list} id="scrollableDiv">
              <InfiniteScroll
                inverse={false}
                next={promoList?.length < 20 ? null : nextFetch}
                dataLength={promoList?.length}
                hasMore={isHasMore}
                loader={<div className={clsx(styles.loadMore, promoList?.length < 20 && styles.hiddenLoad)}>Đang tải...</div>}
                scrollableTarget="scrollableDiv"
                endMessage={<div className={styles.loadMore} />}
              >
                {promoList?.length !== 0 ? (
                  <Grid container spacing={1}>
                    {promoList?.map((voucher) => (
                      <Grid className={styles.coupon_card_grid} item key={uuidv4()} style={{ width: '100%' }} data-test="modal-item-promo">
                        <CartCouponCardV2 {...voucher} redeemCode={redeemCode} handleChangePromo={handleChangePromo} subPrice={subPrice} />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <div className={styles.not_yet}>
                    <span data-test="modal-not-promo-text">Chưa có mã</span>
                  </div>
                )}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
});

export default PromoListModalV2;
