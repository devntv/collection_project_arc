import { Avatar } from '@material-ui/core';
import { AVATARV2_ICON_IMAGE } from 'constants/Images';
import { getLinkCacheFromGG, getLinkImageStatic } from 'utils/CacheImageUtils';

export const AvatarStatic = ({ src, ...restProps }) => <Avatar src={getLinkImageStatic(src)} {...restProps} />;

export const AvatarCacheFromGG = ({ src = AVATARV2_ICON_IMAGE, width = 100, ...restProps }) => (
  <Avatar src={getLinkCacheFromGG({ src, width })} {...restProps} />
);

export default { AvatarStatic, AvatarCacheFromGG };
