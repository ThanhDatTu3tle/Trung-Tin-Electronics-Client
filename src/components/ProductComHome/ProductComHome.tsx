import * as React from "react";
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import styles from "./ProductComHome.module.scss";
import Button from "../Button";

import { useCombo } from "../../Context/ComboContext";

const faCartShoppingIcon = faCartShopping as IconProp;

const cx = classNames.bind(styles);

const ProductComHome: React.FC<any> = ({ data }) => {
  const combos = useCombo();
  const productComboIds = combos.flatMap((combo) =>
    combo.detail.map((product) => product.idProduct)
  );
  const foundCombo = combos.find((combo) =>
    combo.detail.some((product) => product.idProduct === data.id)
  );
  const comboName = foundCombo ? foundCombo.combo.name : null;

  const MySwal = withReactContent(Swal);

  const handleClick = async () => {
    if (!localStorage.getItem("seen")) {
      localStorage.setItem("seen", JSON.stringify([]));
    }

    const seenProducts = JSON.parse(localStorage.getItem("seen") || "[]");
    if (!seenProducts.includes(data.id)) {
      seenProducts.push(data.id);
      localStorage.setItem("seen", JSON.stringify(seenProducts));
    }

    await MySwal.fire({
      title: "Đang tải...",
      didOpen: () => {
        MySwal.showLoading();
      },
      timer: 1000,
    });

    window.location.href = `/detailProduct/${data.id}`;
  };

  const handleClickCombo = async () => {
    await MySwal.fire({
      title: "Đang tải...",
      didOpen: () => {
        MySwal.showLoading();
      },
      timer: 1000,
    });

    window.location.href = `/detailProduct/${comboName}`;
  };

  return (
    <div className={cx("wrapper")}>
      {productComboIds.includes(data.id) === true ? (
        <div className={cx("inner")}>
          <div className={cx("image")} onClick={handleClick}>
            {data.imageProducts && data.imageProducts.length > 0 && (
              <LazyLoadImage
                src={data.imageProducts[0].image}
                effect="blur"
                width="100%"
                height="auto"
              />
            )}
          </div>
          <div className={cx("combo")} onClick={handleClickCombo}>
            <p>{comboName}</p>
          </div>
          <div className={cx("name")} onClick={handleClick}>
            <p>
              {data.name} {data.id}
            </p>
          </div>
          <div className={cx("specifications")}>
            {data.specification.slice(0, 3).map((content: any) => (
              <div key={content.id} className={cx("specification")}>
                {content.specification}
              </div>
            ))}
          </div>
          <div className={cx("product-price")}>
            {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
          </div>
          <Button primary className={cx("btn")} onClick={handleClick}>
            <FontAwesomeIcon
              icon={faCartShoppingIcon}
              style={{
                color: "#fff",
                marginRight: "1rem",
                fontSize: "1rem",
              }}
            />
            Đặt hàng
          </Button>
        </div>
      ) : (
        <div className={cx("inner")}>
          <div className={cx("image")} onClick={handleClick}>
            {data.imageProducts && data.imageProducts.length > 0 && (
              <LazyLoadImage
                src={data.imageProducts[0].image}
                effect="blur"
                width="100%"
                height="auto"
              />
            )}
          </div>
          {data.discount === null ? (
            <></>
          ) : (
            <div className={cx("discount")} onClick={handleClickCombo}>
              <p>Khuyến mãi {data.discount}%</p>
            </div>
          )}
          <div className={cx("name")} onClick={handleClick}>
            <p>
              {data.name} {data.id}
            </p>
          </div>
          <div className={cx("specifications")}>
            {data.specification.slice(0, 3).map((content: any) => (
              <div key={content.id} className={cx("specification")}>
                {content.specification}
              </div>
            ))}
          </div>
          {data.promotional === null ? (
            <>
              <div className={cx("product-price")}>
                {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
              </div>
            </>
          ) : (
            <>
              <div className={cx("product-price-sale")}>
                <div className={cx("price-origin")}>
                  <s>
                    {data.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    đ
                  </s>
                </div>
                <div className={cx("price-sale")}>
                  {data.promotional
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  đ
                </div>
              </div>
            </>
          )}
          <Button primary className={cx("btn")} onClick={handleClick}>
            <FontAwesomeIcon
              icon={faCartShoppingIcon}
              style={{
                color: "#fff",
                marginRight: "1rem",
                fontSize: "1rem",
              }}
            />
            Đặt hàng
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductComHome;
