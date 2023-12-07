import * as React from "react";
import { useState } from "react";
import classNames from "classnames/bind";

import styles from "./ProductCombo.module.scss";

import Image from "../Image";

const cx = classNames.bind(styles);

const ProductCombo: React.FC<any> = ({ data }) => {
  const [active, setActive] = useState(false);

  const handleActive = () => {
    if (active === false) {
      setActive(true);
      if (!localStorage.getItem("combo")) {
        localStorage.setItem("combo", JSON.stringify([]));
      }

      const comboProducts = JSON.parse(localStorage.getItem("combo") || "[]");
      if (!comboProducts.includes(data.id)) {
        comboProducts.push(data.id);
        localStorage.setItem("combo", JSON.stringify(comboProducts));
      }
    } else {
      setActive(false);
      if (localStorage.getItem("combo")) {
        const comboProducts = JSON.parse(localStorage.getItem("combo") || "[]");
        const index = comboProducts.indexOf(data.id);
        if (index !== -1) {
          comboProducts.splice(index, 1);
          localStorage.setItem("combo", JSON.stringify(comboProducts));
        }
      }
    }
  };

  return (
    <div className={cx("wrapper")} onClick={handleActive}>
      {active === false ? (
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
      ) : (
        <div className={cx("inner-active")}>
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
      )}
    </div>
  );
};

export default ProductCombo;
