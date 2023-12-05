import * as React from "react";
import { useState } from "react";
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";
import Backdrop from "@mui/material/Backdrop";

import styles from "./Event.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { useBrand } from "../../../Context/BrandContext";
import { useCategory } from "../../../Context/CategoryContext";
import { useProduct } from "../../../Context/ProductContext";
import { useCombo } from "../../../Context/ComboContext";

import ProductComboComponent from "../../../components/ProductComboCom/ProductComboComponent";
import Clock from "../../../components/Clock";
import Button from "../../../components/Button";
import Image from "../../../components/Image";

import { axiosClient } from "../../../axios";

const cx = classNames.bind(styles);

const Event: React.FC<any> = () => {
  const MySwal = withReactContent(Swal);
  const comboChecked = localStorage.getItem("combo") || [];
  console.log(comboChecked.length);

  const [open, setOpen] = useState(false);
  const handleCloseAddForm = () => setOpen(false);
  const handleOpenAddForm = () => {
    const swalContainer = document.querySelector(
      ".swal2-container"
    ) as HTMLElement;
    if (swalContainer) {
      swalContainer.style.zIndex = "99999";
    }
    if (comboChecked.length !== 0) {
      setOpen(true);
    }
  };

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [, setCost] = useState("");
  const [, setPrice] = useState("");

  const brands = useBrand();
  const categories = useCategory();
  const filteredProductsResult = useProduct();
  const combos = useCombo();

  const [selectedBrandButton, setSelectedBrandButton] = useState<number | null>(
    null
  );

  const [brand0, setBrand0] = useState(true);
  const [, setFilteredBrands] = useState<
    { id: number; name: string; status: boolean }[]
  >([]);
  const [, setBrandChanged] = useState(false);
  const handleClickBrand0 = () => {
    setBrand0(!brand0);
    setBrandChanged(false);
  };

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [category0, setCategory0] = useState(true);
  const [, setCategoryChanged] = useState(false);
  const handleClickCategory0 = () => {
    setCategory0(!category0);
    setCategoryChanged(false);
  };

  const [selectedComboIds, setSelectedComboIds] = useState<string[]>([]);
  const [combo0, setCombo0] = useState(true);
  const [, setComboChanged] = useState(false);
  const handleClickCombo0 = () => {
    setCombo0(!combo0);
    setComboChanged(false);
  };

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
      await axiosClient.post("combo/create", formData);
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

  const handleClickBrandAll = (brandId: number) => {
    setSelectedBrandButton(brandId === selectedBrandButton ? null : brandId);
    let updatedFilteredBrand: React.SetStateAction<
      { id: number; name: string; status: boolean }[]
    > = [];
    if (brandId !== selectedBrandButton) {
      updatedFilteredBrand = brands.filter((brand) => brand.id === brandId);
    }
    setFilteredBrands(updatedFilteredBrand);
    setCategory0(false);
  };

  const handleCategoryToggle = (categoryName: string) => {
    if (selectedCategoryIds.includes(categoryName)) {
      setSelectedCategoryIds(
        selectedCategoryIds.filter((name) => name !== categoryName)
      );
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, categoryName]);
      setCategory0(!true);
    }
  };

  const handleComboToggle = (comboName: string) => {
    if (selectedComboIds.includes(comboName)) {
      setSelectedComboIds(
        selectedComboIds.filter((name) => name !== comboName)
      );
    } else {
      setSelectedComboIds([...selectedComboIds, comboName]);
      setCombo0(!true);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("left")}>
          <p style={{ width: "fit-content", fontWeight: 700 }}>
            SỰ KIỆN GIẢM GIÁ
          </p>
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
          <div className={cx("add-btn")}>
            <Button primary small onClick={handleOpenAddForm}>
              Thêm sự kiện giảm giá
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
        <div className={cx("products")}>
          {category0 === true ? (
            <>
              {categories.map((dataa) => (
                <div className={cx("machine")} key={dataa.id}>
                  <div className={cx("title-wrapper")}>
                    <div className={cx("title")}>{dataa.name}</div>
                  </div>
                  <div className={cx("product")}>
                    {filteredProductsResult
                      .filter((data) => data.category.name === dataa.name)
                      .map((data) => (
                        <ProductComboComponent key={data.id} data={data} />
                      ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {selectedCategoryIds.map((dataa) => (
                <div className={cx("machine")} key={dataa}>
                  <div className={cx("title-wrapper")}>
                    <div className={cx("title")}>{dataa}</div>
                  </div>
                  <div className={cx("product")}>
                    {filteredProductsResult
                      .filter((data) => data.category.name === dataa)
                      .map((data) => (
                        <ProductComboComponent key={data.id} data={data} />
                      ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className={cx("filter")}>
          <h3>Bộ lọc</h3>
          <h4>Lọc theo sự kiện giảm giá</h4>
          {combo0 === true ? (
            <Button primary onClick={handleClickCombo0}>
              Tất cả sự kiện giảm giá
            </Button>
          ) : (
            <Button outline onClick={handleClickCombo0}>
              Tất cả sự kiện giảm giá
            </Button>
          )}
          {combos.map((comboItem) => (
            <>
              {selectedComboIds.includes(comboItem.combo.name) === true ? (
                <Button
                  primary
                  onClick={() => handleComboToggle(comboItem.combo!.name)}
                  key={comboItem.combo.id}
                >
                  {comboItem.combo.name}
                </Button>
              ) : (
                <Button
                  outline
                  onClick={() => handleComboToggle(comboItem.combo!.name)}
                  key={comboItem.combo.id}
                >
                  {comboItem.combo.name}
                </Button>
              )}
            </>
          ))}
          <h4>Lọc theo danh mục</h4>
          {category0 === true ? (
            <Button primary onClick={handleClickCategory0}>
              Tất cả sản phẩm
            </Button>
          ) : (
            <Button outline onClick={handleClickCategory0}>
              Tất cả sản phẩm
            </Button>
          )}
          {categories.map((category) => (
            <>
              {selectedCategoryIds.includes(category.name) === true ? (
                <Button
                  primary
                  onClick={() => handleCategoryToggle(category!.name)}
                  key={category.id}
                >
                  {category.name}
                </Button>
              ) : (
                <Button
                  outline
                  onClick={() => handleCategoryToggle(category!.name)}
                  key={category.id}
                >
                  {category.name}
                </Button>
              )}
            </>
          ))}
          <h4>Lọc theo hãng</h4>
          <>
            <Button primary onClick={handleClickBrand0}>
              Tất cả các hãng
            </Button>
          </>
          {brands.map((brand) => (
            <>
              {selectedBrandButton === brand.id ? (
                <Button
                  primary
                  onClick={() => handleClickBrandAll(brand!.id)}
                  key={brand.id}
                >
                  {brand.name}
                </Button>
              ) : (
                <Button
                  outline
                  onClick={() => handleClickBrandAll(brand!.id)}
                  key={brand.id}
                >
                  {brand.name}
                </Button>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Event;
