/* eslint-disable camelcase */
import Template from 'components/layout/Template';
import ProductDetailListing from 'components/organisms/ProductDetailListing/loading';
import { useRouter } from 'next/router';

const SkeletonProductDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const cat = 'products';

  const namePage = () => {
    const name = 'Tất cả sản phẩm';
    return name;
  };

  return (
    <Template title={slug} pageName={cat} pageTitle={slug}>
      <ProductDetailListing products={[]} isLoading catName={cat} name={namePage()} isPageProducts />
    </Template>
  );
};

export default SkeletonProductDetail;
