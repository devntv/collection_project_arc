import { Container } from '@material-ui/core';
import { LinkComp } from 'components/atoms';
import StoreList from 'components/mocules/StoreList';
import MV2BlockTitle from '../BlockTitle';
import styles from './styles.module.css';

const MV2StoreContainer = ({ sellers, total, title, icon, redirectUrl = '/', loading = false, isMobileV2 = false }) => (
  <Container maxWidth="lg" className={styles.container}>
    <MV2BlockTitle title={title} icon={icon} total={total} totalTitle="cửa hàng" className={styles.blockTitle} loading={loading} />
    <StoreList sellers={sellers} loading={loading} isMobileV2={isMobileV2} />
    {total > 4 && !loading && (
      <LinkComp href={redirectUrl} className={styles.viewAll} removeStyles>
        Xem tất cả
      </LinkComp>
    )}
  </Container>
);

export default MV2StoreContainer;
