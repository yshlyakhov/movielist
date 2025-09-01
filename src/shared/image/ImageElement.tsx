import { useState } from "react";

import "./image.css";

interface Props {
  src: string;
  alt: string;
}

const ImageElement = ({ src, alt }: Props) => {
  const [error, setError] = useState(false);
  const [load, setLoad] = useState(false);
  const emptyStyle = {
    background: "url(/src/assets/image.svg) no-repeat center center / 40px",
    filter: "brightness(0.5)",
  };

  return (
    <>
      {error ? (
        <img
          style={emptyStyle}
          className={load ? "loaded" : ""}
          src="/src/assets/empty.svg"
        />
      ) : (
        <img
          className={load ? "loaded" : ""}
          src={src}
          alt={alt}
          onLoad={() => setLoad(true)}
          onError={() => {
            setError(true);
            setLoad(true);
          }}
          loading="lazy"
        />
      )}
    </>
  );
};

export default ImageElement;
