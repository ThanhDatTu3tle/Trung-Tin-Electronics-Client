import * as React from "react";
import { useState } from "react";
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import 'sweetalert2/dist/sweetalert2.min.css';

import styles from "./ComboComponent.module.scss";

import ProductComboComponent from "../ProductComboCom/ProductComboComponent";
import Image from "../Image";
import Button from "../Button";

import { axiosClient } from "../../axios";
import ComboService from "../../service/ComboService";

const cx = classNames.bind(styles);

const ComboComponent: React.FC<any> = ({ data }) => {
  const MySwal = withReactContent(Swal);

  const [state, setState] = useState(data.combo.status);
  const handleConfirm = async () => {
    try {
      if (data.combo.status === true) {
        MySwal.fire({
          title: "Gỡ áp dụng thành công!",
          icon: "success",
          didOpen: () => {
            MySwal.showLoading();
          },
          timer: 3000,
        });
        ComboService.UpdateComboStatus(data.combo.id, 0);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        setState(!state);
      } else {
        MySwal.fire({
          title: "Áp dụng thành công!",
          icon: "success",
          didOpen: () => {
            MySwal.showLoading();
          },
          timer: 3000,
        });
        ComboService.UpdateComboStatus(data.combo.id, 1);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        setState(!state);
      }
    } catch (error) {
      MySwal.fire({
        title: "Đã có lỗi xảy ra!",
        icon: "error",
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 2000,
      });
    }
  }

  const handleDelete = () => {
    try {
      axiosClient.delete(`combo/delete/${data.combo.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      MySwal.fire({
        title: "Xóa thành công!",
        icon: "success",
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 2000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      MySwal.fire({
        title: "Đã có lỗi xảy ra!",
        icon: "error",
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 2000,
      });
    }
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("image")}>
          <Image src={data.combo.image} />
        </div>
        <div className={cx("content")}>
          <div className={cx("name")}>{data.combo.name}</div>
          <div className={cx("products-combo")}>
            {data.detail.map((dataa: any) => (
              <ProductComboComponent key={dataa.id} data={dataa.product} />
            ))}
          </div>
          <div className={cx("costs")}>
            <div className={cx("price")}>
              <span>Tổng giá gốc combo: </span>
              {data.combo.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
            </div>
            <div className={cx("price")}>
              <span>Tổng giá hiện tại: </span>
              {data.combo.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
            </div>
          </div>
          <div className={cx("btns")}>
            <Button primary onClick={handleConfirm} style={{marginRight: '1rem'}}>
              Áp dụng combo
            </Button>
            <Button outline onClick={handleDelete}>
              Xóa combo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboComponent;
