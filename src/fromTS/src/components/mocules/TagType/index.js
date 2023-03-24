import TagTypeProps from 'constants/TagTypeProps';
import { useAuth } from 'context';
import { REGION_MB, TAG_HANG_DAT_TRUOC, TAG_NEW } from 'sysconfig';
import { DateTimeUtils } from 'utils';
import { useStore } from 'zustand-lib/storeGlobal';
import ProductTag from '../ProductTag';

export const tagTypePropsArr = [
  'OUT_OF_STOCK',
  'SUSPENDED',
  'GIFT',
  'FLASH_SALE',
  'MEGA_DAY',
  'DEAL',
  TAG_HANG_DAT_TRUOC,
  'FV2U',
  '2ABC',
  'HOADONNHANH',
  'BAN_CHAY',
  'BANCHAY',
  'Y7GB',
  '84AB',
  '3ABC',
];
const tagIconArr = ['GIAONHANH', 'W80T', 'BAN_CHAY', 'BANCHAY', 'HOADONNHANH'];
const tagNoDisplayArr = [TAG_NEW];

export const getTagName = (item, getStyleBySlugOfTag) => {
  if (item === 'NEAR_EXPIRATION') {
    return 'Cận date';
  }
  if (tagNoDisplayArr?.indexOf(item) >= 0) {
    return null;
  }
  const tagInfo = TagTypeProps[item];
  if (tagInfo?.name) {
    return tagInfo.name;
  }
  return getStyleBySlugOfTag(item)?.name || '';
};

// notes
// cận date chưa làm ,  nếu có status cận date
// khuyến mãi , nếu có deal tự thêm mã giảm giá vào tag
// nên chuyển về 1 cái , làm sau
const TagType = ({ item, exp, isTooltip = false, isDisplayFull = false, link, isLinkTagDeal }) => {
  const getStyleBySlugOfTag = useStore((state) => state.getStyleBySlugOfTag);
  const { customerInfo } = useAuth();

  let props = {};
  if (item === TAG_HANG_DAT_TRUOC && REGION_MB.indexOf(`${customerInfo?.provinceCode}`) < 0) {
    return null;
  }
  if (item === 'NEAR_EXPIRATION') {
    const date = DateTimeUtils.getFormattedDate(new Date(exp), 'DD-MM-YYYY');
    const { name, code, textColor, backgroundColor, url } = TagTypeProps.NEAR_EXPIRATION;
    props = {
      name: `${name} ${date}`,
      date,
      code,
      textColor,
      backgroundColor,
      url,
    };
  } else if (!isDisplayFull && tagNoDisplayArr?.indexOf(item) >= 0) {
    return null;
  } else {
    // nếu ko có option nào thì lấy theo API trả về
    const tagInfo = TagTypeProps[item];
    props = tagInfo ? { ...tagInfo, isTooltip } : getStyleBySlugOfTag(item);
    if (props && !props?.name) {
      props.name = getStyleBySlugOfTag(item)?.name || '';
    }
    if (props && !props?.slug) {
      props.slug = getStyleBySlugOfTag(item)?.slug || '';
    }
    if (!props) {
      return null;
    }
    if (tagIconArr?.indexOf(item) >= 0) {
      props = { ...props, isTooltip };
    }
  }
  return <ProductTag link={link} isLinkTagDeal={isLinkTagDeal} {...props} />;
};

export default TagType;
