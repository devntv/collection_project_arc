import Container from 'components-v2/atoms/Mobile/Container';
import { HOME_ICON_MEGA_SALE } from 'constants/Images';
import { DAILY_PROMOTION_ICON, LIKE_ICON, NEWPRD_ICON } from 'constants/Images/mobile';
import { NEW_PRODUCTS_URL, PRODUCTS_LOADING_URL, TAG_PAGE } from 'constants/Paths';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { memo } from 'react';
import { TAG_NEW } from 'sysconfig';
import ImageFallback from 'utils/ImageFallback';
import SearchInput from './SearchInput';

const DynamicComponentPanelMenus = dynamic(() => import('./PanelMenus'));
const DynamicComponentBannerHome = dynamic(() => import('./BannerHome'));
const DynamicComponentCampaignBlock = dynamic(() => import('components-v2/mocules/mobile/CampaignBlock'));
const DynamicComponentGroup = dynamic(() => import('./GroupProductBlock'));
const DynamicComponentBannerInsider = dynamic(() => import('./BannerInsider'));
const DynamicSurveyForm = dynamic(() => import('./SurveyForm'));

const MainContent = ({ provinceCode }) => (
  <div>
    <Container styleContainer={{ paddingTop: '13px' }}>
      <SearchInput onClick={() => Router.replace({ pathname: '', query: { searchbar: true } }, undefined, { shallow: true })} />
      <div style={{ margin: '20px 0px' }}>
        <DynamicComponentPanelMenus />
      </div>
      <DynamicComponentBannerHome />
    </Container>
    {/* tạm thời ẩn phổ biến nhất */}
    {/* <MostPopular /> */}
    <div style={{ marginTop: '20px' }}>
      <DynamicComponentGroup
        name="Độc quyền giá tốt"
        type="MEGA-SALE"
        redirectUrl={`${TAG_PAGE}/doc-quyen-gia-tot`}
        provinceCode={provinceCode}
        icon={<ImageFallback src={HOME_ICON_MEGA_SALE} width={24} height={24} />}
      />
    </div>
    <div style={{ marginTop: '20px' }}>
      <DynamicComponentGroup
        icon={<ImageFallback src={LIKE_ICON} width={24} height={24} />}
        name="Bán chạy"
        type="BANCHAY"
        redirectUrl={`${PRODUCTS_LOADING_URL}?currentTab=2`}
      />
    </div>
    <div style={{ marginTop: '20px' }}>
      <DynamicComponentCampaignBlock />
    </div>
    <Container styleContainer={{ marginTop: '20px' }}>
      <DynamicComponentBannerInsider />
    </Container>
    <div style={{ marginTop: '20px' }}>
      <DynamicComponentGroup
        icon={<ImageFallback src={NEWPRD_ICON} width={24} height={24} />}
        name="Sản phẩm mới"
        type={TAG_NEW}
        redirectUrl={NEW_PRODUCTS_URL}
      />
    </div>
    <div style={{ marginTop: '20px' }}>
      <DynamicComponentGroup
        icon={<ImageFallback src={DAILY_PROMOTION_ICON} width={24} height={24} />}
        name="Khuyến mãi hằng ngày"
        type="DEALS"
        redirectUrl="/deals"
      />
    </div>

    <DynamicSurveyForm />
  </div>
);

export default memo(MainContent);
