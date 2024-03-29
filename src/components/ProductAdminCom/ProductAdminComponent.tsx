import * as React from "react";
import { useState } from "react";
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";
import Backdrop from "@mui/material/Backdrop";

import styles from "./ProductAdminComponent.module.scss";
import Image from "../Image";
import Button from "../Button";

import { axiosClient } from "../../axios";
import { useBrand } from "../../Context/BrandContext";
import { useCategory } from "../../Context/CategoryContext";
import ProductService from "../../service/ProductService";

const cx = classNames.bind(styles);

const ProductAdminComponent: React.FC<any> = ({ data }) => {
  const MySwal = withReactContent(Swal);

  const [state, setState] = useState(data.status);
  const [open, setOpen] = useState(false);
  const handleCloseAddForm = () => setOpen(false);

  const handleClick = () => {
    if (!localStorage.getItem("seen")) {
      localStorage.setItem("seen", JSON.stringify([]));
    }

    const seenProducts = JSON.parse(localStorage.getItem("seen") || "[]");
    const productId = data.id;

    const productTimestampKey = `product_${productId}`;
    const lastViewedTime = localStorage.getItem(productTimestampKey);

    const now = Date.now();
    const expirationTime = 5000;

    if (!seenProducts.includes(data.id)) {
      seenProducts.push(data.id);
      localStorage.setItem("seen", JSON.stringify(seenProducts));

      localStorage.setItem(productTimestampKey, now.toString());
    }

    if (lastViewedTime) {
      const timeElapsed = now - parseInt(lastViewedTime, 10);
      if (timeElapsed > expirationTime) {
        const updatedSeenProducts = seenProducts.filter(
          (id: any) => id !== productId
        );
        localStorage.setItem("seen", JSON.stringify(updatedSeenProducts));
      }
    }
  };

  const handleOpenEditForm = () => {
    const swalContainer = document.querySelector(
      ".swal2-container"
    ) as HTMLElement;
    if (swalContainer) {
      swalContainer.style.zIndex = "99999";
    }
    setOpen(true);
  };

  const brands = useBrand();
  const categories = useCategory(); 

  const updateProductStatus = async () => {
    try {
      if (data.status === true) {
        ProductService.UpdateProductStatus(data.id, 0);
        MySwal.fire({
          title: "Ẩn sản phẩm thành công!",
          icon: "success",
          didOpen: () => {
            MySwal.showLoading();
          },
          timer: 2000,
        });
        setState(!state);
      } else {
        ProductService.UpdateProductStatus(data.id, 1);
        MySwal.fire({
          title: "Hiện sản phẩm thành công!",
          icon: "success",
          didOpen: () => {
            MySwal.showLoading();
          },
          timer: 2000,
        });
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
  const [cost, setCost] = useState<number>(data.cost || 0);
  const [images, setImages] = useState<File[]>([]);
  const [imageProducts, setImageProducts] = useState<File[]>(
    data.imageProducts.image
  );
  // const [specification, setSpecification] = useState<string[]>(data.specification.specification);

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
    console.log(id);
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
  const handleCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const costValue = Number(event.target.value);
    setCost(costValue);
  };

  // const upload = async (files: File[]) => {
  //     try {
  //       const uploadedImages = await Promise.all(
  //         files.map(file => {
  //           if (!file || !file.type.match(/image.*/)) return null;
  //           return new Promise<string | null>((resolve, reject) => {
  //             MySwal.fire({
  //               title: 'Đang tải lên...',
  //               allowOutsideClick: false,
  //               didOpen: () => {
  //                 const popup = MySwal.getPopup();
  //                 if (popup) {
  //                   popup.style.zIndex = "9999";
  //                 }
  //                 MySwal.showLoading();
  //               },
  //               timer: 2000,
  //             });
  //             const fd = new FormData();
  //             fd.append('image', file);
  //             const xhr = new XMLHttpRequest();
  //             xhr.open('POST', 'https://api.imgur.com/3/image.json');
  //             xhr.onload = function () {
  //               const link = JSON.parse(xhr.responseText).data.link;
  //               resolve(link);
  //               MySwal.close();
  //             };
  //             xhr.onerror = function () {
  //               reject(new Error('Failed to upload image'));
  //             };
  //             xhr.setRequestHeader('Authorization', 'Client-ID 983c8532c49a20e');
  //             xhr.send(fd);
  //           });
  //         })
  //       );
  //       return {
  //         uploadedImages,
  //       };
  //     } catch (error) {
  //       return {
  //         uploadedImages: [],
  //       };
  //     }
  // };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const newImages: File[] = [];

    for (let i = 0; i < event.target.files.length; i++) {
      newImages.push(event.target.files[i]);
    }

    setImages([...images, ...newImages]);
  };

  // const handleSpecChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //     const newValue = event.target.value;
  //     const newSpecificationArray = newValue.split('\n').map(item => item.trim());
  //     setSpecification(newSpecificationArray);
  // };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    images: File[]
  ) => {
    event.preventDefault();

    try {
      // const { uploadedImages } = await upload(images);
      // const validImages = uploadedImages.filter((link): link is string => link !== null);
      // setImgs(
      //     {
      //         id: 5,
      //         idProduct: data.id,
      //         image: validImages
      //     }
      // )

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
      // const imgProducts = data.imageProducts.map((item: { image: string; }) => item.image)
      // console.log('imgProducts: ', imgProducts)
      // const finalImgItem = [...validImages, ...imgProducts]
      // console.log('finalImgItem: ', finalImgItem);
      // finalImgItem.forEach((imgItem: any, index: any) => {
      //     formData.append(`imageProducts[${index}].image`, imgItem.image);
      // });
      // data.specification.forEach((specItem: any, index: any) => {
      //     formData.append(`specification[${index}]`, specItem.specification);
      // });

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

  return (
    <div className={cx("wrapper")} onClick={handleClick}>
      <div className={cx("inner")}>
        {data.status === true ? (
          <></>
        ) : (
          <>
            <div className={cx("tag")}>
              <div className={cx("tag-text")}>Đã ẩn</div>
            </div>
          </>
        )}
        <div className={cx("image")}>
          {data.imageProducts && data.imageProducts.length > 0 && (
            <Image src={data.imageProducts[0].image} />
          )}
        </div>
        <div className={cx("name")}>
          <a title="" href="/category/product">
            {data.name} {data.id}
          </a>
        </div>
        <div className={cx("specifications")}>
          {data.specification.map((content: any) => (
            <div key={content.id} className={cx("specification")}>
              {content.specification}
            </div>
          ))}
        </div>
        <div className={cx("description")}>{data.description}</div>
        <br />
        {data.event === null ? (
          <>
            <div className={cx("product-price")}>
              {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
            </div>
          </>
        ) : (
          <>
            <div className={cx("product-price-sale")}>
              <div className={cx("price-sale")}>
                {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
              </div>
              <div className={cx("price-origin")}>
                <s>
                  {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                </s>
              </div>
            </div>
          </>
        )}
        <br />
        <Button primary onClick={handleOpenEditForm}>
          Chỉnh sửa
        </Button>
        <Backdrop sx={{ color: "#fff", zIndex: 9 }} open={open}>
          <div className={cx("add-form")}>
            <form
              action="/upload"
              method="post"
              className={cx("form")}
              onSubmit={(event) => handleSubmit(event, imageProducts)}
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
                  <label htmlFor="description">Chỉnh sửa mô tả sản phẩm:</label>
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
                  <label htmlFor="cost">Chỉnh sửa giá gốc sản phẩm:</label>
                  <input
                    id="cost"
                    type="number"
                    value={cost || 0}
                    className={cx("input-name")}
                    onChange={handleCostChange}
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
                  <label htmlFor="category">Chỉnh sửa danh mục sản phẩm:</label>
                  <select
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
                    {data.imageProducts.map((img: {id:any; image: any }) => (
                      <Image key={img.id} src={img.image} />
                    ))}
                  </div>
                  <br />
                  <label htmlFor="image">Thêm hình ảnh mới:</label>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    multiple
                    name="image"
                    onChange={handleImageUpload}
                  />
                  <br />
                  <label htmlFor="specification">
                    Chỉnh sửa thông số cho sản phẩm:
                  </label>
                  <textarea
                    id="specification"
                    name="specification"
                    value={data.specification.map(
                      (spec: { specification: any }) => spec.specification
                    )}
                    // onChange={handleSpecChange}
                    rows={5}
                  />
                </div>
              </div>
              <Button primary small>
                Xác nhận
              </Button>
            </form>
          </div>
        </Backdrop>
        <br />
        {state === true ? (
          <>
            <Button primary onClick={updateProductStatus}>
              Ẩn sản phẩm
            </Button>
          </>
        ) : (
          <>
            <Button outline onClick={updateProductStatus}>
              Hiện sản phẩm
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductAdminComponent;
