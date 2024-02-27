import * as React from "react";
import classNames from "classnames/bind";

import styles from "./ProductComboChildComponent.module.scss";

import Image from "../Image";

import { useCombo } from "../../Context/ComboContext";
import { useProduct } from "../../Context/ProductContext";

const cx = classNames.bind(styles);

const ProductComboChildComponent: React.FC<any> = ({ data }) => {
  const combos = useCombo();
  const products = useProduct();

  console.log(data.id);
  console.log(
    products
      .filter((product) => product.id === data.id)
      .map((x) => x.imageProducts)
  );
  const foundCombo = combos.find((combo) =>
    combo.detail.some((product) => product.idProduct === data.id)
  );
  const comboName = foundCombo ? foundCombo.combo.name : null;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("image")}>
          {products
            .filter((product) => product.id === data.id)
            .map((x) => x.imageProducts) &&
            products
              .filter((product) => product.id === data.id)
              .map((x) => x.imageProducts).length > 0 && (
              <Image
                src={products
                  .filter((product) => product.id === data.id)
                  .map((x) => x.imageProducts)[0]
                  .map((y) => y.image)}
              />
            )}
        </div>
        <div className={cx("content")}>
          <div className={cx("name")}>
            {data.name} {data.id}
          </div>
          <div className={cx("combo")}>
            <p>{comboName}</p>
          </div>
          <div className={cx("product-price")}>
            {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComboChildComponent;
