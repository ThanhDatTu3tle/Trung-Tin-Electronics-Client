import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";
import Slider from "react-slick";

import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

import styles from "./Home.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

import { useCategory } from "../../Context/CategoryContext";
import { useProduct } from "../../Context/ProductContext";
import CartButton from "../../components/CartButton";
import { useCombo } from "../../Context/ComboContext";
import { useEvent } from "../../Context/EventContext";

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
const ComboComHome = React.lazy(() => import("../../components/ComboComHome"));
const EventComHome = React.lazy(() => import("../../components/EventComHome"));

const Home: React.FC<any> = () => {
  const MySwal = withReactContent(Swal);
  const history = useNavigate();

  const categories = useCategory();
  const products = useProduct();
  const combos = useCombo();
  const events = useEvent();

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1099,
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
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1099,
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

  const settingsCombos = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1099,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 913,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 599,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const handleLinkToCateogry = async (dataa: any) => {
    await MySwal.fire({
      title: "Đang tải...",
      didOpen: () => {
        MySwal.showLoading();
      },
      timer: 1000,
    });
    history(`/detailCategory/${dataa.name}`);
    window.location.reload();
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("combos-events")}>
        <div className={cx("menu-categories")}>
          {categories.map((data) => (
            <div className={cx("category-item")} onClick={(dataa) => handleLinkToCateogry(data)}>
              {data.name}
              <div className={cx("arrow")}>
                <FontAwesomeIcon
                  icon={faCaretRight}
                  style={{ marginRight: "0.5rem" }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={cx("combos")}>
          <Slider {...settingsCombos}>
            {combos
              .filter((data) => data.combo.status === true)
              .map((data) => (
                <React.Suspense fallback="" key={data.combo.id}>
                  <ComboComHome data={data.combo} />
                </React.Suspense>
              ))}
          </Slider>
        </div>
        <div className={cx("events")}>
          {events
            .filter((data) => data.event.status === true)
            .map((data) => (
              <React.Suspense fallback="" key={data.event.id}>
                <EventComHome data={data.event} />
              </React.Suspense>
            ))}
        </div>
      </div>
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
