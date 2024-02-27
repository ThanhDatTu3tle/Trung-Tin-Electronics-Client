import * as React from "react";
import classNames from "classnames/bind";

import styles from "./ProductEventChildComponent.module.scss";

import Image from "../Image";

import { useEvent } from "../../Context/EventContext";
import { useProduct } from "../../Context/ProductContext";

const cx = classNames.bind(styles);

const ProductEventChildComponent: React.FC<any> = ({ data }) => {
  const events = useEvent();
  const products = useProduct();
  const productEventIds = events.flatMap((event) =>
    event.detail.map((product) => product.idProduct)
  );
  const foundEvent = events.find((event) =>
    event.detail.some((product) => product.idProduct === data.id)
  );
  const eventName = foundEvent ? foundEvent.event.name : null;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("image")}>
          {products
            .filter((product) => product.id === data.id)
            .map((x) => x.imageProducts) &&
            products
              .filter((product) => product.id === data.id)
              .map((x) => x.imageProducts).length > 0 && (
              <Image
                src={products
                  .filter((product) => product.id === data.id)
                  .map((x) => x.imageProducts)[0]
                  .map((y) => y.image)}
              />
            )}
        </div>
        <div className={cx("content")}>
          <div className={cx("name")}>
            {data.name} {data.id}
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
                <div className={cx("price-sale")}>
                  {data.promotional
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  đ
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
          {data.discount === null ? (
            <></>
          ) : (
            <div className={cx("discount")}>
              <p>Khuyến mãi {data.discount}%</p>
            </div>
          )}
          {productEventIds.includes(data.id) === true ? (
              <div className={cx("combo")}>
                <p>{eventName}</p>
              </div>
            ) : (
              <></>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductEventChildComponent;
