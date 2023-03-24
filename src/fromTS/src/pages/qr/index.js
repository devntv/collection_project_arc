import { Button, Container, Grid, TextField, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import NewTemplate from 'components/newlayout/template';
import { BRAND_NAME } from 'constants/Enums';
import { withLogin } from 'HOC';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { doWithServerSide } from 'services';
import { QR_CODE_DOMAIN } from 'sysconfig';
import { NotifyUtils } from 'utils';
import styles from './styles.module.css';

const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false,
});

const title = `Tra mã vạch thuốc, sản phẩm ${BRAND_NAME}`;

export async function getServerSideProps(ctx) {
  return doWithServerSide(ctx, async () => ({
    props: {
      SEO_CONFIG: {
        title,
      },
    },
  }));
}

// TODO: translate
function ProductScanner(props) {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('sm'));

  const { code } = props;

  const [scanResultWebcam, setScanResultWebcam] = useState(code);
  const [scanPress, setScanPress] = useState('');
  const [errorQrCode, setErrorQrCode] = useState('');

  const allowScan = () => {
    setScanPress(true);
  };

  const handleErrorWebcam = (error) => {
    NotifyUtils.error(error);
  };
  const router = useRouter();

  const handleScanWebcam = (data) => {
    if (data) {
      if (data.match(QR_CODE_DOMAIN)) {
        const qrCode = data.replace(QR_CODE_DOMAIN, '');
        setScanResultWebcam(qrCode);
        router.push(`/qr/${qrCode}`);
      } else {
        setErrorQrCode(`* Hệ thống chỉ hỗ trợ quét mã QR Code của ${BRAND_NAME}. Cảm ơn bạn.`);
      }
    }
  };

  const routeToPathCode = () => {
    const inputCode = document.getElementById('orderCode').value;
    router.push(`/qr/${inputCode}`);
  };

  const previewStyle = {
    height: 300,
    width: 300,
  };

  return (
    <NewTemplate>
      <Container className={styles['permission-container']}>
        <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '30px' }}>
          <Grid item xs={12} sm={7} style={{ margin: '16px' }}>
            <TextField
              className={styles.inputQr}
              variant="outlined"
              placeholder="Nhập mã QR"
              id="orderCode"
              name="orderCode"
              value={scanResultWebcam}
              autoFocus
            />
          </Grid>
          <Grid item>
            <Button className={styles.scan} style={{ marginRight: '16px' }} onClick={routeToPathCode}>
              Tra cứu thông tin
            </Button>
            <Button className={styles.scan} style={{ marginRight: matchUpMd ? '16px' : '0px' }} onClick={allowScan}>
              Quét mã QR
            </Button>
          </Grid>

          <br />
        </Grid>
        <Grid container justifyContent="center">
          {errorQrCode && <pF className={styles.error}>{errorQrCode}</pF>}
        </Grid>
        <Grid container justifyContent="center" style={{ marginTop: '30px' }}>
          {scanPress && <QrReader delay={10} style={previewStyle} onError={handleErrorWebcam} onScan={handleScanWebcam} />}
        </Grid>
      </Container>
    </NewTemplate>
  );
}
export default withLogin(ProductScanner, false);
