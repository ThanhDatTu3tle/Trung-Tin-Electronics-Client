import * as React from "react";
import { useState } from "react";
import classNames from "classnames/bind";
import Backdrop from "@mui/material/Backdrop";

import styles from "./ComboComponent.module.scss";

import Image from "../Image";

const cx = classNames.bind(styles);

const ComboComponent: React.FC<any> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleViewDetail = () => {
    const swalContainer = document.querySelector(
      ".swal2-container"
    ) as HTMLElement;
    if (swalContainer) {
      swalContainer.style.zIndex = "99999";
    }
    setOpen(true);
  };

  const handleCloseViewDetail = () => {
    setOpen(false);
  }

  return (
    <div className={cx("wrapper")} onClick={handleViewDetail}>
      <Backdrop sx={{ color: "#fff", zIndex: 9 }} open={open}>
        <div className={cx("detail-combo")}>
          <div className={cx("title")}>
            <p style={{ fontSize: "1.5rem", fontWeight: "500" }}>
              THÔNG TIN COMBO SẢN PHẨM
            </p>
            <button
              type="button"
              className={cx("close-btn")}
              onClick={handleCloseViewDetail}
            >
              ×
            </button>
          </div>
        </div>
      </Backdrop>
      <div className={cx("inner")}>
        <div className={cx("image")}>
          <Image src={data.image} />
        </div>
        <div className={cx("content")}>
          <div className={cx("name")}>{data.name}</div>
          <div className={cx("price")}>
            {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboComponent;
