import React from 'react';
import { formatNumber } from 'utils/FormatNumber';
import styles from './style.module.css';

export default function SearchResultText({ total = 0 }) {
  return (
    <div className={styles.search_result}>
      <div>
        Có tất cả <strong>{formatNumber(total, ',')}</strong> sản phẩm tìm kiếm
      </div>
    </div>
  );
}
