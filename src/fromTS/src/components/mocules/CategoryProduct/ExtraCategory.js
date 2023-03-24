import { EXTRA_CATEGORY } from 'constants/Category';
import CategoryProduct from './index';
// thêm extra category vào để làm tính năng nhanh cho mùa covid 08Mar22
// sử dụng component mới

const ExtraCategory = ({ path, query }) => <CategoryProduct categories={EXTRA_CATEGORY} name="Thiết yếu mùa Tết" path={path} query={query} />;

export default ExtraCategory;
