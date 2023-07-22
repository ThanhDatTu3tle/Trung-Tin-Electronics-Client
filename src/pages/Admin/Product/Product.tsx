import * as React from 'react';
import { useState, useRef  } from 'react';
import classNames from "classnames/bind";
import Backdrop from '@mui/material/Backdrop';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Product.module.scss';
import Button from '../../../components/Button';
import ProductComponent from '../../../components/ProductCom/ProductComponent';

const faHouseIcon = faHouse as IconProp;
const faArrowRightIcon = faArrowRight as IconProp;

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
]

const Product: React.FC<any> = () => {
  const [name, setName] = useState<String | null>(null);
  const [img, setImg] = useState(null);

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const selectBrandRef = useRef(null);
  const selectCategoryRef = useRef(null);

  const [open, setOpen] = useState(false);
  const handleCloseAddForm = () => {
    setOpen(false);
  };
  const handleOpenAddForm = () => {
      setOpen(true);
  };
  
  const handleSelectBrandChange = (event: any) => {
    setSelectedBrand(event.target.value);
  };
  const handleSelectCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const handleAdd = () => {

  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    const file = event.target.files[0];
    if (name === 'name') {
      setName(value);
    } else if (name === 'img') {
      setImg(file);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('left')}>
          <p style={{width: 'fit-content'}}>Sản phẩm</p>
        </div>
        <div className={cx('right')}>
          <div className={cx('current-position')}>
            <FontAwesomeIcon 
                icon={faHouseIcon}
                style={{paddingRight: '1rem'}} 
            />
            <FontAwesomeIcon 
                icon={faArrowRightIcon}
                style={{width: '1rem', height: '1rem', paddingRight: '1rem'}} 
            />
            <p>Sản phẩm</p>
          </div>
          <div className={cx('add-btn')}>
            <Button primary small onClick={handleOpenAddForm}>Thêm sản phẩm</Button>
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
              >
                <div className={cx('add-form')}>
                  <form action="/upload" method="post" className={cx('form')} onSubmit={handleAdd}>
                    <div className={cx('title')}>
                      <p style={{fontSize: '1.5rem', fontWeight: '500'}}>THÊM SẢN PHẨM</p>
                      <button type='button' className={cx('close-btn')} onClick={handleCloseAddForm}>×</button>
                    </div>
                    <div className={cx('inputs')}>
                      <label>Điền tên sản phẩm:</label>
                      <input 
                        type='text' 
                        placeholder='Tên sản phẩm' 
                        className={cx('input-name')}
                        onChange={handleChange}
                      />
                      
                      <label>Chọn hãng sản xuất:</label>
                      <select name="brand" value={selectedBrand} ref={selectBrandRef} className={cx('selector')} onChange={handleSelectBrandChange}>
                        <option className={cx('option-first')} value="" disabled selected id="placeholderBrand">Hãng sản xuất</option>
                        <option className={cx('option')} value="bosch">Bosch</option>
                        <option className={cx('option')} value="total">Total</option>
                        <option className={cx('option')} value="dekton">Dekton</option>
                      </select>

                      <label>Chọn danh mục sản phẩm:</label>
                      <select name="category" value={selectedCategory} ref={selectCategoryRef} className={cx('selector')} onChange={handleSelectCategoryChange}>
                        <option className={cx('option-first')} value="" disabled selected id="placeholderCategory">Danh mục sản phẩm</option>
                        <option className={cx('option')} value="drill">Máy khoan</option>
                        <option className={cx('option')} value="grind">Máy mài</option>
                        <option className={cx('option')} value="cut">Máy cắt</option>
                        <option className={cx('option')} value="battery">Máy pin</option>
                        <option className={cx('option')} value="tool">Đồ nghề</option>
                      </select>

                      <label>Chọn hình ảnh:</label>
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                      />
                    </div>
                    <Button primary small>Xác nhận</Button>
                  </form>   
                </div>
                
              </Backdrop>
          </div>
        </div>
      </div>
      <div className={cx('main-container')}>
        <div className={cx('products')}>
          {products !== null ? (
              <>
                  <div className={cx('product')}>
                      {products.map((data) => (
                          <ProductComponent key={data} data={data} />
                      ))}
                  </div>
              </>
              ) : (
              <></>
              )
          }
        </div>

        <div className={cx('filter')}>

        </div>
      </div>
    </div>
  );
}

export default Product;
