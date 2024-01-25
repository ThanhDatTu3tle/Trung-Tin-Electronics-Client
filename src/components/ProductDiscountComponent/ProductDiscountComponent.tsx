import * as React from "react";
import { useState } from "react";
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";
import Backdrop from "@mui/material/Backdrop";

import styles from "./ProductDiscountComponent.module.scss";

import Image from "../Image";

import ProductService from "../../service/ProductService";
import Button from "../Button";

const cx = classNames.bind(styles);

const ProductDiscountComponent: React.FC<any> = ({ data }) => {
  const MySwal = withReactContent(Swal);

  const [openDiscount, setOpenDiscount] = useState(false);
  const handleCloseEditDiscountForm = () => setOpenDiscount(false);
  const [discount, setDiscount] = useState<number>(data.discount);
  const [promotional, setPromotional] = useState<number>(data.price);

  const handleEditProductDiscount = () => {
    const swalContainer = document.querySelector(
      ".swal2-container"
    ) as HTMLElement;
    if (swalContainer) {
      swalContainer.style.zIndex = "99999";
    }
    setOpenDiscount(true);
  };

  const handleDiscountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const discountValue = Number(event.target.value);
    setDiscount(discountValue);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const promotionalValue = Number(event.target.value);
    setPromotional(promotionalValue);
  };

  const handleUpdateDiscount = async () => {
    try {
      ProductService.UpdateProductDiscount(data.id, discount, promotional);
      MySwal.fire({
        title: "Khởi tạo khuyến mãi thành công!",
        icon: "success",
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 2000,
      });
      window.location.reload();
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
      <div className={cx("inner")} onClick={handleEditProductDiscount}>
        <div className={cx("image")}>
          {data.imageProducts && data.imageProducts.length > 0 && (
            <Image src={data.imageProducts[0].image} />
          )}
        </div>
        <div className={cx("content")}>
          <div className={cx("name")}>
            {data.name} {data.id}
          </div>
          <div className={cx("product-price")}>
            {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
          </div>
        </div>
      </div>
      <Backdrop sx={{ color: "#fff", zIndex: 9 }} open={openDiscount}>
        <div className={cx("edit-quantity-form")}>
          <div className={cx("form")}>
            <div className={cx("title")}>
              <p style={{ fontSize: "1.5rem", fontWeight: "500" }}>
                KHỞI TẠO/CHỈNH SỬA PHẦN TRĂM KHUYẾN MÃI SẢN PHẨM
              </p>
              <button
                type="button"
                className={cx("close-btn")}
                onClick={handleCloseEditDiscountForm}
              >
                ×
              </button>
            </div>
            <div className={cx("inputs")}>
              <br />
              <p>Mã sản phẩm: {data.id}</p>
              <p>Giá gốc sản phẩm: {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</p>
              <br />
              <label htmlFor="discount">
                Giá khuyến mãi:
              </label>
              <input
                id="new-price"
                type="number"
                placeholder="Giá khuyến mãi"
                className={cx("input-name")}
                onChange={handlePriceChange}
              />
              <label htmlFor="discount">
                Khởi tạo/Chỉnh sửa phần trăm khuyến mãi:
              </label>
              <input
                id="discount"
                type="number"
                placeholder="Phần trăm khuyến mãi"
                className={cx("input-name")}
                onChange={handleDiscountChange}
              />
            </div>
            <Button primary small onClick={handleUpdateDiscount}>
              Xác nhận
            </Button>
          </div>
        </div>
      </Backdrop>
    </div>
  );
};

export default ProductDiscountComponent;
