import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import PropTypes from 'prop-types';
import { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react';
import styles from './styles.module.css';

const ScrollToBottom = memo(
  forwardRef(({ element, onClick }, ref) => {
    const [isDisplay, setIsDisplay] = useState(false);

    const handleScroll = () => {
      const distanceToAppear = 50;
      if (!element) {
        setIsDisplay(false);
        return;
      }

      setIsDisplay(Math.abs(element.scrollTop) >= distanceToAppear);
    };

    const scrollToBottom = (behavior = 'smooth') => {
      if (element) {
        element.scrollTo({
          top: element.scrollHeight,
          behavior,
        });
      }
    };

    useImperativeHandle(
      ref,
      () => ({
        scrollToBottom,
      }),
      [element],
    );

    // eslint-disable-next-line consistent-return
    useEffect(() => {
      if (element) {
        element?.addEventListener('scroll', handleScroll);
        return () => {
          element?.removeEventListener('scroll', handleScroll);
        };
      }
    }, [element]);
    return (
      <Zoom in={isDisplay} ref={ref}>
        <div className={styles.paper} id="scrollDown_container">
          <IconButton
            classes={{ root: styles.btnRoot }}
            onClick={() => {
              if (onClick) {
                onClick();
              } else {
                scrollToBottom();
              }
            }}
          >
            <ExpandMoreOutlinedIcon htmlColor="#ffffff" fontSize="large" />
          </IconButton>
        </div>
      </Zoom>
    );
  }),
);

ScrollToBottom.propTypes = { element: PropTypes.any, onClick: PropTypes.func };

export default ScrollToBottom;
