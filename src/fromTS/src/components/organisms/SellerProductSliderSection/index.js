import { Box } from '@material-ui/core';
import { useCart } from 'context';
import ProductCardNew from 'components/mocules/ProductCardNew';
import SliderProduct from 'components/mocules/SliderProduct';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const SellerProductSliderSection = ({ products = [], name = '' }) => {
  const { increase } = useCart();
  const handleIncrement = (product) => {
    increase(product);
  };

  return (
    <>
      <Box style={{ marginTop: '30px' }}>
        <SliderProduct name={name} page="PRD_DETAIL">
          {products?.map((product) => (
            // <CardSeller key={uuidV4()} product={product} index={index} onIncrement={handleIncrement} />
            <ProductCardNew product={product} key={`item-product-${product.slug}`} onIncrement={handleIncrement} />
          ))}
        </SliderProduct>
      </Box>
    </>
  );
};

export default SellerProductSliderSection;
