import * as React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import classNames from "classnames/bind";

import styles from './Home.module.scss';
import BrandComponent from '../../components/BrandCom/BrandComponent';
import CategoryComponent from '../../components/CategoryCom/CategoryComponent';
import ProductComponent from '../../components/ProductCom/ProductComponent';

import BrandService from '../../service/BrandService';
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
    const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
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
    const brandFourElement = brands.slice(0, 4);
    const brandTwoElement = brands.slice(0, 2);
    const categoriesFourElement = categories.slice(0, 4);
    const categoriesTwoElement = categories.slice(0, 2);
    const productsFourElement = products.slice(0, 4);
    const productsThreeElement = products.slice(0, 3);

    const fetchAPIBrands = async () => {
        try {
            const res = await BrandService.GetAllBrand();
            return res.data; 
        } catch (error) {}
    };
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

    const { data: brandsData, refetch: refetchBrands } = useQuery(
        ["brandImages"],
        fetchAPIBrands,
        {}
    );
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
                refetchBrands(), 
                refetchCategories(),
                refetchProducts()
            ]);
        };
        fetchAllAPIs();
      }, [
          refetchBrands, 
          refetchCategories,
          refetchProducts
      ]);
    useEffect(() => {
    if (brandsData && categoriesData && productsData) {
        setBrands(brandsData); 
        setCategories(categoriesData);
        setProducts(productsData);
    }
    }, [
        brandsData, 
        categoriesData,
        productsData
    ]);
    
    return (
        <div className={cx('wrapper')}>
            {screenWidth <= 899 && screenWidth >= 600 ? (
              <>
                {brands ? (
                    <>
                        <div className={cx('brand')}>
                            {brandFourElement.map((brand) => (
                                <BrandComponent key={brand.id} data={brand} />
                            ))}
                        </div>
                    </>
                    ) : (
                    <></>
                    )
                }
              </>
              ) : (
              <>
                {screenWidth <= 599 && screenWidth >= 200 ? (
                    <>
                        {brands ? (
                            <>
                                <div className={cx('brand')}>
                                    {brandTwoElement.map((brand) => (
                                        <BrandComponent key={brand.id} data={brand} />
                                    ))}
                                </div>
                            </>
                            ) : (
                            <></>
                            )
                        }
                    </>
                ): (
                    <>
                        {brands ? (
                            <>
                                <div className={cx('brand')}>
                                    {brands.map((brand) => (
                                        <BrandComponent key={brand.id} data={brand} />
                                    ))}
                                </div>
                            </>
                            ) : (
                            <></>
                            )
                        }
                    </>
                )}
              </>
              )
            }
            <br />
            {screenWidth <= 899 && screenWidth >= 600 ? (
              <>
                Danh mục sản phẩm
                <div className={cx('category')}>
                    {categoriesFourElement.map((data) => (
                        <CategoryComponent key={data.id} data={data} />
                    ))}
                </div>
              </>
              ) : (
              <>
                {screenWidth <= 599 && screenWidth >= 200 ? (
                    <>
                        Danh mục sản phẩm
                        <div className={cx('category')}>
                            {categoriesTwoElement.map((data) => (
                                <CategoryComponent key={data.id} data={data} />
                            ))}
                        </div>
                    </>
                ): (
                    <>
                        Danh mục sản phẩm
                        <div className={cx('category')}>
                            {categories.map((data) => (
                                <CategoryComponent key={data.id} data={data} />
                            ))}
                        </div>
                    </>
                )}
              </>
              )
            }
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

            <div className={cx('machine')}>
                <div className={cx('title-wrapper')}>
                    <div className={cx('title')}>Dụng cụ máy pin</div>
                    <div className={cx('show-all')}>Xem tất cả</div>
                </div>
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
            <div className={cx('machine')}>
                <div className={cx('title-wrapper')}>
                    <div className={cx('title')}>Dụng cụ máy điện</div>
                    <div className={cx('show-all')}>Xem tất cả</div>
                </div>
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
            <div className={cx('machine')}>
                <div className={cx('title-wrapper')}>
                    <div className={cx('title')}>Máy bơm/nén khí</div>
                    <div className={cx('show-all')}>Xem tất cả</div>
                </div>
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
            <div className={cx('machine')}>
                <div className={cx('title-wrapper')}>
                    <div className={cx('title')}>Máy bơm xịt rửa</div>
                    <div className={cx('show-all')}>Xem tất cả</div>
                </div>
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
            <CartButton />
        </div>
    )
}

export default Home;
