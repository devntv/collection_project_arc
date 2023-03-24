import { getData, isValid } from 'clients';
import { useEffect, useState } from 'react';
import { ProductServiceV2 } from 'services';
import useGetTagPromotion from 'zustand-lib/useGetTagPromotion';
import ProductCardNew from '../ProductCardNew';
import SliderProduct from '../SliderProduct';
import styles from './styles.module.css';

const SellerTypeNoViewMore = ['INDIVIDUAL', 'MARKET'];

const ProductSeller = ({ sellerInfo, pageName, product }) => {
  const { sellerCode = '', slug } = product || {};
  const sellerUrl =
    // eslint-disable-next-line no-nested-ternary
    sellerInfo?.isStore
      ? `/seller/${sellerInfo?.slug}/list-product`
      : sellerInfo?.isInternal || !SellerTypeNoViewMore.includes(sellerInfo?.sellerType)
      ? `/seller-products/${sellerInfo?.slug}`
      : `/doitac/${sellerCode}`;
  // update client side
  const [products, setProducts] = useState([]);
  useEffect(async () => {
    if (sellerCode) {
      const listProductBySellerRes = await ProductServiceV2.loadProductWithSeller({
        code: sellerCode,
        offset: 0,
      });

      if (isValid(listProductBySellerRes)) {
        const listProductBySeller =
          getData(listProductBySellerRes)
            ?.filter((item) => item?.sku !== product?.sku)
            ?.map((prd) => ({ ...prd, isSameCategoryProduct: true })) || [];
        setProducts(listProductBySeller);
      }
    }
  }, []);

  // call promition tags
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
        <SliderProduct
          name="Sản phẩm cùng nhà bán hàng"
          // viewMore={sellerInfo?.isInternal || !SellerTypeNoViewMore.includes(sellerInfo?.sellerType)}
          viewMore
          redirect={sellerUrl}
          page={pageName}
          className={styles.slider}
          type="SAME_MANUFACTURER"
          products={products}
        >
          {products.map((item) => (
            <ProductCardNew product={item} key={`item-product-${slug}`} tag category />
          ))}
        </SliderProduct>
      )}
    </>
  );
};

export default ProductSeller;
