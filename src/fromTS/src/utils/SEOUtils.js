import { DEFAULT_THUOCSI_SUBTITLE, DEFAULT_THUOCSI_TITLE } from 'constants/data';

export const getTitle = (title = DEFAULT_THUOCSI_TITLE, useSubTitle = true) =>
  (title || DEFAULT_THUOCSI_TITLE) + (useSubTitle ? ` - ${DEFAULT_THUOCSI_SUBTITLE}` : '');

export default { getTitle };
