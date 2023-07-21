import React from 'react';
import classNames from "classnames/bind";

import styles from './Category.module.scss';

const cx = classNames.bind(styles);

const Category: React.FC<any> = () => {
  return (
    <div className={cx('wrapper')}>
      Danh mục sản phẩm
    </div>
  );
}

export default Category;
