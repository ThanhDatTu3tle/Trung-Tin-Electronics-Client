import * as React from "react";
import { useState } from "react";
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";
import Backdrop from "@mui/material/Backdrop";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

import styles from "./CategoryComponent.module.scss";
import Image from "../Image";
import Button from "../Button";
import { axiosClient } from "../../axios";

const cx = classNames.bind(styles);

const CategoryComponent: React.FC<any> = ({ data }) => {
  const currentPath = window.location.pathname;
  const MySwal = withReactContent(Swal);
  
  const idCategory = data.id;

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

  const handleDeleteForm = async () => {
    try {
      axiosClient.delete(`category/delete/${idCategory}`, {
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
  };

  const [name, setName] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const linkRef = React.useRef<HTMLAnchorElement>(null);

  const upload = (file: File) => {
    if (!file || !file.type.match(/image.*/)) return;

    MySwal.fire({
      title: "Đang tải ảnh lên...",
      allowOutsideClick: false,
      didOpen: () => {
        const popup = MySwal.getPopup();
        if (popup) {
          popup.style.zIndex = "99999";
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      upload(file);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("id", idCategory);
    formData.append("name", name);
    formData.append("image", imageUrl);

    try {
      const response = await axiosClient.put(
        `category/edit/${idCategory}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      MySwal.fire({
        title: "Chỉnh sửa thành công!",
        icon: "success",
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 2000,
      });
      setOpen(false);
      window.location.reload();
      console.log("Response from server:", response);
    } catch (error) {
      MySwal.fire({
        title: "Đã có lỗi xảy ra!",
        icon: "error",
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 2000,
      });
      console.error("Error:", error);
    }
  };

  const handleClick = async () => {
    await MySwal.fire({
      title: "Đang tải...",
      didOpen: () => {
        MySwal.showLoading();
      },
      timer: 1000,
    });

    window.location.href = `/detailCategory/${data.name}`;
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        {currentPath === "/category" ? (
          <>
            <div className={cx("img")}>
              <LazyLoadImage src={data.image} effect="blur" width="100%" />
            </div>
            <h3>{data.name}</h3>
            <div className={cx("btns")}>
              <Button
                outline
                onClick={handleOpenAddForm}
                style={{ marginBottom: "0.5rem" }}
              >
                Chỉnh sửa thông tin
              </Button>
              <Button primary onClick={handleDeleteForm}>
                Xóa danh mục
              </Button>
            </div>
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
                      CHỈNH SỬA THÔNG TIN HÃNG SẢN XUẤT
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
                    <label>ID hãng sản xuất:</label>
                    <input
                      id="id"
                      type="number"
                      name="id"
                      placeholder="ID hãng sản xuất"
                      className={cx("input-name")}
                      value={idCategory}
                    />
                    <br />
                    <label>Chỉnh sửa tên hãng sản xuất:</label>
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
                    <label>Chọn/chỉnh sửa hình ảnh:</label>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={handleImageUpload}
                    />
                  </div>
                  <div className={cx("show-image")}>
                    <Image src={imageUrl} />
                  </div>
                  <Button small primary>
                    Xác nhận
                  </Button>
                </form>
              </div>
            </Backdrop>
          </>
        ) : (
          <div className={cx("user-ui")} onClick={handleClick}>
            <LazyLoadImage src={data.image} effect="blur" width="100%" />
            <h4>{data.name}</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryComponent;
