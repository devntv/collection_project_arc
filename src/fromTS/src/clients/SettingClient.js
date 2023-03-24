import { SETTING_API } from 'constants/APIUri';
import { GET } from './Clients';

export const getSettingList = async ({ ctx }) => GET({ url: SETTING_API.SETTING_LIST, ctx, isBasic: true });

export default { getSettingList };
