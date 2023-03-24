import { useEffect, useState } from 'react';

export default function useHover(ref, isActive = true, isDisabled = false) {
  const [value, setValue] = useState(false);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      if (!isDisabled || !isActive) {
        const node = ref.current;
        if (node) {
          node.addEventListener('mouseenter', handleMouseOver);
          node.addEventListener('mouseleave', handleMouseOut);
          return () => {
            node.removeEventListener('mouseenter', handleMouseOver);
            node.removeEventListener('mouseleave', handleMouseOut);
          };
        }
      }
      return {};
    },
    [ref.current], // Recall only if ref changes
  );

  return [value];
}
