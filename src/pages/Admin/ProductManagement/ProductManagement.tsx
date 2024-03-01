import * as React from "react";
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";
import Backdrop from "@mui/material/Backdrop";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faArrowRight,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./ProductManagement.module.scss";
import Button from "../../../components/Button";
import ProductManagementRow from "../../../components/ProductManagementRow";

import { axiosClient } from "../../../axios";
import ProductService from "../../../service/ProductService";
import { useBrand } from "../../../Context/BrandContext";
import { useCategory } from "../../../Context/CategoryContext";
import { useProduct } from "../../../Context/ProductContext";
import Clock from "../../../components/Clock";

const cx = classNames.bind(styles);

// eslint-disable-next-line @typescript-eslint/no-redeclare
const ProductManagement: React.FC<any> = () => {
  const MySwal = withReactContent(Swal);
  const categories = useCategory();
  const products = useProduct();
  const brands = useBrand();

  const [searchKeyword, setSearchKeyword] = useState("");

  // Thêm state cho bộ lọc
  const [statusFilter, setStatusFilter] = useState("all");
  const [quantityFilter, setQuantityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");

  const handleQuantityFilterChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setQuantityFilter(event.target.value);
  };
  const handleCategoryFilterChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCategoryFilter(event.target.value);
  };
  const handleBrandFilterChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setBrandFilter(event.target.value);
  };

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

  const [statusProduct, setStatusProduct] = useState("all");

  const [filteredProductsResult, setFilteredProductsResult] = useState<
    {
      id: string;
      name: string;
      description: string;
      specification: { id: number; specification: string }[];
      imageProducts: { id: number; image: string }[];
      price: number;
      quantity: number;
      brand: { id: number; name: string; image: string };
      event: null;
      status: boolean;
      discount: number;
      promotional: number;
      cost: number;
      category: { id: number; name: string; image: string; status: boolean };
      idBrand: number;
      idCategory: number;
      idEvent: number;
    }[]
  >([]);
  const [initialProducts, setInitialProducts] = useState<
    {
      id: string;
      name: string;
      description: string;
      specification: { id: number; specification: string }[];
      imageProducts: { id: number; image: string }[];
      price: number;
      quantity: number;
      brand: { id: number; name: string; image: string };
      event: null;
      status: boolean;
      discount: number;
      promotional: number;
      cost: number;
      category: { id: number; name: string; image: string; status: boolean };
      idBrand: number;
      idCategory: number;
      idEvent: number;
    }[]
  >([]);

  const handleStatusAllProduct = () => {
    let filteredProducts = [...initialProducts];
    setFilteredProductsResult(filteredProducts);
    setStatusProduct("all");
  };
  const handleStatusPublishedProduct = () => {
    let filteredProducts = [...initialProducts];
    filteredProducts = filteredProducts.filter(
      (product) => product.status === (statusFilter === "all")
    );
    setFilteredProductsResult(filteredProducts);
    setStatusProduct("published");
  };
  const handleStatusHidedProduct = () => {
    let filteredProducts = [...initialProducts];
    filteredProducts = filteredProducts.filter(
      (product) => product.status === (statusFilter === "hided")
    );
    setFilteredProductsResult(filteredProducts);
    setStatusProduct("hided");
  };

  useEffect(() => {
    // Thực hiện tìm kiếm và cập nhật danh sách sản phẩm hiển thị ngay lập tức
    const filteredProducts = initialProducts.filter(
      (product) =>
        product.name.includes(searchKeyword) ||
        product.id.includes(searchKeyword)
    );
    setFilteredProductsResult(filteredProducts);
  }, [initialProducts, searchKeyword]);

  // Lấy danh sách sản phẩm ban đầu và lưu vào initialProducts
  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        const res = await ProductService.GetAllProduct();
        const initialProductData = res.data;

        setInitialProducts(initialProductData);

        setFilteredProductsResult(initialProductData);
      } catch (error) {}
    };

    fetchInitialProducts();
  }, []);

  // Hàm áp dụng bộ lọc
  const applyFilters = () => {
    // Bắt đầu từ danh sách sản phẩm ban đầu
    let filteredProducts = [...initialProducts];

    // Áp dụng bộ lọc hàng tồn sản phẩm
    console.log(quantityFilter)
    if (quantityFilter === "true") {
      filteredProducts = filteredProducts.filter(
        (product) => product.quantity > 0
      );
    } else if (quantityFilter === "false") {
      filteredProducts = filteredProducts.filter(
        (product) => product.quantity === null
      );
    }

    // Áp dụng bộ lọc danh mục sản phẩm
    if (categoryFilter !== "") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category.name === categoryFilter
      );
    }

    // Áp dụng bộ lọc hãng sản xuất
    if (brandFilter !== "") {
      filteredProducts = filteredProducts.filter(
        (product) => product.brand.name === brandFilter
      );
    }

    // Cập nhật danh sách sản phẩm hiển thị
    setFilteredProductsResult(filteredProducts);
  };

  // Hàm gỡ bỏ tất cả bộ lọc
  const clearFilters = () => {
    setStatusFilter("all");
    setCategoryFilter("");
    setBrandFilter("");

    setFilteredProductsResult(initialProducts);
  };

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSelectBrandChange = (event: any) => {
    setSelectedBrand(event.target.value);
  };
  const handleSelectCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [cost, setCost] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [specification, setSpecification] = useState<string[]>([]);

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
  const handleCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const costValue = Number(event.target.value);
    setCost(costValue);
  }
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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    images: File[]
  ) => {
    event.preventDefault();

    try {
      const { uploadedImages } = await upload(images);
      const validImages = uploadedImages.filter(
        (link): link is string => link !== null
      );
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
      formData.append("cost", cost.toString());
      formData.append("idBrand", selectedBrandData.id.toString());
      formData.append("idCategory", selectedCategoryData.id.toString());
      // console.log("validImages: ", validImages);
      validImages.forEach((image, index) => {
        formData.append(`imageProducts[${index}].image`, image);
      });
      specification.forEach((specItem, index) => {
        formData.append(`specification[${index}]`, specItem);
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      axiosClient.post("product/create", formData, config);
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
          <p style={{ width: "fit-content", fontWeight: 700 }}>
            QUẢN LÝ SẢN PHẨM
          </p>
        </div>
        <div className={cx("right")}>
          <div className={cx("current-position")}>
            <Clock />
            <FontAwesomeIcon icon={faHouse} style={{ paddingRight: "1rem" }} />
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ width: "1rem", height: "1rem", paddingRight: "0.5rem" }}
            />
            <p>Sản phẩm</p>
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{
                width: "1rem",
                height: "1rem",
                paddingRight: "0.5rem",
                paddingLeft: "0.5rem",
              }}
            />
            <p>Quản lý sản phẩm</p>
          </div>
        </div>
      </div>
      <div className={cx("main-container")}>
        <div className={cx("all-products-info")}>
          <b>Sản phẩm:</b>
          {statusProduct === "all" ? (
            <>
              <p
                style={{
                  marginLeft: "1rem",
                  color: "#018ec3",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
                onClick={handleStatusAllProduct}
              >
                Tất cả sản phẩm ({products.length}) |{" "}
              </p>
              <p
                style={{ marginLeft: "1rem", color: "#000", cursor: "pointer" }}
                onClick={handleStatusPublishedProduct}
              >
                Sản phẩm đang được bày bán (
                {products.filter((data) => data.status === true).length}) |{" "}
              </p>
              <p
                style={{ marginLeft: "1rem", color: "#000", cursor: "pointer" }}
                onClick={handleStatusHidedProduct}
              >
                Sản phẩm đang được ẩn đi (
                {products.filter((data) => data.status === false).length})
              </p>
            </>
          ) : (
            <>
              {statusProduct === "published" ? (
                <>
                  <p
                    style={{
                      marginLeft: "1rem",
                      color: "#000",
                      cursor: "pointer",
                    }}
                    onClick={handleStatusAllProduct}
                  >
                    Tất cả sản phẩm ({products.length}) |{" "}
                  </p>
                  <p
                    style={{
                      marginLeft: "1rem",
                      color: "#018ec3",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                    onClick={handleStatusPublishedProduct}
                  >
                    Sản phẩm đang được bày bán (
                    {products.filter((data) => data.status === true).length}) |{" "}
                  </p>
                  <p
                    style={{
                      marginLeft: "1rem",
                      color: "#000",
                      cursor: "pointer",
                    }}
                    onClick={handleStatusHidedProduct}
                  >
                    Sản phẩm đang được ẩn đi (
                    {products.filter((data) => data.status === false).length})
                  </p>
                </>
              ) : (
                <>
                  <p
                    style={{
                      marginLeft: "1rem",
                      color: "#000",
                      cursor: "pointer",
                    }}
                    onClick={handleStatusAllProduct}
                  >
                    Tất cả sản phẩm ({products.length}) |{" "}
                  </p>
                  <p
                    style={{
                      marginLeft: "1rem",
                      color: "#000",
                      cursor: "pointer",
                    }}
                    onClick={handleStatusPublishedProduct}
                  >
                    Sản phẩm đang được bày bán (
                    {products.filter((data) => data.status === true).length}) |{" "}
                  </p>
                  <p
                    style={{
                      marginLeft: "1rem",
                      color: "#018ec3",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                    onClick={handleStatusHidedProduct}
                  >
                    Sản phẩm đang được ẩn đi (
                    {products.filter((data) => data.status === false).length})
                  </p>
                </>
              )}
            </>
          )}
        </div>
        <br />
        <div className={cx("add-btn")}>
          <Button primary small onClick={handleOpenAddForm}>
            Thêm sản phẩm
          </Button>
          <Backdrop sx={{ color: "#fff", zIndex: 9 }} open={open}>
            <div className={cx("add-form")}>
              <form
                action="/upload"
                method="post"
                className={cx("form")}
                onSubmit={(event) => handleSubmit(event, images)}
              >
                <div className={cx("title")}>
                  <p style={{ fontSize: "1.5rem", fontWeight: "500" }}>
                    THÊM SẢN PHẨM
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
                  <label htmlFor="id">Điền mã sản phẩm:</label>
                  <input
                    id="id"
                    type="text"
                    placeholder="Mã sản phẩm"
                    className={cx("input-name")}
                    onChange={handleIdChange}
                  />
                  <label htmlFor="name">Điền tên sản phẩm:</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Tên sản phẩm"
                    className={cx("input-name")}
                    onChange={handleNameChange}
                  />
                  <label htmlFor="description">Mô tả sản phẩm:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    rows={3}
                  />
                  <label htmlFor="price">Giá tiền sản phẩm:</label>
                  <input
                    id="price"
                    type="number"
                    placeholder="Giá tiền sản phẩm"
                    className={cx("input-name")}
                    onChange={handlePriceChange}
                  />
                  <label htmlFor="price">Giá gốc sản phẩm:</label>
                  <input
                    id="cost"
                    type="number"
                    placeholder="Giá gốc sản phẩm"
                    className={cx("input-name")}
                    onChange={handleCostChange}
                  />
                  <label htmlFor="brand">Chọn hãng sản xuất:</label>
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
                  <label htmlFor="category">Chọn danh mục sản phẩm:</label>
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
                  <label htmlFor="image">Chọn hình ảnh:</label>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    multiple
                    name="image"
                    onChange={handleImageUpload}
                  />
                  {/* <div className={cx('show-image')}>
                        {filteredProductsResult.imageProducts.map((img: { image: any; }) => (
                          <Image src={img.image}/>
                        ))}
                      </div>
                  <br /> */}
                  <label htmlFor="specification">
                    Thêm thông số cho sản phẩm:
                  </label>
                  <textarea
                    id="specification"
                    name="specification"
                    value={specification}
                    onChange={handleSpecChange}
                    rows={3}
                  />
                </div>
                <Button primary small>
                  Xác nhận
                </Button>
              </form>
            </div>
          </Backdrop>
          <div className={cx("search-bar")}>
            <input
              id="search"
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              className={cx("input-name")}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
        </div>
        <div className={cx("filters")}>
          <select
            id="stock"
            name="stock"
            className={cx("selector")}
            value={quantityFilter}
            onChange={handleQuantityFilterChange}
          >
            <option className={cx("option-first")} value="all" disabled>
              Trạng thái hàng tồn
            </option>
            <option value="true">Còn hàng</option>
            <option value="false">Hết hàng</option>
          </select>

          <select
            id="category"
            name="category"
            value={categoryFilter}
            className={cx("selector")}
            onChange={handleCategoryFilterChange}
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

          <select
            id="brand"
            name="brand"
            value={brandFilter}
            className={cx("selector")}
            onChange={handleBrandFilterChange}
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

          <div className={cx("btns-filters")}>
            <Button primary small onClick={applyFilters}>
              Áp dụng
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ width: "1rem", height: "1rem", paddingLeft: "0.5rem" }}
              />
            </Button>
            <Button outline small onClick={clearFilters}>
              Gỡ bỏ
            </Button>
          </div>
        </div>
        <div className={cx("table")}>
          <div className={cx("titles")}>
            <div className={cx("image")}>Hình ảnh</div>
            <div className={cx("name")}>Tên sản phẩm</div>
            <div className={cx("id")}>Mã sản phẩm</div>
            <div className={cx("category")}>Danh mục</div>
            <div className={cx("brand")}>Hãng sản xuất</div>
            <div className={cx("price")}>Giá tiền</div>
            <div className={cx("stock")}>Hàng hóa</div>
            <div className={cx("status")}>Trạng thái</div>
            <div className={cx("date")}>Chỉnh sửa gần nhất</div>
            <div className={cx("edit")}>Chỉnh sửa</div>
          </div>
          <div className={cx("information")}>
            {filteredProductsResult.map((filteredProductResult) => (
              <ProductManagementRow
                key={filteredProductResult.id}
                data={filteredProductResult}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
