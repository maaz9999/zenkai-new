import React, { Suspense, useEffect, useRef, useState } from 'react';

export default function DeferredSection({ id, children, minHeight = 700 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => window.location.hash === `#${id}`);
  useEffect(() => {
    if (visible) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '600px' });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible]);
  return <div id={id} ref={ref} style={visible ? undefined : { minHeight }}>
    {visible && <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense>}
  </div>;
}
