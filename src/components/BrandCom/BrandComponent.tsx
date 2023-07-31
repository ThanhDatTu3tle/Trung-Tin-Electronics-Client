/* eslint-disable react/jsx-no-undef */
import * as React from 'react';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { axiosClient } from '../../axios';

import styles from './BrandComponent.module.scss';

const cx = classNames.bind(styles);

interface BrandComponentProps {
  ngu: {
    image: string;
  };
}

const BrandComponent: React.FC<any> = ({ ngu }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const getImageData = async () => {
      try {
        const imageName = ngu.image;
        const response = await axiosClient.get(`brand/image/${imageName}`);

        // Extract the base64 image data from the response JSON
        const base64Image = response.data.imageData;

        // Create the data URI from the base64 string
        const imageDataUrl = `data:image/png;base64,${base64Image}`;
        setImageSrc(imageDataUrl);
      } catch (error) {
        console.error('Failed to fetch image:', error);
      }
    };

    getImageData();
  }, [ngu.image]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
          <p>{imageSrc}</p>
          {/* <Image src={imageSrc}/> */}
      </div>
    </div>
  );
};

export default BrandComponent;
