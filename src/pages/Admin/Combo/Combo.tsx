import * as React from "react";
import { useState } from "react";
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";
import Backdrop from "@mui/material/Backdrop";

import styles from "./Combo.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Clock from "../../../components/Clock";
import Button from "../../../components/Button";
import Image from "../../../components/Image";

import { axiosClient } from "../../../axios";

const cx = classNames.bind(styles);

const Combo: React.FC<any> = () => {
  const MySwal = withReactContent(Swal);

  const [open, setOpen] = useState(false);
  const handleCloseAddForm = () => setOpen(false);
  const handleOpenAddForm = () => {
    const swalContainer = document.querySelector(
      ".swal2-container"
    ) as HTMLElement;
    if (swalContainer) {
      swalContainer.style.zIndex = "99999";
    }
    setOpen(true);
  };

  const [name, setName] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [cost, setCost] = React.useState("");
  const [price, setPrice] = React.useState("");

  const linkRef = React.useRef<HTMLAnchorElement>(null);

  const upload = (file: File) => {
    if (!file || !file.type.match(/image.*/)) return;

    MySwal.fire({
      title: "Đang tải lên...",
      allowOutsideClick: false,
      didOpen: () => {
        const popup = MySwal.getPopup();
        if (popup) {
          popup.style.zIndex = "9999";
        }
        MySwal.showLoading();
      },
      timer: 2000,
    });

    const fd = new FormData();
    fd.append("image", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imgur.com/3/image.json");
    xhr.onload = function () {
      const link = JSON.parse(xhr.responseText).data.link;
      if (linkRef.current) {
        linkRef.current.href = link;
        linkRef.current.innerHTML = link;
      }
      MySwal.close();
      setImageUrl(link);
    };
    xhr.setRequestHeader("Authorization", "Client-ID 983c8532c49a20e");
    xhr.send(fd);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      upload(file);
    }
  };
  const handleCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCost(event.target.value);
  };
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", imageUrl);

    try {
      await axiosClient.post("category/create", formData);
      MySwal.fire({
        title: "Thêm thành công!",
        icon: "success",
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 1500,
      });
      setOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      MySwal.fire({
        title: "Đã có lỗi xảy ra!",
        icon: "error",
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 1500,
      });
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("left")}>
          <p style={{ width: "fit-content", fontWeight: 700 }}>COMBO SẢN PHẨM</p>
        </div>
        <div className={cx("right")}>
          <div className={cx("current-position")}>
            <Clock />
            <FontAwesomeIcon icon={faHouse} style={{ paddingRight: "1rem" }} />
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ width: "1rem", height: "1rem", paddingRight: "1rem" }}
            />
            <p>Combo sản phẩm</p>
          </div>
          <div className={cx("add-btn")}>
            <Button primary small onClick={handleOpenAddForm}>
              Thêm combo sản phẩm
            </Button>
            <Backdrop sx={{ color: "#fff", zIndex: 9 }} open={open}>
              <div className={cx("add-form")}>
                <form
                  action="/upload"
                  method="post"
                  className={cx("form")}
                  onSubmit={handleSubmit}
                >
                  <div className={cx("title")}>
                    <p style={{ fontSize: "1.5rem", fontWeight: "500" }}>
                      THÊM COMBO SẢN PHẨM
                    </p>
                    <button
                      type="button"
                      className={cx("close-btn")}
                      onClick={handleCloseAddForm}
                    >
                      ×
                    </button>
                  </div>
                  <div className={cx("inputs")}>
                    <label>Điền tên combo sản phẩm:</label>
                    <input
                      type="text"
                      placeholder="Tên danh mục sản phẩm"
                      className={cx("input-name")}
                      onChange={handleNameChange}
                    />
                    <label>Chọn hình ảnh:</label>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={handleImageUpload}
                    />
                    <br />
                    <label>Giá gốc sản phẩm:</label>
                    <input
                      type="number"
                      placeholder="Giá gốc sản phẩm"
                      className={cx("input-name")}
                      onChange={handleCostChange}
                    />
                    <br />
                    <label>Giá combo sản phẩm:</label>
                    <input
                      type="number"
                      placeholder="Giá combo"
                      className={cx("input-name")}
                      onChange={handlePriceChange}
                    />
                  </div>
                  <div className={cx("show-image")}>
                    <Image src={imageUrl} />
                  </div>
                  <Button primary small>
                    Xác nhận
                  </Button>
                </form>
              </div>
            </Backdrop>
          </div>
        </div>
      </div>
      <div className={cx("main-container")}>
        <div className={cx("products")}></div>

        <div className={cx("filter")}>
          <h3>Bộ lọc</h3>
        </div>
      </div>
    </div>
  );
};

export default Combo;
