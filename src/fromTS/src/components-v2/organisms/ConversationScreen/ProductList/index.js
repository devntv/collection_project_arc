/* eslint-disable react/no-array-index-key */
import { Box, CircularProgress } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ProductItem from '../ProductItem';
import styles from '../styles.module.css';

const ProductList = ({ productList, isFetching = false, handleSelectItem }) => (
  <List className={styles.list} disablePadding>
    {productList.map((product, index) => (
      <Box className="chatMobile_childContainer" key={`list${index}${product?.sku?.code}`}>
        <ListItem
          disableGutters
          divider
          className={styles.listItem}
          onClick={() => {
            handleSelectItem(product);
          }}
        >
          <ProductItem product={product} />
        </ListItem>
      </Box>
    ))}
    {isFetching && (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0px' }}>
        <CircularProgress size="25px" />
      </div>
    )}
  </List>
);

export default ProductList;
