import * as React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import classNames from "classnames/bind";

import styles from './Home.module.scss';
import BrandComponent from '../../components/BrandCom/BrandComponent';
import CategoryComponent from '../../components/CategoryCom/CategoryComponent';
import ProductComponent from '../../components/ProductCom/ProductComponent';
import BrandService from '../../service/BrandService';

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
      'id_event': null,
      'id_brand': 3,
      'id_category': 1
    },
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
      'id_event': null,
      'id_brand': 3,
      'id_category': 1
    },
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
      'id_event': null,
      'id_brand': 3,
      'id_category': 1
    },
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
      'id_event': null,
      'id_brand': 3,
      'id_category': 1
    }
];
const productsFourElement = products.slice(0, 4);
const productsThreeElement = products.slice(0, 3);

const categories = [
    {
        'id': '1',
        'name': 'Máy khoan',
        'img': 'https://storethietbi.com/upload/product/dung-cu-may-pin-4476_55x50.png',
    },
    {
        'id': '2',
        'name': 'Máy cắt',
        'img': 'https://storethietbi.com/upload/product/dung-cu-may-pin-4476_55x50.png',
    },
    {
        'id': '3',
        'name': 'Máy mài',
        'img': 'https://storethietbi.com/upload/product/dung-cu-may-pin-4476_55x50.png',
    },
    {
        'id': '4',
        'name': 'Máy pin',
        'img': 'https://storethietbi.com/upload/product/dung-cu-may-pin-4476_55x50.png',
    },
    {
        'id': '5',
        'name': 'Máy điện',
        'img': 'https://storethietbi.com/upload/product/dung-cu-may-pin-4476_55x50.png',
    },
    {
        'id': '6',
        'name': 'Máy xịt rửa',
        'img': 'https://storethietbi.com/upload/product/dung-cu-may-pin-4476_55x50.png',
    },
    {
        'id': '7',
        'name': 'Thiết bị đo',
        'img': 'https://storethietbi.com/upload/product/dung-cu-may-pin-4476_55x50.png',
    },
    {
        'id': '8',
        'name': 'Đồ bảo hộ',
        'img': 'https://storethietbi.com/upload/product/dung-cu-may-pin-4476_55x50.png',
    },
];
const categoriesFourElement = categories.slice(0, 4);
const categoriesTwoElement = categories.slice(0, 2);

let screenWidth = window.innerWidth;

function updateScreenSize() {
  screenWidth = window.innerWidth;
}

updateScreenSize();

window.addEventListener("resize", updateScreenSize);

interface BrandImage {
    // id: number;
    name: string;
    // image: File | null;
}

const Home: React.FC<any> = ({ children }) => {
    const [brandImages, setBrandImages] = useState<BrandImage[]>([]);
    const fetchAPIBrandImages = async () => {
        try {
            const res = await BrandService.GetAllBrand();
            // console.log(res.data);
            return res.data; 
        } catch (error) {
  
        }
    };

    const { data, refetch } = useQuery(
        ["brandImages"],
        fetchAPIBrandImages,
        {}
    );
    // console.log(brandImages);

    useEffect(() => {
        const timer = setTimeout(() => {
            refetch()
        }, 1000)
        setBrandImages(data);

        return() => {
            clearTimeout(timer);
        }
    }, [data, refetch]);
    

    return (
        <div className={cx('wrapper')}>
            {brandImages !== undefined ? (
              <>
                  <div className={cx('brand')}>
                    {brandImages.map((data) => (
                        <BrandComponent ngu={data} />
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
                    {categoriesFourElement.map((data) => (
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
                                <CategoryComponent key={data} data={data} />
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
                                <ProductComponent key={data} data={data} />
                            ))}
                        </div>
                    </>
                    ) : (
                    <>
                        <div className={cx('product')}>
                            {productsFourElement.map((data) => (
                                <ProductComponent key={data} data={data} />
                            ))}
                        </div>
                    </>
                    )
                }
            </div>

            <div className={cx('machine')}>
                <div className={cx('title')}>
                    <p>Các loại máy khoan</p>
                </div>
                {screenWidth <= 899 && screenWidth >= 600 ? (
                    <>
                        <div className={cx('product')}>
                            {productsThreeElement.map((data) => (
                                <ProductComponent key={data} data={data} />
                            ))}
                        </div>
                    </>
                    ) : (
                    <>
                        <div className={cx('product')}>
                            {productsFourElement.map((data) => (
                                <ProductComponent key={data} data={data} />
                            ))}
                        </div>
                    </>
                    )
                }
            </div>
            <div className={cx('machine')}>
                <div className={cx('title')}>
                    <p>Các loại máy cắt</p>
                </div>
                {screenWidth <= 899 && screenWidth >= 600 ? (
                    <>
                        <div className={cx('product')}>
                            {productsThreeElement.map((data) => (
                                <ProductComponent key={data} data={data} />
                            ))}
                        </div>
                    </>
                    ) : (
                    <>
                        <div className={cx('product')}>
                            {productsFourElement.map((data) => (
                                <ProductComponent key={data} data={data} />
                            ))}
                        </div>
                    </>
                    )
                }
            </div>
            <div className={cx('machine')}>
                <div className={cx('title')}>
                    <p>Các loại máy mài</p>
                </div>
                {screenWidth <= 899 && screenWidth >= 600 ? (
                    <>
                        <div className={cx('product')}>
                            {productsThreeElement.map((data) => (
                                <ProductComponent key={data} data={data} />
                            ))}
                        </div>
                    </>
                    ) : (
                    <>
                        <div className={cx('product')}>
                            {productsFourElement.map((data) => (
                                <ProductComponent key={data} data={data} />
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
