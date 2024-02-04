import React from "react";
import { useState } from "react";
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";
import Backdrop from "@mui/material/Backdrop";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faMoneyBillTransfer,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./InvoiceManagementRow.module.scss";

import InvoiceService from "../../service/InvoiceService";
import Image from "../Image";
import logo from "../../assets/logo.png";
import Button from "../Button";

const cx = classNames.bind(styles);

const InvoiceManagementRow: React.FC<any> = ({ data, products }) => {
  const MySwal = withReactContent(Swal);
  const [state, setState] = useState(data.status);
  const [open, setOpen] = useState(false);

  const dateObj = new Date(data.createdAt);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  const handleCloseAddForm = () => setOpen(false);
  const handleOpenDetailInvoice = () => {
    const swalContainer = document.querySelector(
      ".swal2-container"
    ) as HTMLElement;
    if (swalContainer) {
      swalContainer.style.zIndex = "99999";
    }
    setOpen(true);
  };

  const totalForProducts = data.invoiceDetail.map(
    (item: { idProduct: any; number: number }) => {
      const product = products.find(
        (product: { id: string }) => product.id === item.idProduct
      );
      if (product && product.promotional) {
        return product.promotional * item.number;
      } else if (product && product.price && product.promotional === null) {
        return product.price * item.number;
      }
      return 0;
    }
  );

  const total = totalForProducts.reduce((a: any, b: any) => a + b, 0);

  const handlePrint = async () => {
    try {
      if (data.status === false) {
        await InvoiceService.UpdateInvoiceStatus(data.id, 1);
        MySwal.fire({
          title: "Xác nhận đơn hàng!",
          icon: "success",
          didOpen: () => {
            MySwal.showLoading();
          },
          timer: 2000,
        });
        window.location.reload();
        setState(!state);
      } else {
        await InvoiceService.UpdateInvoiceStatus(data.id, 0);
        MySwal.fire({
          title: "Chưa hoàn tất xác nhận đơn hàng!",
          icon: "warning",
          didOpen: () => {
            MySwal.showLoading();
          },
          timer: 2000,
        });
        window.location.reload();
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
  };

  const handleConfirm = async () => {
    try {
      if (data.confirm === false) {
        await InvoiceService.UpdateInvoiceConfirm(data.id, 1);
        MySwal.fire({
          title: "Hoàn tất quá trình giao hàng!",
          icon: "success",
          didOpen: () => {
            MySwal.showLoading();
          },
          timer: 2000,
        });
        window.location.reload();
        setState(!state);
      } else {
        await InvoiceService.UpdateInvoiceConfirm(data.id, 0);
        MySwal.fire({
          title: "Chưa hoàn tất quá trình giao hàng!",
          icon: "warning",
          didOpen: () => {
            MySwal.showLoading();
          },
          timer: 2000,
        });
        window.location.reload();
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
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("id")}>#{data.id}</div>
        <div className={cx("customer-name")}>{data.customerName}</div>
        <div className={cx("phone")}>{data.phone}</div>
        <div className={cx("address")}>
          {data.address
            .replace("Phường", "P.")
            .replace("Quận", "Q.")
            .replace("Thành phố Hồ Chí Minh", "TP.HCM")}
        </div>
        <div className={cx("email")}>{data.email}</div>
        <div className={cx("total")}>
          {data.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
        </div>
        <div className={cx("payment")}>
          {data.payment === "cash" ? (
            <>
              <FontAwesomeIcon
                icon={faMoneyBillWave}
                style={{
                  fontSize: "1rem",
                  color: "#fec806",
                  marginRight: "0.5rem",
                }}
              />
              Tiền mặt
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faMoneyBillTransfer}
                style={{
                  fontSize: "1rem",
                  color: "#fec806",
                  marginRight: "0.5rem",
                }}
              />
              Chuyển khoản
            </>
          )}
        </div>
        {data.status === false ? (
          <div
            className={cx("status")}
            style={{ color: "red", fontWeight: 700 }}
          >
            Chưa giao hàng
          </div>
        ) : (
          <div
            className={cx("status")}
            style={{ color: "#fec806", fontWeight: 700 }}
          >
            Đang giao hàng
          </div>
        )}
        <div className={cx("content")}>{data.content}</div>
        <div
          className={cx("time")}
        >{`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`}</div>
        <div className={cx("edit")}>
          <FontAwesomeIcon
            icon={faCircleInfo}
            style={{
              fontSize: "1.5rem",
              color: "#fec806",
              cursor: "pointer",
              marginLeft: "1.5rem",
            }}
            onClick={handleOpenDetailInvoice}
          />
          <Backdrop sx={{ color: "#fff", zIndex: 9 }} open={open}>
            <div className={cx("detail-wrapper")}>
              <div className={cx("title")}>
                <p style={{ fontSize: "1.5rem", fontWeight: "500" }}>
                  THÔNG TIN CHI TIẾT ĐƠN HÀNG
                </p>
                <button
                  type="button"
                  className={cx("close-btn")}
                  onClick={handleCloseAddForm}
                >
                  ×
                </button>
              </div>
              <br />
              <div className={cx("title")}>
                <p style={{ fontSize: "1.2rem", fontWeight: "700" }}>
                  Đơn hàng #{data.id}
                </p>
                <img className={cx("logo")} src={logo} alt="Logo" />
              </div>
              <div className={cx("company-info")}>
                <b>Điện Máy Trung Tín</b>
                <p>28/17/19F Đường 9A, Bình Hưng Hoà A, Bình Tân, TP.HCM</p>
                <p>(+84) 903 382 582</p>
              </div>
              <br />
              <div className={cx("customer-order-info")}>
                <div className={cx("customer-info")}>
                  <h3>Thông tin khách hàng:</h3>
                  <p>
                    <u>Họ và tên:</u> <b>{data.customerName}</b>
                  </p>
                  <p>
                    <u>Số điện thoại:</u> (+84) {data.phone.slice(1)}
                  </p>
                  <p>
                    <u>Email:</u> {data.email}
                  </p>
                  <p>
                    <u>Địa chỉ:</u>{" "}
                    {data.address
                      .replace("Phường", "P.")
                      .replace("Quận", "Q.")
                      .replace("Thành phố Hồ Chí Minh", "TP.HCM")}
                  </p>
                </div>
                <div className={cx("order-info")}>
                  <h3>Thông tin đơn hàng:</h3>
                  <p>
                    Ngày tháng:{" "}
                    {`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`}
                  </p>
                  <div style={{ display: "flex" }}>
                    <p style={{ marginRight: "0.5rem" }}>Trạng thái: </p>
                    {data.status === false ? (
                      <div style={{ color: "#FF5470" }}>Chưa giao hàng</div>
                    ) : (
                      <div style={{ color: "#fec806" }}>Đang giao hàng</div>
                    )}
                  </div>

                  <div style={{ display: "flex" }}>
                    <p style={{ marginRight: "0.5rem" }}>
                      Phương thức thanh toán:{" "}
                    </p>
                    {data.payment === "cash" ? (
                      <>Tiền mặt</>
                    ) : (
                      <>Chuyển khoản</>
                    )}
                  </div>
                  <u>Mã đơn hàng: #{data.id}</u>
                </div>
              </div>
              <div className={cx("products-info")}>
                <div className={cx("titles")}>
                  <div className={cx("image")}>Hình ảnh</div>
                  <div className={cx("name")}>Tên sản phẩm</div>
                  <div className={cx("quantity")}>Số lượng</div>
                  <div className={cx("price")}>Giá tiền</div>
                  <div className={cx("total")}>Tổng tiền</div>
                </div>
                <br />
                <div className={cx("products")}>
                  {data.invoiceDetail.map(
                    (item: {
                      number: number;
                      id: string;
                      idProduct: string;
                    }) => (
                      <div className={cx("information")} key={item.id}>
                        <div className={cx("image")}>
                          <Image
                            src={
                              products.find(
                                (product: { id: string }) =>
                                  product.id === item.idProduct
                              ) &&
                              products.find(
                                (product: { id: string }) =>
                                  product.id === item.idProduct
                              ).imageProducts[0].image
                            }
                          />
                        </div>
                        <div className={cx("name")}>
                          {products.find(
                            (product: { id: string }) =>
                              product.id === item.idProduct
                          ) &&
                            products.find(
                              (product: { id: string }) =>
                                product.id === item.idProduct
                            ).name}
                          -
                          {products.find(
                            (product: { id: string }) =>
                              product.id === item.idProduct
                          ) &&
                            products.find(
                              (product: { id: string }) =>
                                product.id === item.idProduct
                            ).id}
                        </div>
                        <div className={cx("quantity")}>{item.number}</div>
                        {products.find(
                          (product: { id: string }) =>
                            product.id === item.idProduct
                        ).promotional === null ? (
                          <>
                            <div className={cx("price")}>
                              {products.find(
                                (product: { id: string }) =>
                                  product.id === item.idProduct
                              ) &&
                                products
                                  .find(
                                    (product: { id: string }) =>
                                      product.id === item.idProduct
                                  )
                                  .price.toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                              đ
                            </div>
                            <div className={cx("total")}>
                              {products.find(
                                (product: { id: string }) =>
                                  product.id === item.idProduct
                              ) &&
                                (
                                  products.find(
                                    (product: { id: string }) =>
                                      product.id === item.idProduct
                                  ).price * item.number
                                )
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                              đ
                            </div>
                          </>
                        ) : (
                          <>
                            <div className={cx("price")}>
                              {products.find(
                                (product: { id: string }) =>
                                  product.id === item.idProduct
                              ) &&
                                products
                                  .find(
                                    (product: { id: string }) =>
                                      product.id === item.idProduct
                                  )
                                  .promotional.toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                              đ
                            </div>
                            <div className={cx("total")}>
                              {products.find(
                                (product: { id: string }) =>
                                  product.id === item.idProduct
                              ) &&
                                (
                                  products.find(
                                    (product: { id: string }) =>
                                      product.id === item.idProduct
                                  ).promotional * item.number
                                )
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                              đ
                            </div>
                          </>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className={cx("total-bill")}>
                <div className={cx("total-bill-left")}>
                  <b>Tổng tiền đơn hàng: </b>
                  <b>Thuế (0%): </b>
                  <b>Giảm giá (0%): </b>
                  <br />
                  <p
                    style={{
                      color: "#018ec3",
                      fontSize: "1.2rem",
                      fontWeight: "700",
                    }}
                  >
                    Thành tiền:
                  </p>
                </div>
                <div className={cx("total-bill-right")}>
                  <b>
                    {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                  </b>
                  <p>0đ</p>
                  <p>0đ</p>
                  <br />
                  <p
                    style={{
                      color: "#018ec3",
                      fontSize: "1.2rem",
                      fontWeight: "700",
                    }}
                  >
                    {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                  </p>
                </div>
              </div>
              <br />
              {data.status === false ? (
                <>
                  <Button primary small onClick={handlePrint}>
                    In hóa đơn
                  </Button>
                </>
              ) : (
                <>
                  <Button outline small onClick={handleConfirm}>
                    Xác nhận hoàn tất giao hàng
                  </Button>
                </>
              )}
            </div>
          </Backdrop>
        </div>
      </div>

      <div className={cx("line")}></div>
    </div>
  );
};

export default InvoiceManagementRow;
