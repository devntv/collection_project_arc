/* eslint-disable react/jsx-wrap-multilines */
import Collapse from '@material-ui/core/Collapse';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';
import { ACCOUNT, HOME_PAGE, MY_ACCOUNT } from 'constants/Paths';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { GENERAL_DOMAIN, NOTIFY_IN_TOP_BAR, NOTIFY_IN_TOP_BAR_UIV2 } from 'sysconfig';
import { checkTrialSelected } from 'utils/transVersion';
import { useStore } from 'zustand-lib/storeGlobal';

const AlertSection = ({
  beta,
  pathname,
  isMobile,
  notifyWidth,
  marginTopForHeader,
  isAuthenticated,
  status,
  asPath,
  isMobileProdPage = false,
  isMobileV2 = false,
}) => {
  const KEY_COOKIES = 'hasHidden';
  const offNotify = beta && pathname === ACCOUNT;
  const user = useStore((state) => state?.user || {});
  const hasHidden = Cookies.get(KEY_COOKIES);
  const [open, setOpen] = useState(hasHidden !== 'true');
  const showTrial = pathname === HOME_PAGE || pathname === '/conversations';
  const hideNotifyInTop = [ACCOUNT, '/conversations'];

  // internet low
  // const getIsShowLocalThuocssiVn = useStore((state) => state.getIsShowLocalThuocssiVn);
  // const getHostName = useStore((state) => state.getHostName);

  return (
    <div>
      {!hideNotifyInTop.includes(pathname) && (
        <div style={{ minHeight: isMobile ? 'none' : `${notifyWidth}px`, marginTop: marginTopForHeader() }}>
          {/* internet slow -> rediret to local.thuocsi.vn */}
          {/* {getIsShowLocalThuocssiVn() && (
            <Container maxWidth="lg" style={{ maxWidth: '1352px', padding: isMobileProdPage && '7px 16px' }}>
              <Collapse in={open}>
                <Alert
                  severity="warning"
                  variant="outlined"
                  icon={false}
                  style={{
                    marginTop: '10px',
                    marginBottom: '5px',
                    borderRadius: '8px',
                    color: '#797979',
                    backgroundColor: '#fff',
                    fontFamily: 'ggsr',
                    fontSize: '16px',
                    display: 'flex',
                    width: '100%',
                  }}
                  className={styles.fullWidth}
                  // color="#797979"
                >
                  <Grid container direction="row" alignContent="flex-start" style={{ width: '100%' }}>
                    <Grid item style={{ width: '40px', alignSelf: 'center' }}>
                      <ImageFallbackStatic src={ICON_KHUNG_LONG} width="35" height="35" alt="icon" />
                    </Grid>
                    <Grid item style={{ alignSelf: 'center' }} justifyContent="center" className={styles.content} container>
                      <Grid item justifyContent="center">
                        Vui lòng
                        <LinkComp
                          href={getHostName() === 'local.thuocsi.vn' ? 'https://thuocsi.vn' : 'https://local.thuocsi.vn'}
                          style={{ fontSize: '16px', display: 'inline', color: '#0E1983', fontWeight: '700' }}
                          color="#0E1983"
                        >
                          nhấn vào đây
                        </LinkComp>
                        để chuyển sang phiên bản khác nếu bạn cảm thấy website đang chậm
                      </Grid>
                    </Grid>
                  </Grid>
                </Alert>
              </Collapse>
            </Container>
          )} */}
          {/* internet slow -> rediret to local.thuocsi.vn */}
          {NOTIFY_IN_TOP_BAR && (
            <Container maxWidth="lg" style={{ maxWidth: '1352px', padding: isMobileProdPage && '7px 16px' }}>
              <Collapse in={open}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        Cookies.set(KEY_COOKIES, false, { domain: GENERAL_DOMAIN, expires: 90, sameSite: 'Lax' });
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  style={{ marginTop: '10px', marginBottom: '5px', borderRadius: '8px' }}
                >
                  {NOTIFY_IN_TOP_BAR}
                </Alert>
              </Collapse>
            </Container>
          )}
          {NOTIFY_IN_TOP_BAR_UIV2 && checkTrialSelected(user) && isMobileV2 && showTrial && (
            <>
              <Container maxWidth="lg" style={{ maxWidth: '1352px', padding: isMobileProdPage && '7px 16px' }}>
                <Collapse in={open}>
                  <Alert
                    severity="info"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          Cookies.set(KEY_COOKIES, true, { domain: GENERAL_DOMAIN, expires: 90, sameSite: 'Lax' });
                          setOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    style={{ marginBottom: '8px', borderRadius: '8px' }}
                  >
                    {NOTIFY_IN_TOP_BAR_UIV2}
                  </Alert>
                </Collapse>
              </Container>
            </>
          )}
        </div>
      )}
      {isAuthenticated && status !== 'ACTIVE' && asPath !== `${MY_ACCOUNT}?tab=3` && !offNotify && (
        <Container maxWidth="lg" style={{ maxWidth: '1352px' }}>
          <Alert severity="error" style={{ marginTop: '10px', marginBottom: '5px', borderRadius: '8px' }}>
            Lưu ý: Tài khoản của quý khách sẽ không được kích hoạt nếu quý khách không cung cấp đủ các thông tin được yêu cầu
          </Alert>
        </Container>
      )}
    </div>
  );
};

export default AlertSection;
