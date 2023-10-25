import React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";
import Backdrop from "@mui/material/Backdrop";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faEllipsisVertical,
  faEyeSlash,
  faEye,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./ProductManagementRow.module.scss";
import Image from "../Image";
import Button from "../Button";

import { axiosClient } from "../../axios";
import BrandService from "../../service/BrandService";
import CategoryService from "../../service/CategoryService";
import ProductService from "../../service/ProductService";

const cx = classNames.bind(styles);

const ProductManagementRow: React.FC<any> = ({ data }) => {
  const MySwal = withReactContent(Swal);
  const [state, setState] = useState(data.status);
  const [open, setOpen] = useState(false);
  const [openQuantity, setOpenQuantity] = useState(false);
  const handleCloseAddForm = () => setOpen(false);
  const handleCloseEditQuantityForm = () => setOpenQuantity(false);

  const dateObj = new Date(data.updatedAt);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  const handleEditProduct = () => {
    const swalContainer = document.querySelector(
      ".swal2-container"
    ) as HTMLElement;
    if (swalContainer) {
      swalContainer.style.zIndex = "99999";
    }
    setOpen(true);
  };

  const [brands, setBrands] = useState<
    { id: number; name: string; status: boolean }[]
  >([]);
  const [categories, setCategories] = useState<
    { id: number; name: string; status: boolean }[]
  >([]);
  const [imgs, setImgs] = useState<
    { id: number; idProduct: string; image: string; name: null }[]
  >([]);

  const fetchAPIBrands = async () => {
    try {
      const res = await BrandService.GetAllBrand();
      return res.data;
    } catch (error) {}
  };
  const fetchAPICategories = async () => {
    try {
      const res = await CategoryService.GetAllCategory();
      return res.data;
    } catch (error) {}
  };

  const { data: brandsData, refetch: refetchBrands } = useQuery(
    ["brandImages"],
    fetchAPIBrands,
    {}
  );
  const { data: categoriesData, refetch: refetchCategories } = useQuery(
    ["categoryImages"],
    fetchAPICategories,
    {}
  );

  useEffect(() => {
    const fetchAllAPIs = async () => {
      await Promise.all([refetchBrands(), refetchCategories()]);
    };
    fetchAllAPIs();
  }, [refetchBrands, refetchCategories]);
  useEffect(() => {
    if (brandsData && categoriesData) {
      setBrands(brandsData);
      setCategories(categoriesData);
    }
  }, [brandsData, categoriesData]);

  const [selectedBrand, setSelectedBrand] = useState<string>(data.brand.name);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    data.category.name
  );

  const handleSelectBrandChange = (event: any) => {
    setSelectedBrand(event.target.value);
  };
  const handleSelectCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const [id, setId] = useState<string>(data.id);
  const [name, setName] = useState<string>(data.name);
  const [description, setDescription] = useState<string>(data.description);
  const [price, setPrice] = useState<number>(data.price);
  const [images, setImages] = useState<File[]>([]);
  const [imageProducts, setImageProducts] = useState<File[]>(
    data.imageProducts.image
  );
  const [specification, setSpecification] = useState<string[]>(
    data.specification.specification
  );
  const [quantity, setQuantity] = useState<number>(data.quantity);

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const priceValue = Number(event.target.value);
    setPrice(priceValue);
  };

  const upload = async (files: File[]) => {
    try {
      const uploadedImages = await Promise.all(
        files.map((file) => {
          if (!file || !file.type.match(/image.*/)) return null;
          return new Promise<string | null>((resolve, reject) => {
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
              resolve(link);
              MySwal.close();
            };
            xhr.onerror = function () {
              reject(new Error("Failed to upload image"));
            };
            xhr.setRequestHeader("Authorization", "Client-ID 983c8532c49a20e");
            xhr.send(fd);
          });
        })
      );
      return {
        uploadedImages,
      };
    } catch (error) {
      return {
        uploadedImages: [],
      };
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const newImages: File[] = [];

    for (let i = 0; i < event.target.files.length; i++) {
      newImages.push(event.target.files[i]);
    }

    setImages([...images, ...newImages]);
  };

  const handleSpecChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    const newSpecificationArray = newValue
      .split("\n")
      .map((item) => item.trim());
    setSpecification(newSpecificationArray);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { uploadedImages } = await upload(images);
      const validImages = uploadedImages.filter(
        (link): link is string => link !== null
      );
      // setImgs()

      const selectedBrandData = brands.find(
        (brand) => brand.name === selectedBrand
      );
      const selectedCategoryData = categories.find(
        (category) => category.name === selectedCategory
      );

      if (!selectedBrandData || !selectedCategoryData) {
        return;
      }

      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price.toString());
      formData.append("idBrand", selectedBrandData.id.toString());
      formData.append("idCategory", selectedCategoryData.id.toString());

      // console.log('validImages: ', validImages);
      // console.log('data.imageProducts: ', data.imageProducts);
      const imgProducts = data.imageProducts.map(
        (item: { image: string }) => item.image
      );
      // console.log('imgProducts: ', imgProducts)
      const finalImgItem = [...validImages, ...imgProducts];
      // console.log('finalImgItem: ', finalImgItem);
      finalImgItem.forEach((imgItem: any, index: any) => {
        formData.append(`imageProducts[${index}].image`, imgItem.image);
      });
      data.specification.forEach((specItem: any, index: any) => {
        formData.append(`specification[${index}]`, specItem.specification);
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      axiosClient.put("product/update", formData, config);
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

  const updateProductStatus = async () => {
    try {
      if (data.status === true) {
        MySwal.fire({
          title: "Ẩn sản phẩm thành công!",
          icon: "success",
          didOpen: () => {
            MySwal.showLoading();
          },
          timer: 3000,
        });
        ProductService.UpdateProductStatus(data.id, 0);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        setState(!state);
      } else {
        MySwal.fire({
          title: "Hiện sản phẩm thành công!",
          icon: "success",
          didOpen: () => {
            MySwal.showLoading();
          },
          timer: 3000,
        });
        ProductService.UpdateProductStatus(data.id, 1);
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
  };

  const handleEditProductQuantity = () => {
    const swalContainer = document.querySelector(
      ".swal2-container"
    ) as HTMLElement;
    if (swalContainer) {
      swalContainer.style.zIndex = "99999";
    }
    setOpenQuantity(true);
  };

  const updateProductQuantity = () => {
    try {
      ProductService.UpdateProductQuantity(data.id, quantity);
      MySwal.fire({
        title: "Cập nhật hàng tồn kho thành công!",
        icon: "success",
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 2000,
      });
      window.location.reload();
      setState(!state);
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

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantityValue = Number(event.target.value);
    setQuantity(quantityValue);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("image")}>
          <img className={cx("img")} src={data.imageProducts[0].image} alt="" />
        </div>
        <div className={cx("name")}>{data.name}</div>
        <div className={cx("id")}>{data.id}</div>
        <div className={cx("category")}>{data.category.name}</div>
        <div className={cx("brand")}>{data.brand.name}</div>
        <div className={cx("price")}>
          {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
        </div>
        {data.quantity !== 0 && data.quantity !== null ? (
          <div className={cx("wrapper-stock")}>
            <div
              className={cx("stock")}
              style={{ color: "green", fontWeight: 700 }}
            >
              Còn hàng ({data.quantity})
            </div>
            <FontAwesomeIcon
              icon={faCirclePlus}
              style={{ fontSize: "1rem", color: "#fec806", cursor: "pointer" }}
              onClick={handleEditProductQuantity}
            />
            <Backdrop sx={{ color: "#fff", zIndex: 9 }} open={openQuantity}>
              <div className={cx("edit-quantity-form")}>
                <div className={cx("form")}>
                  <div className={cx("title")}>
                    <p style={{ fontSize: "1.5rem", fontWeight: "500" }}>
                      CHỈNH SỬA SỐ LƯỢNG HÀNG TỒN SẢN PHẨM
                    </p>
                    <button
                      type="button"
                      className={cx("close-btn")}
                      onClick={handleCloseEditQuantityForm}
                    >
                      ×
                    </button>
                  </div>
                  <div className={cx("inputs")}>
                    <br />
                    <p>Số lượng tồn kho hiện tại: {data.quantity}</p>
                    <label htmlFor="quantity">
                      Chỉnh sửa số lượng tồn kho sản phẩm:
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      placeholder="Số lượng hàng nhập kho"
                      className={cx("input-name")}
                      onChange={handleQuantityChange}
                    />
                  </div>

                  <Button primary small onClick={updateProductQuantity}>
                    Chỉnh sửa
                  </Button>
                </div>
              </div>
            </Backdrop>
          </div>
        ) : (
          <div
            className={cx("stock")}
            style={{ color: "red", fontWeight: 700 }}
          >
            Hết hàng (0)
          </div>
        )}
        {data.status === true ? (
          <div
            className={cx("status")}
            style={{ color: "green", fontWeight: 700 }}
          >
            Đang bày bán
          </div>
        ) : (
          <div
            className={cx("status")}
            style={{ color: "red", fontWeight: 700 }}
          >
            Đã ẩn đi
          </div>
        )}
        <div
          className={cx("date")}
        >{`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`}</div>
        <div className={cx("edit")}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={{ fontSize: "1.5rem", color: "#fec806", cursor: "pointer" }}
            onClick={handleEditProduct}
          />
          <Backdrop sx={{ color: "#fff", zIndex: 9 }} open={open}>
            <div className={cx("add-form")}>
              <form
                action="/upload"
                method="post"
                className={cx("form")}
                onSubmit={(event) => handleSubmit(event)}
              >
                <div className={cx("title")}>
                  <p style={{ fontSize: "1.5rem", fontWeight: "500" }}>
                    CHỈNH SỬA SẢN PHẨM
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
                  <div className={cx("left")}>
                    <label htmlFor="id">Chỉnh sửa mã sản phẩm:</label>
                    <input
                      id="id"
                      type="text"
                      value={id}
                      className={cx("input-name")}
                      onChange={handleIdChange}
                    />
                    <label htmlFor="name">Chỉnh sửa tên sản phẩm:</label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      className={cx("input-name")}
                      onChange={handleNameChange}
                    />
                    <label htmlFor="description">
                      Chỉnh sửa mô tả sản phẩm:
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={description}
                      onChange={handleDescriptionChange}
                      rows={3}
                    />
                    <br />
                    <label htmlFor="price">Chỉnh sửa giá tiền sản phẩm:</label>
                    <input
                      id="price"
                      type="number"
                      value={price}
                      className={cx("input-name")}
                      onChange={handlePriceChange}
                    />
                    <label htmlFor="brand">Chỉnh sửa hãng sản xuất:</label>
                    <select
                      id="brand"
                      name="brand"
                      value={selectedBrand}
                      className={cx("selector")}
                      onChange={handleSelectBrandChange}
                    >
                      <option className={cx("option-first")} value="" disabled>
                        Hãng sản xuất
                      </option>
                      {brands.map((brand) => (
                        <option
                          className={cx("option")}
                          key={brand.id}
                          value={brand.name}
                        >
                          {brand.name}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="category">
                      Chỉnh sửa danh mục sản phẩm:
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={selectedCategory}
                      className={cx("selector")}
                      onChange={handleSelectCategoryChange}
                    >
                      <option className={cx("option-first")} value="" disabled>
                        Danh mục sản phẩm
                      </option>
                      {categories.map((category) => (
                        <option
                          className={cx("option")}
                          key={category.id}
                          value={category.name}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={cx("right")}>
                    <label htmlFor="image">Hình ảnh hiện tại:</label>
                    <div className={cx("show-image")}>
                      {data.imageProducts.map((img: { id:any; image: any }) => (
                        <Image key={img.id} src={img.image} />
                      ))}
                    </div>
                    {/* <br />
                                        <label htmlFor="image">Thêm hình ảnh mới:</label>
                                        <input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            name="image"
                                            onChange={handleImageUpload}
                                        /> */}
                    {/* <br />
                                        <label htmlFor="specification">Chỉnh sửa thông số cho sản phẩm:</label>
                                        <textarea
                                            id="specification"
                                            name="specification"
                                            value={
                                                data.specification.map((spec: { specification: any; }) => (
                                                    spec.specification
                                                ))
                                            }
                                            onChange={handleSpecChange}
                                            rows={5}
                                        /> */}
                  </div>
                </div>
                <Button primary small>
                  Xác nhận
                </Button>
              </form>
            </div>
          </Backdrop>
          {data.status === true ? (
            <FontAwesomeIcon
              icon={faEye}
              style={{
                fontSize: "1.5rem",
                color: "#fec806",
                cursor: "pointer",
                marginLeft: "1.5rem",
              }}
              onClick={updateProductStatus}
            />
          ) : (
            <FontAwesomeIcon
              icon={faEyeSlash}
              style={{
                fontSize: "1.5rem",
                color: "#fec806",
                cursor: "pointer",
                marginLeft: "1.5rem",
              }}
              onClick={updateProductStatus}
            />
          )}
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            style={{
              fontSize: "1.5rem",
              color: "#fec806",
              cursor: "pointer",
              marginLeft: "1.5rem",
            }}
          />
        </div>
      </div>

      <div className={cx("line")}></div>
    </div>
  );
};

export default ProductManagementRow;
