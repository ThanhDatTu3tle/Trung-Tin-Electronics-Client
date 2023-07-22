import * as React from 'react';
import classNames from "classnames/bind";

import styles from './Home.module.scss';
import BrandComponent from '../../components/BrandCom/BrandComponent';
import CategoryComponent from '../../components/CategoryCom/CategoryComponent';
import ProductComponent from '../../components/ProductCom/ProductComponent';

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

const brands = [
    {
        'id': '1',
        'name': 'BOSCH',
        'img': 'https://storethietbi.com/upload/product/bosch-2330_180x100.png',
    },
    {
        'id': '2',
        'name': 'TOTAL',
        'img': 'https://storethietbi.com/upload/product/total-9397_180x100.png',
    },
    {
        'id': '3',
        'name': 'DEKTON',
        'img': 'https://storethietbi.com/upload/product/dekton-9804_180x100.png',
    }
];

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
        'id': '',
        'name': 'Máy mài',
        'img': 'https://storethietbi.com/upload/product/dung-cu-may-pin-4476_55x50.png',
    },
];

const Home: React.FC<any> = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            {brands !== null ? (
              <>
                  <div className={cx('brand')}>
                      {brands.map((data) => (
                          <BrandComponent key={data} data={data} />
                      ))}
                  </div>
              </>
              ) : (
              <></>
              )
            }
            <br />
            {categories !== null ? (
              <>
                Danh mục sản phẩm
                <div className={cx('category')}>
                    {categories.map((data) => (
                        <CategoryComponent key={data} data={data} />
                    ))}
                </div>
              </>
              ) : (
              <></>
              )
            }
            {/* <div className={cx('flash-sale')}>

            </div> */}
            <br />
            <div className={cx('hot-sale')}>
                <h2>SẢN PHẨM BÁN CHẠY</h2>
                <br />
                {productsFourElement !== null ? (
                    <>
                        <div className={cx('product')}>
                            {productsFourElement.map((data) => (
                                <ProductComponent key={data} data={data} />
                            ))}
                        </div>
                    </>
                    ) : (
                    <></>
                    )
                }
            </div>

            <div className={cx('machine')}>
                <div className={cx('title')}>
                    <p>Các loại máy khoan</p>
                </div>
                {productsFourElement !== null ? (
                    <>
                        <div className={cx('product')}>
                            {productsFourElement.map((data) => (
                                <ProductComponent key={data} data={data} />
                            ))}
                        </div>
                    </>
                    ) : (
                    <></>
                    )
                }
            </div>
            <div className={cx('machine')}>
                <div className={cx('title')}>
                    <p>Các loại máy cắt</p>
                </div>
                {productsFourElement !== null ? (
                    <>
                        <div className={cx('product')}>
                            {productsFourElement.map((data) => (
                                <ProductComponent key={data} data={data} />
                            ))}
                        </div>
                    </>
                    ) : (
                    <></>
                    )
                }
            </div>
            <div className={cx('machine')}>
                <div className={cx('title')}>
                    <p>Các loại máy mài</p>
                </div>
                {productsFourElement !== null ? (
                    <>
                        <div className={cx('product')}>
                            {productsFourElement.map((data) => (
                                <ProductComponent key={data} data={data} />
                            ))}
                        </div>
                    </>
                    ) : (
                    <></>
                    )
                }
            </div>
        </div>
    )
}

export default Home;
