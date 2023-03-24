import MInput from 'components-v2/atoms/Mobile/MInput';
import { SEARCH_ICON } from 'constants/Images/mobile/Icons';
import { memo } from 'react';

const SearchInput = ({ onClick }) => <MInput leftIcon={SEARCH_ICON} placeholder="Tìm kiếm..." onClick={onClick} />;

export default memo(SearchInput);
