import { Box, Tooltip, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import TagType from 'components/mocules/TagType';
import useMobileV2 from 'zustand-lib/storeMobile';
import styles from './styles.module.css';

const AdditionalTooltip = ({ tags, exp = null }) => {
  const CustomizeTooltip = withStyles({
    tooltip: {
      backgroundColor: '#ffffff',
      border: '1px solid #eaeaea',
      display: 'flex',
      justifyContent: 'space-beetwen',
      flexWrap: 'wrap',
    },
    arrow: {
      '&:before': {
        border: '1px solid #eaeaea',
        backgroundColor: '#ffffff',
      },
    },
  })(Tooltip);
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());
  const remainTagType = tags?.map((tag) => (
    <Box style={{ padding: '2px' }} key={tag}>
      <TagType item={tag} exp={exp} />
    </Box>
  ));
  return (
    <CustomizeTooltip title={remainTagType} disableFocusListener disableTouchListener className={clsx(styles.tag_quantity)} arrow>
      <Box
        className={clsx(styles.tag, {
          [styles.tag_mv2]: isMobileV2,
        })}
      >
        <Typography style={{ marginBottom: '8px' }}>...</Typography>
      </Box>
    </CustomizeTooltip>
  );
};
export default AdditionalTooltip;
