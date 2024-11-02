import React, { useState } from 'react';

const ImageWithPlaceholder = ({ src, placeholder, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Placeholder image */}
      {!isLoaded && (
        <img
          src={placeholder}
          alt="placeholder"
          {...props}
        />
      )}
      
      {/* Main image */}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        style={{
          display: isLoaded ? 'block' : 'none',
        }}
        {...props}
      />
    </div>
  );
};

const styles = {
  image: {
    width: '100%',
    height: 'auto',
  },
  placeholder: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
};

export default ImageWithPlaceholder;
