import Template from 'components/layout/Template';
import RequestModal from 'components/organisms/RequestModal';
import { useAuth } from 'context';
import { withLogin } from 'HOC';
import { useModal } from 'hooks';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { CookiesParser } from 'utils';
import { v4 as uuidv4 } from 'uuid';

const DynamicWhyBuymed = dynamic(() => import('components/organisms/WhyBuymed'));
const DynamicCommonQuestion = dynamic(() => import('components/mocules/CommonQuestion'));
const DynamicPartners = dynamic(() => import('components/organisms/Partners'));
const DynamicSliderComp = dynamic(() => import('components/organisms/SliderComp'));
const DynamicMedia = dynamic(() => import('components/organisms/Media'));
const DynamicHomeCTASection = dynamic(() => import('components/organisms/HomeCTASection'));
const DynamicBannerSlider = dynamic(() => import('components/organisms/BannerSlider'));
const DynamicProductSlider = dynamic(() => import('components/organisms/ProductSliderSection'));

const LandingPage = (props) => {
  const { settings } = props;

  const [openRequestModal, toggleRequestModal] = useModal();

  const bannerStatus = settings && settings.banner ? settings.banner.status : 'ON';

  const { isAuthenticated } = useAuth();
  const { infoBanner = [], isMobile, blocks = [] } = props;
  const title = 'Tra cứu và đặt thuốc giá sỉ nhanh tại thuocsi.vn';
  const pageName = 'home';
  const pageTitle = 'Trang chủ';

  useEffect(() => {
    const IS_SHOW_REQUEST_MODAL = 'isShowRequestModal';
    const isShowRequestModal = CookiesParser.CookiesParser(document.cookie)[IS_SHOW_REQUEST_MODAL];
    if (!isAuthenticated && !isShowRequestModal) {
      toggleRequestModal();
      document.cookie = `${IS_SHOW_REQUEST_MODAL}=true;`;
    }
  }, []);

  return (
    <Template title={title} isMobile={isMobile} pageName={pageName} pageTitle={pageTitle}>
      {bannerStatus && bannerStatus === 'ON' && <DynamicBannerSlider infoBanner={infoBanner} />}
      {!isAuthenticated ? (
        <>
          <DynamicWhyBuymed />
          <DynamicHomeCTASection />
          <DynamicCommonQuestion />
        </>
      ) : (
        <div className="SliderProductWrap">
          {blocks &&
            blocks.map((item) => (
              <DynamicProductSlider key={uuidv4()} name={item.name} viewMore={item.viewMore} products={item.data} redirect={item.redirectUrl} />
            ))}
        </div>
      )}
      <DynamicPartners />
      <DynamicSliderComp />
      <DynamicMedia />
      <RequestModal visible={openRequestModal} onClose={toggleRequestModal} />
    </Template>
  );
};

export default withLogin(LandingPage, false);
