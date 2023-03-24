import MobileModalSearch from 'components-v2/atoms/MobileModalSearch';
import MainContent from 'components-v2/organisms/Mobile/Home/MainContent';
// import Banner from 'components-v2/mocules/Mobile/SliderMobile/Banner';
// import Banner from 'components-v2/mocules/Mobile/SliderMobile/Banner';
import Template from 'components/layout/Template';
import HomePageBlock from 'components/organisms/HomePageBlock';
import { DEFAULT_THUOCSI_LONG_TITLE } from 'constants/data';
// import Template from 'components-v2/layout/Template';
import { INSIDER_RECOMMENDATION } from 'constants/Enums';
import { HOME_ICON_MEGA_SALE } from 'constants/Images';
import { NEW_PRODUCTS_URL, PRODUCTS_LOADING_URL, TAG_PAGE } from 'constants/Paths';
import { withLogin } from 'HOC';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { doWithServerSide } from 'services';
import { SHOW_INSIDER_RECOMMEND, TAG_NEW } from 'sysconfig';
import { ImageFallback } from 'utils';
import { useStore } from 'zustand-lib/storeGlobal';
import useMobileV2 from 'zustand-lib/storeMobile';
import useGetTagPromotion from 'zustand-lib/useGetTagPromotion';

const title = DEFAULT_THUOCSI_LONG_TITLE;

export async function getServerSideProps(ctx) {
  ctx.res.setHeader('Cache-Control', 'public, s-maxage=43200, stale-while-revalidate=60');
  return doWithServerSide(
    ctx,
    async () => ({
      props: {
        SEO_CONFIG: {
          title,
        },
      }, // will be passed to the page component as props
    }),
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
  // return doWithServerSide(ctx, async () => {
  //   const logs = {};
  //   const timeStartDoWithServerSide = +new Date();
  //   const [settingsResult] = await Promise.all([SettingService.getListSetting({ ctx })]);
  //   logs.timeEndCall = +new Date() - timeStartDoWithServerSide;
  //   logs.timeEndResolveBlock = +new Date() - timeStartDoWithServerSide;
  //   logs.timeReturnData = +new Date() - timeStartDoWithServerSide;
  //   return {
  //     props: {
  //       settings: getFirst(settingsResult),
  //       results: [settingsResult],
  //       logs,
  //     },
  //   };
  // });
}

const DynamicWhyBuymed = dynamic(() => import('components/organisms/WhyBuymed'), { ssr: false });
// const DynamicCommonQuestion = dynamic(() => import('components/mocules/CommonQuestion'));
const DynamicPartners = dynamic(() => import('components/organisms/Partners'), { ssr: false });
const DynamicSliderComp = dynamic(() => import('components/organisms/SliderComp'), { ssr: false });
const DynamicMedia = dynamic(() => import('components/organisms/Media'), { ssr: false });
const DynamicHomeCTASection = dynamic(() => import('components/organisms/HomeCTASection'), { ssr: false });
const DynamicBannerSlider = dynamic(() => import('components/organisms/BannerSlider'), { ssr: false });
// const DynamicProductSlider = dynamic(() => import('components/organisms/ProductSliderSection'));

const LandingPageNotLoginV2 = ({ isMobile = false, bannerStatus = null }) => (
  <>
    <div style={{ minHeight: isMobile ? '129px' : 'calc(100vw * 0.32)' }}>{bannerStatus && bannerStatus === 'ON' && <DynamicBannerSlider />}</div>
    <DynamicWhyBuymed />
    <DynamicHomeCTASection />
    <DynamicPartners />
    <DynamicSliderComp />
    <DynamicMedia />
  </>
);
const PCScreen = ({ isMobile = false, bannerStatus = null, isAuthenticated = false, provinceCode }) => (
  <>
    <div style={{ minHeight: isMobile ? '129px' : 'calc(100vw * 0.32)' }}>{bannerStatus && bannerStatus === 'ON' && <DynamicBannerSlider />}</div>
    {!isAuthenticated ? (
      <>
        <DynamicWhyBuymed />
        <DynamicHomeCTASection />
        {/* // off câu hỏi thường gặp - chị vân bùi kêu  - 03Nov2021 */}
        {/* <DynamicCommonQuestion /> */}
      </>
    ) : (
      <div className="SliderProductWrap">
        {/* {blocks &&
      blocks.map((item) => (
        <DynamicProductSlider key={uuidv4()} name={item.name} viewMore={item.viewMore} products={item.data} redirect={item.redirectUrl} />
      ))} */}
        {/* Div cho insider tự chèn vào  */}
        <div id="insider-recommendation" />
        <HomePageBlock
          name="Độc quyền giá tốt"
          viewMore
          redirectUrl={`${TAG_PAGE}/doc-quyen-gia-tot`}
          type="MEGA-SALE"
          provinceCode={provinceCode}
          icon={<ImageFallback src={HOME_ICON_MEGA_SALE} width={40} height={40} />}
        />
        <HomePageBlock name="Dành riêng cho bạn" viewMore type={INSIDER_RECOMMENDATION.USER_BASED} redirectUrl="/products" />
        <HomePageBlock name="Sản phẩm bán chạy" viewMore redirectUrl={`${PRODUCTS_LOADING_URL}?currentTab=2`} type="BANCHAY" />
        <HomePageBlock name="Sản phẩm mới" type={TAG_NEW} redirectUrl={NEW_PRODUCTS_URL} />
        <HomePageBlock name="Khuyến mãi" type="DEALS" viewMore redirectUrl="/khuyenmai" />
        {SHOW_INSIDER_RECOMMEND && <HomePageBlock name="Sản phẩm gợi ý" viewMore type={INSIDER_RECOMMENDATION.MOST_VIEWED} redirectUrl="/products" />}
      </div>
    )}
    <DynamicPartners />
    <DynamicSliderComp />
    <DynamicMedia />
  </>
);

const MobileScreen = ({ isMobile = false, bannerStatus = null, isAuthenticated = false, provinceCode }) => (
  <>
    {isAuthenticated ? (
      <>
        <MainContent provinceCode={provinceCode} />
      </>
    ) : (
      <LandingPageNotLoginV2 isMobile={isMobile} bannerStatus={bannerStatus} />
    )}
  </>
);

const pageName = 'home';
const pageTitle = 'Trang chủ';
const bannerStatus = 'ON';

const LandingPage = (props) => {
  const { isMobile, isAuthenticated, user } = props;
  const { provinceCode } = user || {};
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  const toggleFeature = useStore((state) => state.toggleFeature);
  // const canUseMobileV2 = useStore((state) => state.canUseMobileV2);

  const {
    query: { searchbar = false, chatTs },
  } = useRouter();

  // promotion gift tag, call one place  on time use anywhere
  const { getPromoLists } = useGetTagPromotion();
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getPromoLists({ getVoucherInfo: false, signal });

    return () => controller.abort();
  }, [isAuthenticated]);

  // useEffect(() => {
  //   console.log('check can user mobile v2');
  //   if (isAuthenticated && !isMobileV2 && canUseMobileV2()) {
  //     toggleBeta();
  //   }
  // }, [isAuthenticated]);

  useEffect(() => {
    if (chatTs != null) toggleFeature('chatTs', chatTs, { isCookie: true });
  }, [chatTs]);

  if (searchbar) {
    return <MobileModalSearch isSearch />;
  }

  return (
    <Template isMobile={isMobile} pageName={pageName} pageTitle={pageTitle} showTopSearchMV2 chatTs={chatTs}>
      {/* placeholder for banner */}
      {isMobileV2 ? (
        <MobileScreen isMobile={isMobile} bannerStatus={bannerStatus} isAuthenticated={isAuthenticated} provinceCode={provinceCode} />
      ) : (
        <PCScreen isMobile={isMobile} bannerStatus={bannerStatus} isAuthenticated={isAuthenticated} provinceCode={provinceCode} />
      )}
    </Template>
  );
};

export default withLogin(LandingPage, false);
