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

const faHouseIcon = faHouse as IconProp;
const faArrowRightIcon = faArrowRight as IconProp;

const cx = classNames.bind(styles);

const Brand: React.FC<any> = () => {
  const [name, setName] = useState<String | null>(null);
  const [img, setImg] = useState(null);

  const [open, setOpen] = useState(false);
  const handleCloseAddForm = () => {
    setOpen(false);
  };
  const handleOpenAddForm = () => {
      setOpen(true);
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
                  <form action="/upload" method="post" className={cx('form')} onSubmit={handleAdd}>
                    <div className={cx('title')}>
                      <p style={{fontSize: '1.5rem', fontWeight: '500'}}>THÊM HÃNG SẢN XUẤT</p>
                      <button type='button' className={cx('close-btn')} onClick={handleCloseAddForm}>×</button>
                    </div>
                    <div className={cx('inputs')}>
                      <label>Điền tên hãng sản xuất:</label>
                      <input 
                        type='text' 
                        placeholder='Tên hãng sản xuất' 
                        className={cx('input-name')}
                        onChange={handleChange}
                      />
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

        </div>

        <div className={cx('filter')}>

        </div>
      </div>
    </div>
  );
}

export default Brand;
