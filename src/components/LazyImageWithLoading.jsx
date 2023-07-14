import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-lazy-load-image-component/src/effects/blur.css";
const LazyImageWithLoading = ({ src, alt, classes, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative h-full w-full">
      {isLoading && <Skeleton className={"h-full w-full absolute z-10 top-0 left-0"} />}
      <LazyLoadImage
        effect="blur"
        src={src}
        alt={alt}
        wrapperClassName="h-full w-full"
        onClick={onClick}
        className={`${classes} ${
          isLoading ? "opacity-0" : "opacity-100"
        } ease-in-out`}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default LazyImageWithLoading;
