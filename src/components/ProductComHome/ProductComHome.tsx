import * as React from "react";
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import styles from "./ProductComHome.module.scss";
import Image from "../Image";
import Button from "../Button";

const faCartShoppingIcon = faCartShopping as IconProp;

const cx = classNames.bind(styles);

const ProductComHome: React.FC<any> = ({ data }) => {
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
        title: "Loading...",
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 1000,
    });

    window.location.href = `/detailProduct/${data.id}`;
  };

  return (
    <div className={cx(`wrapper`)} onClick={handleClick}>
        <div className={cx("inner")}>
          {data.imageProducts && data.imageProducts.length > 0 && (
            <LazyLoadImage src={data.imageProducts[0].image} effect="blur" width="100%" />
          )}
          <div className={cx("name")}>
            <p>
              {data.name} {data.id}
            </p>
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
                    {data.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    đ
                  </s>
                </div>
              </div>
            </>
          )}
          <br />
          <Button primary className={cx("btn")}>
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
      
    </div>
  );
};

export default ProductComHome;
