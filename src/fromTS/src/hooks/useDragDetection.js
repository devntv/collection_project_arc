import { useEffect, useState } from 'react';

const MoveDragThreshold = 20;

export default function useDragDetection() {
  const [mouseDown, setMouseDown] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    let mouseMove = 0;

    function handleMouseUp() {
      setMouseDown(false);
    }

    function handleMouseMove(e) {
      mouseMove += Math.abs(e.movementX) + Math.abs(e.movementY);
      setDragging(mouseMove > MoveDragThreshold);
    }

    if (mouseDown) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseDown]);

  function handleMouseDown() {
    setMouseDown(true);
    setDragging(false);
  }

  return {
    handleMouseDown,
    dragging,
  };
}
