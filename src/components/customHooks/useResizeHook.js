import { useEffect, useState } from 'react';

export default function useResizeHook() {
  const [size, setSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useEffect(() => {
    function resizedWindow() {
      setSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener('resize', resizedWindow);
    return () => window.removeEventListener('resize', resizedWindow);
  });
  return size;
}
