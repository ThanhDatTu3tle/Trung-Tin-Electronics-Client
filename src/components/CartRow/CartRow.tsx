import React from "react";
import { useState } from "react";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import styles from "./CartRow.module.scss";
import Button from "../Button";
import { useCart } from "../../Context/CartContext";

const faTrashCanIcon = faTrashCan as IconProp;

const cx = classNames.bind(styles);

const CartRow: React.FC<any> = ({ data, onDeleteProduct }) => {
  const handleDeleteProductClick = () => {
    onDeleteProduct(data.id);
  };
  const { updateCartItemQuantity } = useCart();
  const [count, setCount] = useState(data.quantityIsSet);

  const handleMinus = (productId: string, currentCount: number) => {
    if (currentCount > 1) {
      setCount(currentCount - 1);
      updateCartItemQuantity(productId, currentCount - 1);
    } 
  };

  const handleAdd = (productId: string, currentCount: number) => {
    if (currentCount < data.quantity) {
      setCount(currentCount + 1);
      updateCartItemQuantity(productId, currentCount + 1);
    } 
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("image")}>
          <img className={cx("img")} src={data.imageProducts[0].image} alt="" />
        </div>
        <div className={cx("name")}>
          {data.name} {data.id}
        </div>
        <div className={cx("small-title")}>
          {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
        </div>

        <div className={cx("count")}>
          <Button primary tiny onClick={() => handleMinus(data.id, count)}>
            -
          </Button>
          {count}
          <Button primary tiny onClick={() => handleAdd(data.id, count)}>
            +
          </Button>
        </div>

        <div className={cx("small-title")}>
          {(data.price * count)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          đ
        </div>
        <div className={cx("small-title")}>
          <Button onClick={handleDeleteProductClick}>
            <FontAwesomeIcon icon={faTrashCanIcon} className={cx("icon")} />
          </Button>
        </div>
      </div>
      <div className={cx("line")}></div>
    </div>
  );
};

export default CartRow;
