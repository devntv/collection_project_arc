/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
import { Backdrop, Box, Grid, IconButton, Modal, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CloseIcon from '@material-ui/icons/Close';
import DownloadIcon from '@material-ui/icons/GetApp';
import InsertDriveFileSharpIcon from '@material-ui/icons/InsertDriveFileSharp';
import clsx from 'clsx';
import { LinkComp } from 'components/atoms';
import { SellerInfo } from 'components/mocules';
import { ENUM_ORDER_STATUS_COLOR_V2, ENUM_ORDER_STATUS_LABEL, EnumsTicket, PAYMENT_METHOD_NAME_SHORT } from 'constants/Enums';
import { TIME } from 'constants/Icons';
import { MISSING_IMAGE } from 'constants/Images';
import { ORDER_ICON, QUESTION_ICON } from 'constants/Images/mobile';
import { ICON_MOBILE_AVATAR_CS, ICON_MOBILE_ICON_SENDING, ICON_MOBILE_ICON_SENT } from 'constants/Images/mobile/Icons';
import { getPathOrderByIdWithDomain, getPathProductBySlugWithDomain, getPathTicketByIdWithDomain } from 'constants/Paths';
import { useState } from 'react';
import { isPrd } from 'sysconfig';
import { DateTimeUtils, NotifyUtils } from 'utils';
import { formatDate3 } from 'utils/FormatDate';
import { formatCurrency } from 'utils/FormatNumber';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { getLinkCacheProxyProduct, getLinkProxy, getLinkProxyFile, getLinkProxyVideo } from 'utils/ImageUtils';
import { groupTypeofFileByExtension } from 'utils/ValidateUtils';
import styles from './styles.module.css';

const isDay = true;

const Message = ({
  message,
  statusLoading,
  isWebView,
  isGuest,
  scrollMessageID,
  isShowDatePicker,
  setShowDatePicker,
  headDatePicker,
  containerListMessageRef,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [imgProps, setImgProps] = useState({
    url: '',
    name: '',
  });

  const MY_SELF = isGuest ? 'GUEST_TO_CS' : 'CUSTOMER_TO_CS';

  const handleClose = () => {
    setOpen(false);
  };
  const eventWebView = (props) => {
    let messageEventApp;

    if (props?.eventType === 'sku') {
      messageEventApp = `PRODUCT~${props?.slug}`;
      window?.ReactNativeWebView?.postMessage(messageEventApp);
      window?.postMessage(messageEventApp);
      !isPrd && NotifyUtils.success('send postMessage PRODUCT ', messageEventApp);
    }
    if (props?.eventType === 'img') {
      messageEventApp = `DOWNLOAD~${props.url}`;
      window?.ReactNativeWebView?.postMessage(messageEventApp);
      window?.postMessage(messageEventApp);
      !isPrd && NotifyUtils.success('send postMessage DOWNLOAD', messageEventApp);
    }
    if (props?.eventType === 'order') {
      messageEventApp = `ORDER~${props?.orderId || props?.orderID}-${props.orderCode}`;
      window?.ReactNativeWebView?.postMessage(messageEventApp);
      window?.postMessage(messageEventApp);
      !isPrd && NotifyUtils.success('send postMessage ORDER ', messageEventApp);
    }
    if (props?.eventType === 'ticket') {
      messageEventApp = `TICKET~${JSON.stringify(props)}`;
      window?.ReactNativeWebView?.postMessage(messageEventApp);
      window?.postMessage(messageEventApp);
      !isPrd && NotifyUtils.success('send postMessage TICKET ', messageEventApp);
    }
  };
  const toDataURL = (url) =>
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob));
  const handleDownload = async (imgPropsDownload) => {
    // NotifyUtils.success('handleDownload ', JSON.stringify(imgProps), 'isWebView ', isWebView);
    if (isWebView) {
      eventWebView({ eventType: 'img', ...imgPropsDownload });
    } else {
      // NotifyUtils.success('handleDownload > false ', JSON.stringify(imgProps));
      const { url, name } = imgPropsDownload;
      const date = new Date();
      const typeFile = url.substring(url.lastIndexOf('.'));
      const link = document.createElement('a');
      link.href = await toDataURL(url);
      link.download = `${date}_${name}${typeFile}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleTag = ({ skuInfo, orderInfo, ticketInfo }) => {
    // tạm ẩn tag
    // const { tags = [], statusData = {}, lotDates = [] } = skuInfo || {};
    // const isNearExpiration = lotDates?.find((item) => item?.isNearExpired === true) || {};
    let link = '';
    let masterAddress = '';
    if (skuInfo) {
      link = getPathProductBySlugWithDomain(skuInfo?.slug);
      const ShowProduct = () => (
        <div style={{ paddingBottom: '12px' }}>
          <Grid container>
            <Grid item>
              {isWebView ? (
                <Box
                  onClick={() => {
                    // eslint-disable-next-line no-unused-expressions
                    isWebView && eventWebView({ eventType: 'sku', ...skuInfo });
                  }}
                  className={styles.imgLink}
                >
                  {skuInfo?.imageUrls?.length > 0 ? (
                    <>
                      <img alt={skuInfo?.name} src={getLinkCacheProxyProduct(skuInfo?.imageUrls[0])} />
                      {!!skuInfo?.price?.percentageDiscount && (
                        <span className={styles.percentageDiscount}>-{skuInfo?.price?.percentageDiscount}%</span>
                      )}
                    </>
                  ) : (
                    <img alt={skuInfo?.name} src={MISSING_IMAGE} />
                  )}
                </Box>
              ) : (
                <LinkComp href={link} className={styles.imgLink}>
                  {skuInfo?.imageUrls?.length > 0 ? (
                    <>
                      <img alt={skuInfo?.name} src={getLinkCacheProxyProduct(skuInfo?.imageUrls[0])} />
                      {!!skuInfo?.price?.percentageDiscount && (
                        <span className={styles.percentageDiscount}>-{skuInfo?.price?.percentageDiscount}%</span>
                      )}
                    </>
                  ) : (
                    <img alt={skuInfo?.name} src={MISSING_IMAGE} />
                  )}
                </LinkComp>
              )}
            </Grid>
            <Grid item xs container zeroMinWidth style={{ gap: '8px' }}>
              <SellerInfo seller={skuInfo?.sellerInfo} tags={skuInfo?.tags} isProductCard isChat isWebView={isWebView} />
              <div className={styles.volume}>{skuInfo?.volume}</div>
              <div>
                <span className={styles.currentPrice}>{formatCurrency(skuInfo?.price?.currentPrice)} </span>
                {skuInfo?.price?.currentPrice < skuInfo?.price?.originalPrice && (
                  <>
                    <span className={styles.originalPrice}>{formatCurrency(skuInfo?.price?.originalPrice)}</span>
                  </>
                )}
              </div>
            </Grid>
          </Grid>
          {/* <div className={clsx(styles.product_tags, styles.product_tags_column)}>
            <TagComponent
              product={{ tags, statusData, expiredDate: isNearExpiration?.expiredDate || '' }}
              isMobile
              isMobileV2
              isProductCard
              link={link}
              isChatMobile
            />
          </div> */}
          {isWebView ? (
            <Box
              onClick={() => {
                // eslint-disable-next-line no-unused-expressions
                isWebView && eventWebView({ eventType: 'sku', ...skuInfo });
              }}
              className={styles.nameProduct}
            >
              {skuInfo?.name}
            </Box>
          ) : (
            <LinkComp href={link} className={styles.nameProduct}>
              {skuInfo?.name}
            </LinkComp>
          )}
        </div>
      );
      return <ShowProduct />;
    }
    if (orderInfo) {
      link = getPathOrderByIdWithDomain(`${orderInfo?.orderId || orderInfo?.orderID}`);
      masterAddress += `${orderInfo?.customerShippingAddress}${orderInfo?.detailAddress?.ward ? `, ${orderInfo?.detailAddress?.ward}` : ''}`;
      masterAddress += `${orderInfo?.detailAddress?.province ? `, ${orderInfo?.detailAddress?.province}` : ''}`;
      const ShowOrder = () => (
        <>
          {isWebView ? (
            <Box
              onClick={() => {
                // eslint-disable-next-line no-unused-expressions
                isWebView && eventWebView({ eventType: 'order', ...orderInfo });
              }}
              style={{ paddingBottom: '12px' }}
            >
              <Grid container>
                <Grid item xs={6} className={styles.mb}>
                  <Box
                    onClick={() => {
                      // eslint-disable-next-line no-unused-expressions
                      isWebView && eventWebView({ eventType: 'order', ...orderInfo });
                    }}
                    className={clsx(styles.imgLink, styles.imgLocal)}
                  >
                    <ImageFallbackStatic src={ORDER_ICON} width="122" height="100" />
                  </Box>
                </Grid>
                <Grid item xs={6} container zeroMinWidth className={styles.mb}>
                  <Grid
                    item
                    xs={12}
                    onClick={() => {
                      // eslint-disable-next-line no-unused-expressions
                      isWebView && eventWebView({ eventType: 'order', ...orderInfo });
                    }}
                    className={styles.orderId}
                  >
                    {`#${orderInfo?.orderId || orderInfo?.orderID} `}
                  </Grid>
                  <Grid item xs={12} className={styles.statusOrder}>
                    <div className={styles.statusLinkItem} style={{ backgroundColor: ENUM_ORDER_STATUS_COLOR_V2[orderInfo?.status] }} />
                    <Typography className={styles.textStatusOrder} variant="h6">
                      {ENUM_ORDER_STATUS_LABEL[orderInfo?.status]}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} className={styles.wrapperTime}>
                    <TIME />
                    <Typography className={styles.dateOrder} variant="h6">
                      {formatDate3(orderInfo?.createdTime, isDay)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={styles.methodPaymentOrder} variant="h6">
                      {PAYMENT_METHOD_NAME_SHORT[orderInfo?.paymentMethod]}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6} className={clsx(styles.mb, styles.messageOrder_fitContent)}>
                  <div className={styles.wrapperTotal}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <Typography className={styles.totalOrder} variant="h6">
                        Tổng SL
                      </Typography>
                      <Typography className={styles.quantityOrder} variant="h6">
                        {orderInfo?.totalQuantity}
                      </Typography>
                    </div>
                    <Typography className={styles.codeCouponOrder} variant="h6">
                      {orderInfo?.redeemCode?.length > 0 ? orderInfo?.redeemCode[0] : ''}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={6} container className={styles.mb}>
                  <div className={styles.messageOrder_fitContent}>
                    <div>
                      <Typography className={styles.priceOrder} variant="h6">
                        {formatCurrency(orderInfo?.totalPrice)}
                      </Typography>
                    </div>
                    <Typography className={styles.methodPaymentOrder} variant="h6">
                      {orderInfo?.totalDiscount > 0 && <>-{formatCurrency(orderInfo?.totalDiscount)}</>}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12} container style={{ gap: '8px' }}>
                  <Typography className={styles.addressOrder} variant="body2">
                    {masterAddress}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <LinkComp href={link} style={{ paddingBottom: '12px' }}>
              <Grid container>
                <Grid item xs={6} className={styles.mb}>
                  <LinkComp href={link} className={clsx(styles.imgLink, styles.imgLocal)}>
                    <ImageFallbackStatic src={ORDER_ICON} width="122" height="100" />
                  </LinkComp>
                </Grid>
                <Grid item xs={6} container zeroMinWidth className={styles.mb}>
                  <Grid item xs={12}>
                    <LinkComp href={link} className={styles.orderId}>
                      {`#${orderInfo?.orderId || orderInfo?.orderID} `}
                    </LinkComp>
                  </Grid>
                  <Grid item xs={12}>
                    <div className={styles.statusOrder}>
                      <div className={styles.statusLinkItem} style={{ backgroundColor: ENUM_ORDER_STATUS_COLOR_V2[orderInfo?.status] }} />
                      <Typography className={styles.textStatusOrder} variant="h6">
                        {ENUM_ORDER_STATUS_LABEL[orderInfo?.status]}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className={styles.wrapperTime}>
                      <TIME />
                      <Typography className={styles.dateOrder} variant="h6">
                        {formatDate3(orderInfo?.createdTime, isDay)}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={styles.methodPaymentOrder} variant="h6">
                      {PAYMENT_METHOD_NAME_SHORT[orderInfo?.paymentMethod]}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6} className={clsx(styles.mb, styles.messageOrder_fitContent)}>
                  <div className={styles.wrapperTotal}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <Typography className={styles.totalOrder} variant="h6">
                        Tổng SL
                      </Typography>
                      <Typography className={styles.quantityOrder} variant="h6">
                        {orderInfo?.totalQuantity}
                      </Typography>
                    </div>
                    <Typography className={styles.codeCouponOrder} variant="h6">
                      {orderInfo?.redeemCode?.length > 0 ? orderInfo?.redeemCode[0] : ''}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={6} container className={styles.mb}>
                  <div className={styles.messageOrder_fitContent}>
                    <div>
                      <Typography className={styles.priceOrder} variant="h6">
                        {formatCurrency(orderInfo?.totalPrice)}
                      </Typography>
                    </div>
                    <Typography className={styles.methodPaymentOrder} variant="h6">
                      {orderInfo?.totalDiscount > 0 && <>-{formatCurrency(orderInfo?.totalDiscount)}</>}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12} container style={{ gap: '8px' }}>
                  <Typography className={styles.addressOrder} variant="body2">
                    {masterAddress}
                  </Typography>
                </Grid>
              </Grid>
            </LinkComp>
          )}
        </>
      );
      return <ShowOrder />;
    }
    if (ticketInfo) {
      link = getPathTicketByIdWithDomain(ticketInfo.ticketId);
      const ShowTicket = () => (
        <>
          {isWebView ? (
            <Box
              onClick={() => {
                // eslint-disable-next-line no-unused-expressions
                isWebView && eventWebView({ eventType: 'ticket', ...ticketInfo });
              }}
              style={{ paddingBottom: '12px' }}
            >
              <Grid container>
                <Grid item xs={6} className={styles.mb}>
                  <Box
                    onClick={() => {
                      // eslint-disable-next-line no-unused-expressions
                      isWebView && eventWebView({ eventType: 'ticket', ...ticketInfo });
                    }}
                    className={clsx(styles.imgLink, styles.imgLocal)}
                  >
                    <ImageFallbackStatic src={QUESTION_ICON} width="122" height="100" />
                  </Box>
                </Grid>
                <div className={styles.mb} style={{ gridAutoRows: 'max-content', display: 'grid', gap: 8 }}>
                  <div className={styles.titleLinkItem}>Phiếu Hỗ Trợ</div>
                  <div className={styles.wrapperStatusLinkItem}>
                    <div className={styles.statusLinkItem} style={{ backgroundColor: EnumsTicket.BACKGROUND_COLOR_STATUS[ticketInfo?.status] }} />
                    <Typography className={styles.textStatusOrder} variant="h6">
                      {EnumsTicket.TYPE_OF_STATUS[ticketInfo?.status]}
                    </Typography>
                  </div>
                  <div className={styles.wrapperTimeLinkItem}>
                    <TIME />
                    <Typography className={styles.textTimeLinkItem} variant="caption">
                      {formatDate3(ticketInfo?.createdTime, isDay)}
                    </Typography>
                  </div>
                </div>
                <Grid item xs={12} container style={{ gap: '8px' }}>
                  <div>
                    <span className={styles.labelTimeLinkItem}>Vấn đề:</span>
                    <span className={styles.typeTimeLinkItem}> {EnumsTicket.TYPE_OF_TICKET_SUPPORT[ticketInfo?.type]}</span>
                  </div>
                </Grid>
                <Grid item xs={12} container style={{ gap: '8px' }}>
                  <div>
                    <span className={styles.labelTimeLinkItem}>Lí do: </span>

                    {ticketInfo?.reasonsInfo ? (
                      ticketInfo?.reasonsInfo?.map((reason) => reason && <span className={styles.typeTimeLinkItem}>{reason.name}</span>)
                    ) : (
                      <span className={styles.typeTimeLinkItem}>___</span>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} container style={{ gap: '8px' }}>
                  <div className={styles.textSeeMore}>
                    <span className={styles.labelTimeLinkItem}>Nội dung:</span>{' '}
                    <span className={styles.typeTimeLinkItem}>{ticketInfo?.feedbackContent ? ticketInfo?.feedbackContent : '___'}</span>
                  </div>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <LinkComp href={link} style={{ paddingBottom: ' 12px' }}>
              <Grid container>
                <Grid item xs={6} className={styles.mb}>
                  <LinkComp href={link} className={clsx(styles.imgLink, styles.imgLocal)}>
                    <ImageFallbackStatic src={QUESTION_ICON} width="122" height="100" />
                  </LinkComp>
                </Grid>
                <div className={styles.mb} style={{ gridAutoRows: 'max-content', display: 'grid', gap: 8 }}>
                  <div className={styles.titleLinkItem}>Phiếu Hỗ Trợ</div>
                  <div className={styles.wrapperStatusLinkItem}>
                    <div className={styles.statusLinkItem} style={{ backgroundColor: EnumsTicket.BACKGROUND_COLOR_STATUS[ticketInfo?.status] }} />
                    <Typography className={styles.textStatusOrder} variant="h6">
                      {EnumsTicket.TYPE_OF_STATUS[ticketInfo?.status]}
                    </Typography>
                  </div>
                  <div className={styles.wrapperTimeLinkItem}>
                    <TIME />
                    <Typography className={styles.textTimeLinkItem} variant="caption">
                      {formatDate3(ticketInfo?.createdTime, isDay)}
                    </Typography>
                  </div>
                </div>
                <Grid item xs={12} container style={{ gap: '8px' }}>
                  <div>
                    <span className={styles.labelTimeLinkItem}>Vấn đề:</span>
                    <span className={styles.typeTimeLinkItem}> {EnumsTicket.TYPE_OF_TICKET_SUPPORT[ticketInfo?.type]}</span>
                  </div>
                </Grid>
                <Grid item xs={12} container style={{ gap: '8px' }}>
                  <div>
                    <span className={styles.labelTimeLinkItem}>Lí do: </span>
                    {ticketInfo?.reasonsInfo ? (
                      ticketInfo?.reasonsInfo?.map((reason) => reason && <span className={styles.typeTimeLinkItem}>{reason.name}</span>)
                    ) : (
                      <span className={styles.typeTimeLinkItem}>___</span>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} container style={{ gap: '8px' }}>
                  <div className={styles.textSeeMore}>
                    <span className={styles.labelTimeLinkItem}>Nội dung:</span>{' '}
                    <span className={styles.typeTimeLinkItem}>{ticketInfo?.feedbackContent ? ticketInfo?.feedbackContent : '___'}</span>
                  </div>
                </Grid>
              </Grid>
            </LinkComp>
          )}
        </>
      );
      return <ShowTicket />;
    }
    return null;
  };

  // xử lý mesage nếu có chứa http trong đây
  const handleMessage = ({ content }) => {
    if (!content) return '';
    const message = content.trim();
    const arrMessage = message.split(' ') || [];
    return arrMessage.map((item, index) => {
      if (item.startsWith('http')) {
        return (
          <LinkComp href={item} style={{ color: '#0e1983', fontSize: '16px' }} key={item}>
            {item}
          </LinkComp>
        );
      }
      return item + (index === arrMessage.length - 1 ? '' : ' ');
    });
  };

  const renderFileName = (mess) => {
    const TagMessage = handleTag(mess);
    const { fileName, URLMedia, content, type, media, status, messageID } = mess || {};

    const groupFile = fileName?.map((key, index) => ({
      name: key,
      url: URLMedia[index],
      type,
      typeFile: URLMedia[index].substring(URLMedia[index].lastIndexOf('.')),
    }));
    const isMultiFile = groupFile?.length > 1 || media?.length > 1;
    const imageMsg = ({ name, url }) => {
      const urlEncodeURI = encodeURI(url.replace(/\s/g, '%20'));
      return <img alt={name} src={getLinkProxy(urlEncodeURI)} style={{ width: '100%' }} />;
    };

    const renderMedia = (mediaItem) => {
      const { name, url } = mediaItem;
      const extension = mediaItem.file?.name?.split('.').pop().toLowerCase() || mediaItem.typeFile?.split('.').pop().toLowerCase();
      const groupType = groupTypeofFileByExtension(extension).toLowerCase();
      if (groupType === 'image') {
        return (
          <Grid
            className={styles.imageColumn}
            onClick={(e) => {
              setImgProps({ url: e.target.src, name: e.target.name });
              setOpen(true);
            }}
          >
            {imageMsg({ name, url })}
          </Grid>
        );
      }
      if (groupType === 'video') {
        return (
          <Card className={clsx(styles.mb8, styles.rootCard)}>
            <CardMedia component="video" image={status === 'RAW' ? url : `${getLinkProxyVideo(url)}#t=0.001`} key={url} controls preload="metadata" />
          </Card>
        );
      }
      return (
        <div key={url} className={styles.boxFile}>
          <InsertDriveFileSharpIcon color="primary" />{' '}
          <a href={status === 'RAW' ? url : getLinkProxyFile(url)} target="blank">
            {name}
          </a>
        </div>
      );
    };

    return (
      <>
        <div key={messageID} className={clsx(styles.imageRow, isMultiFile && styles.imageRowMulti)}>
          {status === 'RAW' ? media?.map(renderMedia) : groupFile?.map(renderMedia)}
        </div>
        <div>
          {TagMessage}
          <div style={{ float: TagMessage && 'left', padding: TagMessage && ' 0px 5px' }}>{handleMessage({ content })}</div>
        </div>
      </>
    );
  };
  const PopupImage = ({ open, handleClose, imgProps }) => (
    <Modal
      open={open}
      onClose={(_, reason) => {
        // TODO: prevent close when click outside
        if (reason !== 'backdropClick') {
          handleClose();
        }
      }}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 0,
      }}
      className={styles.chatModal_root}
    >
      <div className={styles.chatBox}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton className={styles.chatModal_actionBtn} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <IconButton className={styles.chatModal_actionBtn} onClick={() => handleDownload(imgProps)}>
            <DownloadIcon />
          </IconButton>
        </div>
        <div className={styles.popupContainer_imgContainer}>
          <img className={styles.popupContainer_img} alt={imgProps.name} src={imgProps.url} style={{ width: '100%' }} />
        </div>
      </div>
    </Modal>
  );

  return (
    <>
      {message?.mess?.map((mess) => {
        const { messageID, messageType, createdTime } = mess || {};
        return (
          <div
            id={`message-${messageID}`}
            key={messageID}
            data-curr={message.date}
            className={clsx(
              styles.messageContainer,
              messageType === MY_SELF ? styles.messageContainer_customer : styles.messageContainer_cs,
              messageID === parseInt(scrollMessageID, 10) && styles.listMessage_module_message_animation,
              'message_content',
            )}
          >
            <div className={clsx(styles.container_avatar_cs, !message.messShowIcon.includes(messageID) && styles.not_have_avt)}>
              <ICON_MOBILE_AVATAR_CS />
            </div>
            {statusLoading.isDisplaySent && (
              <div className={clsx(styles.container_sent, !message.messShowSent.includes(messageID) && styles.not_have_sent)}>
                {statusLoading.isSent ? <ICON_MOBILE_ICON_SENT /> : <ICON_MOBILE_ICON_SENDING />}
              </div>
            )}

            <div className={clsx(messageType !== MY_SELF ? styles.receiverMessage : styles.senderMessage, styles.content)}>
              <>{renderFileName(mess)}</>
              <span className={styles.createdTime}>{DateTimeUtils.getFormattedDate(new Date(createdTime), 'HH:mm')}</span>
            </div>
          </div>
        );
      })}
      <PopupImage open={isOpen} handleClose={handleClose} imgProps={imgProps} />
      <Grid
        ref={headDatePicker}
        id="headDatePicker"
        data-next={message.date}
        data-prev={message.prevDate}
        onClick={() => setShowDatePicker(!isShowDatePicker)}
        className={clsx(styles.timeMessage, 'messageHeadDatePicker')}
      >
        {message.date}
      </Grid>
    </>
  );
};

export default Message;
