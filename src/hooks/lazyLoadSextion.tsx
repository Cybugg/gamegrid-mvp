import { lazy, Suspense, useEffect, useRef, useState } from "react";

export default function LazyLoadSection({ importFunc, placeholder }) {
  const [load, setLoad] = useState(false);
  const ref = useRef(null);

  // Lazy import when visible
  const LazyComponent = load ? lazy(importFunc) : null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: "300px" }}>
      {load && LazyComponent ? (
        <Suspense fallback={<div>Loading section...</div>}>
          <LazyComponent />
        </Suspense>
      ) : (
        <div style={{ height: "300px", background: "#f5f5f5" }}>
          <p style={{ padding: "1rem" }}>{placeholder}</p>
        </div>
      )}
    </div>
  );
}
