import { Button, Container, Grid, Typography } from '@material-ui/core';
import BotClient from 'clients/BotClient';
import { LOGO_THUOCSI } from 'constants/Images';
import { PRODUCTS_LOADING_URL } from 'constants/Paths';
// import { useRollbar } from 'hooks';
// import * as Sentry from '@sentry/nextjs';
import Cookies from 'js-cookie';
import NextErrorComponent from 'next/error';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import styles from '../styles/error.module.css';

function Error(props) {
  const { statusCode } = props;
  useEffect(() => {
    const checkLocalStorage = () => {
      try {
        window.localStorage.setItem('error', new Date());
      } catch (error) {
        window.localStorage.clear();
      }
    };
    checkLocalStorage();
    const customerId = Cookies.get('customerId');
    BotClient.sendMesageError({ message: JSON.stringify({ ...props, customerId }) });
  }, []);

  return (
    <Container className={styles.pageError}>
      <Grid container style={{ width: '100%' }}>
        <Grid item container xs={12}>
          <Grid align="center" item xs={12}>
            {/* <span className={styles.n4}>5</span> */}
            <Image src={LOGO_THUOCSI} width={164} height={54} />
            {/* <span className={styles.n4}>0</span> */}
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" variant="h5">
              Không tải được nội dung bạn yêu cầu, vui lòng thử lại sau
            </Typography>
          </Grid>
          {statusCode && (
            <Grid item xs={12}>
              <Typography align="center" variant="subtitle2" className={styles.weightLow}>
                <div>Mã lỗi {statusCode}</div>
              </Typography>
            </Grid>
          )}
          <Grid align="center" item xs={12}>
            <br />
            <ul className={styles.list}>
              <li className={styles.link}>
                <Link href="https://m.me/thuocsivn" prefetch={false}>
                  <Button variant="contained" color="primary">
                    Chat với chúng tôi
                  </Button>
                </Link>
              </li>
              <li className={styles.link}>
                <Link href={PRODUCTS_LOADING_URL} prefetch={false}>
                  <Button variant="contained" color="primary">
                    Xem sản phẩm khác
                  </Button>
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
Error.getInitialProps = async (contextData) =>
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  // await Sentry.captureUnderscoreErrorException(contextData);

  // This will contain the status code of the response
  NextErrorComponent.getInitialProps(contextData);

export default Error;
