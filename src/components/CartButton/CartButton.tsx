import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import styles from "./CartButton.module.scss";
import Button from "../Button";
import { useCart } from "../../Context/CartContext";

const faCartShoppingIcon = faCartShopping as IconProp;

const cx = classNames.bind(styles);

let screenWidth = window.innerWidth;
function updateScreenSize() {
  screenWidth = window.innerWidth;
}
updateScreenSize();
window.addEventListener("resize", updateScreenSize);

const CartButton: React.FC = () => {
  const MySwal = withReactContent(Swal);
  const location = useLocation();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const { cartItems } = useCart();

  useEffect(() => {
    const newTotalQuantity = cartItems.reduce(
      (total, item) => total + item.quantityIsSet,
      0
    );
    setTotalQuantity(newTotalQuantity);
  }, [cartItems]);

  const shouldHideCartUI =
    location.pathname.includes("/admin") ||
    location.pathname.includes("/invoice") ||
    location.pathname.includes("/bill") ||
    location.pathname.includes("/user") ||
    location.pathname.includes("/combo") ||
    location.pathname.includes("/event") ||
    location.pathname.includes("/brand") ||
    location.pathname.includes("/category") ||
    location.pathname.includes("/product") ||
    location.pathname.includes("/management") ||
    location.pathname.includes("/discount") ||
    location.pathname.includes("/editor") ||
    location.pathname.includes("/dashboard") ||
    location.pathname.includes("/login");

  if (shouldHideCartUI) {
    return null;
  }

  const handleRoute = async () => {
    await MySwal.fire({
      title: "Loading...",
      didOpen: () => {
        MySwal.showLoading();
      },
      timer: 1000,
  });

  window.location.href = `/cart`;
  }

  return (
    <div className={cx("wrapper")} onClick={handleRoute}>
      <>
        {screenWidth >= 800 ? (
          <>
            <Button cart="true">
              <FontAwesomeIcon
                icon={faCartShoppingIcon}
                style={{ color: "#fec806", marginRight: "1rem" }}
              />
              Giỏ Hàng ({totalQuantity})
            </Button>
          </>
        ) : (
          <>
            <Button cart="true">
              <FontAwesomeIcon
                icon={faCartShoppingIcon}
                style={{ color: "#fec806", marginRight: "1rem" }}
              />
              ({totalQuantity})
            </Button>
          </>
        )}
      </>
    </div>
  );
};

export default CartButton;
