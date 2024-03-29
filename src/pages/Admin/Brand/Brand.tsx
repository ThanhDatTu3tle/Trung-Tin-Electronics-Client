import * as React from "react";
import { useState } from "react";
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";
import Backdrop from "@mui/material/Backdrop";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./Brand.module.scss";
import Button from "../../../components/Button";
import Image from "../../../components/Image";
import { axiosClient } from "../../../axios";
import { useBrand } from "../../../Context/BrandContext";
import BrandComponent from "../../../components/BrandCom/BrandComponent";
import Clock from "../../../components/Clock";

const faHouseIcon = faHouse as IconProp;
const faArrowRightIcon = faArrowRight as IconProp;

const cx = classNames.bind(styles);

// eslint-disable-next-line @typescript-eslint/no-redeclare
const Brand: React.FC<any> = () => {
  const MySwal = withReactContent(Swal);
  const brands = useBrand();

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
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
  
    if (files && files.length > 0) {
      const file = files[0]; 
      setImageFile(file);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("name", name);
    if (imageFile) {
      formData.append('image', imageFile);
    }
  
    try {
      // Gửi dữ liệu lên server
      console.log(imageFile)
      await axiosClient.post("brand/create", formData);
  
      MySwal.fire({
        title: "Thêm thành công!",
        icon: "success",
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 1500,
      });      
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error uploading brand:", error);
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
          <p style={{ width: "fit-content", fontWeight: 700 }}>HÃNG SẢN XUẤT</p>{" "}
        </div>
        <div className={cx("right")}>
          <div className={cx("current-position")}>
            <Clock />
            <FontAwesomeIcon
              icon={faHouseIcon}
              style={{ paddingRight: "1rem" }}
            />
            <FontAwesomeIcon
              icon={faArrowRightIcon}
              style={{ width: "1rem", height: "1rem", paddingRight: "1rem" }}
            />
            <p>Hãng sản xuất</p>
          </div>
          <div className={cx("add-btn")}>
            <Button primary small onClick={handleOpenAddForm}>
              Thêm hãng
            </Button>
            <Backdrop sx={{ color: "#fff", zIndex: 9 }} open={open}>
              <div className={cx("add-form")}>
                <form
                  action="/upload"
                  method="post"
                  className={cx("form")}
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  <div className={cx("title")}>
                    <p style={{ fontSize: "1.5rem", fontWeight: "500" }}>
                      THÊM HÃNG SẢN XUẤT
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
                  <div className={cx("inputs")}>
                    <label>Điền tên hãng sản xuất:</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Tên hãng sản xuất"
                      className={cx("input-name")}
                      value={name}
                      onChange={handleNameChange}
                    />
                    <br />
                    <label>Chọn hình ảnh:</label>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={handleImageUpload}
                    />
                  </div>
                  <div className={cx("show-image")}>
                    <Image src={imageFile} />
                  </div>
                  <Button small primary>
                    Xác nhận
                  </Button>
                </form>
              </div>
            </Backdrop>
          </div>
        </div>
      </div>
      <div className={cx("main-container")}>
        <div className={cx("brands")}>
          {brands !== undefined ? (
            <>
              <div className={cx("brand")}>
                {brands.map((data) => (
                  <BrandComponent key={data.id} data={data} />
                ))}
              </div>
            </>
          ) : (
            <>
              <p>Chưa có hãng sản xuất!!!</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Brand;
