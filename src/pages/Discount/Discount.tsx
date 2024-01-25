import * as React from "react";
import classNames from "classnames/bind";

import styles from "./Discount.module.scss";

import { useCombo } from "../../Context/ComboContext";

const cx = classNames.bind(styles);

const ComboComHome = React.lazy(() => import("../../components/ComboComHome"));

const Discount: React.FC<any> = () => {
  const combos = useCombo();

  return (
    <div className={cx("wrapper")}>
      <h3>KHUYẾN MÃI</h3>
      <br />
      <div className={cx("title-wrapper")}>
        <div className={cx("title")}>Combo Lý Tưởng</div>
      </div>
      <div className={cx("content")}>
        <div className={cx("combos")}>
          {combos.map((data) => (
            <React.Suspense fallback="" key={data.combo.id}>
              <ComboComHome data={data.combo} />
            </React.Suspense>
          ))}
        </div>
      </div>

      <div className={cx("title-wrapper")}>
        <div className={cx("title")}>Các Sản Phẩm Giảm Giá</div>
      </div>
    </div>
  );
};

export default Discount;
