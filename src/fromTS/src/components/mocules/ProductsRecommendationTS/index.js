import { getData } from 'clients';
import { THUOCSI_RECOMMENDATION } from 'constants/Enums';
import { useCart, useProduct } from 'context';
import { useEffect, useState } from 'react';
import ProductCardNew from '../ProductCardNew';
import SliderProduct from '../SliderProduct';

const ProductsRecommendationTS = ({ type, value, title, pageName, skuNotIn = [] }) => {
  const { getDataProductRecommendationTS } = useProduct();
  const [products, setProducts] = useState([]);
  const { mapDataProduct } = useCart();

  useEffect(async () => {
    let res = {};
    if (type === THUOCSI_RECOMMENDATION.ALL) {
      const recommendationAllRes = await Promise.all(
        value.map((metricInfo) => getDataProductRecommendationTS({ type: metricInfo.type, value: metricInfo.value, limit: 15, skuNotIn })),
      );
      let data = [];
      recommendationAllRes.forEach((rs) => {
        data = data.concat(rs?.data || []);
      });

      res = {
        status: 'OK',
        data,
      };
    } else res = await getDataProductRecommendationTS({ type, value });

    const productsData = mapDataProduct(getData(res)?.filter((item) => item.isAvailable));
    setProducts(productsData);
  }, []);

  return (
    <>
      {products?.length > 0 && (
        <SliderProduct products={products} name={title} viewMore redirect="/products" page={pageName}>
          {products.map((item) => (
            <ProductCardNew product={item} key={`item-product-${item.slug}`} tag category />
          ))}
        </SliderProduct>
      )}
    </>
  );
};

export default ProductsRecommendationTS;
