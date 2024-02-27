import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";

import styles from "./Cart.module.scss";
import CartRow from "../../components/CartRow";
import ProductService from "../../service/ProductService";
import Button from "../../components/Button";
import { axiosClient } from "../../axios";
import { useCart } from "../../Context/CartContext";

import provincesData from "../../assets/data/provinces_vietnam.json";

interface Ward {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
}

interface District {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  short_codename: string;
  wards: Ward[];
}

interface Province {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  phone_code: number;
  districts: District[];
}

const cx = classNames.bind(styles);

let screenWidth = window.innerWidth;
function updateScreenSize() {
  screenWidth = window.innerWidth;
}
updateScreenSize();
window.addEventListener("resize", updateScreenSize);

const Cart: React.FC<any> = () => {
  const MySwal = withReactContent(Swal);
  const history = useNavigate();
  const { cartItems } = useCart();
  const status = false;
  const confirm = false;
  const emptyData: {
    fullName?: string;
    phoneNumber?: string;
    email?: string;
    selectedProvince?: string;
    selectedDistrict?: string;
    selectedWard?: string;
    address?: string;
    selectedOption?: string;
  } = {};
  const [errors, setErrors] = useState(emptyData);
  const [errorsVisibleFullName, setErrorsVisibleFullName] = useState(true);
  const [errorsVisiblePhoneNumber, setErrorsVisiblePhoneNumber] =
    useState(true);
  const [errorsVisibleEmail, setErrorsVisibleEmail] = useState(true);
  const [errorsVisibleProvinces, setErrorsVisibleProvinces] = useState(true);
  const [errorsVisibleDistricts, setErrorsVisibleDistricts] = useState(true);
  const [errorsVisibleWards, setErrorsVisibleWards] = useState(true);
  const [errorsVisibleAddress, setErrorsVisibleAddress] = useState(true);
  const [errorsVisibleMethodPayment, setErrorsVisibleMethodPayment] =
    useState(true);

  const [products, setProducts] = useState<
    {
      quantityIsSet: number;
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

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const cartData = JSON.parse(localStorage.getItem("cart") || "[]");

  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [address, setAddress] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<number>(0);
  const [selectedProvince, setSelectedProvince] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
    if (errors.fullName && event.target.value.trim() !== "") {
      setErrorsVisibleFullName(false);
    }
  };
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
    if (errors.phoneNumber && event.target.value.trim() !== "") {
      setErrorsVisiblePhoneNumber(false);
    }
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (errors.email && event.target.value.trim() !== "") {
      setErrorsVisibleEmail(false);
    }
  };

  useEffect(() => {
    setProvinces(provincesData);
  }, []);
  const handleProvinceChange = (event: { target: { value: any } }) => {
    const selectedProvinceCode = Number(event.target.value);
    setSelectedProvince(selectedProvinceCode);

    const selectedProvinceData = provinces.find(
      (province) => province.code === selectedProvinceCode
    );
    if (selectedProvinceData) {
      setDistricts(selectedProvinceData.districts);
      setWards([]);
    }

    setErrorsVisibleProvinces(false);
  };

  const handleDistrictChange = (event: { target: { value: any } }) => {
    const selectedDistrictCode = Number(event.target.value);
    setSelectedDistrict(selectedDistrictCode);

    const selectedDistrictData = districts.find(
      (district) => district.code === selectedDistrictCode
    );
    if (selectedDistrictData) {
      setWards(selectedDistrictData.wards);
    }

    setErrorsVisibleDistricts(false);
  };
  const handleWardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWard(event.target.value);
    setErrorsVisibleWards(false);
  };
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
    setErrorsVisibleAddress(false);
  };
  const handleContentChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setContent(event.target.value);
  };
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    setErrorsVisibleMethodPayment(false);
  };

  if (cartData.length === 0) {
    history("/");
  }

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
        cartData.map(
          async (cartItem: { productId: string; quantityIsSet: number }) => {
            const productDetail = await fetchProductDetails(cartItem.productId);
            if (productDetail) {
              return {
                ...productDetail,
                quantityIsSet: cartItem.quantityIsSet,
              };
            }
            return null;
          }
        )
      );

      setProducts(productDetails.filter((product) => product !== null));
      setIsLoadingProducts(false);
    };

    if (isLoadingProducts) {
      fetchAllProductDetails();
    }
  }, [cartData, isLoadingProducts]);

  useEffect(() => {
    const newTotalPrice = products.reduce((total, product) => {
      const cartItem = cartItems.find((item) => item.productId === product.id);
      if (cartItem) {
        return (
          total +
          (product.promotional !== null ? product.promotional : product.price) *
            cartItem.quantityIsSet
        );
      }

      return total;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [cartItems, products]);

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);

    const updatedCartData = cartData.filter(
      (item: { productId: string }) => item.productId !== productId
    );
    localStorage.setItem("cart", JSON.stringify(updatedCartData));
    window.location.reload();

    setIsLoadingProducts(true);

    if (updatedProducts.length === 0) {
      history("/");
      window.location.reload();
    }
  };

  const validateForm = (formData: {
    fullName: string;
    phoneNumber: string;
    email: string;
    selectedProvince: number;
    selectedDistrict: number;
    selectedWard: string;
    address: string;
    selectedOption: string;
  }) => {
    const newErrors: { [key: string]: string } = {};
    const phoneNumberRegex = /^[0-9]+$/;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!formData.fullName) {
      newErrors.fullName = "Vui lòng cung cấp họ và tên";
    } else {
      newErrors.fullName = "";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Vui lòng cung cấp số điện thoại";
    } else if (!phoneNumberRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Số điện thoại phải là một dãy số";
    } else {
      newErrors.phoneNumber = "";
    }

    if (!formData.email) {
      newErrors.email = "Vui lòng cung cấp email";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    } else {
      newErrors.email = "";
    }

    if (!formData.selectedProvince) {
      newErrors.selectedProvince = "Vui lòng chọn tỉnh/thành phố";
    } else {
      newErrors.selectedProvince = "";
    }

    if (!formData.selectedDistrict) {
      newErrors.selectedDistrict = "Vui lòng chọn quận/huyện";
    } else {
      newErrors.selectedDistrict = "";
    }

    if (!formData.selectedWard) {
      newErrors.selectedWard = "Vui lòng chọn phường/xã";
    } else {
      newErrors.selectedWard = "";
    }

    if (!formData.address) {
      newErrors.address = "Địa chỉ không được để trống";
    } else {
      newErrors.address = "";
    }

    if (!formData.selectedOption) {
      newErrors.selectedOption = "Vui lòng chọn hình thức thanh toán";
    } else {
      newErrors.selectedOption = "";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateForm({
      fullName,
      phoneNumber,
      email,
      selectedProvince,
      selectedDistrict,
      selectedWard,
      address,
      selectedOption,
    });

    if (isValid) {
      const formData = new FormData();
      const addressRaw = `
              ${address} 
              ${
                wards.find((ward) => ward.code === Number(selectedWard))
                  ?.name || ""
              } 
              ${
                districts.find(
                  (district) => district.code === Number(selectedDistrict)
                )?.name || ""
              } 
              ${
                provinces.find(
                  (province) => province.code === Number(selectedProvince)
                )?.name || ""
              }
          `;
      const lines = addressRaw.split("\n").filter((line) => line.trim() !== "");
      const completeAddress = lines.map((line) => line.trim()).join(" ");
      formData.append("customerName", fullName);
      formData.append("phone", phoneNumber);
      formData.append("email", email);
      formData.append("address", completeAddress);
      formData.append("content", content);
      formData.append("status", status.toString());
      formData.append("confirm", confirm.toString());
      products.forEach((product, index) => {
        if (product.quantityIsSet <= product.quantity) {
          formData.append(`invoiceDetail[${index}].idProduct`, product.id);
          formData.append(
            `invoiceDetail[${index}].number`,
            product.quantityIsSet.toString()
          );
        }
      });
      formData.append("total", totalPrice.toString());
      formData.append("payment", selectedOption);

      try {
        await axiosClient.post("invoice/create", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        await MySwal.fire({
          title: "Đặt hàng thành công!",
          icon: "success",
          didOpen: () => {
            MySwal.showLoading();
          },
          timer: 2000,
        });

        await localStorage.removeItem("cart");
        window.location.href = "/";
      } catch (error) {
        await MySwal.fire({
          title: "Đặt hàng thành công!",
          icon: "success",
          didOpen: () => {
            MySwal.showLoading();
          },
          timer: 2000,
        });

        await localStorage.removeItem("cart");
        window.location.href = "/";
      }
    }
  };

  // const startPollingForNewOrders = () => {
  //   const pollingInterval = setInterval(async () => {
  //       try {
  //           // Gửi yêu cầu kiểm tra có đơn hàng mới từ server
  //           const response = await axios.get("/api/orders");

  //           // Xử lý dữ liệu đơn hàng mới từ server
  //           console.log("Dữ liệu đơn hàng mới:", response.data);

  //           // Dừng Polling khi nhận được dữ liệu mới
  //           clearInterval(pollingInterval);
  //       } catch (error) {
  //           console.error("Lỗi khi kiểm tra đơn hàng mới:", error);
  //       }
  //   }, 5000); // Polling sau mỗi 5 giây
  // };

  return (
    <div className={cx("wrapper")}>
      <h3>GIỎ HÀNG</h3>
      <br />
      <div className={cx("table")}>
        <div className={cx("titles")}>
          {screenWidth >= 599 ? (
            <>
              <div className={cx("image")}>Hình ảnh</div>
            </>
          ) : (
            <></>
          )}
          <div className={cx("name")}>Tên sản phẩm</div>
          <div className={cx("small-title")}>Giá tiền</div>
          <div className={cx("count")}>Số lượng</div>
          <div className={cx("small-title")}>Tổng</div>
          <div className={cx("small-title")}>Xóa</div>
        </div>

        <div className={cx("information")}>
          {products.map((product) => (
            <CartRow
              key={product.id}
              data={product}
              onDeleteProduct={handleDeleteProduct}
            />
          ))}
        </div>
      </div>
      <div className={cx("result")}>
        <p className={cx("price")}>
          Tổng giá trị đơn hàng:{" "}
          <b>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</b>
        </p>
      </div>
      <br />
      <div className={cx("add-form")}>
        <form
          action="/upload"
          method="post"
          onSubmit={(event) => handleOrder(event)}
        >
          <p className={cx("big-title")}>THÔNG TIN KHÁCH HÀNG</p>
          <div className={cx("inputs")}>
            <input
              id="customer_name"
              type="text"
              placeholder="Họ và tên"
              className={cx("input")}
              value={fullName}
              onChange={handleFullNameChange}
            />
            {errors.fullName && errorsVisibleFullName && (
              <p className={cx("error")}>{errors.fullName}</p>
            )}
            <input
              id="phone"
              type="text"
              placeholder="Số điện thoại"
              className={cx("input")}
              value={phoneNumber}
              onChange={handlePhoneChange}
            />
            {errors.phoneNumber && errorsVisiblePhoneNumber && (
              <p className={cx("error")}>{errors.phoneNumber}</p>
            )}
            <input
              id="email"
              type="text"
              placeholder="Email"
              className={cx("input")}
              value={email}
              onChange={handleEmailChange}
            />
            {errors.email && errorsVisibleEmail && (
              <p className={cx("error")}>{errors.email}</p>
            )}
            <select
              name="province"
              className={cx("input")}
              onChange={handleProvinceChange}
            >
              <option value="">Chọn tỉnh/thành phố</option>
              {provinces.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>
            {errors.selectedProvince && errorsVisibleProvinces && (
              <p className={cx("error")}>{errors.selectedProvince}</p>
            )}
            <select
              name="district"
              className={cx("input")}
              onChange={handleDistrictChange}
            >
              <option value="">Chọn quận/huyện</option>
              {districts.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
            </select>
            {errors.selectedDistrict && errorsVisibleDistricts && (
              <p className={cx("error")}>{errors.selectedDistrict}</p>
            )}
            <select
              name="ward"
              className={cx("input")}
              onChange={handleWardChange}
            >
              <option value="">Chọn phường/xã</option>
              {wards.map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>
            {errors.selectedWard && errorsVisibleWards && (
              <p className={cx("error")}>{errors.selectedWard}</p>
            )}
            <input
              id="address"
              type="text"
              placeholder="Địa chỉ"
              className={cx("input")}
              value={address}
              onChange={handleAddressChange}
              required
            />
            {errors.address && errorsVisibleAddress && (
              <p className={cx("error")}>{errors.address}</p>
            )}
            <label htmlFor="content" className={cx("big-title")}>
              Nội dung:
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={handleContentChange}
              rows={3}
            />
          </div>
          <br />
          <p className={cx("big-title")}>HÌNH THỨC GIAO DỊCH</p>
          <div className={cx("payments")}>
            <div>
              <input
                id="transfer"
                type="radio"
                className={cx("payment")}
                value="transfer"
                checked={selectedOption === "transfer"}
                onChange={handleOptionChange}
              />
              <label htmlFor="transfer" className={cx("title-transfer")}>
                Thanh toán qua chuyển khoản
              </label>
            </div>
            <div>
              <input
                id="cash"
                type="radio"
                className={cx("payment")}
                value="cash"
                checked={selectedOption === "cash"}
                onChange={handleOptionChange}
              />
              <label htmlFor="cash" className={cx("title-cash")}>
                Thanh toán khi nhận hàng
              </label>
            </div>
          </div>
          {errors.selectedOption && errorsVisibleMethodPayment && (
            <p className={cx("error")}>Vui lòng chọn hình thức thanh toán</p>
          )}
        </form>
        <div className={cx("buttons")}>
          <div className={cx("confirm")}>
            <Button primary onClick={handleOrder}>
              Tiến hành đặt hàng
            </Button>
          </div>

          <div className={cx("continue")}>
            <Link to={`/`}>
              <Button outline>Chọn thêm sản phẩm khác</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
