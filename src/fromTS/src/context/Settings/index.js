import { getData, ProductClientV2, SellerClient, SupplierClient, TicketClient } from 'clients';
import CatClientV2 from 'clients/CatClientV2';
import IngredientClient from 'clients/IngredientClient';
import { BRAND_NAME } from 'constants/Enums';
import { TopManufacturer } from 'constants/manufacturer';
import { useAuth } from 'context/Auth';
import { useLocalStorage } from 'hooks';
import { createContext, useContext, useEffect, useState } from 'react';
import AddressService from 'services/AddressService';
import { DOMAIN_FLAGSHIP_STORE } from 'sysconfig';
import { convertArrayToMap } from 'utils/ArrUtils';

const SettingContext = createContext({});

export const SettingProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // getProvinces
  const [provinces, getProvinces] = useLocalStorage({
    key: 'provincesList',
    getValueDefault: async () => {
      const provinceRes = await AddressService.getAllProvinceMock({});
      const data = getData(provinceRes);
      return data && data.length > 0 ? data : null;
    },
    fieldNames: ['label', 'value', 'regionCode'],
  });

  const getRegionByProvinceCode = (provinceCode) => provinces?.find((item) => item.value === provinceCode)?.regionCode || null;

  // categories
  const [categories, getCategories] = useLocalStorage({
    key: 'categories',
    getValueDefault: async () => {
      const categoriesRes = await CatClientV2.loadGroupMock({});
      const data = getData(categoriesRes);
      return data && data.length > 0 ? data : null;
    },
    fieldNames: ['code', 'name', 'slug', 'subEfficacies', 'relatedEfficacyCodes', 'relatedSellerCategoryCodes', 'relatedCategoryCodes'],
  });

  const [mapCategories, setMapCategories] = useState(new Map());

  useEffect(() => {
    if (categories && categories.length > 0) {
      setMapCategories(convertArrayToMap(categories, 'code'));
    }
  }, [categories]);

  // const getStyleBySlugOfTag = (code) => settingTags?.get(code);

  // manufactor
  const [mapManufactuers, setMapManufactuers] = useState(new Map());
  const [topManufacturers, setTopManufacturers] = useState([]);
  const [manufactuers, getManufacturers] = useLocalStorage({
    key: 'manufactuers',
    getValueDefault: async () => {
      const settingRes = await ProductClientV2.loadDataManufacturerMock();
      const data = getData(settingRes);
      return data && data.length > 0 ? data : null;
    },
    fieldNames: ['code', 'name', 'slug', 'shortName'],
  });

  useEffect(() => {
    if (manufactuers && manufactuers.length > 0) {
      setMapManufactuers(convertArrayToMap(manufactuers, 'code'));
      if (TopManufacturer && TopManufacturer.length > 0) {
        const topManufacturersList = manufactuers?.filter((item) => TopManufacturer.indexOf(item.code) >= 0);
        if (topManufacturersList.length === 0) {
          setTopManufacturers(manufactuers?.slice(0, 20) || []);
        } else {
          setTopManufacturers(topManufacturersList);
        }
      }
    }
  }, [manufactuers]);

  // ingredients

  const [mapIngredients, setMapIngredients] = useState(new Map());
  const [mapIngredientsById, setMapIngredientsById] = useState(new Map());
  const [ingredients, getIngredients] = useLocalStorage({
    key: 'ingredients',
    getValueDefault: async () => {
      const settingRes = await IngredientClient.loadDataIngredientClientMock();
      const data = settingRes?.data;
      return data && data.length > 0 ? data : null;
    },
    fieldNames: ['id', 'name', 'slug', 'code', 'isMedicine', 'unsignedKey'],
  });

  useEffect(() => {
    if (ingredients && ingredients.length > 0) {
      setMapIngredients(convertArrayToMap(ingredients, 'code'));
      setMapIngredientsById(convertArrayToMap(ingredients, 'id'));
    }
  }, [ingredients]);
  // -------------------------------------------------------------------------------------------------------------
  /*
   ingredient product ( là dạng chưa tên và số lượng sẵn để chọn cho nhanh - không thay thế cho ingredient cũ )
   ingredientProduct  
  {
            "code": "5335B42U1Y",  // mã code mà bên trong product detail trả về 
            "lastUpdatedTime": "2021-08-18T07:12:29.873Z",
            "localName": "Kẽm 70Mg/Liều", // tên kèm cả miligam 
            "name": "Zinc 70Mg/Dose"// tên kèm cả miligam 
  },

  ở đây dùng để cache data xuống local storage để tránh phải get đi get lại nhiều lần
  */

  const [mapIngredientsProduct, setMapIngredientsProduct] = useState(new Map());

  // useLocalStorage :(nhấn vào để xem chi tiết ) dùng để lưu xuống local storage với ttl ( expired ) , giá trị mặc định , và key : dùng dể get từ local storage ra
  const [ingredientsProduct, getIngredientsProduct] = useLocalStorage({
    key: 'ingredientsProduct',
    getValueDefault: async () => {
      // nếu data = null thì sẽ chạy hàm này lấy data ra trước
      const settingRes = await IngredientClient.getAllIngredientProductMock();
      const data = settingRes?.data;
      // const data = getData(settingRes)?.map(({ code, name, ingredientId }) => ({ code, name, ingredientId })) || null;
      return data && data.length > 0 ? data : null;
    },
    fieldNames: ['name', 'code'],
  });

  useEffect(() => {
    if (ingredientsProduct && ingredientsProduct.length > 0) {
      setMapIngredientsProduct(convertArrayToMap(ingredientsProduct, 'code'));
    }
  }, [ingredientsProduct]);
  // -------------------------------------------------------------------------------------------------------------
  // Seller info
  const [mapSeller, setMapSeller] = useState(new Map());
  const [sellers, getSellers] = useLocalStorage({
    key: 'seller',
    getValueDefault: async () => {
      // get api mocks (gỉam data trả ra)
      const sellerRes = await SupplierClient.getSellersMock();
      const data = getData(sellerRes);
      return data && data.length > 0 ? data : null;
    },
    fieldNames: [
      'code',
      'isInternal',
      'name',
      'sellerType',
      'slug',
      'landingPage',
      'fullName',
      'isVip',
      'avatar',
      'status',
      'statusStore',
      'storeSlug',
      'isStore',
    ],
  });

  useEffect(() => {
    if (sellers && sellers.length > 0) {
      setMapSeller(convertArrayToMap(sellers, 'code'));
    }
  }, [sellers]);

  // end sellers

  // reasons ticket list
  const [mapReasonsTicket, setMapReasonsTicket] = useState(new Map());
  const [reasonsTicket, getReasonsTicket] = useLocalStorage({
    key: 'reasonsTicket',
    getValueDefault: async () => {
      const reasonResult = await TicketClient.getListReasonsWithoutLoginMock();
      const data = getData(reasonResult);
      return data && data.length > 0 ? data : null;
    },
    fieldNames: ['code', 'name', 'orderStatuses', 'showBankAccount', 'status', 'ticketType'],
  });

  useEffect(() => {
    if (reasonsTicket && reasonsTicket.length > 0) {
      setMapReasonsTicket(convertArrayToMap(reasonsTicket, 'code'));
    }
  }, [reasonsTicket]);

  // end reasons ticket

  // store active

  const [mapStoreActives, setMapStoreActives] = useState(new Map());
  const [storeActives, getStoreActives] = useLocalStorage({
    key: 'storeActives',
    getValueDefault: async () => {
      // get api mocks (gỉam data trả ra)
      const storeActiveResult = await SellerClient.getAllStoreActiveWeb({});
      const data = getData(storeActiveResult)?.map(({ sellerCode }) => ({ sellerCode }));
      return data && data.length > 0 ? data : null;
    },
    fieldNames: ['sellerCode'],
  });

  useEffect(() => {
    if (storeActives && storeActives.length > 0) {
      setMapStoreActives(convertArrayToMap(storeActives, 'sellerCode'));
    }
  }, [storeActives]);

  // COUNTRY
  const [mapCountry, setMapCountry] = useState(new Map());
  const [countryLists, getCountryLists] = useLocalStorage({
    key: 'countries',
    getValueDefault: async () => {
      const contryListRes = await AddressService.getAllCountriesMock({});
      const data = getData(contryListRes);
      return data && data.length > 0 ? data : null;
    },
    fieldNames: ['label', 'value'],
    // serializeFunc: (dataList) => dataList.map((data) => ({ l: data.label, v: data.value })),
    // deserializeFunc: (dataList) => dataList.map((data) => ({ label: data.l, value: data.v })),
  });

  useEffect(() => {
    if (countryLists && countryLists.length > 0) {
      setMapCountry(convertArrayToMap(countryLists, 'value'));
    }
  }, [countryLists]);

  // ENd COUNTRY

  useEffect(() => {
    if (!(countryLists?.length > 0)) {
      getCountryLists();
    }
    if (!(reasonsTicket?.length > 0)) {
      getReasonsTicket();
    }
    if (!ingredients || ingredients.length === 0) {
      getIngredients();
    }
    if (isAuthenticated) {
      if (!storeActives) {
        getStoreActives();
      }
      if (!manufactuers) {
        getManufacturers();
      }
      if (!categories) {
        getCategories();
      }
      if (!provinces) {
        getProvinces();
      }
      // nếu khi vào trang chưa có thì sẽ tự động load lên
      if (!ingredientsProduct) {
        getIngredientsProduct();
      }
      if (!sellers) {
        getSellers();
      }
    }
  }, [isAuthenticated]);

  // seller name
  const getNameSeller = (props) => {
    const { seller = {}, tags = [] } = props;
    const { code } = seller;
    const isVAT = tags?.indexOf('HOADONNHANH') >= 0 || false;
    const sellerInfo = mapSeller?.get(code) || null;

    let sellerName = '';
    let isDisplayStore = false;
    let fullNameSeller = '';
    const { isVip = false, slug = '' } = sellerInfo || {};
    let linkSeller = sellerInfo?.landingPage?.startsWith('https://try.thuocsi.vn')
      ? sellerInfo?.landingPage
      : `/seller-products/${sellerInfo?.slugStore || sellerInfo?.slug}`;
    let linkStore = `/seller/${slug}`;
    if (isVip) {
      linkStore = DOMAIN_FLAGSHIP_STORE.replace('{seller}', slug) || `/flagship-store/${slug}`;
    }

    // nếu không có sellerinfo => hiện rỗng
    if (sellerInfo) {
      if (sellerInfo.isInternal) {
        isDisplayStore = true;
        fullNameSeller = 'MEDX';
        if (isVAT) {
          sellerName = 'MEDX';
        }
      } else if (sellerInfo?.sellerType === 'ENTERPRISE') {
        isDisplayStore = true;
        sellerName = sellerInfo?.name || '';
        fullNameSeller = sellerInfo?.fullName || '';
      } else {
        sellerName = `Đối Tác Của ${BRAND_NAME}`;
        isDisplayStore = false;
        fullNameSeller = `Đối Tác Của ${BRAND_NAME}`;
        linkSeller = `/doitac/${code}`;
      }
    }
    return { sellerName, linkStore, linkSeller, isDisplayStore, fullNameSeller, ...sellerInfo };
  };

  return (
    <SettingContext.Provider
      value={{
        getProvinces,
        categories,
        provinces,
        mapCategories,
        mapManufactuers,
        topManufacturers,
        ingredients,
        getIngredients,
        mapIngredients,
        mapIngredientsById,
        mapIngredientsProduct,
        mapSeller,
        getRegionByProvinceCode,
        sellers,
        mapStoreActives,
        countryLists,
        getCountryLists,
        mapCountry,
        mapReasonsTicket,
        reasonsTicket,
        // tabs,
        getNameSeller,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export const useSetting = () => useContext(SettingContext);

export default {
  SettingContext,
  useSetting,
};
