/* eslint-disable no-nested-ternary */
import { Grid, Typography } from '@material-ui/core';
import { LinkComp } from 'components/atoms';
import TagType from 'components/mocules/TagType';
import { ENUM_TAG_CODES } from 'constants/Tags';
import { TAG_HANG_DAT_TRUOC } from 'sysconfig';
import { formatCurrency, formatNumber } from 'utils/FormatNumber';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const ComboList = ({ items, title }) => (
  <Grid container item xs={12}>
    <Grid item xs={12}>
      {title && <Typography className={styles.cb_title}>{title}</Typography>}
    </Grid>
    <Grid item xs={12}>
      <div className={styles.comboList}>
        {items.map((item) => {
          const { name, slug, isGift, salePrice, tags, quantity = 0 } = item;
          return (
            <div key={item.productId} className={styles.cb_item}>
              <div className={styles.cb_name}>
                <div>
                  {isGift ? (
                    <Typography className={styles.cb_unlink}>{name} </Typography>
                  ) : (
                    <LinkComp className={styles.cb_link} href={`/product/${slug}`} prefetch={false}>
                      {name}
                    </LinkComp>
                  )}
                </div>
                <div className={styles.product_tags}>
                  {tags &&
                    tags
                      .filter((tag) => tag === ENUM_TAG_CODES.HOADONNHANH || tag === TAG_HANG_DAT_TRUOC)
                      ?.map((tag) => <TagType key={uuidv4()} item={tag} />)}
                </div>
              </div>

              <div className={styles.priceGroup}>
                <div className={styles.qty}>{`SL: ${formatNumber(quantity)}`}</div>
                <span className={styles.price_label}>Giá bán hiện tại: </span>
                <span className={styles.cb_price}>{isGift ? 'Quà tặng' : formatCurrency(salePrice)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Grid>
  </Grid>
);

export default ComboList;
