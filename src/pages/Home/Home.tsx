import * as React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import classNames from "classnames/bind";
import Slider from "react-slick";

import "../../../node_modules/slick-carousel/slick/slick.css"; 
import "../../../node_modules/slick-carousel/slick/slick-theme.css";

import styles from './Home.module.scss';
import CategoryComponent from '../../components/CategoryCom/CategoryComponent';
import ProductComponent from '../../components/ProductCom/ProductComponent';

import CategoryService from '../../service/CategoryService';
import ProductService from '../../service/ProductService';
import CartButton from '../../components/CartButton';

const cx = classNames.bind(styles);

let screenWidth = window.innerWidth;
function updateScreenSize() {
  screenWidth = window.innerWidth;
}
updateScreenSize();
window.addEventListener("resize", updateScreenSize);

const Home: React.FC<any> = () => {
    const [categories, setCategories] = useState<{ id: number; name: string; status: boolean }[]>([]);
    const [products, setProducts] = useState<{
        id: string;
        name: string;
        description: string;
        specification: { id: number; specification: string }[];
        imageProducts: { id: number; image: string }[];
        price: number;
        brand: string;
        event: null;
        status: boolean;
        category: string;
        idBrand: number;
        idCategory: number;
        idEvent: number;
    }[]>([]);
    const productsFourElement = products.slice(0, 4);
    const productsThreeElement = products.slice(0, 3);

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
            await Promise.all([
                refetchCategories(),
                refetchProducts()
            ]);
        };
        fetchAllAPIs();
      }, [
          refetchCategories,
          refetchProducts
      ]);
    useEffect(() => {
    if (categoriesData && productsData) {
        setCategories(categoriesData);
        setProducts(productsData);
    }
    }, [
        categoriesData,
        productsData
    ]);

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
            }
          },
          {
            breakpoint: 1099,
            settings: {
              slidesToShow: 8,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 899,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true
            }
          },
          {
            breakpoint: 599,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true
            }
          },
          {
            breakpoint: 280,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true
            }
          }
        ]
    };
    
    return (
        <div className={cx('wrapper')}>
            Danh mục sản phẩm
            <div>
                <Slider {...settings}> 
                    {categories.map((data) => (
                        <CategoryComponent key={data.id} data={data} />
                    ))}
                </Slider>
            </div>        
            {/* <div className={cx('flash-sale')}>

            </div> */}
            <br />
            <div className={cx('hot-sale')}>
                {screenWidth >= 400 ? (
                    <>
                        <h3>SẢN PHẨM BÁN CHẠY</h3>
                    </>
                ): (
                    <>
                        <h5>SẢN PHẨM BÁN CHẠY</h5>
                    </>
                )}
                <br />
                {screenWidth <= 899 && screenWidth >= 600 ? (
                    <>
                        <div className={cx('product')}>
                            {productsThreeElement.map((data) => (
                                <ProductComponent key={data.id} data={data} />
                            ))}
                        </div>
                    </>
                    ) : (
                    <>
                        <div className={cx('product')}>
                            {productsFourElement.map((data) => (
                                <ProductComponent key={data.id} data={data} />
                            ))}
                        </div>
                    </>
                    )
                }
            </div>
            {categories.map((data) => (
                <div className={cx('machine')}>
                    <div className={cx('title-wrapper')}>
                        <div className={cx('title')}>{data.name}</div>
                        <div className={cx('show-all')}>
                            <Link to={`/detailCategory/${data.name}`}>
                                Xem tất cả
                            </Link>
                        </div>
                    </div>
                    {screenWidth <= 899 && screenWidth >= 600 ? (
                        <>
                            <div className={cx('product')}>
                                {products.filter((product) => product.category === data.name).slice(0, 3).map((data) => (
                                    <ProductComponent key={data.id} data={data} />
                                ))}
                            </div>
                        </>
                        ) : (
                        <>
                            <div className={cx('product')}>
                                {products.filter((product) => product.category === data.name).slice(0, 4).map((data) => (
                                    <ProductComponent key={data.id} data={data} />
                                ))}
                            </div>
                        </>
                        )
                    }
                </div>
            ))}
            <CartButton />
        </div>
    )
}

export default Home;
