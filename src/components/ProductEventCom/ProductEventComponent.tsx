import * as React from "react";
import { useState } from "react";
import classNames from "classnames/bind";

import styles from "./ProductEventComponent.module.scss";

import Image from "../Image";

import { useEvent } from "../../Context/EventContext";

const cx = classNames.bind(styles);

const ProductEventComponent: React.FC<any> = ({ data }) => {
  const events = useEvent();
  const productEventIds = events.flatMap((event) =>
    event.detail.map((product) => product.idProduct)
  );
  const foundEvent = events.find((event) =>
    event.detail.some((product) => product.idProduct === data.id)
  );
  const eventName = foundEvent ? foundEvent.event.name : null;

  const [active, setActive] = useState(false);

  const handleActive = () => {
    if (active === false) {
      setActive(true);
      if (!localStorage.getItem("event")) {
        localStorage.setItem("event", JSON.stringify([]));
      }

      const eventProducts = JSON.parse(localStorage.getItem("event") || "[]");
      if (!eventProducts.includes(data.id)) {
        eventProducts.push(data.id);
        localStorage.setItem("event", JSON.stringify(eventProducts));
      }
    } else {
      setActive(false);
      if (localStorage.getItem("event")) {
        const eventProducts = JSON.parse(localStorage.getItem("event") || "[]");
        const index = eventProducts.indexOf(data.id);
        if (index !== -1) {
          eventProducts.splice(index, 1);
          localStorage.setItem("event", JSON.stringify(eventProducts));
        }
      }
    }
  };

  return (
    <div className={cx("wrapper")} onClick={handleActive}>
      {productEventIds.includes(data.id) === true && active === false ? (
        <div className={cx("inner")}>
          <div className={cx("image")}>
            {data.imageProducts && data.imageProducts.length > 0 && (
              <Image src={data.imageProducts[0].image} />
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
      ) : (
        <>
          {active === false ? (
            <div className={cx("inner")}>
              <div className={cx("image")}>
                {data.imageProducts && data.imageProducts.length > 0 && (
                  <Image src={data.imageProducts[0].image} />
                )}
              </div>
              <div className={cx("content")}>
                <div className={cx("name")}>
                  {data.name} {data.id}
                </div>
                {data.promotional === null ? (
                  <>
                    <div className={cx("product-price")}>
                      {data.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      đ
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
          ) : (
            <div className={cx("inner-active")}>
              <div className={cx("image")}>
                {data.imageProducts && data.imageProducts.length > 0 && (
                  <Image src={data.imageProducts[0].image} />
                )}
              </div>
              <div className={cx("content")}>
                <div className={cx("name")}>
                  {data.name} {data.id}
                </div>
                {data.promotional === null ? (
                  <>
                    <div className={cx("product-price")}>
                      {data.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      đ
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
          )}
        </>
      )}
    </div>
  );
};

export default ProductEventComponent;
