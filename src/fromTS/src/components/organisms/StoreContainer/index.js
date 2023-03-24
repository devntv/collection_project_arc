import { Container } from '@material-ui/core';
import { LinkComp } from 'components/atoms';
import { BlockTitle } from 'components/mocules';
import StoreList from 'components/mocules/StoreList';
import styles from './styles.module.css';

const StoreContainer = ({ sellers, total, title, icon, redirectUrl = '/', loading, isMobileV2 = false }) => (
  <Container maxWidth="lg" className={styles.container}>
    <BlockTitle title={title} icon={icon} total={total} totalTitle="nhà bán hàng" className={styles.blockTitle} loading={loading} />
    <StoreList sellers={sellers} loading={loading} isMobileV2={isMobileV2} />
    {total > 4 && !loading && (
      <LinkComp href={redirectUrl} className={styles.viewAll}>
        Xem tất cả
      </LinkComp>
    )}
  </Container>
);

export default StoreContainer;
