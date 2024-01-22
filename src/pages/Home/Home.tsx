import * as React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import Slider from "react-slick";

import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

import styles from "./Home.module.scss";

import { useCategory } from "../../Context/CategoryContext";
import { useProduct } from "../../Context/ProductContext";
import CartButton from "../../components/CartButton";

const cx = classNames.bind(styles);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let screenWidth = window.innerWidth;
function updateScreenSize() {
  screenWidth = window.innerWidth;
}
updateScreenSize();
window.addEventListener("resize", updateScreenSize);

const CategoryComponent = React.lazy(
  () => import("../../components/CategoryCom")
);
const ProductComHome = React.lazy(
  () => import("../../components/ProductComHome")
);

const Home: React.FC<any> = () => {
  const categories = useCategory();
  const products = useProduct();

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 913,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 599,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const settingsPauseOnHover = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          pauseOnHover: true,
        },
      },
      {
        breakpoint: 913,
        settings: {
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          pauseOnHover: true,
        },
      },
      {
        breakpoint: 599,
        settings: {
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          pauseOnHover: true,
        },
      },
      {
        breakpoint: 280,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          pauseOnHover: true,
        },
      },
    ],
  };

  return (
    <div className={cx("wrapper")}>
      Danh mục sản phẩm
      <div>
        <Slider {...settings}>
          {categories.map((data) => (
            <React.Suspense fallback="" key={data.id}>
              <CategoryComponent data={data} />
            </React.Suspense>
          ))}
        </Slider>
      </div>
      {categories.map((data) => (
        <div key={data.id}>
          <div className={cx("title-wrapper")}>
            <div className={cx("title")}>{data.name}</div>
            <div className={cx("show-all")}>
              <Link to={`/detailCategory/${data.name}`}>Xem tất cả</Link>
            </div>
          </div>
          <Slider {...settingsPauseOnHover}>
            {products
              .filter(
                (product) =>
                  product.category.name === data.name && product.status === true
              )
              .map((data) => (
                <React.Suspense fallback="" key={data.id}>
                  <ProductComHome data={data} />
                </React.Suspense>
              ))}
          </Slider>
        </div>
      ))}
      <CartButton />
    </div>
  );
};

export default Home;
