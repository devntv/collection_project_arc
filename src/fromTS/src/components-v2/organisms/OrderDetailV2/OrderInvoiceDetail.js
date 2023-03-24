/* eslint-disable no-nested-ternary */
import { Box, Divider, Grid, Tooltip, Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import DeleteIcon from '@material-ui/icons/Delete';
import { CustomerClient, isValidWithoutData } from 'clients';
import clsx from 'clsx';
import { Button } from 'components/atoms';
import { CustomModal, NewInvoiceModal, NewRegisterOrderInvoiceForm } from 'components/mocules';
import NewOrderInvoiceForm from 'components/mocules/NewOrderInvoiceForm';
import { ENUM_INVOICE_STATUS, ENUM_ORDER_STATUS } from 'constants/Enums';
import { ICON_EDIT_INVOICE, ICON_UP_INVOICE } from 'constants/Icons';
import { useAuth, useSetting } from 'context';
import { useModal } from 'hooks';
import { Fragment, useState } from 'react';
import { gtag } from 'utils';
import { remainTime } from 'utils/calculateTimeLeft';
import NotifyUtils from 'utils/NotifyUtils';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

export default function OrderInvoiceDetail({ order, listInvoiceInfo, invoiceFee = [] }) {
  const { customerInfo } = useAuth();
  const { customerEmail = customerInfo?.email, invoice, invoices, status, orderId, invoiceInfo } = order;
  const [seeMore, setSeeMore] = useState(false);
  const [invoiceRes, setInvoiceRes] = useState(invoice);
  const [openModalInvoice, toggleOpenModalInvoice] = useModal();
  const [step, setStep] = useState(1);
  const [check, setCheck] = useState(false);
  const { mapSeller } = useSetting();
  const [isShowPopupConfirm, togglePopupConfirm] = useModal();

  const handleChange = () => {
    setSeeMore(!seeMore);
  };
  const getValueInvoice = (value) => {
    setInvoiceRes(value);
  };
  const getStepInvoiceAdd = (value) => {
    setStep(value + 1);
  };
  const getStepInvoiceSubtract = (value) => {
    setStep(value - 1);
  };

  const {
    reconcileTime,
    // arisingInvoiceTime = null,
    numberOfUpdates = 0,
  } = invoiceInfo || {};
  const now = +new Date();
  const deliveredTime = (reconcileTime && +new Date(reconcileTime)) || 0;

  const enableBtn = () => {
    switch (status) {
      case ENUM_ORDER_STATUS.CANCEL:
        return false;
      case ENUM_ORDER_STATUS.DELIVERING:
        return !invoice?.invoiceRequest;
      case ENUM_ORDER_STATUS.DELIVERED:
      case ENUM_ORDER_STATUS.COMPLETED:
        if (!invoice?.invoiceRequest) return deliveredTime !== 0 && remainTime(now, deliveredTime) <= 7;
        return deliveredTime !== 0 && remainTime(now, deliveredTime) <= 14 && numberOfUpdates === 0;
      default:
        return true;
    }
  };

  const enableBtnCancel = () => {
    switch (status) {
      case ENUM_ORDER_STATUS.CANCEL:
        return false;
      case ENUM_ORDER_STATUS.DELIVERING:
      case ENUM_ORDER_STATUS.DELIVERED:
      case ENUM_ORDER_STATUS.COMPLETED:
        return true;
      default:
        return false;
    }
  };

  const renderStatusInvoice = () => {
    if (invoices?.length > 0) {
      return (
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid
            container
            item
            direction="row"
            alignItems="center"
            style={{ display: 'flex' }}
            md={6}
            justifyContent="flex-start"
            className={styles.wrapStatusInvoice}
          >
            <Box display="flex" alignItems="center">
              <Box style={{ backgroundColor: '#0CBA69' }} className={styles.statusInvoice} />
              <Typography className={styles.statusTitleInvoice}>{ENUM_INVOICE_STATUS.EXPORT}</Typography>
            </Box>
          </Grid>
          {status !== 'CANCEL' && enableBtn() && (
            <>
              <Box className={styles.wrapBtnInvoice}>
                <Button className="edit_invoice" onClick={toggleOpenModalInvoice}>
                  <ICON_EDIT_INVOICE />
                  <Typography className="titleInvoice"> chỉnh sửa thông tin</Typography>
                </Button>
              </Box>
            </>
          )}
        </Grid>
      );
    }
    if (invoiceRes?.invoiceRequest)
      return (
        <Grid container alignItems="center" justifyContent="space-between" xs={12} item>
          <Grid
            container
            item
            direction="row"
            alignItems="center"
            style={{ display: 'flex' }}
            md={6}
            justifyContent="flex-start"
            className={styles.wrapStatusInvoice}
          >
            <Box display="flex" alignItems="center">
              <Box style={{ backgroundColor: '#D4323B' }} className={styles.statusInvoice} />
              <Typography className={styles.statusTitleInvoice}>{ENUM_INVOICE_STATUS.REQUEST}</Typography>
            </Box>
          </Grid>
          <Box className={styles.wrapBtn}>
            {status !== 'CANCEL' && enableBtn() && (
              <>
                <Box className={styles.wrapBtnInvoice}>
                  <Button className="edit_invoice" onClick={toggleOpenModalInvoice}>
                    <ICON_EDIT_INVOICE />
                    <Typography className="titleInvoice"> chỉnh sửa thông tin</Typography>
                  </Button>
                </Box>
                <Box className={styles.wrapBtnInvoice}>
                  {enableBtnCancel() ? (
                    <Tooltip title="Đã quá thời hạn hủy yêu cầu xuất hóa đơn" arrow>
                      <Button className={clsx('edit_invoice', styles.endInvoiceBG)}>
                        <DeleteIcon className="iconEndInvoiceBG" />
                        <Typography className="titleEndInvoiceBG">Hủy Yêu Cầu</Typography>
                      </Button>
                    </Tooltip>
                  ) : (
                    <Button className={clsx('edit_invoice', styles.endInvoice)} onClick={togglePopupConfirm}>
                      <DeleteIcon className="iconEndInvoice" />
                      <Typography className="titleEndInvoice">Hủy Yêu Cầu</Typography>
                    </Button>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Grid>
      );

    return (
      <Grid container alignItems="center" justifyContent="space-between" xs={12} item>
        <Grid
          container
          item
          direction="row"
          alignItems="center"
          style={{ display: 'flex' }}
          md={6}
          justifyContent="flex-start"
          className={styles.wrapStatusInvoice}
        >
          <Box style={{ backgroundColor: '#D4323B' }} className={styles.statusInvoice} />
          <Typography className={styles.statusTitleInvoice}>{ENUM_INVOICE_STATUS.NOT}</Typography>
        </Grid>
        {status !== 'CANCEL' && enableBtn() && (
          <>
            <Box className={styles.wrapBtnInvoice}>
              <Button className={styles.sendData} type="submit" onClick={toggleOpenModalInvoice}>
                Yêu cầu xuất hóa đơn
              </Button>
            </Box>
          </>
        )}
      </Grid>
    );
  };

  const renderInfoInvoice = (data) => {
    const { invoiceData, source: seller = {}, vatType = '' } = data;
    const sellerInfo = mapSeller?.get(seller) || null;

    let name = '';
    if (vatType === 'VAT_ALL') {
      name = 'Chứng Từ Hoá đơn Medx 5%, 8%, 10%';
    } else if (seller === 'MEDX') {
      name = 'Chứng Từ Hóa Đơn MedX 5%,10%';
    } else if (seller === 'MEDX-8') {
      name = 'Chứng Từ Hóa Đơn MedX 8%';
    } else if (seller === sellerInfo?.code) {
      name = sellerInfo.fullName;
    }

    return (
      <Fragment key={uuidv4()}>
        {seller === 'MEDX' && invoiceData && (
          <div className={styles.headInvocie}>
            <Typography className={styles.titleSellerInvoice}>{name}</Typography>
            <Grid item xs={12} className="item-divider">
              <Divider />
            </Grid>
            <Box className={styles.wrapListInvoice}>
              {invoiceData?.map((item) => (
                <Box className={styles.wrapItemInvoice} key={uuidv4()}>
                  <Grid container item xs={12}>
                    <Box width="100%" className={styles.infoInvoice}>
                      <a href={item.pdfUrl} target="_blank" className={styles.linkInvoice} rel="noreferrer">
                        <Typography className={styles.titleInfoInvoice}>{`${item.displayName}.pdf`}</Typography>

                        <Tooltip title={`Xuất Hóa Đơn ${item.displayName}`} arrow>
                          <CloudDownloadIcon className="svg" />
                        </Tooltip>
                      </a>
                    </Box>
                  </Grid>
                </Box>
              ))}
            </Box>
          </div>
        )}
        {seller === 'MEDX-8' && seller !== 'MEDX' && invoiceData && (
          <div className={styles.headInvocie}>
            <Typography className={styles.titleSellerInvoice}>{name}</Typography>
            <Grid item xs={12} className="item-divider">
              <Divider />
            </Grid>
            <Box className={styles.wrapListInvoice}>
              {invoiceData?.map((item) => (
                <Box className={styles.wrapItemInvoice} key={uuidv4()}>
                  <Grid container item xs={12}>
                    <Box width="100%" className={styles.infoInvoice}>
                      <a href={item.pdfUrl} target="_blank" className={styles.linkInvoice} rel="noreferrer">
                        <Typography className={styles.titleInfoInvoice}>{`${item.displayName}.pdf`}</Typography>

                        <Tooltip title={`Xuất Hóa Đơn ${item.displayName}`} arrow>
                          <CloudDownloadIcon className="svg" />
                        </Tooltip>
                      </a>
                    </Box>
                  </Grid>
                </Box>
              ))}
            </Box>
          </div>
        )}
        {seller === sellerInfo?.code && seller !== 'MEDX' && seller !== 'MEDX-8' && invoiceData && (
          <div className={styles.headInvocie}>
            <Typography className={styles.titleSellerInvoice}>{name}</Typography>
            <Grid item xs={12} className="item-divider">
              <Divider />
            </Grid>
            <Box className={styles.wrapListInvoice}>
              {invoiceData?.map((item) => (
                <Box className={styles.wrapItemInvoice} key={uuidv4()}>
                  <Grid container item xs={12}>
                    <Box width="100%" className={styles.infoInvoice}>
                      <a href={item.pdfUrl} target="_blank" className={styles.linkInvoice} rel="noreferrer">
                        <Typography className={styles.titleInfoInvoice}>{`${item.displayName}.pdf`}</Typography>

                        <Tooltip title={`Xuất Hóa Đơn ${item.displayName}`} arrow>
                          <CloudDownloadIcon className="svg" />
                        </Tooltip>
                      </a>
                    </Box>
                  </Grid>
                </Box>
              ))}
            </Box>
          </div>
        )}
      </Fragment>
    );
  };

  const handleDeleteInvoice = async () => {
    const data = {
      companyName: invoiceRes?.companyName || '',
      companyAddress: invoiceRes?.companyAddress || '',
      taxCode: invoiceRes?.taxCode || '',
      email: invoiceRes?.email || '',
      orderId,
      invoiceRequest: false,
    };

    try {
      const requestInvoiceResult = await CustomerClient.updateInvoiceInfoOrder(data);
      if (!isValidWithoutData(requestInvoiceResult)) {
        let message = '';
        const { errorCode } = requestInvoiceResult;
        switch (errorCode) {
          case 'ERR_UPDATE_MANUALLY_EXPORTED_INVOICE':
            message = ' Đơn hàng không thể giao thành công cho quý khách. Vui lòng không cập nhật thông tin cho hóa đơn của đơn hàng này';
            break;
          case 'ERR_UPDATE_MANUALLY_IMPORTED_INVOICE':
            message = 'Vui lòng không cập nhật thông tin cho hóa đơn của đơn hàng này';
            break;
          case 'ERR_UPDATE_INVOICE_MULTIPLE_TIMES':
            message = 'Đơn hàng yêu cầu thay đổi thông tin hóa đơn > 1 lần';
            break;
          case 'ERR_INVALID_CHANGE_REQUEST_TIME':
            message = 'Không thể yêu cầu xuất hóa đơn sau 7 ngày.';
            break;
          case 'ERR_INVALID_CHANGE_INVOICE_INFO_TIME':
            message = 'Không thể thay đổi thông tin xuất hóa đơn sau 14 ngày.';
            break;
          default:
            message = requestInvoiceResult.message || 'Gửi cập nhật thông tin hóa đơn thất bại';
        }

        throw new Error(message);
      }
      NotifyUtils.success('Đã hủy yêu cầu xuất hóa đơn thành công');
      // clear
      togglePopupConfirm();
      getValueInvoice(data);
      gtag.requestInvoice();
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  };
  return (
    <>
      <Grid container className={clsx(styles.orderInvoiceWapper)} item xs={12}>
        <Grid container item xs={12} direction="row" style={{ marginTop: '6px' }}>
          {renderStatusInvoice()}
        </Grid>
        {/* apo-1080 */}
        {invoiceFee?.length > 0 &&
          invoiceFee.map(({ code, invoiceData }) => (
            <div className={styles.headInvocie} key={code}>
              <Typography className={styles.titleSellerInvoice}>Hoá đơn phí bán hàng - người mua</Typography>
              <Grid item xs={12} className="item-divider">
                <Divider />
              </Grid>
              <Box className={styles.wrapListInvoice}>
                {invoiceData?.map((item) => (
                  <Box className={styles.wrapItemInvoice} key={uuidv4()}>
                    <Grid container item xs={12}>
                      <Box width="100%" className={styles.infoInvoice}>
                        <a href={item.pdfUrl} target="_blank" className={styles.linkInvoice} rel="noreferrer">
                          <Typography className={styles.titleInfoInvoice}>{`${item.displayName}.pdf`}</Typography>

                          <Tooltip title={`Xuất Hóa Đơn ${item.displayName}`} arrow>
                            <CloudDownloadIcon className="svg" />
                          </Tooltip>
                        </a>
                      </Box>
                    </Grid>
                  </Box>
                ))}
              </Box>
            </div>
          ))}
        {invoices && invoices?.map((data) => renderInfoInvoice(data))}
        {invoiceRes?.invoiceRequest ? (
          <>
            <Grid item xs={12} className="item-divider" style={{ height: '.5px' }}>
              <Divider style={{ height: '.5px' }} />
            </Grid>
            {status !== 'CANCEL' && (
              <Grid item xs={12} className={styles.wrapInfoInvoice}>
                <Box className={styles.group}>
                  <Accordion className="header-accordion" expanded={seeMore}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" style={{ marginBottom: '4px' }}>
                      <Typography className="title">Thông tin xuất hóa đơn</Typography>
                      <Box>
                        {seeMore ? (
                          <Box className="moreView" onClick={handleChange}>
                            <p>Ẩn</p>
                            <ICON_UP_INVOICE />
                          </Box>
                        ) : (
                          <Box onClick={handleChange} className="invoiceMore">
                            <p>Xem Thêm</p>
                            <ICON_UP_INVOICE />
                          </Box>
                        )}
                      </Box>
                    </Box>
                    <AccordionDetails className="accordionDetail">
                      <Grid container xs={12} item>
                        <Grid item xs={2} direction="row" className={styles.contentDetail} container>
                          <span className={styles.contentValueInfo}> tên Doanh nghiệp</span>
                        </Grid>
                        <Grid item xs={10} direction="row" className={styles.contentValue} container>
                          <span className={styles.contentValueInfo}>{invoiceRes?.companyName || ''}</span>
                        </Grid>
                        <Grid item xs={2} direction="row" className={styles.contentDetail} container>
                          <span className={styles.contentValueInfo}> mã số thuế</span>
                        </Grid>
                        <Grid item xs={10} direction="row" className={styles.contentValue} container>
                          <span className={styles.contentValueInfo}>{invoiceRes?.taxCode || ''}</span>
                        </Grid>
                        <Grid item xs={2} direction="row" className={styles.contentDetail} container>
                          <span className={styles.contentValueInfo}>Email</span>
                        </Grid>
                        <Grid item xs={10} direction="row" className={clsx(styles.contentValue, styles.text_lowercase)} container>
                          <span className={styles.contentValueInfo}> {invoiceRes?.email || ''}</span>
                        </Grid>
                        <Grid item xs={2} direction="row" className={styles.contentDetail} container>
                          <span className={styles.contentValueInfo}> Địa chỉ</span>
                        </Grid>
                        <Grid item xs={10} direction="row" className={styles.contentValue} container>
                          <span className={styles.contentValueInfo}>{invoiceRes?.companyAddress}</span>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Grid>
            )}
          </>
        ) : null}
      </Grid>

      {openModalInvoice && (
        <NewInvoiceModal
          width="652px"
          visible={openModalInvoice}
          onClose={toggleOpenModalInvoice}
          // orderId={orderId}
          customerEmail={customerEmail}
          // invoice={invoice}
          // isMobile={isMobile}
          setCheck={setCheck}
          check={check}
          step={step}
          getStepInvoiceSubtract={getStepInvoiceSubtract}
          title={invoiceRes?.invoiceRequest ? 'chỉnh sửa thông tin xuất hóa đơn' : 'Thông tin xuất hóa đơn'}
        >
          {!invoiceRes?.invoiceRequest && listInvoiceInfo.length > 0 && (
            <NewOrderInvoiceForm
              onClose={toggleOpenModalInvoice}
              orderId={orderId}
              invoice={invoice}
              customerEmail={customerEmail || customerInfo?.email || ''}
              getValueInvoice={getValueInvoice}
              step={step}
              setStep={setStep}
              getStepInvoiceAdd={getStepInvoiceAdd}
              invoiceRes={invoiceRes}
              listInvoiceInfo={listInvoiceInfo}
              toggleOpenModalInvoice={toggleOpenModalInvoice}
              check={check}
              setCheck={setCheck}
            />
          )}
          {!invoiceRes?.invoiceRequest && listInvoiceInfo.length === 0 && (
            <NewRegisterOrderInvoiceForm
              onClose={toggleOpenModalInvoice}
              orderId={orderId}
              invoice={invoice}
              getValueInvoice={getValueInvoice}
              invoiceRes={invoiceRes}
              customerEmail={customerEmail || customerInfo?.email || ''}
              listInvoiceInfo={listInvoiceInfo}
            />
          )}
          {invoiceRes?.invoiceRequest && (
            <NewRegisterOrderInvoiceForm
              listInvoiceInfo={listInvoiceInfo}
              onClose={toggleOpenModalInvoice}
              orderId={orderId}
              invoice={invoice}
              getValueInvoice={getValueInvoice}
              invoiceRes={invoiceRes}
              customerEmail={customerEmail || customerInfo?.email || ''}
            />
          )}
        </NewInvoiceModal>
      )}

      {isShowPopupConfirm && (
        <CustomModal
          visible={isShowPopupConfirm}
          onClose={togglePopupConfirm}
          title="Thông báo"
          btnOk="Đồng ý"
          icon="!"
          onClickOk={handleDeleteInvoice}
          btnOnClose="Không"
        >
          <Typography>
            Bạn có muốn <span className={styles.descInvoice}>hủy yêu cầu xuất hóa đơn</span> không?
          </Typography>
        </CustomModal>
      )}
    </>
  );
}
