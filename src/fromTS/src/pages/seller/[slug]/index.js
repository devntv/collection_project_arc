/* eslint-disable no-nested-ternary */
import { getData, isValid } from 'clients';
import SellerMobileScreen from 'components-v2/organisms/pages/seller/[slug]/MobileScreen';
import SellerPCScreen from 'components-v2/organisms/pages/seller/[slug]/PCScreen';
import Template from 'components/layout/Template';
import { BRAND_NAME } from 'constants/Enums';
import { withLogin } from 'HOC';
import useTrackingTimeout from 'hooks/useTrackingTimeout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { doWithServerSide, ProductServiceV2, SellerService } from 'services';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { DOMAIN_FLAGSHIP_STORE } from 'sysconfig';
import useMobileV2 from 'zustand-lib/storeMobile';
import useGetTagPromotion from 'zustand-lib/useGetTagPromotion';

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async () => {
      const { query } = ctx;
      const { slug } = query;
      const storeInfo = await SellerService.getStoreInfo({ ctx, slug });
      if (!storeInfo || storeInfo?.status === 'INACTIVE') {
        return {
          redirect: {
            destination: `/seller-products/${slug}`,
          },
        };
      }
      if (storeInfo?.storeType === 'FLAGSHIP') {
        return {
          redirect: {
            destination: DOMAIN_FLAGSHIP_STORE.replace('{seller}', slug) || `/flagship-store/${slug}`,
          },
        };
      }
      const { favSkus = [], newSkus = [], sellerCode = '', banners = [], sections = null } = storeInfo || {};
      const [favProductsRes, newProductRes, dealsBySellerRes] = await Promise.all([
        ProductServiceV2.getProductInfoFromSkusForSeller({ ctx, skus: favSkus }),
        ProductServiceV2.getProductInfoFromSkusForSeller({ ctx, skus: newSkus }),
        ProductServiceV2.getDeals({ ctx, sellerCode }),
      ]);

      const blocks = [];
      const bannerNumber = 5;
      if (isValid(dealsBySellerRes)) {
        blocks.push({
          name: 'Sản phẩm khuyến mãi',
          data: getData(dealsBySellerRes),
        });
      }
      if (isValid(newProductRes)) {
        blocks.push({
          name: 'Sản phẩm mới',
          data: getData(newProductRes).filter((item) => item?.isActive === true),
        });
      }
      if (isValid(favProductsRes)) {
        blocks.push({
          name: 'Sản phẩm nổi bật',
          data: getData(favProductsRes).filter((item) => item?.isActive === true),
        });
      }

      if (banners.length === 0 && blocks.length === 0 && (!sections || sections.length === 0)) {
        return {
          redirect: {
            destination: `/seller/${slug}/list-product`,
          },
        };
      }
      return {
        props: {
          infoBanner: banners.length > 0 ? banners.slice(0, bannerNumber) : [],
          blocks,
          storeInfo,
          slug,
        },
      };
    },
    {
      serverSideTranslations,
      namespaces: ['common'],
    },
  );
}

const SellerCenter = ({ isMobile, blocks = [], infoBanner, storeInfo = {}, slug }) => {
  const {
    name = null,
    logo = null,
    numberProductDisplay = '',
    landingPage = '',
    description: infoStore,
    sellerCode,
    sections = null,
    feedbacks = [],
    videoIntroduces = [],
  } = storeInfo || {};
  const sellerInfo = {
    name,
    imageStoreUrls: logo,
    numberProductDisplay,
    sellerCode,
  };
  const title = `${BRAND_NAME} ${name}`;

  const regex = /(<([^>]+)>)/gi;
  const info = infoStore ? infoStore.replace(regex, '') : '';

  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  const [dataSections, setDataSections] = useState([]);

  // Tracking timing GA
  useTrackingTimeout('Sellers');

  // Scroll tracking GA
  // useScrollTracking('Sellers');

  const loadDataSection = async () => {
    if (sections) {
      const allSectionInfo = await Promise.all(
        sections.map(async ({ code, name: nameSection }) => {
          const productRes = await ProductServiceV2.loadProductWithFilter({
            filter: { sectionStore: code },
          });
          return {
            data: getData(productRes),
            code,
            nameSection,
          };
        }),
      );
      setDataSections(allSectionInfo?.filter((item) => item?.data?.length > 0) || []);
    }
  };

  useEffect(() => {
    loadDataSection();
  }, []);

  const getPromoLists = useGetTagPromotion((state) => state.getPromoLists);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getPromoLists({ getVoucherInfo: false, signal });

    return () => controller.abort();
  }, []);

  return (
    <Template title={title} isMobile={isMobile} pageTitle={title}>
      {isMobileV2 ? (
        <SellerMobileScreen
          blocks={blocks}
          sellerInfo={sellerInfo}
          slug={slug}
          infoBanner={infoBanner}
          videoIntroduces={videoIntroduces}
          feedbacks={feedbacks}
          info={info}
          isMobileV2={isMobileV2}
          dataSections={dataSections}
        />
      ) : (
        <SellerPCScreen
          isMobile={isMobile}
          sellerInfo={sellerInfo}
          slug={slug}
          landingPage={landingPage}
          info={info}
          infoBanner={infoBanner}
          infoStore={infoStore}
          name={name}
          blocks={blocks}
          sections={sections}
          dataSections={dataSections}
        />
      )}
    </Template>
  );
};
export default withLogin(SellerCenter, false);
