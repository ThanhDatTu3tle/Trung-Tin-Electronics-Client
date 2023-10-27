import * as React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import Slider from "react-slick";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "sweetalert2/dist/sweetalert2.min.css";

import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

import styles from "./Home.module.scss";
import CategoryComponent from "../../components/CategoryCom/CategoryComponent";
import ProductComponent from "../../components/ProductCom/ProductComponent";
import ProductComHome from "../../components/ProductComHome";

import CategoryService from "../../service/CategoryService";
import ProductService from "../../service/ProductService";
import CartButton from "../../components/CartButton";

const cx = classNames.bind(styles);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let screenWidth = window.innerWidth;
function updateScreenSize() {
  screenWidth = window.innerWidth;
}
updateScreenSize();
window.addEventListener("resize", updateScreenSize);

const Home: React.FC<any> = () => {
  const MySwal = withReactContent(Swal);
  const [categories, setCategories] = useState<
    { id: number; name: string; status: boolean }[]
  >([]);
  const [products, setProducts] = useState<
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
      category: { id: number; name: string; image: string; status: boolean };
      idBrand: number;
      idCategory: number;
      idEvent: number;
    }[]
  >([]);

  const fetchAPICategories = async () => {
    try {
      const res = await CategoryService.GetAllCategory();
      return res.data;
    } catch (error) {}
  };
  const fetchAPIProducts = async () => {
    try {
      const res = await ProductService.GetAllProduct();
      return res.data;
    } catch (error) {}
  };

  const { data: categoriesData, refetch: refetchCategories } = useQuery(
    ["categoryImages"],
    fetchAPICategories,
    {}
  );
  const { data: productsData, refetch: refetchProducts } = useQuery(
    ["productImages"],
    fetchAPIProducts,
    {}
  );

  useEffect(() => {
    const fetchAllAPIs = async () => {
      await MySwal.fire({
        title: "Loading...",
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 1000,
      });
      await Promise.all([refetchCategories(), refetchProducts()]);
    };
    fetchAllAPIs();
  }, [refetchCategories, refetchProducts]);
  useEffect(() => {
    if (categoriesData && productsData) {
      setCategories(categoriesData);
      setProducts(productsData);
    }
  }, [categoriesData, productsData]);

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
            <CategoryComponent key={data.id} data={data} />
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
                <ProductComHome key={data.id} data={data} />
              ))}
          </Slider>
        </div>
      ))}
      <CartButton />
    </div>
  );
};

export default Home;
