import { Box, Typography } from '@material-ui/core';
import { LinkComp } from 'components/atoms';
import { HOAT_CHAT, NHA_BAN_HANG, THUOC, THUOC_VA_HOAT_CHAT } from 'constants/data';
import { getHardcodeStoreByTagList } from 'constants/flagship-store';
import { getPathProductBySlug, INGREDIENT, PRODUCTS_LOADING_URL, SELLERS } from 'constants/Paths';
import { useSetting } from 'context';
import { ProductServiceV2 } from 'services';
import { groupArrayOfObjects } from 'utils/ObjectUtils';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

// TODO: logic search
const SearchDropdown = (props) => {
  const { data, keyword, type } = props;
  const { getNameSeller } = useSetting();

  if (!data || !type) {
    return (
      <Box className={styles.searchDropdown} data-test="search-dropdown">
        <Typography display="inline" className={styles.searchResults}>
          Không có sản phẩm với từ khóa <Typography display="inline">{keyword}</Typography>&nbsp;&nbsp;trong&nbsp;
          <Typography className={styles.textPrimary}>Tất Cả Sản Phẩm</Typography>
        </Typography>
      </Box>
    );
  }

  // kq của thuốc
  if (data && (type === THUOC_VA_HOAT_CHAT || type === THUOC)) {
    const listSearch = data.map((item) => {
      const info = ProductServiceV2.convertProductV2(item);
      const { displayPriceFormated, displayPrice, tags, name, seller } = info;
      const sellerInfo = getNameSeller({ seller, tags });

      return { ...item, name, displayPriceFormated, displayPrice, sellerName: sellerInfo?.sellerName || '' };
    });

    const groupedProductByName = groupArrayOfObjects(listSearch, 'name');

    return (
      <Box className={styles.searchDropdown} data-test="search-dropdown">
        <LinkComp className={styles.searchResults} href={`${PRODUCTS_LOADING_URL}?text=${keyword}`} data-test="search-dropdown-enter">
          <Box display="inline" className={styles.keyword}>
            <Typography display="inline" style={{ fontWeight: '500', marginLeft: '4px' }}>
              {keyword}
            </Typography>
          </Box>
          &nbsp;trong:&nbsp;
          <Typography display="inline" className={styles.textPrimary}>
            Thuốc
          </Typography>
        </LinkComp>
        {Object.keys(groupedProductByName).map((key) => {
          const listProduct = groupedProductByName[key];

          return listProduct
            ?.sort((a, b) => a?.displayPrice - b?.displayPrice)
            ?.map((item) => {
              // hard code flagship store
              const hardcodeProduct = getHardcodeStoreByTagList(item?.sku?.tags);
              if (hardcodeProduct) {
                return (
                  <LinkComp className={styles.searchResults} key={uuidv4()} href={getPathProductBySlug(item.sku.slug)}>
                    {item?.product?.name} - {hardcodeProduct.name} - {`${item?.displayPriceFormated}`}
                  </LinkComp>
                );
              }
              return (
                <LinkComp className={styles.searchResults} key={uuidv4()} href={getPathProductBySlug(item.sku.slug)} data-test="search-dropdown-item">
                  {item?.product?.name} {listProduct.length > 1 && `${item?.sellerName && `- ${item?.sellerName}`}  - ${item?.displayPriceFormated}`}
                </LinkComp>
              );
            });
        })}
      </Box>
    );
  }

  // kq của hoạt chất
  if (data && type === HOAT_CHAT) {
    const searchRes = data.map((item) => ({ name: item.name, link: `${INGREDIENT}/${item?.slug}` }));

    return (
      <Box className={styles.searchDropdown} data-test="search-dropdown">
        <LinkComp className={styles.searchResults} href={`${INGREDIENT}`}>
          <Box display="inline" className={styles.keyword}>
            <Typography display="inline" style={{ fontWeight: '500', marginLeft: '4px' }}>
              {keyword}
            </Typography>
          </Box>
          &nbsp;trong:&nbsp;
          <Typography display="inline" className={styles.textPrimary}>
            Hoạt Chất
          </Typography>
        </LinkComp>
        {searchRes &&
          searchRes.length > 0 &&
          searchRes.map((item) => (
            <LinkComp className={styles.searchResults} key={uuidv4()} href={item.link}>
              {item?.name}
            </LinkComp>
          ))}
      </Box>
    );
  }

  // kq của nhà bán hàng
  if (data && type === NHA_BAN_HANG) {
    return (
      <Box className={styles.searchDropdown} data-test="search-dropdown">
        <LinkComp className={styles.searchResults} href={`${SELLERS}?search=${keyword}`}>
          <Box display="inline" className={styles.keyword}>
            <Typography display="inline" style={{ fontWeight: '500', marginLeft: '4px' }}>
              {keyword}
            </Typography>
          </Box>
          &nbsp;trong:&nbsp;
          <Typography display="inline" className={styles.textPrimary}>
            Nhà Bán Hàng
          </Typography>
        </LinkComp>
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <LinkComp className={styles.searchResults} key={uuidv4()} href={item.link}>
              {item?.name}
            </LinkComp>
          ))}
      </Box>
    );
  }

  return (
    <Box className={styles.searchDropdown} data-test="search-dropdown">
      <Typography display="inline" className={styles.searchResults}>
        Không có sản phẩm với từ khóa <Typography display="inline">{keyword}</Typography>&nbsp;&nbsp;trong&nbsp;
        <Typography className={styles.textPrimary}>Tất Cả Sản Phẩm</Typography>
      </Typography>
    </Box>
  );
};

export default SearchDropdown;
