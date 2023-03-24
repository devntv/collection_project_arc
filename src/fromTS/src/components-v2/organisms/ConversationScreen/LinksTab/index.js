/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { getData } from 'clients';
import { getLinks } from 'clients/ChatClient';
import clsx from 'clsx';
import { EnumsTicket, ENUM_ORDER_STATUS_COLOR_V2, ENUM_ORDER_STATUS_LABEL, PAYMENT_METHOD_NAME_SHORT } from 'constants/Enums';
import { LIGHT_BLUE_LOGO, SELLER_GRAY, TIME } from 'constants/Icons';
import { MISSING_IMAGE } from 'constants/Images';
import { useSetting } from 'context';
import { format } from 'date-fns';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { isPrd } from 'sysconfig';
import { NotifyUtils } from 'utils';
import { formatCurrency, formatNumber } from 'utils/FormatNumber';
import { getLinkCacheProxyProduct } from 'utils/ImageUtils';
import styles from './styles.module.css';

export const renderLoading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', marginTop: '20px' }}>
    <CircularProgress size={30} />
  </div>
);

const TicketInfo = (ticketInfo) => {
  const { handleClick, type = '', status, createdTime, feedbackContent } = ticketInfo;

  return (
    <Grid onClick={() => handleClick(ticketInfo)} className={clsx(styles.commonStyleCard, styles.rootLinkItem)}>
      <div className={styles.wrapperHeadLinkItem}>
        <div className={styles.wrapperLine1LinkItem}>
          <div className={styles.titleLinkItem}>Phiếu Hỗ Trợ</div>
          <div>
            <span className={styles.labelTimeLinkItem}>Vấn đề</span>
            <span className={styles.typeTimeLinkItem}> {EnumsTicket.TYPE_OF_TICKET_SUPPORT[type]}</span>
          </div>
        </div>
        <div className={styles.wrapperLink2LinkItem}>
          <div className={styles.wrapperStatusLinkItem}>
            <div className={styles.statusLinkItem} style={{ backgroundColor: EnumsTicket.BACKGROUND_COLOR_STATUS[status] }} />
            <div>{EnumsTicket.TYPE_OF_STATUS[status]}</div>
          </div>
          <div className={styles.wrapperTimeLinkItem}>
            <TIME />
            <Typography className={styles.textTimeLinkItem} variant="caption">
              {format(new Date(createdTime), 'dd/MM/yyyy')}
            </Typography>
          </div>
        </div>
      </div>
      <div>
        <span className={clsx(styles.typeTimeLinkItem, 'lineLimit1')}>
          <span className={styles.labelTimeLinkItem}>Nội dung </span>
          {feedbackContent}
        </span>
      </div>
    </Grid>
  );
};

const OrderInfo = ({
  orderID = null,
  paymentMethod = '',
  createdTime = '',
  totalPrice = '',
  detailAddress = {},
  totalQuantity = 0,
  status = '',
  redeemCode = [],
  customerShippingAddress = '',
  totalDiscount = 0,
  handleClick,
  orderCode,
}) => (
  <Grid onClick={() => handleClick(orderID, orderCode)} className={clsx(styles.commonStyleCard, styles.rootOrder)}>
    <div className={styles.twoColOrder}>
      <div className={styles.leftOrder}>
        <Typography className={styles.codeOrder} variant="h6">
          #{orderID}
        </Typography>
        <div className={styles.wrapperTime}>
          <TIME />
          <Typography className={styles.dateOrder} variant="h6">
            {format(new Date(createdTime), 'dd/MM/yyyy')}
          </Typography>
        </div>
        <div className={styles.wrapperTotal}>
          <Typography className={styles.totalOrder} variant="h6">
            Tổng SL
          </Typography>
          <Typography className={styles.quantityOrder} variant="h6">
            {formatNumber(totalQuantity)}
          </Typography>
        </div>
        <Typography className={styles.priceOrder} variant="h6">
          {formatCurrency(totalPrice)}
        </Typography>
      </div>
      <div className={styles.rightOrder}>
        <div className={styles.statusOrder}>
          <div className={styles.statusLinkItem} style={{ backgroundColor: ENUM_ORDER_STATUS_COLOR_V2[status] }} />
          <Typography className={styles.textStatusOrder} variant="h6">
            {ENUM_ORDER_STATUS_LABEL[status]}
          </Typography>
        </div>
        <Typography className={styles.methodPaymentOrder} variant="h6">
          {PAYMENT_METHOD_NAME_SHORT[paymentMethod]}
        </Typography>
        <Typography className={styles.methodPaymentOrder} variant="h6">
          {totalDiscount > 0 ? `- ${formatCurrency(totalDiscount)}` : ''}
        </Typography>
        <Typography className={styles.codeCouponOrder} variant="h6">
          {redeemCode.length > 0 ? redeemCode[0] : ''}
        </Typography>
      </div>
    </div>
    <Typography className={styles.addressOrder} variant="body2">
      {`${customerShippingAddress} ${detailAddress?.ward ? `, ${detailAddress?.ward}` : ''} 
          ${detailAddress?.district ? `, ${detailAddress?.district}` : ''} 
          ${detailAddress?.province ? `, ${detailAddress?.province}` : ''}`}
    </Typography>
  </Grid>
);
const SkuInfo = (skuInfo) => {
  const { imageUrls = [], name = '', price = {}, slug = '', sellerInfo = {}, handleClick, tags } = skuInfo;
  const { getNameSeller } = useSetting();

  const { sellerName } = getNameSeller({ seller: sellerInfo, tags });
  return (
    <Grid onClick={() => handleClick(slug)} className={clsx(styles.commonStyleCard, styles.rootSku)}>
      <Image className={styles.imgSku} src={imageUrls.length > 0 ? getLinkCacheProxyProduct(imageUrls[0]) : MISSING_IMAGE} width="60" height="60" />
      <div>
        <Typography className={styles.nameSku} variant="h6">
          {name}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {sellerName ? (
            <>
              <div style={{ flexShrink: 0, height: '16px' }}>
                <SELLER_GRAY />
              </div>
              <Typography className={clsx(styles.sellerSku, styles.sellerCapitalizeSk)} variant="h6">
                {sellerName}
              </Typography>
            </>
          ) : (
            <Typography className={clsx(styles.sellerSku, styles.sellerCapitalizeSk)}> </Typography>
          )}
          {price?.percentageDiscount && <div className={styles.tagSalesSku}>-{price?.percentageDiscount}%</div>}
        </div>
        <div className={styles.wrapPriceSku}>
          <Typography className={styles.priceSku} variant="h6">
            {formatCurrency(price?.currentPrice)}
          </Typography>
          {price?.percentageDiscount && (
            <Typography className={styles.discountPriceSku} variant="h6">
              {formatCurrency(price?.originalPrice)}
            </Typography>
          )}
        </div>
      </div>
    </Grid>
  );
};

const renderInfoItem = {
  ORDER: (orderInfo) => <OrderInfo {...orderInfo} />,
  PRODUCT: (skuInfo) => <SkuInfo {...skuInfo} />,
  TICKET: (ticketInfo) => <TicketInfo {...ticketInfo} />,
};

const LinkItem = ({ type, content, handleClick }) => {
  const contents = {
    ...content,
    handleClick,
  };
  return renderInfoItem[type](contents);
};

const Empty = () => (
  <div className={styles.rootEmpty}>
    <LIGHT_BLUE_LOGO />
    <Typography className={styles.textEmpty} variant="caption">
      Chưa có liên kết nào
    </Typography>
  </div>
);

const LIMIT = 20;

// default component
const LinksTab = ({ conversationID = '', isWebView = false }) => {
  const scrollRef = useRef(null);
  const [page, setPage] = useState(1);
  const [links, setLinks] = useState([]);
  const { push } = useRouter();
  const [firstLoading, setFirstLoading] = useState(false);

  const handleClickByType = useMemo(
    () => ({
      PRODUCT: (slug) => {
        if (isWebView) {
          const message = `PRODUCT~${slug}`;
          window?.ReactNativeWebView?.postMessage(message);
          window?.postMessage(message);
          !isPrd && NotifyUtils.success('send postMessage ', message);
          return;
        }
        push(`product/${slug}/loading`);
      },
      ORDER: (orderId, orderCode) => {
        if (isWebView) {
          const message = `ORDER~${orderId}-${orderCode}`;
          window?.ReactNativeWebView?.postMessage(message);
          window?.postMessage(message);
          !isPrd && NotifyUtils.success('send postMessage ', message);
          return;
        }
        push(`/my-order/${orderId}`);
      },
      TICKET: (ticketInfo) => {
        if (isWebView) {
          const message = `TICKET~${JSON.stringify(ticketInfo)}`;
          window?.ReactNativeWebView?.postMessage(message);
          window?.postMessage(message);
          !isPrd && NotifyUtils.success('send postMessage ', message);
          return;
        }
        push(`/users/my-ticket?id=${ticketInfo?.ticketId}`);
      },
    }),
    [isWebView],
  );

  useEffect(() => {
    (async () => {
      setFirstLoading(true);
      const res = getData(await getLinks({ conversationID, offset: 0, limit: LIMIT }));
      setLinks(res);
      setFirstLoading(false);
    })();
  }, []);

  const fetchMoreLinks = async () => {
    const res = getData(await getLinks({ conversationID, offset: page * LIMIT, limit: LIMIT }));
    setLinks([...links, ...res]);
    setPage(page + 1);
    return !(res.length < LIMIT); // return false để ngừng loadmore
  };
  const { isFetching } = useInfiniteScroll(fetchMoreLinks, 'bottom', scrollRef?.current);

  const isLoading = firstLoading || isFetching;

  return (
    <div className={styles.root} ref={scrollRef}>
      {!isLoading && links.length === 0 && <Empty />}
      {links.map((link) => {
        let content = {};
        switch (link?.type) {
          case 'ORDER': {
            content = link?.orderInfo;
            break;
          }
          case 'PRODUCT': {
            content = link?.skuInfo;
            break;
          }
          case 'TICKET': {
            content = link?.ticketInfo;
            break;
          }
          default: {
            content = {};
          }
        }
        return <LinkItem key={link?.messageID} type={link?.type} content={content} handleClick={handleClickByType[link?.type]} />;
      })}
      {isLoading && renderLoading()}
    </div>
  );
};

export default LinksTab;
