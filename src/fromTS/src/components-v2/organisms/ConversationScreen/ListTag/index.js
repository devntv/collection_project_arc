import CircularProgress from '@material-ui/core/CircularProgress';

import { useAuth } from 'context';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { useEffect, useRef, useState } from 'react';
import AddressService from 'services/AddressService';
import { useDebounce } from 'utils/debounce';
import useChat from 'zustand-lib/useChat';
import OrderList from '../OrderList';
import ProductList from '../ProductList';
import TicketList from '../TicketList';
import { handleProductPrice } from '../func';
import styles from '../styles.module.css';

const defaultPagination = {
  limit: 10,
  page: 1,
  total: 0,
  isOver: false,
};
const isUpdatingText = 'Đang cập nhật';

const ListTag = ({ text, type, handleSelectItem, searchTag }) => {
  const { masterAddressObj = {}, setMasterAddressObj } = useChat((state) => state);
  const debouncedSearchTerm = useDebounce(text);
  const [list, setList] = useState(null);
  const setTriggerFetchMoreListTag = useChat((state) => state.setTriggerFetchMoreListTag);
  let masterAddressList = [];
  if (type === 'ORDER') {
    masterAddressList = list?.reduce((acc, val) => {
      const newAcc = acc;
      const { customerProvinceCode, customerDistrictCode, customerWardCode } = val;
      const masterAddress = {
        provinceCode: customerProvinceCode,
        districtCode: customerDistrictCode,
        wardCode: customerWardCode,
      };
      const strVal = JSON.stringify(masterAddress);
      if (newAcc?.length > 0 && newAcc?.includes(strVal)) return newAcc;
      newAcc.push(strVal);
      return newAcc;
    }, []);
  }
  const scrollRef = useRef();
  const { customerInfo } = useAuth();
  const textRef = useRef();
  const isMountedRef = useRef(true);
  const [isSearching, setIsSearching] = useState(false);
  const [pagination, setPagination] = useState({ ...defaultPagination });

  const fetchMore = async () => {
    if (!pagination.isOver && !isSearching) {
      const res = await searchTag(pagination, customerInfo, debouncedSearchTerm);
      if (textRef.current === debouncedSearchTerm && isMountedRef.current) {
        if (res.status === 'OK') {
          const { data } = res;
          const n = data.length;
          for (let i = 0; i < n; i += 1) {
            data[i].displayPrice = handleProductPrice(data[i]);
          }
          setList((prev) => {
            if (!prev) {
              return data;
            }
            return [...prev, ...data];
          });
          setPagination((prev) => ({
            ...prev,
            page: prev.page + 1,
          }));
        } else {
          setPagination((prev) => ({
            ...prev,
            isOver: true,
          }));
        }
      }
      return true;
    }
    return false;
  };

  const { isFetching, setIsFetching } = useInfiniteScroll(fetchMore, 'bottom', scrollRef.current);

  const getList = async (textSearch = '') => {
    setIsFetching(false);
    const res = await searchTag(defaultPagination, customerInfo, textSearch);

    if (textRef.current === textSearch && isMountedRef.current) {
      if (res.status === 'OK') {
        const { data } = res;
        const n = data.length;
        for (let i = 0; i < n; i += 1) {
          data[i].moreInfo = {
            seller: isUpdatingText,
            manufacturer: isUpdatingText,
          };
          data[i].displayPrice = handleProductPrice(data[i], true);
          if (data[i].sku) {
            data[i].skuItem = data[i].sku;
          } else if (data[i].skuItem) {
            data[i].sku = data[i].skuItem;
          }
        }
        setList(data);
        setPagination((prev) => ({
          ...prev,
          page: 2,
          isOver: false,
        }));
      } else {
        setList([]);
        setPagination((prev) => ({
          ...prev,
          isOver: true,
        }));
      }
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm !== null) {
      if (scrollRef && scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
      setIsSearching(true);
      getList(debouncedSearchTerm).then(() => {
        if (debouncedSearchTerm === textRef.current) {
          setIsSearching(false);
          setTriggerFetchMoreListTag();
        }
      });
    }
    if (debouncedSearchTerm) {
      textRef.current = debouncedSearchTerm;
    } else {
      textRef.current = '';
    }
  }, [debouncedSearchTerm]);
  useEffect(
    () => () => {
      isMountedRef.current = false;
    },
    [],
  );
  // get master address
  useEffect(() => {
    const getMasterAddresses = async () => {
      // eslint-disable-next-line no-prototype-builtins
      const listNewAddress = masterAddressList?.filter((item) => !masterAddressObj?.hasOwnProperty(item)) || [];

      if (listNewAddress?.length === 0) return;
      const listMasterAddress = await Promise.all(
        listNewAddress.map(async (add) => {
          const parseAddress = JSON.parse(add);
          const address = await AddressService.getMasterAddressString(parseAddress);
          return {
            code: add,
            text: address,
          };
        }),
      );
      const newMasterAddress = {
        ...masterAddressObj,
      };
      listMasterAddress.forEach((address) => {
        const { code, text: textAddress } = address;
        newMasterAddress[code] = textAddress;
      });

      setMasterAddressObj(newMasterAddress);
    };
    if (masterAddressList?.length > 0) {
      getMasterAddresses();
    }
  }, [masterAddressList]);

  return (
    <div id="chatMobile_listTag" ref={scrollRef} className={styles.listRootTag}>
      {isSearching ? (
        <div className={styles.boxLoading}>
          <CircularProgress size="25px" />
        </div>
      ) : (
        <>
          {list && list.length > 0 && (
            <>
              {type === 'PRODUCT' && <ProductList productList={list} isFetching={isFetching} handleSelectItem={handleSelectItem} />}
              {type === 'ORDER' && <OrderList orderList={list} isFetching={isFetching} handleSelectItem={handleSelectItem} />}
              {/*  */}

              {type === 'TICKET' && <TicketList ticketList={list} isFetching={isFetching} handleSelectItem={handleSelectItem} />}
            </>
          )}
          {list && !list.length && (
            <div className={styles.textInfoNotFound}>
              {type === 'PRODUCT' && '  Không tìm thấy sản phẩm'}
              {type === 'ORDER' && '  Không tìm thấy đơn hàng'}
              {type === 'TICKET' && '  Không tìm thấy phiếu hỗ trợ'}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ListTag;
