import * as React from 'react';
import { useState } from 'react';
import classNames from "classnames/bind";
import Backdrop from '@mui/material/Backdrop';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Brand.module.scss';
import Button from '../../../components/Button';
import axiosClient from '../../../axios';
import axios from 'axios';

const faHouseIcon = faHouse as IconProp;
const faArrowRightIcon = faArrowRight as IconProp;

const cx = classNames.bind(styles);

// interface ImageValues {
//   image: File | null;
// }

const Brand: React.FC<any> = () => {
  const [open, setOpen] = useState(false);
  const handleCloseAddForm = () => setOpen(false);
  const handleOpenAddForm = () => setOpen(true);

  const [selectedName, setSelectedName] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedName(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('name', selectedName);
    // formData.append('image', selectedImage);
    
    if (selectedImage) {
      formData.append('image', selectedImage);
    }
  
    try {
      const response = await axiosClient.post('brand/create', formData);
      console.log('Response from server:', response);
  
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('left')}>
          <p style={{width: 'fit-content'}}>Hãng sản xuất</p>
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
            <p>Hãng sản xuất</p>
          </div>
          <div className={cx('add-btn')}>
            <Button primary small onClick={handleOpenAddForm}>Thêm hãng</Button>
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
              >
                <div className={cx('add-form')}>
                  <form action="/upload" method="post" className={cx('form')} onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className={cx('title')}>
                      <p style={{fontSize: '1.5rem', fontWeight: '500'}}>THÊM HÃNG SẢN XUẤT</p>
                      <button type='button' className={cx('close-btn')} onClick={handleCloseAddForm}>×</button>
                    </div>
                    <div className={cx('inputs')}>
                      <label>Điền tên hãng sản xuất:</label>
                      <input 
                        id="name"
                        type='text' 
                        name="name"
                        placeholder='Tên hãng sản xuất' 
                        className={cx('input-name')}
                        value={selectedName}
                        onChange={handleNameChange}
                      />
                      <label>Chọn hình ảnh:</label>
                      <input 
                        id="image" 
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                      />
                    </div>
                    <button>Xác nhận</button>
                  </form>   
                </div>
                
              </Backdrop>
          </div>
        </div>
      </div>
      <div className={cx('main-container')}>
        <div className={cx('products')}>

        </div>

        <div className={cx('filter')}>

        </div>
      </div>
    </div>
  );
}

export default Brand;
