import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { getFirst, isValid, OrderClient, TicketClient } from 'clients';
import { InfoFormControl, LinkComp, Modal } from 'components/atoms';
import { ONE_DAY } from 'constants/data';
import { BRAND_NAME, ENUM_ORDER_STATUS_LABEL } from 'constants/Enums';
import EnumsTicket from 'constants/Enums/EnumsTicket';
import { FEEDBACKSTATUS_ICON } from 'constants/Images';
import { getPathProductBySlug } from 'constants/Paths';
import { useSetting } from 'context';
import { useModal } from 'hooks';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ProductServiceV2 } from 'services';
import { DateTimeUtils, ImageFallback } from 'utils';
import NotifyUtils from 'utils/NotifyUtils';
import { v4 as uuidv4 } from 'uuid';
import UploadImages from '../UploadImages';
import styles from './style.module.css';

// const ChatMessages = styled.div`
//   overflow-y: scroll;
//   overflow: hidden;
// `;

const TicketDetailModal = (props) => {
  const { mapReasonsTicket = new Map() } = useSetting();
  // const { user } = useAuth();

  const { visible, onClose, user, reloadFunc, ticketId } = props;
  const name = user?.name || user?.email || '';
  // const { ticketId, orderId, bankName, bankAccountName, bankBranch, bankCode, feedbackContent, imageUrls, statusOrder, reasonCodes, type, status } =
  //   ticket;

  const [, setIsLoading] = useState(true);
  const [isShowSendFeedback, toogleSendFeedback] = useModal(false);

  const [reloadFeedbacks, setReloadFeedbacks] = useState(0);

  const [detail, setDetail] = useState({});

  let isShowBankAccount = false;

  detail?.reasonCodes?.forEach((code) => {
    if (mapReasonsTicket.get(code)?.showBankAccount) isShowBankAccount = true;
  });

  // load data
  useEffect(() => {
    async function fetchData() {
      const ticketDetailRes = await TicketClient.getDetailTicket({ ticketId });
      if (!isValid(ticketDetailRes)) {
        setIsLoading(false);
        NotifyUtils.error(' Không tìm thấy thông tin');
        onClose();
        return;
      }
      const ticketDetail = getFirst(ticketDetailRes);
      const { feedbacks = [], feedbackConent: feedbackContentDetail, reasonCodes } = ticketDetail;

      ticketDetail.reasonCodesList = reasonCodes?.map((reasonCode) => mapReasonsTicket.get(reasonCode)).filter((item) => item);
      ticketDetail.listFeedback =
        feedbacks?.length > 0 && feedbacks[feedbacks.length - 1]?.content === feedbackContentDetail ? feedbacks.slice(0, -1) : feedbacks;
      if (ticketDetail.orderId) {
        const orderRes = await OrderClient.getOrderById({ id: ticketDetail.orderId });
        ticketDetail.order = getFirst(orderRes);
        ticketDetail.isOrderExist = isValid(orderRes);
      } else {
        ticketDetail.isOrderExist = false;
      }

      if (ticketDetail.sku) {
        const productInfoRes = await ProductServiceV2.getProductInfoFromSkus({ skus: [ticketDetail.sku] });
        ticketDetail.productInfo = getFirst(productInfoRes);
      }

      setDetail(ticketDetail);
      setIsLoading(false);
    }

    fetchData();
  }, [reloadFeedbacks, ticketId]);

  const [currentImage, setCurrentImage] = useState('');
  const [open, toggle] = useModal();

  const handleClickImage = (imageUrl) => {
    setCurrentImage(imageUrl);
    toggle();
  };

  // submit feedback
  const [feedback, setFeedback] = useState({
    feedbackValue: '',
  });
  const handleChange = (e) => {
    setFeedback({ ...feedback, feedbackValue: e.target.value });
  };

  const handleOnChangeImages = (imgs) => {
    setTimeout(() => {
      setFeedback({ ...feedback, isDisableSubmit: false, attachments: imgs });
    }, 1500);
  };

  const disableSubmitFeedback = () => {
    setFeedback({ ...feedback, isDisableSubmit: true });
  };

  const handleAcceptFeedback = async () => {
    const result = await TicketClient.acceptFeedback(detail);
    if (isValid(result)) {
      NotifyUtils.success('Thành công');
      onClose();
      reloadFunc();
    } else {
      NotifyUtils.error(result.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = feedback.feedbackValue;

    try {
      if (!content) {
        NotifyUtils.error('Vui lòng nhập nội dung phản hồi');
        return;
      }
      const send = await TicketClient.sendFeedback({ ticketId: detail.ticketId, content, attachments: feedback?.attachments || [] });
      if (!isValid(send)) throw new Error(send.message || 'có lỗi xảy ra');
      toogleSendFeedback();
      setFeedback({ feedbackValue: '' });
      setReloadFeedbacks(reloadFeedbacks + 1);
      NotifyUtils.success('Gửi phản hồi thành công');
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  };

  return (
    <>
      <Modal open={visible} onClose={onClose} className="ticket-modal">
        <div className={styles.feedback_order}>
          <Grid className={styles.title} container justifyContent="space-between">
            <Grid />
            <Grid>
              <div style={{ display: 'flex' }}>
                <Image src={FEEDBACKSTATUS_ICON} width={24} height={24} />
                <Typography className={styles.statusTitle}>{EnumsTicket?.TicketStatus[detail?.status]?.label || 'Đang xử lý'}</Typography>
              </div>
            </Grid>
            <Grid>
              <Grid container justifyContent="flex-end">
                <IconButton aria-label="close" onClick={onClose} style={{ float: 'right', padding: '0px' }}>
                  <FontAwesomeIcon icon={faTimes} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          <Grid container className={styles.container}>
            <div className={styles.info_bank_title}>Thông tin phản hồi </div>
            <div className={styles.info_group}>
              <Grid item xs={12} md={6} className={styles.text_body}>
                <span className={styles.label}>Tên khách hàng: </span>
                <span className={styles.value}>{name}</span>
              </Grid>
              {detail?.phone && (
                <Grid item xs={12} md={6} className={styles.text_body}>
                  <span className={styles.label}>Số điện thoại: </span>
                  <span className={styles.value}>{detail?.phone}</span>
                </Grid>
              )}
              {detail?.email && (
                <Grid item xs={12} md={6} className={styles.text_body}>
                  <span className={styles.label}>Email: </span>
                  <span className={styles.value}>{detail?.email}</span>
                </Grid>
              )}

              <Grid item xs={12} md={6} className={styles.text_body}>
                {detail?.orderId && (
                  <>
                    <span className={styles.label}>Mã đơn hàng: </span>
                    <span className={styles.value}>
                      #{detail?.orderId}
                      {!detail.isOrderExist ? (
                        <span style={{ color: 'rgb(204, 85, 85)' }}> (không tìm thấy thông tin)</span>
                      ) : (
                        <span style={{ color: '#000099' }}> {`(${ENUM_ORDER_STATUS_LABEL[detail?.order?.status] || 'Khác'})` || ''}</span>
                      )}
                    </span>
                  </>
                )}
              </Grid>
              <Grid item xs={12} md={12} className={styles.text_body} style={{ display: 'flex' }}>
                {detail?.productInfo && (
                  <>
                    <span className={styles.label}>Sản phẩm: </span>
                    &nbsp;
                    <LinkComp href={`${getPathProductBySlug(detail?.productInfo?.slug)}`} target="_blank" style={{ padding: '0px' }}>
                      <span style={{ color: 'green', fontSize: '15px', paddingRight: '5px' }}>{detail?.productInfo?.name}</span>
                    </LinkComp>
                  </>
                )}
              </Grid>
              <Grid item xs={12} md={6} className={styles.text_body}>
                <span className={styles.label}>Vấn đề cần hỗ trợ: </span>
                <span className={styles.value}>{EnumsTicket.MapTicketTypeName[detail?.type]}</span>
              </Grid>
              {detail?.reasonCodesList?.length > 0 && (
                <Grid item xs={12} md={6} container direction="row" className={styles.text_body}>
                  <span className={styles.label}>Lý do cần hỗ trợ: </span>
                  {detail?.reasonCodesList?.map((reason) =>
                    reason ? (
                      <Grid item key={uuidv4()}>
                        <Button variant="contained" key={uuidv4()} disabled className={styles.reason_button}>
                          {reason.name}
                        </Button>
                      </Grid>
                    ) : null,
                  )}
                </Grid>
              )}
            </div>
            {detail?.type === EnumsTicket.TicketEnums.ORDER && isShowBankAccount && (
              <>
                <Grid container>
                  <div className={styles.info_bank_title}>Thông tin tài khoản ngân hàng </div>
                </Grid>
                <Grid item xs={6} md={6} className={styles.text_body}>
                  <span className={styles.label}>Tên chủ tài khoản: </span>
                  <span className={styles.value}>{detail?.bankAccountName}</span>
                </Grid>
                <Grid item xs={6} md={6} className={styles.text_body}>
                  <span className={styles.label}>Ngân hàng: </span>
                  <span className={styles.value}>{detail?.bankName}</span>
                </Grid>
                <Grid item xs={6} md={6} className={styles.text_body}>
                  <span className={styles.label}>Số tài khoản: </span>
                  <span className={styles.value}>{detail?.bankCode}</span>
                </Grid>
                <Grid item xs={6} md={6} className={styles.text_body}>
                  <span className={styles.label}>Chi nhánh: </span>
                  <span className={styles.value}>{detail?.bankBranch}</span>
                </Grid>
              </>
            )}
            <Grid container className={styles.content}>
              <div className={styles.info_bank_title} style={{ marginBottom: '7px' }}>
                Nội dung hỗ trợ
              </div>
              <Grid item xs={12} className={styles.text_body}>
                <Box className={styles.feedbackWrap}>
                  <Box className={styles.feedbackConent}>
                    {detail?.feedbackContent || `Bạn chưa nhập nội dung cần hỗ trợ. Nhấn "Gửi phản hồi" để thêm nội dung hỗ trợ nhé`}
                  </Box>
                  {detail?.imageUrls && detail?.imageUrls.length !== 0 && (
                    <Box className={styles.feedbackImg}>
                      {detail?.imageUrls?.map((imageUrl) => (
                        <Box onClick={() => handleClickImage(imageUrl)} key={uuidv4()} style={{ marginRight: '8px' }}>
                          <img className={styles.ticket_img} width="90" height="90" src={imageUrl} alt="ticket img" />
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>

                {/* remove last item -> description */}
                {detail?.listFeedback?.map(({ source, createdTime, content, attachments = [] }) => (
                  <Box className={styles.feedbackReturn} key={uuidv4()}>
                    <Box className={styles.feedbackReturn_title}>
                      <Image
                        src={source === 'CUSTOMER' ? '/images/feedbackDetail/userFeedback.png' : '/images/feedbackDetail/logoThuocsi.png'}
                        width={22}
                        height={22}
                      />
                      <Typography className={styles.nameTS}>{source === 'CUSTOMER' ? 'Tôi' : BRAND_NAME}</Typography>
                      <Typography className={styles.date}>{DateTimeUtils.getFormattedDate(new Date(createdTime), 'DD/MM/YYYY HH:mm')}</Typography>
                    </Box>
                    <Box className={styles.feedbackWrap}>
                      <Box className={styles.feedbackConent}>{content}</Box>
                      <Box className={styles.feedbackImg}>
                        {attachments &&
                          attachments.map((item) => (
                            <Box onClick={() => handleClickImage(item)} key={uuidv4()} style={{ marginRight: '8px' }}>
                              <ImageFallback className={styles.ticket_img} src={item} width={90} height={90} key={uuidv4()} />
                            </Box>
                          ))}
                      </Box>
                    </Box>
                  </Box>
                ))}

                {/* nếu cái đầu tiền là của thuocsi ers mới hiện */}
                {[EnumsTicket.TicketStatus.IN_PROCESS.code, EnumsTicket.TicketStatus.PENDING.code, EnumsTicket.TicketStatus.REPLIED.code].indexOf(
                  detail?.status,
                ) >= 0 &&
                  !isShowSendFeedback &&
                  detail.status !== EnumsTicket.TicketStatus.DONE.code &&
                  (detail?.listFeedback?.length > 0 && detail?.listFeedback[0] && detail?.listFeedback[0]?.source !== 'CUSTOMER' ? (
                    <Box className={styles.accept}>
                      {!detail?.waitForCustomerFeedback ? (
                        <Box>
                          Bạn hài lòng với nội dung phản hồi từ {BRAND_NAME}?. Nếu có, hãy chọn "Tôi hài lòng". Nếu không, vui lòng chọn "Gửi phản
                          hồi" trước ngày{' '}
                          {DateTimeUtils.getFormattedDate(new Date(+new Date(detail?.listFeedback[0].createdTime) + ONE_DAY), 'DD/MM/YYYY HH:mm')}.
                          Sau ngày này, {BRAND_NAME} xem như bạn không có phản hồi gì thêm và sẽ đóng yêu cầu hỗ trợ.
                        </Box>
                      ) : (
                        <Box />
                      )}
                      <Box className={styles.btnAcept}>
                        <Button className={styles.buttonActive} onClick={toogleSendFeedback}>
                          Gửi phản hồi
                        </Button>
                        {!detail?.waitForCustomerFeedback && (
                          <Button className={styles.buttonInActive} onClick={handleAcceptFeedback}>
                            Tôi Hài lòng
                          </Button>
                        )}
                      </Box>
                    </Box>
                  ) : (
                    <Box className={styles.accept}>
                      <Box />
                      <Box className={styles.btnAcept}>
                        <Button className={styles.buttonActive} onClick={toogleSendFeedback}>
                          Gửi phản hồi
                        </Button>
                      </Box>
                    </Box>
                  ))}
              </Grid>
            </Grid>
            {isShowSendFeedback && (
              <>
                <InfoFormControl xs={12} htmlFor="description" key={uuidv4()}>
                  <br />
                  <TextField
                    id="description"
                    key="formFeedback"
                    name="formFeedback"
                    multiline
                    minRows={4}
                    variant="outlined"
                    placeholder="Mời nhập nội dung phản hồi"
                    className={styles.formfeedback}
                    onBlur={handleChange}
                    defaultValue={feedback.feedbackValue}
                  />
                </InfoFormControl>
                <Grid className={styles.imagesField} item xs={12} container justifyContent="space-evenly" spacing={1}>
                  <InfoFormControl label="Hình ảnh minh họa" xs={12} className={styles.customText} />
                  <br />
                  <UploadImages onChange={handleOnChangeImages} setLoading={disableSubmitFeedback} />
                </Grid>
                <Box className={styles.buttonSend}>
                  <Button onClick={toogleSendFeedback} className={styles.buttonCancel}>
                    Hủy
                  </Button>
                  <Button className={styles.buttonActive} onClick={handleSubmit} disabled={feedback.isDisableSubmit}>
                    Gửi
                  </Button>
                </Box>
              </>
            )}
          </Grid>
        </div>
      </Modal>
      <Modal open={open} onClose={toggle}>
        <div className={styles.image_modal}>
          <IconButton onClick={toggle} className={styles.close_button}>
            <CloseIcon />
          </IconButton>
          <img src={currentImage} style={{ maxWidth: '800px', maxHeight: '800px' }} alt="ticket img" />
        </div>
      </Modal>
    </>
  );
};

export default TicketDetailModal;
