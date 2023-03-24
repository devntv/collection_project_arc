import React, { useEffect, useRef } from 'react';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ScrollToTop({pathname}) {
  const divRef = useRef(null);
  const page = pathname.replace(/[/]/g,'');
  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300 && !divRef.current?.classList?.contains('visible')) {
      divRef.current?.classList?.add('visible');
    }
    if (window.pageYOffset <= 300 && divRef.current?.classList?.contains('visible')) {
      divRef.current?.classList?.remove('visible')
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div ref={divRef} className={`back-to-top ${page}`} onClick={scrollToTop} role="presentation">
      <FontAwesomeIcon icon={faChevronUp} />
      <div className="back-to-top-text">TOP</div>
    </div>
  );
}
