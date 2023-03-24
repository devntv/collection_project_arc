import { Container, Grid, Typography } from '@material-ui/core';
import LinkComp from 'components/atoms/LinkComp';
import { NHA_BAN_HANG, THUOC_VA_HOAT_CHAT } from 'constants/data';
import { getHardcodeStoreByTagList } from 'constants/flagship-store';
import { getPathProductBySlug } from 'constants/Paths';
import { useSetting } from 'context';
import React from 'react';
import { ProductServiceV2 } from 'services';
import { groupArrayOfObjects } from 'utils/ObjectUtils';
import styles from './styles.module.css';

const MobileSearchDropdown = (props) => {
  const { keyword, data, searchType = THUOC_VA_HOAT_CHAT, action } = props;
  const { getNameSeller } = useSetting();
  if (!action.isSearching && keyword && data?.length === 0) {
    return (
      <div className={styles.searchDropdown}>
        <span className={styles.searchResult_empty}>
          Không có sản phẩm với từ khóa "<em>{keyword}</em>"&nbsp;&nbsp;Trong&nbsp;
          <b className={styles.textPrimary}>Tất Cả Sản Phẩm</b>
        </span>
      </div>
    );
  }

  if (!action.isSearching && keyword && data && searchType === THUOC_VA_HOAT_CHAT) {
    const listSearch = data.map((item) => {
      const info = ProductServiceV2.convertProductV2(item);
      const { displayPriceFormated, displayPrice, tags, name, seller } = info;
      const sellerInfo = getNameSeller({ seller, tags });

      return { ...item, name, displayPriceFormated, displayPrice, sellerName: sellerInfo?.sellerName || '' };
    });
    const groupedProductByName = groupArrayOfObjects(listSearch, 'name');
    return (
      <div className={styles.searchDropdown}>
        <Container>
          {Object.keys(groupedProductByName).map((key) => {
            const listProduct = groupedProductByName[key];
            return listProduct
              ?.sort((a, b) => a?.displayPrice - b?.displayPrice)
              ?.map((item) => {
                // hard code flagship store
                const hardcodeProduct = getHardcodeStoreByTagList(item?.sku?.tags);
                if (hardcodeProduct) {
                  return (
                    <LinkComp className={styles.searchResults} key={`search-item-${item.sku.slug}`} href={getPathProductBySlug(item.sku.slug)}>
                      {item?.product?.name} - {hardcodeProduct.name} - {`${item?.displayPriceFormated}`}
                    </LinkComp>
                  );
                }
                return (
                  <LinkComp
                    className={styles.searchResults}
                    key={`search-item-${item.sku.slug}`}
                    href={getPathProductBySlug(item.sku.slug)}
                    data-test="search-dropdown-item"
                  >
                    {item?.product?.name}
                    {listProduct.length > 1 && (
                      <Typography component="span">
                        {' '}
                        {item?.sellerName && `- ${item?.sellerName}`} -{' '}
                        <span className={styles.searchDropdown_price}>{item?.displayPriceFormated}</span>
                      </Typography>
                    )}
                  </LinkComp>
                );
              });
          })}
        </Container>
      </div>
    );
  }

  if (!action.isSearching && keyword && data && searchType === NHA_BAN_HANG) {
    return (
      <div className={styles.searchDropdown}>
        {data && (
          <Container>
            {data?.map((item) => (
              <LinkComp className={styles.searchResults} key={`search-item-${item?.code}`} href={item.link}>
                <Grid container>
                  <Grid item xs={8} className={styles.searchDropdown_name}>
                    <Typography component="span">{item.name}</Typography>
                  </Grid>
                </Grid>
              </LinkComp>
            ))}
          </Container>
        )}
      </div>
    );
  }

  return <></>;
};

export default React.memo(MobileSearchDropdown);
