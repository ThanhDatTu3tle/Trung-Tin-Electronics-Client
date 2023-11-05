import React from "react";
import classNames from "classnames/bind";

import styles from "./UserManagementRow.module.scss";

const cx = classNames.bind(styles);

const UserManagementRow: React.FC<any> = ({ data }) => {

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("customer-name")}>{data.customerName}</div>
        <div className={cx("email")}>{data.email}</div>
        <div className={cx("phone")}>{data.phone}</div>
        <div className={cx("address")}>
          {data.address}
        </div>
      </div>

      <div className={cx("line")}></div>
    </div>
  );
};

export default UserManagementRow;
