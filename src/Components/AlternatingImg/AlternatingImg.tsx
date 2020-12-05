import React, { useLayoutEffect, useState } from 'react';

interface AlternatingImgProps {
  className?: string;
  /** How long in ms to alternate between images */
  time: number;
  alt: string;
  imgs: string[];
}

/** Alternates between images in the image array */
const AlternatingImg: React.FC<AlternatingImgProps> = ({
  className,
  time,
  alt,
  imgs,
}: AlternatingImgProps) => {
  const [visibleImg, setVisibleImg] = useState({ index: 0, img: imgs[0] });

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      // Change the state based on the current state to the next img
      setVisibleImg((visible) => {
        let nextIndex = visible.index + 1;
        if (visible.index === imgs.length - 1) {
          nextIndex = 0;
        }

        // Return the new state
        return {
          index: nextIndex,
          img: imgs[nextIndex],
        };
      });
    }, time);
    return () => {
      clearInterval(interval);
    };
  }, [imgs, time]);

  return (
    <img
      className={className}
      alt={`${alt}-${visibleImg.index}`}
      src={visibleImg.img}
    />
  );
};

// Set the defaults for the nullable values of the component
AlternatingImg.defaultProps = {
  className: '',
};

export default AlternatingImg;
