import * as React from "react";
import { useState, useEffect } from "react";
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
import { useEvent } from "../../../Context/EventContext";
import ProductService from "../../../service/ProductService";

import EventComponent from "../../../components/EventCom/EventComponent";
import ProductEventComponent from "../../../components/ProductEventCom/ProductEventComponent";
import Clock from "../../../components/Clock";
import Button from "../../../components/Button";
import Image from "../../../components/Image";

import { axiosClient } from "../../../axios";

const cx = classNames.bind(styles);

const Event: React.FC<any> = () => {
  const MySwal = withReactContent(Swal);

  const [open, setOpen] = useState(false);
  // const handleCloseAddForm = () => setOpen(false);
  const handleOpenAddForm = () => {
    const swalContainer = document.querySelector(
      ".swal2-container"
    ) as HTMLElement;
    if (swalContainer) {
      swalContainer.style.zIndex = "99999";
    }
    setOpen(true);
  };

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  // const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [eventChosens, setEventChosens] = useState<
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

  const brands = useBrand();
  const categories = useCategory();
  const filteredProductsResult = useProduct();
  const events = useEvent();

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

  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  // const [sumPriceProductsChosen, setSumPriceProductsChosen] = useState(0);
  const eventProductChosen = JSON.parse(localStorage.getItem("event") || "[]");

  useEffect(() => {    
    const fetchProductDetails = async (productId: string) => {
      try {
        const res = await ProductService.GetProduct(productId);
        return res.data;
      } catch (error) {
        return null;
      }
    };

    const fetchAllProductDetails = async () => {
      const productDetails = await Promise.all(
        eventProductChosen.map(async (productId: string) => {
          const productDetail = await fetchProductDetails(productId);
          if (productDetail) {
            return {
              ...productDetail,
            };
          }
          return null;
        })
      );

      const updatedEventChosens = productDetails.filter(
        (chosenProduct) => chosenProduct !== null
      );

      setEventChosens(updatedEventChosens);
      // setComboChosenIds(comboChosens.id);
      setIsLoadingProducts(false);
      // setSumPriceProductsChosen(updatedEventChosens.reduce((accumulator, currentProduct) => {
      //   return accumulator + currentProduct.price;
      // }, 0));
    }

    if (isLoadingProducts) {
      fetchAllProductDetails();
    }
  }, [isLoadingProducts, eventProductChosen]);

  const handleCloseAddForm = () => {
    localStorage.removeItem('event');
    if (eventProductChosen.length > 0) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    setOpen(false);
  }

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
  // const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const priceValue = Number(event.target.value);
  //   setPrice(priceValue);
  // };
  const handlePercentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const percentValue = Number(event.target.value);
    setDiscount(percentValue);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", imageUrl);
    formData.append("cost", '0');
    formData.append("price", '0');
    formData.append("discount", discount.toString());
    eventChosens.forEach((eventChosen, index) => {
      formData.append(`product[${index}].idProduct`, eventChosen.id);
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axiosClient.post("event/create", formData, config);
      MySwal.fire({
        title: "Thêm thành công!",
        icon: "success",
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 1500,
      });
      localStorage.removeItem('event');
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

  const handleConfirmEvent = () => {
    MySwal.fire({
      title: "Khởi tạo sự kiện giảm giá thành công!",
      icon: "success",
      didOpen: () => {
        MySwal.showLoading();
      },
      timer: 1500,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

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
              Thêm sự kiện 
            </Button>
            <Backdrop sx={{ color: "#fff", zIndex: 9 }} open={open}>
              <div className={cx("add-form")}>
                <div className={cx("product-chosen")}>
                  <p style={{ fontSize: "1.5rem", fontWeight: "500", paddingBottom: '1rem' }}>
                    SẢN PHẨM ĐƯỢC CHỌN
                  </p>
                  <div className={cx("products")}>
                    {eventChosens.map((eventChosen) => (
                      <ProductEventComponent
                        key={eventChosen.id}
                        data={eventChosen}
                      />
                    ))}
                  </div>
                </div>
                <form
                  action="/upload"
                  method="post"
                  className={cx("form")}
                  onSubmit={(event) => handleSubmit(event)}
                >
                  <div className={cx("title")}>
                    <p style={{ fontSize: "1.5rem", fontWeight: "500" }}>
                      THÔNG TIN SỰ KIỆN GIẢM GIÁ
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
                    <label>Điền tên sự kiện:</label>
                    <input
                      type="text"
                      placeholder="Tên sự kiện"
                      className={cx("input-name")}
                      onChange={handleNameChange}
                    />
                    <label htmlFor="image">Chọn hình ảnh sự kiện:</label>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={handleImageUpload}
                    />
                    <div className={cx("show-image")}>
                      <Image src={imageUrl} />
                    </div>                   
                    <div className={cx("percent")}>
                      <label>Phần trăm giảm giá:</label>
                      <input
                        type="number"
                        placeholder="Phần trăm giảm giá"
                        className={cx("input-name")}
                        onChange={handlePercentChange}
                      />
                    </div> 

                  </div>
                  <Button primary small>
                    Xác nhận
                  </Button>
                </form>
              </div>
            </Backdrop>
          </div>
          <div className={cx("confirm-btn")}>
            <Button outline small onClick={handleConfirmEvent}>
              Xác nhận
            </Button>
          </div>
        </div>
      </div>
      <div className={cx("main-container")}>
        <div className={cx("products")}>
          <div className={cx("machine-combo")}>
            <div className={cx("title-wrapper")}>
              <div className={cx("title")}>Sự kiện giảm giá</div>
              {events.map((data) => (
                <EventComponent data={data} />
              ))}
            </div>
          </div>
          {category0 === true ? (
            <>
              {categories.map((dataa) => (
                <div className={cx("machine")} key={dataa.id}>
                  <div className={cx("title-wrapper")}>
                    <div className={cx("title")}>{dataa.name}</div>
                  </div>
                  <div className={cx("product")}>
                    {filteredProductsResult
                      .filter((data) => data.category.name === dataa.name && data.status === true && data.discount !== null)
                      .map((data) => (
                        <ProductEventComponent key={data.id} data={data} />
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
                      .filter((data) => data.category.name === dataa && data.status === true && data.discount !== null)
                      .map((data) => (
                        <ProductEventComponent key={data.id} data={data} />
                      ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className={cx("filter")}>
          <h3>Bộ lọc</h3>
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
