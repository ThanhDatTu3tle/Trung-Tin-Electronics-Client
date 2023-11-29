import * as React from "react";
import classNames from "classnames/bind";

import styles from "./Event.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import Clock from "../../../components/Clock";

const cx = classNames.bind(styles);

const Event: React.FC<any> = () => {

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("left")}>
          <p style={{ width: "fit-content", fontWeight: 700 }}>SỰ KIỆN GIẢM GIÁ</p>
        </div>
        <div className={cx("right")}>
          <div className={cx("current-position")}>
            <Clock />
            <FontAwesomeIcon icon={faHouse} style={{ paddingRight: "1rem" }} />
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ width: "1rem", height: "1rem", paddingRight: "1rem" }}
            />
            <p>Sự kiện giảm giá</p>
          </div>
        </div>
      </div>
      <div className={cx("main-container")}>
        <div className={cx("products")}>
          
          </div>
  
          <div className={cx("filter")}>
            <h3>Bộ lọc</h3>
            
          </div>
      </div>
    </div>
  );
};

export default Event;
