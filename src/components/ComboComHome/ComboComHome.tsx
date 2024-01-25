import * as React from "react";
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import styles from "./ComboComHome.module.scss";

import { useCombo } from "../../Context/ComboContext";

const cx = classNames.bind(styles);

const ComboComHome: React.FC<any> = ({ data }) => {
  const MySwal = withReactContent(Swal);

  const handleClick = async () => {
    await MySwal.fire({
      title: "Loading...",
      didOpen: () => {
        MySwal.showLoading();
      },
      timer: 1000,
    });

    window.location.href = `/detailProduct/${data.name}`;
  };

  return (
    <div className={cx("wrapper")} onClick={handleClick}>
      <div className={cx("inner")}>
        <div className={cx("image")}>
          <LazyLoadImage
            src={data.image}
            effect="blur"
            width="100%"
            height="auto"
          />
        </div>
        <div className={cx("name")}>
          <p>{data.name}</p>
        </div>
        <div className={cx("product-price-sale")}>
          <div className={cx("price-sale")}>
            {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
          </div>
          <div className={cx("price-origin")}>
            <s>{data.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</s>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboComHome;
