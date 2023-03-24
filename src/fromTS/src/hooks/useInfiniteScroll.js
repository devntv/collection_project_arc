/* eslint-disable no-param-reassign */
import { useEffect, useRef, useState } from 'react';

const useInfiniteScroll = (
  callback,
  direction = 'top',
  element = null,
  isMovingHistory = false,
  isEndListMessage = false,
  isScrollMessage = false,
) => {
  const [isFetching, setIsFetching] = useState(false);
  const hasMore = useRef(true);
  const prevHeightElement = useRef(0);
  const handleScroll = () => {
    if (!hasMore.current) return;
    if (isMovingHistory) return;
    if (isEndListMessage) return;
    if (element.clientHeight < 100) {
      return;
    }
    if (isScrollMessage) {
      // use for scroll messages which has property column reverse => difference behavior
      const offsetScrollTop = Math.abs(Math.round(element.scrollTop));
      const { scrollHeight, clientHeight } = element;
      const pixelPreload = 10; // - 10px to reach top
      const isReachTop = offsetScrollTop + pixelPreload >= scrollHeight - clientHeight;
      if (isReachTop) setIsFetching(true);
      return;
    }

    if (direction === 'top') {
      if (element.scrollTop <= 5) {
        prevHeightElement.current = element.scrollHeight;
        setIsFetching(true);
      }
    } else if (element.scrollHeight - element.clientHeight - element.scrollTop <= 5 || element.scrollHeight < element.clientHeight) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    if (element) {
      element.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, [element, isMovingHistory, isEndListMessage]);

  useEffect(() => {
    (async () => {
      if (isFetching && callback) {
        const isMore = await callback();
        if (!isMore) hasMore.current = false;
        setIsFetching(false);
        if (prevHeightElement.current > 0 && direction === 'top') {
          const distanceScrollDown = element.scrollHeight - prevHeightElement.current;
          element.scrollTo({
            top: distanceScrollDown,
          });
        }
      }
    })();
  }, [isFetching]);

  return { isFetching, setIsFetching };
};

export default useInfiniteScroll;
