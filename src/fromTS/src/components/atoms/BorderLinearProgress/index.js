import styled from 'styled-components';
import styles from './styles.module.css';

const { LinearProgress, Typography, Box } = require('@material-ui/core');

const LinearProgressStyled = styled(LinearProgress)`
  ${({ background }) => `
  height: 7px;
  border-radius: 5px;
  & .MuiLinearProgress-barColorPrimary {
    background-color: ${background};
  }
  `}
`;


const BorderLinearProgress = (props) => {
  const { progressTxt = '', value, status = '', isMobile, arrow = false, ...restProps } = props;
  const ArrowProgress = () => (
    <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.4641 0L6.9282 6H0L3.4641 0Z" fill={status === 'COMPLETED' ? '#08AC60' : '#dc5c00'} />
    </svg>
  );
  const percentProgress = Math.max(value, isMobile ? 15 : 5)

  return (
    <Box position="relative" className={styles.box}>
      <LinearProgressStyled {...restProps} value={value} background={status === 'COMPLETED' ? '#08AC60' : '#dc5c00'} />

      <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">
        <Box
          style={{
            position: 'absolute',
            zIndex: 100,
            top: -25,
            left: status === 'IN_PROGRESS' ? `${percentProgress}%` : '90%',
            transform: 'translateX(-50%)',
            backgroundColor: 'transparent',
          }}
        >
          <Typography
            style={{
              fontSize: '14px',
              fontFamily: 'googlesansmedium',
              color: status === 'COMPLETED' ? '#09884D' : '#dc5c00',
            }}
          >
            {progressTxt}
          </Typography>
          {arrow && percentProgress > 15  && (
            <Box className={styles.arrowIcon}>
              <ArrowProgress />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BorderLinearProgress;
