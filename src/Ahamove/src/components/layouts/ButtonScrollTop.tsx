import cn from 'classnames';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ButtonScrollTop() {
  const [visible, setVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const toggleVisibility = () => {
        if (window.scrollY > window.innerHeight) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      };

      window.addEventListener('scroll', toggleVisibility);

      return () => window.removeEventListener('scroll', toggleVisibility);
    }
  }, []);

  return (
    <button
      className={cn(
        'shadow-shadow8 bg-primary-50 desktop:hover:bg-primary-60 group fixed bottom-5 right-5 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full',
        {
          hidden: !visible,
        }
      )}
      onClick={scrollToTop}
    >
      <div className="relative h-5 w-4 bg-transparent">
        <Image src="/static/icons/ArrowNarrowUp.svg" layout="fill" />
      </div>
    </button>
  );
}
