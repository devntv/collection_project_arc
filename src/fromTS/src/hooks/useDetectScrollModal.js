import { useCallback, useEffect, useRef, useState } from 'react';

const useDetectScrollModal = (isOpenModal = false) => {
  //   render 1 lan
  const targetRef = useRef(null);
  const [isScroll, setIsScroll] = useState(false);
  const onScrollFunc = useCallback(() => {
    const { scrollTop } = targetRef.current;

    if (isOpenModal === true && scrollTop > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(() => false);
    }
  }, [isOpenModal]);

  useEffect(() => {
    if (targetRef.current) onScrollFunc();
    return () => {
      if (!isOpenModal) setIsScroll(() => false);
    };
  }, [!isOpenModal]);
  //   console.log('scroll out side', isScroll);
  return [isScroll, targetRef, onScrollFunc];
};

export default useDetectScrollModal;
