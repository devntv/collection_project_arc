import { getData, IngredientCLient } from 'clients';
import { useEffect, useState } from 'react';
import { ProductServiceV2 } from 'services';
import useGetTagPromotion from 'zustand-lib/useGetTagPromotion';
import ProductCardNew from '../ProductCardNew';
import SliderProduct from '../SliderProduct';

const ProductIngredientRelated = ({ pageName, product }) => {
  const { ingredients = [] } = product || {};

  // update client side
  const [products, setProducts] = useState([]);
  useEffect(async () => {
    if (ingredients?.length > 0) {
      const ingredientCode = ingredients?.map((ele) => ele.ingredientCode);

      // GET 10 sản phảm theo ingredient thôi , vì có thể lên tận 1k hơn lận
      let listProductRelative = [];
      const promiseAll = [];
      ingredientCode.forEach(async (code) => {
        promiseAll.push(IngredientCLient.getProductsBySlug(null, code, { limit: 10 }));
      });

      const listDataIngredientRes = await Promise.all(promiseAll);
      listDataIngredientRes?.forEach((dataIngredientRes) => {
        listProductRelative = listProductRelative?.concat(getData(dataIngredientRes));
      });
      const mapDataResutl = await ProductServiceV2.mapDataProduct({
        result: {
          status: 'OK',
          data: listProductRelative,
        },
      });

      setProducts(
        getData(mapDataResutl)
          ?.filter((prd) => prd.sku !== product.sku)
          .reduce((unique, o) => {
            if (!unique.some((prd) => prd.sku === o.sku)) {
              unique.push(o);
            }
            return unique;
          }, []),
      );
    }
  }, []);

  const { getPromoLists } = useGetTagPromotion();
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    if (products.length > 0) getPromoLists({ getVoucherInfo: false, signal });

    return () => controller.abort();
  }, [products.length]);

  return (
    <>
      {products?.length > 0 && (
        <SliderProduct name="Cùng hoạt chất" viewMore redirect="/products" page={pageName} type="SAME_INGREDIENT" products={products}>
          {products.map((item) => (
            <ProductCardNew product={item} key={`item-product-${product.slug}`} tag category />
          ))}
        </SliderProduct>
      )}
    </>
  );
};

export default ProductIngredientRelated;
