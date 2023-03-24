import { getData, getFirst, isValid, ProductClientV2 } from 'clients';
import DetailProductMobileScreen from 'components-v2/organisms/pages/detail-product/MobileScreen';
import DetailProductPcScreen from 'components-v2/organisms/pages/detail-product/PcScreen';
import Template from 'components/layout/Template';
import { getHardcodeStoreByTagList } from 'constants/flagship-store';
import { NOT_FOUND_URL } from 'constants/Paths';
import { useAuth, useProduct, useSetting } from 'context';
import { useDealTagUrl } from 'hooks';
import useAccessLocation from 'hooks/useAccessLocation';
import useModal from 'hooks/useModal';
import Cookies from 'js-cookie';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { doWithServerSide, ProductServiceV2, WebService } from 'services';
import AnalyticsService from 'services/AnalyticsService';
import { GENERAL_DOMAIN, IS_WEB_SERVICE } from 'sysconfig';
import { gtag, StringUtils } from 'utils';
import { getProxyImageList } from 'utils/ImageUtils';
import { useStore } from 'zustand-lib/storeGlobal';
import useMobileV2 from 'zustand-lib/storeMobile';

/**
 * Update UI mobile v2
 * August 23, 2022
 * https://buymed.atlassian.net/browse/APO-715
 */

export async function getServerSideProps(ctx) {
  return doWithServerSide(
    ctx,
    async (_ctxCallback, user) => {
      const logs = { steps: [] };
      const codeLocation = ctx.query || '79';
      const productSlug = ctx?.query?.slug || '';
      const errProductUrl = `${NOT_FOUND_URL}?errProduct=${productSlug}`;

      try {
        if (!user) {
          // neesu không có user ( chưa login -> thì sẽ gọi API lấy thông tin SP ko cần login )
          // mặc định locationCode sẽ là 79
          const productWithoutLoginRes = await ProductServiceV2.getDetailProductWithoutLogin({ ctx, provinceCode: codeLocation });

          if (!isValid(productWithoutLoginRes)) {
            return {
              redirect: {
                destination: errProductUrl,
              },
            };
          }

          const product = getFirst(productWithoutLoginRes);
          const nameTitle = StringUtils.titleCase(product?.name || '');
          if (product) product.name = nameTitle;

          const SEO_CONFIG = {
            title: nameTitle,
            description: nameTitle,
            ogTitle: nameTitle,
            ogDescription: nameTitle,
            ogImage: getProxyImageList(product?.imageUrls, 600)[0] || product?.defaultImage || '',
            ogImageAlt: nameTitle,
          };

          return {
            props: {
              product,
              SEO_CONFIG,
            },
          };
        }
        const getDataProductDetail = IS_WEB_SERVICE ? WebService.getDataProductDetail : ProductServiceV2.loadDataProductDetail;
        // Nếu user có login
        const [productRes] = await Promise.all([getDataProductDetail({ ctx })]);

        logs.productRes = productRes;
        const product = getFirst(productRes);

        if (!product || product?.length === 0) {
          return {
            redirect: {
              destination: errProductUrl,
            },
          };
        }

        const historyBySkus = {};
        const { skuId, sku, skus = [] } = product || {};

        const listSkusLimited = [sku];
        const skuArr = skus?.reduce((pV, cV) => pV.concat(cV.sku), []);
        let comboList = [];

        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const [filesRes, responseSkuHistory, resAnaSku, comboListInfo] = await Promise.all([
          ProductServiceV2.getFilesProduct({ ctx, refCode: skuId }),
          ProductClientV2.getSkusBuyed({ ctx, skuCodes: listSkusLimited }),
          AnalyticsService.getAnalyticsProductBySku({
            sku: product?.sku,
            timeSpan: 'DAY',
            fromTime: yesterday.toISOString(),
            toTime: today.toISOString(),
          }),
          ProductServiceV2.getProductInfoMapFromSkus({ ctx, skus: skuArr }),
        ]);

        // Logs
        logs.filesRes = filesRes;
        logs.responseSkuHistory = responseSkuHistory;
        logs.resAnaSku = resAnaSku;
        logs.comboListInfo = comboListInfo;

        if (listSkusLimited.length > 0) {
          if (isValid(responseSkuHistory)) {
            getData(responseSkuHistory)?.forEach((item) => {
              historyBySkus[item.sku] = item;
            });
          }
        }
        // get product info combo lis t

        if (isValid(comboListInfo)) {
          const mapProductCombo = getFirst(comboListInfo, {});
          comboList = skus?.map((item) => ({ ...item, ...mapProductCombo[item?.sku] }));
        }

        const nameTitle = StringUtils.titleCase(product?.name || '');
        if (product) product.name = nameTitle;

        const SEO_CONFIG = {
          title: nameTitle,
          description: nameTitle,
          ogTitle: nameTitle,
          ogDescription: nameTitle,
          ogImage: getProxyImageList(product?.imageUrls, 300)[0] || product?.defaultImage,
          ogImageAlt: nameTitle,
        };

        return {
          props: {
            product,
            comboList,
            anaSku: getData(resAnaSku),
            logs,
            files: getData(filesRes),
            SEO_CONFIG,
            codeLocation,
            historyBySkus,
          },
        };
      } catch (e) {
        return {
          props: {
            errors: e,
            logs,
          },
        };
      }
    },
    {
      serverSideTranslations,
      namespaces: ['common', 'cart'],
    },
  );
}
const ProductDetail = ({
  product,
  isMobile,
  // listProductMapByIngredient,
  comboList = [],
  anaSku = [],
  files = [],
  // listProductBySeller = [],
  // otherProductSkus = [],
  historyBySkus,
}) => {
  // sản phẩm khi không đăng nhập
  const router = useRouter();
  const { user } = useAuth();
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  const getSellerByCode = useStore((state) => state.getSellerByCode);
  const [showModalLocation, setModalLocation] = useState(false);
  const handleCloseFormLocation = useCallback(() => setModalLocation(false), []);

  useEffect(() => {
    if (user) {
      Cookies.set('provinceCode', user.provinceCode, {
        expires: 5000,
        domain: GENERAL_DOMAIN,
        sameSite: 'Lax',
      });
      return;
    }
    if (!Cookies.get('provinceCode')) {
      setModalLocation(true);
    } else {
      setModalLocation(false);
    }
  }, []);

  // access location
  const { location } = useAccessLocation();
  useEffect(() => {
    if (!user) {
      return location.loaded;
    }
    return null;
  }, [user]);

  const handleLocationCode = (code) => {
    router.push({ pathname: router.query.slug, query: { provinceCode: code } }, undefined, { scroll: false });
  };

  // const listProductBySellerDisplay = listProductBySeller?.filter((item) => item?.sku !== product?.sku) || [];
  const pageName = 'PRD_DETAIL';
  useEffect(async () => {
    // fbpixel.viewContent(product);
    const sellerInfo = await getSellerByCode(product?.sellerCode);
    gtag.viewContent({ product: { ...product, sellerInfo } });
  }, []);
  const { addProductToListViewed } = useProduct();
  useEffect(() => {
    // add to listViewed -> page /product
    addProductToListViewed(product?.sku || '');
  }, []);
  const totalView = 0;
  const [tabValue, setTabValue] = useState('1');

  const { mapCategories, mapCountry, mapSeller } = useSetting();

  const [isShowModalProductInquiry, toggleModalInquiry] = useModal();
  const orderedCount = anaSku.length > 0 ? anaSku?.reduce((n, { orderedQuantity }) => n + orderedQuantity, 0) : 0;

  const {
    name,
    origin,
    volume,
    ingredients = [],
    categoryCodes,
    tags,
    seller,
    // countryOfManufacture,
    statusData = {},
    weight,
    isDeal = false,
    deal = {},
    expiredDate,
  } = product || {};
  const sellerInfo = mapSeller?.get(seller?.code) || null;
  const coutriesName = mapCountry?.get(origin)?.label || origin; // haven't code countries -> mapCountry.get(code) -> coutriesName?.label
  // const amountRemaining = maxQuantity - ((isDeal && deal?.quantity) || 0);
  // const yearNumber = new Date().getFullYear() - supplier.yearFounded;

  const breadscrumbs = [
    { name: 'Trang chủ', url: '/' },
    { name: 'Sản phẩm', url: '/products' },
    { name: product?.name, url: `/products/${product?.slug}` },
  ];

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const hardcodeProduct = getHardcodeStoreByTagList(product?.tags);

  // get the link from deal tag - render one time
  const [link] = useDealTagUrl(product);

  return (
    <>
      <Template overrideMV2Options={{ title: 'Chi tiết sản phẩm' }} isMobile={isMobile} pageTitle={name} product={product}>
        {isMobileV2 ? (
          <DetailProductMobileScreen
            isMobile={isMobile}
            breadscrumbs={breadscrumbs}
            product={product}
            sellerInfo={sellerInfo}
            isDeal={isDeal}
            deal={deal}
            name={name}
            toggleModalInquiry={toggleModalInquiry}
            user={user}
            volume={volume}
            categoryCodes={categoryCodes}
            mapCategories={mapCategories}
            tags={tags}
            statusData={statusData}
            expiredDate={expiredDate}
            totalView={totalView}
            handleChangeTab={handleChangeTab}
            orderedCount={orderedCount}
            weight={weight}
            historyBySkus={historyBySkus}
            tabValue={tabValue}
            ingredients={ingredients}
            coutriesName={coutriesName}
            hardcodeProduct={hardcodeProduct}
            isShowModalProductInquiry={isShowModalProductInquiry}
            pageName={pageName}
            showModalLocation={showModalLocation}
            handleCloseFormLocation={handleCloseFormLocation}
            handleLocationCode={handleLocationCode}
            comboList={comboList}
            files={files}
            seller={seller}
            isMobileV2={isMobileV2}
          />
        ) : (
          <DetailProductPcScreen
            isMobile={isMobile}
            breadscrumbs={breadscrumbs}
            product={product}
            sellerInfo={sellerInfo}
            isDeal={isDeal}
            deal={deal}
            name={name}
            toggleModalInquiry={toggleModalInquiry}
            user={user}
            volume={volume}
            categoryCodes={categoryCodes}
            mapCategories={mapCategories}
            tags={tags}
            statusData={statusData}
            expiredDate={expiredDate}
            totalView={totalView}
            handleChangeTab={handleChangeTab}
            orderedCount={orderedCount}
            weight={weight}
            historyBySkus={historyBySkus}
            tabValue={tabValue}
            ingredients={ingredients}
            coutriesName={coutriesName}
            hardcodeProduct={hardcodeProduct}
            isShowModalProductInquiry={isShowModalProductInquiry}
            pageName={pageName}
            showModalLocation={showModalLocation}
            handleCloseFormLocation={handleCloseFormLocation}
            handleLocationCode={handleLocationCode}
            comboList={comboList}
            files={files}
            seller={seller}
            link={link}
            // isGiftTag={isGiftTag}
          />
        )}
      </Template>
    </>
  );
};

export default ProductDetail;
