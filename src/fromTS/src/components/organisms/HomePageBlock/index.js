import { getData } from 'clients';
import ProductSliderSection from 'components/organisms/ProductSliderSection';
import { INSIDER_RECOMMENDATION, THUOCSI_RECOMMENDATION } from 'constants/Enums';
import { useCart, useProduct } from 'context';
import { memo, useEffect, useState } from 'react';
import { TAG_NEW } from 'sysconfig';

const HomePageBlock = ({ type, redirectUrl, viewMore, name, provinceCode, icon }) => {
  const { filterProductByTag, getDataProductRecommendation, getDataProductRecommendationTS } = useProduct();

  const { mapDataProduct, loading = true } = useCart();
  const [productLoading, setProductLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setProductLoading(true);
      let productRs = null;
      switch (type) {
        case 'BANCHAY':
          productRs = await filterProductByTag({ filter: { tag: 'BANCHAY' }, getPrice: true });
          break;
        case TAG_NEW:
          productRs = await filterProductByTag({ filter: { tag: TAG_NEW }, getPrice: true });
          break;
        case 'DEALS':
          productRs = await filterProductByTag({ getDealOnly: true, getPrice: true });
          break;
        case INSIDER_RECOMMENDATION.MOST_VIEWED:
        case INSIDER_RECOMMENDATION.USER_BASED: {
          productRs = await getDataProductRecommendation({ type });
          break;
        }
        case 'MEGA-SALE':
          productRs = await filterProductByTag({ filter: { tags: ['DOCQUYENGIATOT', `PROVINCE_${provinceCode}`] } });
          // productRs = { ...productRs, data: getData(productRs)?.filter(item => item)?.map((child) => ({ ...(child || {}), isExclusive: true })) }; // temporary hidden, wait to create new source tracking for this line product
          break;
        case THUOCSI_RECOMMENDATION.CONFIG_WEIGHT:
          productRs = await getDataProductRecommendationTS({ type });
          break;
        default:
      }

      const dataMapQuantity = mapDataProduct(getData(productRs));
      setData(dataMapQuantity);
      setProductLoading(false);
    };
    if (!loading) loadData();
  }, [loading]);

  return (
    <ProductSliderSection
      key={`home-page-block${name}`}
      name={name}
      viewMore={viewMore}
      products={data}
      redirect={redirectUrl}
      loading={productLoading}
      productsType={type}
      icon={icon}
    />
  );
};

export default memo(HomePageBlock);
