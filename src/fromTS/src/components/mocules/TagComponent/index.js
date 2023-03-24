// xử lý tag
import { Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';
import TooltipMobile from 'components-v2/mocules/TooltipMobile';
import AdditionalTooltip from 'components/atoms/AdditionalTooltip';
import TagTypeProps from 'constants/TagTypeProps';
import { ENUM_TAG_CODES } from 'constants/Tags';
import { REGION_MB, TAG_HANG_DAT_TRUOC, TAG_NEW } from 'sysconfig';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from 'zustand-lib/storeGlobal';
import useMobileV2 from 'zustand-lib/storeMobile';
import TagType, { tagTypePropsArr } from '../TagType';
import style from './style.module.css';

/*
TAG
Rule 1: 3 Tag Priority bắt buộc phải hiển thị đủ: Thứ tự ưu tiên hiển thị: Cận date (text) - Hóa đơn nhanh (có icon) - Đặt trước 7 ngày (text) (các tags còn lại có thể nằm trong nút …)
Rule 2: Sp chứa Tag text (>1) và tag icon (>1) sẽ hiển thị:
Th1: nếu có tag priority → ưu tiển hiển thị theo Rule 1
TH2: nếu không có tag priority → hiển thị 1 tag text và 2 tag icon (đảm bảo là nằm trên cùng 1 dòng)
Rule 3: nếu ko có tags icon nào hiển thị thì sẽ hiển thị tags có chữ ra ngoài, max là 2 tags text (cho phép rớt xuống thành 2 dòng ở trường hợp này)
Giao diện chỗ +number đổi thành nút ba chấm … (đang chờ update UI để update vô card, dev cứ giữ … như bản web hiện tại là dc) (rule của nút vẫn giữ như trong card)
  */
const TooltipTagMobile = ({ remainTags, isMobile, isChatMobile = false }) => {
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  const tagType = remainTags?.map((tag) => (
    <Grid style={{ padding: '2px' }} key={`tag-${tag}`}>
      <TagType item={tag} />
    </Grid>
  ));

  return (
    <TooltipMobile
      valueTitle={tagType}
      classNameChildren={clsx(style.tag_quantity, {
        [style.tag_quantity_mv2]: isMobileV2,
      })}
      classNameTooltip={style.tagMobile}
      isMobile={isMobile}
    >
      <Typography className={clsx(isChatMobile && style.chatMobile_moreTag)} onClick={(e) => e.stopPropagation()} style={{ marginBottom: '8px' }}>
        ...
      </Typography>
    </TooltipMobile>
  );
};

const tagsHidden = [TAG_NEW];
const TAG_PRIORITY = ['NEAR_EXPIRATION', 'HOADONNHANH', 'HANG_DAT_TRUOC'];
const tagHideHoaDonNhanh = [ENUM_TAG_CODES.HANG_DIEM, ENUM_TAG_CODES.HANG_HANG];

export const getShowTags = (tags, getStyleBySlugOfTag, provinceCode) => {
  // Cận date- Hóa đơn nhanh - Đặt trước 7 ngày - Có ở kho - Bán Chạy - Giá Tốt - Nhãn hàng 3 tốt
  const sortprioritizedTag = tags
    ?.filter((tag) => (TagTypeProps[tag] || (getStyleBySlugOfTag && getStyleBySlugOfTag(tag))) && tagsHidden.indexOf(tag) === -1)
    .sort((a, b) => (TagTypeProps[b]?.index || 10) - (TagTypeProps[a]?.index || 10));

  // bỏ duplicate
  const setTags = Array.from(new Set(sortprioritizedTag));
  // 05Augh2022
  /*
    nếu SP có tag hàng hãng / hàng điểm thì auto ẩn Tag hoá đơn nhanh 
    ẩn trên toàn bộ trang
    khi ẩn tag hoá đơn nhanh thì sẽ ưu tiên  Hàng hãng -> Hàng Điểm 
    https://buymed.atlassian.net/browse/APO-772 
  */
  const indexTagHoaDonNhanh = setTags.indexOf(ENUM_TAG_CODES.HOADONNHANH);
  if (indexTagHoaDonNhanh >= 0 && setTags.some((tag) => tagHideHoaDonNhanh.includes(tag))) {
    setTags.splice(indexTagHoaDonNhanh, 1);
  }
  // check user miền bắc chỉ hiển thị tag HANG_DAT_TRUOC
  const isUserInRegionMb = REGION_MB.indexOf(`${provinceCode}`) < 0;
  const indexTagHangDatTruoc = setTags.indexOf(TAG_HANG_DAT_TRUOC);
  if (indexTagHangDatTruoc >= 0 && isUserInRegionMb) {
    setTags.splice(indexTagHangDatTruoc, 1);
  }

  return setTags;
};

const TagComponent = ({
  product,
  isProductCard = true,
  isSellerList = false,
  isCombo = false,
  isGift = false,
  isMobileV2 = false,
  isMobile = false,
  isShowDeal = true,
  link,
  isLinkTagDeal,
  isChatMobile = false,
}) => {
  // const { getStyleBySlugOfTag } = useSetting();

  const getStyleBySlugOfTag = useStore((state) => state?.getStyleBySlugOfTag) || null;
  const user = useStore((state) => state?.user) || null;
  const beta = useMobileV2((state) => state.beta);

  // nếu gift thì không hiển thị tag
  if (isSellerList || isGift) {
    return <></>;
  }
  const { tags = [], statusData = {}, expiredDate = '' } = product || {};

  // nếu combo chỉ hiển thị tag hoá đơn nhanh

  if (isCombo) {
    return tags
      ?.filter((tag) => tag === ENUM_TAG_CODES.HOADONNHANH || tag === TAG_HANG_DAT_TRUOC)
      .map((item) => (
        <TagType
          key={uuidv4()}
          item={item}
          exp={statusData?.date}
          isTooltip={isProductCard && tagTypePropsArr.indexOf(item)}
          link={link}
          isLinkTagDeal={isLinkTagDeal}
        />
      ));
  }

  // Cận date- Hóa đơn nhanh - Đặt trước 7 ngày - Có ở kho - Bán Chạy - Giá Tốt - Nhãn hàng 3 tốt
  const sortprioritizedTag = tags
    ?.filter((tag) => (TagTypeProps[tag] || (getStyleBySlugOfTag && getStyleBySlugOfTag(tag))) && tagsHidden.indexOf(tag) === -1)
    .sort((a, b) => (TagTypeProps[b]?.index || 10) - (TagTypeProps[a]?.index || 10));

  // bỏ duplicate
  const setTags = Array.from(new Set(sortprioritizedTag));

  // 05Augh2022
  /*
    nếu SP có tag hàng hãng / hàng điểm thì auto ẩn Tag hoá đơn nhanh 
    ẩn trên toàn bộ trang
    khi ẩn tag hoá đơn nhanh thì sẽ ưu tiên  Hàng hãng -> Hàng Điểm 
    https://buymed.atlassian.net/browse/APO-772 
  */
  const indexTagHoaDonNhanh = setTags.indexOf(ENUM_TAG_CODES.HOADONNHANH);
  if (indexTagHoaDonNhanh >= 0 && setTags.some((tag) => tagHideHoaDonNhanh.includes(tag))) {
    setTags.splice(indexTagHoaDonNhanh, 1);
  }
  // check user miền bắc chỉ hiển thị tag HANG_DAT_TRUOC
  const isUserInRegionMb = REGION_MB.indexOf(`${user?.provinceCode}`) < 0;
  const indexTagHangDatTruoc = setTags.indexOf(TAG_HANG_DAT_TRUOC);
  if (indexTagHangDatTruoc >= 0 && isUserInRegionMb) {
    setTags.splice(indexTagHangDatTruoc, 1);
  }

  // Ở trang giỏ hàng thì  không hiển thị tag DEAL
  if (!isShowDeal) {
    const indexDeal = setTags.indexOf('DEAL');
    if (indexDeal >= 0) {
      setTags.splice(indexDeal, 1);
    }
  }
  // isMobile show hết
  // if (isMobile) {
  //   return setTags.map((item) => <TagType key={uuidv4()} item={item} exp={statusData?.date} />);
  // }

  // thêm rule 28Jun2022
  // nếu có 3 tag thì hiển thị hết
  // isProductCard  = true -> hiển thị icon , và rule ở trên
  if (isProductCard && setTags?.length > 3) {
    // check có tag priority không

    // rule 1
    let tagPriorityCur = setTags.filter((t) => TAG_PRIORITY.indexOf(t) >= 0);

    // rule 2 : nếu không có tagPriority -> 1 tag tex & 1 tag icon
    if (tagPriorityCur?.length === 0) {
      const tagIcons = [];
      const tagNoIcons = [];
      const tagStyles = setTags.map((tag) => TagTypeProps[tag] || (getStyleBySlugOfTag && getStyleBySlugOfTag(tag)));

      tagStyles.forEach((tag) => {
        if (tag) {
          if (tag.isTooltip) {
            tagIcons.push(tag?.code);
          } else {
            tagNoIcons.push(tag?.code);
          }
        }
      });

      // nếu có 2 tag icon -> 1 icon 1 text
      if (tagIcons?.length >= 1 && tagNoIcons?.length > 0) {
        tagPriorityCur = [...tagIcons.splice(0, 2), tagNoIcons?.[0]];
      } else {
        // nếu không có 2 tag Icon thì sẽ hiển thị 2 tag text
        tagPriorityCur = tagNoIcons.splice(0, 2);
      }
    }

    const remainTags = setTags.filter((tag) => tagPriorityCur.indexOf(tag) === -1);
    if (tagPriorityCur?.length <= 2) {
      tagPriorityCur = tagPriorityCur.concat(remainTags.splice(0, 3 - tagPriorityCur.length));
    }
    // const remainTagType = remainTags?.map((tag) => (
    //   <Box style={{ padding: '2px' }}>
    //     <TagType item={tag} />
    //   </Box>
    // ));

    return (
      <>
        {tagPriorityCur?.length > 0 &&
          tagPriorityCur.map((item) => (
            <TagType
              key={uuidv4()}
              item={item}
              exp={item === 'NEAR_EXPIRATION' ? expiredDate : statusData?.date}
              isTooltip={isProductCard && tagTypePropsArr.indexOf(item)}
              isLinkTagDeal={isLinkTagDeal}
              link={link}
            />
          ))}

        {/* {!isMobile ? (
          remainTags?.length > 0 && <AdditionalTooltip tags={remainTags} />
        ) : (
          <TooltipMobile valueTitle={remainTagType} classNameChildren={style.tag_quantity} classNameTooltip={style.tagMobile} isMobile={isMobile}>
            <Typography style={{ marginBottom: '8px' }}>...</Typography>
          </TooltipMobile>
        )} */}
        {remainTags?.length > 0 &&
          (isMobile ? (
            <TooltipTagMobile remainTags={remainTags} isMobile={beta ? isMobileV2 : isMobile} isChatMobile={isChatMobile} />
          ) : (
            <AdditionalTooltip tags={remainTags} />
          ))}
      </>
    );
  }

  // isProductCard  = false -> trang chi tiết - hiển thị full,
  return setTags.map((item) => (
    <TagType
      key={uuidv4()}
      item={item}
      exp={item !== 'NEAR_EXPIRATION' ? statusData?.date : expiredDate}
      isTooltip={isProductCard && tagTypePropsArr.indexOf(item)}
      isLinkTagDeal={isLinkTagDeal}
      link={link}
    />
  ));
};

export default TagComponent;
