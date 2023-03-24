import LinkComp from 'components/atoms/LinkComp';
import { getPathProductBySlug } from 'constants/Paths';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const SearchDropdownFeedback = (props) => {
  const { data, keyword, onClickItem } = props;
  return (
    <div className={styles.searchDropdown}>
      {data ? (
        <>
          {data?.map((item) => (
            <LinkComp
              className={styles.searchResults}
              key={uuidv4()}
              href={getPathProductBySlug(item.sku.slug)}
              onClick={(e) => {
                e.preventDefault();
                if (onClickItem) onClickItem(item);
              }}
            >
              {item?.product?.name}
            </LinkComp>
          ))}
        </>
      ) : (
        <span className={styles.searchResults}>
          Không có sản phẩm với từ khóa <em>{keyword}</em>&nbsp;&nbsp;Trong&nbsp;
          <b className={styles.textPrimary}>Tất Cả Sản Phẩm</b>
        </span>
      )}
    </div>
  );
};

export default SearchDropdownFeedback;
