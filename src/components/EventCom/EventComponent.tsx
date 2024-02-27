import * as React from "react";
import { useState } from "react";
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import 'sweetalert2/dist/sweetalert2.min.css';

import styles from "./EventComponent.module.scss";

import ProductEventChildComponent from "../ProductEventChildComponent";
import Image from "../Image";
import Button from "../Button";

import { axiosClient } from "../../axios";
import EventService from "../../service/EventService";

const cx = classNames.bind(styles);

const EventComponent: React.FC<any> = ({ data }) => {
  const MySwal = withReactContent(Swal);

  const [state, setState] = useState(data.event.status);
  const handleConfirm = async () => {
    try {
      if (data.event.status === true) {
        MySwal.fire({
          title: "Gỡ áp dụng thành công!",
          icon: "success",
          didOpen: () => {
            MySwal.showLoading();
          },
          timer: 3000,
        });
        EventService.UpdateEventStatus(data.event.id, 0);
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
        EventService.UpdateEventStatus(data.event.id, 1);
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
      axiosClient.delete(`event/delete/${data.event.id}`, {
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
          <Image src={data.event.image} />
        </div>
        <div className={cx("content")}>
          <div className={cx("name")}>
            {data.event.name}
            {data.event.status === false ? (
              <p style={{ color: "#FF0000", fontSize: '1.2rem' }}>Chưa được áp dụng</p>
            ) : (
              <p style={{ color: "#008052", fontSize: '1.2rem' }}>Đang được áp dụng</p>
            )}
          </div>
          <div className={cx("products-event")}>
            {data.detail.map((dataa: any) => (
              <ProductEventChildComponent key={dataa.id} data={dataa.product} />
            ))}
          </div>
          <div className={cx("btns")}>
            {data.event.status === false ? (
              <Button primary onClick={handleConfirm} style={{marginRight: '1rem'}}>
                Áp dụng sự kiện
              </Button>
            ) : (
              <Button primary onClick={handleConfirm} style={{marginRight: '1rem'}}>
                Hủy áp dụng sự kiện
              </Button>
            )}
            <Button outline onClick={handleDelete}>
              Xóa sự kiện
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventComponent;
