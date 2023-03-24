import CircularProgress from '@material-ui/core/CircularProgress';
import { LOGO_THUOCSI_SHORTENED } from 'constants/Images';
import React from 'react';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import styles from './styles.module.css';

// const domainLocal = 'https://local.thuocsi.vn';
// const domainTs = 'https://thuocsi.vn';

const LoadingScreen = () => (
  // const [domainRedirect, setDomainRedirect] = useState(domainLocal);
  // useEffect(() => {
  //   const curDomain = window?.location.hostname;
  //   if (curDomain === 'local.thuocsi.vn') {
  //     setDomainRedirect(domainTs);
  //   } else {
  //     setDomainRedirect(domainLocal);
  //   }
  // });

  <>
    {/* <Container maxWidth="lg" style={{ maxWidth: '1352px' }}>
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
        >
          <Grid container direction="row" alignContent="flex-start" style={{ width: '100%' }}>
            <Grid item style={{ width: '40px', alignSelf: 'center' }}>
              <ImageFallbackStatic src={ICON_KHUNG_LONG} width="35" height="35" alt="icon" />
            </Grid>
            <Grid item style={{ alignSelf: 'center' }} justifyContent="center" className={styles.content} container>
              <Grid item>
                Vui lòng
                <LinkComp href={domainRedirect} style={{ fontSize: '16px', display: 'inline', color: '#0E1983', fontWeight: '700' }} color="#0E1983">
                  nhấn vào đây
                </LinkComp>
                để chuyển sang phiên bản khác nếu bạn cảm thấy website đang chậm
              </Grid>
            </Grid>
          </Grid>
        </Alert>
      </Container> */}
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <ImageFallbackStatic src={LOGO_THUOCSI_SHORTENED} width={45} height={45} />
        <CircularProgress size={80} thickness={4} className={styles.progress} />
      </div>
    </div>
  </>
);
export default React.memo(LoadingScreen);
