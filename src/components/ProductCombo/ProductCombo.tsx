import * as React from "react";
import classNames from "classnames/bind";

import styles from "./ProductCombo.module.scss";

import Image from "../Image";

const cx = classNames.bind(styles);

const ProductCombo: React.FC<any> = ({ data }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("image")}>
          {data.imageProducts && data.imageProducts.length > 0 && (
            <Image src={data.imageProducts[0].image} />
          )}
        </div>
        <div className={cx("content")}>
          <div className={cx("name")}>
            {data.name} {data.id} 
          </div>
          <div className={cx("product-price")}>
            {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCombo;
