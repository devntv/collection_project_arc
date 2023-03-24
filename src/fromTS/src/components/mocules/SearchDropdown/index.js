import LinkComp from 'components/atoms/LinkComp';
import { getPathProductBySlug, PRODUCTS_LOADING_URL } from 'constants/Paths';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const SearchDropdown = (props) => {
  const { data, keyword } = props;
  return (
    <div className={styles.searchDropdown}>
      {data ? (
        <>
          <LinkComp className={styles.searchResults} href={`${PRODUCTS_LOADING_URL}?q=${keyword}`}>
            <em>{keyword}</em>&nbsp;&nbsp;Trong&nbsp;
            <b className={styles.textPrimary}>Tất Cả Sản Phẩm</b>
          </LinkComp>
          {data.map((item) => (
            <LinkComp className={styles.searchResults} key={uuidv4()} href={getPathProductBySlug(item.sku.slug)}>
              {item.product.name}
            </LinkComp>
          ))}
        </>
      ) : (
        <span className={styles.searchResults}>
          Không có sản phẩm với từ khóa <em>{keyword}</em>&nbsp;&nbsp;Trong&nbsp;
          <b className={styles.textPrimary}>Tất Cả Sản Phẩm</b>
        </span>
      )}

      {/* anpham comment - wait api */}
      {/* {data && data.manufacturers ? (
        <>
          <LinkComp className={styles.searchResults} href="/">
            <em>{keyword}</em>&nbsp;&nbsp;Trong&nbsp;
            <b className={styles.textPrimary}>Tất Cả Nhà Sản Xuất </b>
          </LinkComp>
          {data[0].manufacturers.map((item) => (
            <LinkComp className={styles.searchResults} key={uuidv4()} item={item} href="/">
              {item.name}
            </LinkComp>
          ))}
        </>
      ) : (
        <div className={styles.searchResults}>
          Không có sản phẩm với từ khóa <em>{keyword}</em>&nbsp;&nbsp;Trong&nbsp;
          <b className={styles.textPrimary}>Tất Cả Nhà Sản Xuất </b>
        </div>
      )} */}
    </div>
  );
};

export default SearchDropdown;
