import { useEffect, useRef, useState } from "react";

function LazyImage({ src, alt }) {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(([entry], obs) => {
      if (entry.isIntersecting) {
        img.src = src; // swap in real image
        obs.unobserve(img);
      }
    });

    observer.observe(img);

    return () => observer.disconnect();
  }, [src]);

  return (
    <img
      ref={imgRef}
      src="" // start empty
      alt={alt}
      onLoad={() => setLoaded(true)}
      className={loaded ? "loaded" : "loading"}
    />
  );
}

export default LazyImage;
