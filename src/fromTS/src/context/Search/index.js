import { getData, SearchClient, SellerClient } from 'clients';
import { ENTERPRISE, HOAT_CHAT, NHA_BAN_HANG, PAGE_SIZE_30, THUOC, THUOC_VA_HOAT_CHAT } from 'constants/data';
import { MY_ORDER_URL, PRODUCTS_LOADING_URL, PRODUCTS_URL, SELLERS } from 'constants/Paths';
import { useSetting } from 'context/Settings';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { WebService } from 'services';
import { IS_WEB_SERVICE_SEARCH_LITE } from 'sysconfig';
import { gtag, StringUtils } from 'utils';
import { debounceFunc200, debounceFunc300 } from 'utils/debounce';

const SearchContext = createContext({});

export const SearchProvider = ({ children }) => {
  const router = useRouter();
  const [searchProduct, setSearchProduct] = useState([]);
  const [searchIngredient, setSearchIngredient] = useState([]);
  const [searchSeller, setSearchSeller] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [hidden, setHidden] = useState(false);
  const [searchType, setSearchType] = useState(THUOC_VA_HOAT_CHAT);
  const [action, setAction] = useState({
    isFetching: false,
    isSearching: false,
  });

  const { ingredients, getNameSeller } = useSetting();

  const convertSellers = (seller = []) =>
    seller
      ?.sort((a, b) => a?.name.localeCompare(b?.name))
      ?.map((itemSeller) => {
        const { name = null, slug = null, code = null } = itemSeller || {};
        const info = getNameSeller({ seller: { code } });
        const { linkStore = '', linkSeller = '' } = info || {};
        return {
          name,
          slug,
          code,
          link: linkStore || linkSeller,
        };
      });

  useEffect(() => {
    if (router.pathname !== '/users/rewards' && !router.asPath.includes(MY_ORDER_URL)) {
      const { q = '', search = '' } = router?.query;
      const keywordVal = q || search;
      setKeyword(keywordVal.trim());
    }
  }, [router?.query]);

  useEffect(() => {
    const dataSearchType = Number(router?.query?.searchType);
    setSearchType(dataSearchType || THUOC_VA_HOAT_CHAT);
  }, []);

  const clearSearchRes = () => {
    setSearchProduct([]);
    setSearchIngredient([]);
    setSearchSeller([]);
  };

  const handleSearch = async ({ val = '', isIngredients = true }) => {
    setSearchProduct(
      IS_WEB_SERVICE_SEARCH_LITE
        ? await WebService.searchFuzzyLite({
            body: {
              text: val,
              offset: 0,
              limit: PAGE_SIZE_30,
              searchStrategy: {
                text: true,
                keyword: true,
                ingredient: isIngredients,
              },
            },
          })
        : getData(await SearchClient.searchByKeywords(val, isIngredients)),
    );
  };

  const fetchDataSearch = async (val) => {
    setAction({ ...action, isFetching: true });
    switch (searchType) {
      case THUOC_VA_HOAT_CHAT:
        handleSearch({ val });
        gtag.clickSearch(THUOC_VA_HOAT_CHAT, val);
        break;
      case HOAT_CHAT:
        {
          const data = StringUtils.searchStringInStrings(ingredients, val);
          setSearchIngredient(data);
          gtag.clickSearch(HOAT_CHAT, val);
        }
        break;
      case NHA_BAN_HANG:
        {
          const sellerRes = await SellerClient.searchStoreByText({
            params: {
              search: val,
              offset: 0,
              limit: 30,
              getTotal: true,
              sellerType: ENTERPRISE,
            },
          });
          setSearchSeller(convertSellers(getData(sellerRes)));
          gtag.clickSearch(NHA_BAN_HANG, val);
        }
        break;
      case THUOC:
        handleSearch({ val, isIngredients: false });
        gtag.clickSearch(THUOC, val);
        break;
      default:
        clearSearchRes();
        break;
    }
    setAction({ ...action, isFetching: false, isSearching: false });
  };

  const handleSearchbox = (e) => {
    setAction({ ...action, isSearching: true });
    const val = e.target.value;
    setKeyword(val);
    setHidden(true);
    debounceFunc300(() => {
      if (val) {
        fetchDataSearch(val);
      } else {
        clearSearchRes();
      }
    });
  };

  const handleClearSearchBox = () => {
    setAction({ ...action, isFetching: true });
    setKeyword('');
    setHidden(true);
    debounceFunc300(() => {
      clearSearchRes();
    });
    setAction({ ...action, isFetching: false });
  };

  const handleKeyDown = (event) => {
    const trimKeyword = keyword.trim();

    if (event.keyCode === 13) {
      event.preventDefault();
      event.target.blur();
      switch (searchType) {
        case THUOC_VA_HOAT_CHAT:
        case THUOC:
          router.push({
            pathname: `${PRODUCTS_LOADING_URL}`,
            query: {
              q: trimKeyword,
              searchType,
            },
          });
          break;
        // TODO: improve phase 2
        // enter ko chuyển đến page hoạt chất
        case HOAT_CHAT:
          // router.push(`${INGREDIENT}`);
          break;
        case NHA_BAN_HANG:
          router.push({
            pathname: `${SELLERS}`,
            query: {
              search: trimKeyword,
              searchType,
            },
          });
          break;
        default:
          router.push(`${PRODUCTS_URL}`);
          break;
      }
    }
  };

  const handleFocus = (e) => {
    const val = e?.target?.value;
    if (val && val.length > 0) {
      setHidden(true);
      setKeyword(e.target.value);
    }
  };

  const handleChangeTypeSearch = (e) => {
    setSearchType(Number(e.target.value));
  };

  const handleBlur = () => {
    setIsFocus(false);
    debounceFunc200(() => {
      setHidden(false);
    });
  };

  // call api when select dropdown
  useEffect(() => {
    if (keyword) {
      fetchDataSearch(keyword);
    } else {
      clearSearchRes();
    }
  }, [searchType]);

  return (
    <SearchContext.Provider
      value={{
        searchProduct,
        keyword,
        setKeyword,
        hidden,
        handleSearchbox,
        handleKeyDown,
        handleFocus,
        handleBlur,
        setSearchProduct,
        isFocus,
        setIsFocus,
        searchType,
        setSearchType,
        handleChangeTypeSearch,
        searchIngredient,
        setSearchIngredient,
        searchSeller,
        setSearchSeller,
        action,
        handleClearSearchBox,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export const useSearch = () => useContext(SearchContext);
