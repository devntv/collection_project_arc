import { memo, useEffect, useState } from 'react';
import useManufacturers from 'zustand-lib/useManufacturers';
import CategoryProduct from './index';
// thêm extra category vào để làm tính năng nhanh cho mùa covid 08Mar22
// sử dụng component mới

const TopManufacturers = ({ path, query }) => {
  const [topManufacturersCategories, settopManufacturersCategories] = useState([]);
  const getTopManufacturers = useManufacturers((state) => state.getTopManufacturer);
  useEffect(async () => {
    const topManufacturers = await getTopManufacturers();

    const topManufacturersdata =
      topManufacturers?.map((manufacture) => ({
        name: manufacture?.shortName || manufacture?.name || '',
        link: manufacture?.slug ? `/manufacturers/${manufacture.slug}` : `/products`,
      })) || [];

    settopManufacturersCategories(topManufacturersdata);
  }, []);

  return (
    topManufacturersCategories?.length > 0 && (
      <CategoryProduct
        categories={topManufacturersCategories}
        type="manufacturers"
        name="Nhà sản xuất"
        path={path}
        query={query}
        isAllProduct
        isCompareEqual
      />
    )
  );
};

export default memo(TopManufacturers);
