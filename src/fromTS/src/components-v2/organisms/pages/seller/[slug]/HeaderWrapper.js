import { Divider } from '@material-ui/core';
import SellerDetailHeader from 'components-v2/organisms/Mobile/store/SellerDetailHeader';
import SellerTabsMobile from 'components-v2/organisms/Mobile/store/SellerTabs';
import MV2LandingPageSeller from 'components/organisms/Mobile/LandingPageSeller';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from './styles.module.css';

const HeaderWrapper = ({ videoIntroduces = [], infoBanner, info, feedbacks = [], isMobileV2, sellerInfo, slug, children }) => (
  <div className={styles.mobileContainer}>
    <SellerDetailHeader sellerInfo={sellerInfo} />
    <Divider style={{ backgroundColor: '#E9E9E9' }} />
    <SellerTabsMobile slug={slug} sellerInfo={sellerInfo} />
    <MV2LandingPageSeller banners={infoBanner} videoIntroduces={videoIntroduces} description={info} feedbacks={feedbacks} isMobileV2={isMobileV2} />
    {children}
  </div>
);

export default HeaderWrapper;
