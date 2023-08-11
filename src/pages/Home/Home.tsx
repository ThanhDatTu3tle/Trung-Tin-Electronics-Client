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

const cx = classNames.bind(styles);

const products = [
    {
      'id': 'M21-KB1385PRO',
      'name': 'Máy Khoan 3 Chức Năng Dekton',
      'img': 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-li913798joy418',
      'price': 1190000,
      'description': 'Máy Khoan 3 Chức Năng Dekton / M21-KB1385PRO / Trang Bị Anti KickBack - ECO TURBO / Chân Pin Makita Phổ Thông',
      'specification': [
        'Motor Brushless',
        'Điện Áp : 18-21V / Chân Pin Makita Phổ Thông',
        '3 Chức Năng / 20 Cấp Trượt / 2 Cấp Nhông',
        'ECO  : Cấp Nhông 1 /380RPM - Cấp Nhông 2 /480RPM',
        'Turbo : Cấp Nhông 1 /1700RPM - Cấp Nhông 2 /2000RPM',
        'Tính Năng On/Off Anti KickBack Chủ Động',
        'Tính Năng On/Off ECO - Turbo',
        'Tính Năng Chủ Động Đèn Chiếu Sáng Liên Tục 20 Phút.',
      ],
      'status': true,
      'id_event': '50%',
      'id_brand': 3,
      'id_category': 1
    },
    {
      'id': 'M22-KB1385PRO',
      'name': 'Máy Khoan 3 Chức Năng Dekton',
      'img': 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-li913798joy418',
      'price': 1190000,
      'description': 'Máy Khoan 3 Chức Năng Dekton / M21-KB1385PRO / Trang Bị Anti KickBack - ECO TURBO / Chân Pin Makita Phổ Thông',
      'specification': [
        'Motor Brushless',
        'Điện Áp : 18-21V / Chân Pin Makita Phổ Thông',
        '3 Chức Năng / 20 Cấp Trượt / 2 Cấp Nhông',
        'ECO  : Cấp Nhông 1 /380RPM - Cấp Nhông 2 /480RPM',
        'Turbo : Cấp Nhông 1 /1700RPM - Cấp Nhông 2 /2000RPM',
        'Tính Năng On/Off Anti KickBack Chủ Động',
        'Tính Năng On/Off ECO - Turbo',
        'Tính Năng Chủ Động Đèn Chiếu Sáng Liên Tục 20 Phút.',
      ],
      'status': true,
      'id_event': null,
      'id_brand': 3,
      'id_category': 1
    },
    {
      'id': 'M23-KB1385PRO',
      'name': 'Máy Khoan 3 Chức Năng Dekton',
      'img': 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-li913798joy418',
      'price': 1190000,
      'description': 'Máy Khoan 3 Chức Năng Dekton / M21-KB1385PRO / Trang Bị Anti KickBack - ECO TURBO / Chân Pin Makita Phổ Thông',
      'specification': [
        'Motor Brushless',
        'Điện Áp : 18-21V / Chân Pin Makita Phổ Thông',
        '3 Chức Năng / 20 Cấp Trượt / 2 Cấp Nhông',
        'ECO  : Cấp Nhông 1 /380RPM - Cấp Nhông 2 /480RPM',
        'Turbo : Cấp Nhông 1 /1700RPM - Cấp Nhông 2 /2000RPM',
        'Tính Năng On/Off Anti KickBack Chủ Động',
        'Tính Năng On/Off ECO - Turbo',
        'Tính Năng Chủ Động Đèn Chiếu Sáng Liên Tục 20 Phút.',
      ],
      'status': true,
      'id_event': null,
      'id_brand': 3,
      'id_category': 1
    },
    {
      'id': 'M24-KB1385PRO',
      'name': 'Máy Khoan 3 Chức Năng Dekton',
      'img': 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-li913798joy418',
      'price': 1190000,
      'description': 'Máy Khoan 3 Chức Năng Dekton / M21-KB1385PRO / Trang Bị Anti KickBack - ECO TURBO / Chân Pin Makita Phổ Thông',
      'specification': [
        'Motor Brushless',
        'Điện Áp : 18-21V / Chân Pin Makita Phổ Thông',
        '3 Chức Năng / 20 Cấp Trượt / 2 Cấp Nhông',
        'ECO  : Cấp Nhông 1 /380RPM - Cấp Nhông 2 /480RPM',
        'Turbo : Cấp Nhông 1 /1700RPM - Cấp Nhông 2 /2000RPM',
        'Tính Năng On/Off Anti KickBack Chủ Động',
        'Tính Năng On/Off ECO - Turbo',
        'Tính Năng Chủ Động Đèn Chiếu Sáng Liên Tục 20 Phút.',
      ],
      'status': true,
      'id_event': null,
      'id_brand': 3,
      'id_category': 1
    },
    {
      'id': 'M25-KB1385PRO',
      'name': 'Máy Khoan 3 Chức Năng Dekton',
      'img': 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-li913798joy418',
      'price': 1190000,
      'description': 'Máy Khoan 3 Chức Năng Dekton / M21-KB1385PRO / Trang Bị Anti KickBack - ECO TURBO / Chân Pin Makita Phổ Thông',
      'specification': [
        'Motor Brushless',
        'Điện Áp : 18-21V / Chân Pin Makita Phổ Thông',
        '3 Chức Năng / 20 Cấp Trượt / 2 Cấp Nhông',
        'ECO  : Cấp Nhông 1 /380RPM - Cấp Nhông 2 /480RPM',
        'Turbo : Cấp Nhông 1 /1700RPM - Cấp Nhông 2 /2000RPM',
        'Tính Năng On/Off Anti KickBack Chủ Động',
        'Tính Năng On/Off ECO - Turbo',
        'Tính Năng Chủ Động Đèn Chiếu Sáng Liên Tục 20 Phút.',
      ],
      'status': true,
      'id_event': null,
      'id_brand': 3,
      'id_category': 1
    }
];
const productsFourElement = products.slice(0, 4);
const productsThreeElement = products.slice(0, 3);

// const categories = [
//     {
//         'id': '1',
//         'name': 'Máy khoan',
//         'img': 'https://storethietbi.com/upload/product/dung-cu-may-pin-4476_55x50.png',
//     },
//     {
//         'id': '2',
//         'name': 'Máy cắt',
//         'img': 'https://storethietbi.com/upload/product/dung-cu-may-pin-4476_55x50.png',
//     },
//     {
//         'id': '3',
//         'name': 'Máy mài',
//         'img': 'https://storethietbi.com/upload/product/dung-cu-may-pin-4476_55x50.png',
//     },
//     {
//         'id': '4',
//         'name': 'Máy pin',
//         'img': 'https://storethietbi.com/upload/product/dung-cu-may-pin-4476_55x50.png',
//     },
//     {
//         'id': '5',
//         'name': 'Máy điện',
//         'img': 'https://storethietbi.com/upload/product/dung-cu-may-pin-4476_55x50.png',
//     },
//     {
//         'id': '6',
//         'name': 'Máy xịt rửa',
//         'img': 'https://storethietbi.com/upload/product/dung-cu-may-pin-4476_55x50.png',
//     },
//     {
//         'id': '7',
//         'name': 'Thiết bị đo',
//         'img': 'https://storethietbi.com/upload/product/dung-cu-may-pin-4476_55x50.png',
//     },
//     {
//         'id': '8',
//         'name': 'Đồ bảo hộ',
//         'img': 'https://storethietbi.com/upload/product/dung-cu-may-pin-4476_55x50.png',
//     },
// ];
// const categoriesFourElement = categories.slice(0, 4);
// const categoriesTwoElement = categories.slice(0, 2);

let screenWidth = window.innerWidth;
function updateScreenSize() {
  screenWidth = window.innerWidth;
}
updateScreenSize();
window.addEventListener("resize", updateScreenSize);

interface Brand {
    id: number;
    name: string;
    image: string;
}

interface Category {
    id: number;
    name: string;
    image: string;
  }

const Home: React.FC<any> = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

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

    useEffect(() => {
        const fetchAllAPIs = async () => {
            await Promise.all([
                refetchBrands(), 
                refetchCategories()
            ]);
        };
        fetchAllAPIs();
    }, [
        refetchBrands, 
        refetchCategories
    ]);
    useEffect(() => {
        if (brandsData && categoriesData) {
            setBrands(brandsData); 
            setCategories(categoriesData);
        }
    }, [
        brandsData, 
        categoriesData
    ]);
    
    return (
        <div className={cx('wrapper')}>
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
            <br />
            {screenWidth <= 700 && screenWidth >= 501 ? (
              <>
                Danh mục sản phẩm
                <div className={cx('category')}>
                    {categories.map((data) => (
                        <CategoryComponent key={data.id} data={data} />
                    ))}
                </div>
              </>
              ) : (
              <>
                {screenWidth <= 500 && screenWidth >= 200 ? (
                    <>
                        Danh mục sản phẩm
                        <div className={cx('category')}>
                            {categories.map((data) => (
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
                    <div className={cx('title')}>Các loại máy khoan</div>
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
                    <div className={cx('title')}>Các loại máy cắt</div>
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
                    <div className={cx('title')}>Các loại máy mài</div>
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
        </div>
    )
}

export default Home;
