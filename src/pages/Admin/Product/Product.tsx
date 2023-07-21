import React from 'react';
import classNames from "classnames/bind";

import styles from './Product.module.scss';

const cx = classNames.bind(styles);

const Product: React.FC<any> = () => {
  return (
    <div className={cx('wrapper')}>
      <p>Quản lý sản phẩm</p>
      <div className={cx('main-container')}>
        <div className={cx('products')}>

        </div>

        <div className={cx('filter')}>

        </div>
      </div>
    </div>
  );
}

export default Product;
