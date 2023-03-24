import { getData } from 'clients';
import { useCart, useProduct } from 'context';
import { useEffect, useState } from 'react';
import ProductCardNew from '../ProductCardNew';
import SliderProduct from '../SliderProduct';
import styles from './styles.module.css';

const ProductsRecommendation = ({ type, title, pageName }) => {
  const { getDataProductRecommendation } = useProduct();
  const [products, setProducts] = useState([]);
  const { mapDataProduct } = useCart();
  useEffect(async () => {
    const res = await getDataProductRecommendation({ type });
    const productsData = mapDataProduct(getData(res)?.filter((item) => item.isAvailable));
    setProducts(productsData);
  }, []);

  return (
    <>
      {products?.length > 0 && (
        <SliderProduct name={title} viewMore redirect="/products" className={styles.slider} page={pageName}>
          {products.map((item) => (
            <ProductCardNew product={item} key={`item-product-${item.slug}`} tag category />
          ))}
        </SliderProduct>
      )}
    </>
  );
};

export default ProductsRecommendation;
