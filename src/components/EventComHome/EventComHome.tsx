import * as React from "react";
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import styles from "./EventComHome.module.scss";

const cx = classNames.bind(styles);

const EventComHome: React.FC<any> = ({ data }) => {
  const MySwal = withReactContent(Swal);

  const handleClick = async () => {
    await MySwal.fire({
      title: "Đang tải...",
      didOpen: () => {
        MySwal.showLoading();
      },
      timer: 1000,
    });

    window.location.href = `/detailProduct/${data.name}`;
  };

  return (
    <div className={cx("wrapper")} onClick={handleClick}>
      <div className={cx("image")}>
        <LazyLoadImage
          src={data.image}
          effect="blur"
          width="100%"
          height="auto"
        />

        <div className={cx("circle-top-left")}></div>
        <div className={cx("circle-top-right")}></div>
        <div className={cx("circle-bottom-left")}></div>
        <div className={cx("circle-bottom-right")}></div>
      </div>
    </div>
  );
};

export default EventComHome;
