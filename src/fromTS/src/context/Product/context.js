import { getData, isValid, ProductClientV2 } from 'clients';
import InsiderClient from 'clients/InsiderClient';
import MockClient from 'clients/MockClient';
import { SELLER_GROUP, THUOCSI_RECOMMENDATION } from 'constants/Enums';
import { HTTP_STATUS } from 'constants/Enums/http';
import { ENUM_TAG_CODES } from 'constants/Tags';
import { createContext, useContext, useEffect } from 'react';
import { ProductServiceV2, SmartRecommendationService, WebService } from 'services';
import { IS_WEB_SERVICE } from 'sysconfig';
import ArrUtils from 'utils/ArrUtils';
import { useEnhancedReducer } from 'utils/EnhanceReducer';
import reducer from './reducer';
import types from './types';

export const ProductContext = createContext();

export const ProductContextProvider = ({ children, initUser }) => {
  const [state, dispatch, getState] = useEnhancedReducer(reducer, {});

  const clearProduct = () => {
    dispatch({ type: types.CLEAR });
  };

  const clearMapProduct = () => {
    dispatch({ type: types.CLEAR_MAP_PRODUCT });
  };

  // requiredCertificates: [ 'GPP', 'BUSINESS_CERTIFICATE', 'BUSINESS_LICENSE' ],
  // examinationAndTreatmentLicense  -> BUSINESS_LICENSE
  // pharmacyEligibilityLicense -> BUSINESS_CERTIFICATE

  // const {errorRequiredCertificate , errorRequiredCertificateMessage} = getProductError({product})
  const getProductError = ({ product }) => {
    const { skus } = product || {};
    let requiredCertificates = product?.requiredCertificates || [];
    if (skus?.length >= 0) {
      skus.forEach((sku) => {
        if (sku && sku.requiredCertificates?.length >= 0) {
          requiredCertificates = requiredCertificates.concat(sku?.requiredCertificates || []);
        }
      });
    }

    // chỉ cần check user có 1 trong 3 loại giấy phép là dc
    if (requiredCertificates?.length > 0) {
      requiredCertificates = requiredCertificates.filter(ArrUtils.onlyUnique);
      let errorRequiredCertificate = true;
      const { examinationAndTreatmentLicense = [], gpp = [], pharmacyEligibilityLicense = [] } = initUser || {};
      const userHaveCertificated = [];
      if (gpp?.length > 0) {
        userHaveCertificated.push('GPP');
      }
      if (examinationAndTreatmentLicense?.length > 0) {
        userHaveCertificated.push('BUSINESS_LICENSE');
      }
      if (pharmacyEligibilityLicense?.length > 0) {
        userHaveCertificated.push('BUSINESS_CERTIFICATE');
      }

      // so sánh 2 mảng có phần tử giống nhau
      if (userHaveCertificated?.length > 0) {
        // console.log(
        //   '🚀 ~ file: context.js ~ line 48 ~ getProductError ~ userHaveCertificated',
        //   product?.name,
        //   userHaveCertificated,
        //   requiredCertificates,
        // );

        requiredCertificates.forEach((item) => {
          const isHaveCertificated = userHaveCertificated.includes(item);
          if (isHaveCertificated) {
            errorRequiredCertificate = false;
          }
        });
      }

      // chỉ cần check user có 1 trong 3 loại giấy phép là dc
      // errorRequiredCertificate = !(examinationAndTreatmentLicense?.length > 0 || gpp?.length > 0 || pharmacyEligibilityLicense?.length > 0);

      // check đúng Loại mới được mua
      // requiredCertificates.forEach((item) => {
      //   switch (item) {
      //     case 'GPP':
      //       if (!errorRequiredCertificate && gpp?.length === 0) errorRequiredCertificate = true;
      //       break;
      //     case 'BUSINESS_CERTIFICATE':
      //       if (examinationAndTreatmentLicense?.length === 0) errorRequiredCertificate = true;
      //       break;
      //     case 'BUSINESS_LICENSE':
      //       if (pharmacyEligibilityLicense?.length === 0) errorRequiredCertificate = true;
      //       break;
      //     default:
      //   }
      // });

      return {
        errorRequiredCertificate,
        errorRequiredCertificateMessage: 'Bạn chưa đủ giấy phép để mua SP của nhà cung cấp này. Vui lòng chọn SP tương tự của NCC khác',
      };
    }
    return {};
  };

  // TODO:
  const getProductsByIds = async ({ ids }) => {
    // lấy mapCache từ state ra
    const { mapProductsByIds = new Map() } = getState();

    // tìm kiếm item nào ko có trong cache
    const newList = ids.filter((id) => !mapProductsByIds.has(id));

    // nếu ko có item nào ko có trong cache thì return ra map luôn
    if (newList && newList.length === 0) {
      return mapProductsByIds;
    }

    // lấy danh sách data mới
    const result = await ProductServiceV2.getProductsByIds({
      ids,
    });

    const products = getData(result);

    // set lại vào map cache
    products.forEach((item) => {
      mapProductsByIds.set(item.productID, item);
    });

    // lưu vào state
    dispatch({ type: types.GET_PRODUCT_BY_IDS, payload: { mapProductsByIds } });
    // trả ra map cache
    return mapProductsByIds;

    // getProductsByIds
  };

  const getProductBySkus = async ({ skus = [], getPrice }) => {
    const { mapProducts = new Map() } = getState();
    const newList = skus.filter((sku) => !mapProducts.has(sku));
    if (newList && newList.length === 0) {
      return mapProducts;
    }

    const result = await ProductServiceV2.getProductInfoFromSkus({
      skus: newList,
      locationCode: initUser?.provinceCode,
      customerLevel: initUser?.level,
      getPrice,
      customerId: initUser?.customerID,
    });

    const products = getData(result);
    products.forEach((item) => {
      mapProducts.set(item.sku, item);
    });

    dispatch({ type: types.GET_PRODUCT_BY_SKUS, payload: { mapProducts } });
    return mapProducts;
  };

  const getProductByCampaign = async ({ campaignCode }) => ProductServiceV2.getProductByCampaign({ campaignCode });
  //   const getBySku = (sku) => {};
  //   const getInfoProductBySlug = ({ slug }) => {};
  useEffect(() => {
    let { productViewed = null } = getState();
    if (!productViewed) {
      productViewed = [];
      const listViewed = JSON.parse(localStorage.getItem('productListViewed') || '[]') || [];
      listViewed?.forEach((list) => productViewed.push(list));

      dispatch({ type: types.SET_PRODUCT_VIEWED, payload: { productViewed } });
    }
    // return productViewed;
  }, []);

  const addProductToListViewed = (sku) => {
    if (!sku || typeof sku !== 'string') {
      return;
    }
    const { productViewed = [] } = getState();

    // Check sku đã có trong listViewed hay chưa, nếu đã có rồi thì xóa nó và thêm vào đầu listViewed
    const newProductViewed = productViewed?.filter((item) => item !== sku) || [];
    newProductViewed.unshift(sku);

    localStorage?.setItem('productListViewed', JSON.stringify(newProductViewed));
    dispatch({ type: types.SET_PRODUCT_VIEWED, payload: { productViewed: newProductViewed } });
  };

  const getListViewed = () => getState().productViewed;

  const filterProductByTag = async ({ filter, offset, ...params }) => {
    // get data product raw
    const productRes = await ProductServiceV2.loadProductFuzzy({ filter, offset, ...params });
    return productRes;
  };

  const getDataProductBySlug = async ({ slug }) => {
    const getProductBySlug = IS_WEB_SERVICE ? WebService.getDataProductDetail : ProductServiceV2.getDataProductBySlug;
    const productDataRes = await getProductBySlug({ slug });
    return productDataRes;
  };

  const getSortedProducts = (products) => {
    const medxNormalProducts = [];
    const medxKhuyenMaiProducts = [];
    const khuyenMaiProducts = [];
    const hoaDonNhanhProducts = [];
    const normalProducts = [];

    products?.forEach((product) => {
      if (product?.sellerCode === SELLER_GROUP.MEDX && product.tags?.includes(ENUM_TAG_CODES.HOADONNHANH)) {
        if (product.tags?.includes(ENUM_TAG_CODES.KHUYENMAI)) medxKhuyenMaiProducts.push(product);
        else medxNormalProducts.push(product);
      } else if (product.tags?.includes(ENUM_TAG_CODES.KHUYENMAI)) {
        khuyenMaiProducts.push(product);
      } else if (product.tags?.includes(ENUM_TAG_CODES.HOADONNHANH)) {
        hoaDonNhanhProducts.push(product);
      } else {
        normalProducts.push(product);
      }
    });

    const mergedData = [...medxKhuyenMaiProducts, ...khuyenMaiProducts, ...hoaDonNhanhProducts, ...medxNormalProducts, ...normalProducts];
    return mergedData;
  };

  const getDataProductRecommendation = async ({ type }) => {
    const insiderLocalData = JSON.parse(localStorage?.getItem('spUID') || '{}');
    const userId = insiderLocalData?.data || '';

    if (!userId) {
      return {
        status: HTTP_STATUS.NotFound,
        data: [],
      };
    }

    const insiderRes = await InsiderClient.getSmartRecommendation({ type, userId });

    const productSlugs = insiderRes?.data?.map(({ url }) => url.substring(url.lastIndexOf('/') + 1, url.indexOf('?#ins_sr'))) || [];
    // const result = await ProductServiceV2.getDataProductsBySlugs({ slugs: productSlugs, isAvailable: true });
    const result = await MockClient.getProductBySlugs({ slugs: productSlugs });

    if (isValid(result)) {
      result.data = getSortedProducts(result.data);
    }

    return result;
  };
  // lấy ds sản phẩm recommend cxaur thuocsi

  const getDataProductRecommendationTS = async ({ type, value = '', limit = 20, skuNotIn = [] }) => {
    //
    let q = {};
    switch (type) {
      case THUOCSI_RECOMMENDATION.CONFIG_WEIGHT:
        q = {
          configMetricses: [],
        };
        break;
      case THUOCSI_RECOMMENDATION.SAME_CATEGORY:
        q = {
          configMetricses: [
            {
              configMetricsCode: 'SKU_SAME_CATEGORY',
            },
            {
              configMetricsCode: 'SKU_NOT_BUY_RECENTLY',
            },
          ],
          skuNotIn,
          categories: value,
        };
        break;
      case THUOCSI_RECOMMENDATION.PURCHASE_TOGETHER:
        q = {
          configMetricses: [
            {
              configMetricsCode: 'SKU_PURCHASE_TOGETHER',
            },
            {
              configMetricsCode: 'SKU_NOT_BUY_RECENTLY',
            },
          ],
          skuNotIn,
          skuCodes: [value],
        };
        break;
      default:
        q = {};
    }
    const body = {
      q,
      limit,
    };
    const recommnendResult = await SmartRecommendationService.getRecommendation({
      body,
    });
    const productSkus = getData(recommnendResult)?.map((item) => item.sku);
    const mapProduct = await getProductBySkus({ skus: productSkus });
    const sortedProducts = getSortedProducts(productSkus?.map((item) => ({ ...(mapProduct?.get(item) || {}), isRecommendedByTS: true })));
    const result = { ...recommnendResult, data: sortedProducts };
    return result;
  };

  const getSkuHistoryPerDay = async ({ sku }) => {
    const result = await ProductClientV2.getSkusBuyed({ skuCode: sku });
    const productsPerDay = getData(result);

    if (isValid(result)) {
      // const productsPerDay = getData(result);
      dispatch({ type: types.SET_HISTORY_TODAY, payload: { productsPerDay } });
    }
  };

  const getInfoProductPerDay = () => getState().productsPerDay;

  const contextValues = {
    clearProduct,
    getProductBySkus,
    getProductsByIds,
    getDataProductBySlug,
    getDataProductRecommendation,
    getProductByCampaign,
    getListViewed,
    addProductToListViewed,
    filterProductByTag,
    clearMapProduct,
    getSkuHistoryPerDay,
    getInfoProductPerDay,
    getDataProductRecommendationTS,
    getProductError,
    getSortedProducts,
    ...state,
  };

  return <ProductContext.Provider value={contextValues}>{children}</ProductContext.Provider>;
};

export const useProduct = () => useContext(ProductContext);
