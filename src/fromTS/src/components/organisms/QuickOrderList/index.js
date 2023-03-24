/* eslint-disable react/no-array-index-key */
import { Box, Typography } from '@material-ui/core';
import LoadingBM from 'components-v2/atoms/LoadingBM';
import { getLinkTagDeal } from 'utils';
import ProductCardHorizontal from '../ProductCardHorizontal';

const QuickOrderList = ({ isMobile, keyword, searchProduct = [], loading = false }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20px' }}>
        <LoadingBM />
      </Box>
    );
  }

  if (!searchProduct || searchProduct.length === 0) {
    return (
      <Typography variant="body1" gutterBottom>
        Không có sản phẩm với từ khóa {`"${keyword}"`}
      </Typography>
    );
  }

  return (
    <>
      {searchProduct.map(
        (item, index) =>
          item && (
            <ProductCardHorizontal
              key={`product-cart-horizontaol-${item.sku}-${index}`}
              product={item}
              isMobile={isMobile}
              type="quick-order"
              index={index}
              link={getLinkTagDeal(item)}
            />
          ),
      )}
    </>
  );
};

export default QuickOrderList;
