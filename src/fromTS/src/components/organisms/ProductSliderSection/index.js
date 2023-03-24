import ProductCardNew from 'components/mocules/ProductCardNew';
import SliderProductBlock from 'components/mocules/Skeleton/SliderProductBlock';
import SliderProduct from 'components/mocules/SliderProduct';
import { useCart } from 'context';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { getLinkTagDeal } from 'utils';

const ProductSliderSection = ({ products = [], name = '', viewMore = true, redirect = '', loading = false, productsType = '', icon }) => {
  const { increase } = useCart();
  const handleIncrement = (product) => {
    increase(product);
  };

  return loading ? (
    <SliderProductBlock />
  ) : (
    <SliderProduct name={name} viewMore={viewMore} redirect={redirect} loading={loading} productsType={productsType} icon={icon}>
      {products?.map((product, index) => (
        <ProductCardNew
          product={product}
          key={`item-product-${product.slug}`}
          index={index}
          tag
          category
          onIncrement={handleIncrement}
          link={getLinkTagDeal(product)}
          isLinkTagDeal
        />
      ))}
    </SliderProduct>
  );
};

export default ProductSliderSection;
