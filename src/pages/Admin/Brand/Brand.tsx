import React from 'react';
import classNames from "classnames/bind";

import styles from './Brand.module.scss';

const cx = classNames.bind(styles);

const Brand: React.FC<any> = () => {
  return (
    <div className={cx('wrapper')}>
      Hãng sản xuất
    </div>
  );
}

export default Brand;
