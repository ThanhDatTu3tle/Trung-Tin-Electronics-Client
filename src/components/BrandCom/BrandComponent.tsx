import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import 'sweetalert2/dist/sweetalert2.min.css';
import Backdrop from '@mui/material/Backdrop';

import styles from './BrandComponent.module.scss';
import ImageBrand from '../ImageBrand';
import Image from '../Image';
import Button from '../Button';
import { axiosClient } from '../../axios';

const cx = classNames.bind(styles);

const BrandComponent: React.FC<any> = ({ data }) => {
  const currentPath = window.location.pathname;

  const MySwal = withReactContent(Swal);
  const idBrand = data.id;

  const [open, setOpen] = useState(false);
  const handleCloseAddForm = () => setOpen(false);
  const handleOpenAddForm = () => {
    const swalContainer = document.querySelector('.swal2-container') as HTMLElement;
    if (swalContainer) {
      swalContainer.style.zIndex = '99999';
    }

    setOpen(true);
  };
  const handleDeleteForm = () => {
    // console.log("Cook");
  }

  const [name, setName] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');

  const linkRef = React.useRef<HTMLAnchorElement>(null);

  const upload = (file: File) => {
    if (!file || !file.type.match(/image.*/)) return;
  
    MySwal.fire({
      title: 'Đang tải ảnh lên...',
      allowOutsideClick: false,
      didOpen: () => {
        const popup = MySwal.getPopup();
        if (popup) {
          popup.style.zIndex = "9999"; 
        }
        MySwal.showLoading();
      },
      timer: 2000,
    });
  
    const fd = new FormData();
    fd.append('image', file);
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.imgur.com/3/image.json');
    xhr.onload = function () {
      const link = JSON.parse(xhr.responseText).data.link;
      if (linkRef.current) {
        linkRef.current.href = link;
        linkRef.current.innerHTML = link;
      }
  
      MySwal.close();
      setImageUrl(link);
    };
    xhr.setRequestHeader('Authorization', 'Client-ID 983c8532c49a20e');
    xhr.send(fd);
  };
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      upload(file);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('id', idBrand);
    formData.append('name', name);
    formData.append('image', imageUrl);
  
    try {
      axiosClient.put(`brand/edit/${idBrand}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      MySwal.fire({
        title: "Chỉnh sửa thành công!",
        icon: "success",
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 2000,
      });
      setOpen(false);
    } catch (error) {
      MySwal.fire({
        title: "Đã có lỗi xảy ra!",
        icon: "error",
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 2000,
      });
    }
  };

  return (
    <div className={cx('wrapper')}>
        <div className={cx('inner')}>
          {currentPath === '/brand' ? (
            <>
              <ImageBrand src={data.image}/>
              <h3>Tên hãng: {data.name}</h3>
              <div className={cx('btns')}>
                <Button outline onClick={handleOpenAddForm} style={{marginBottom: '0.5rem'}}>Chỉnh sửa thông tin</Button>
                <Button primary onClick={handleDeleteForm}>Xóa hãng</Button>
              </div>
              <Backdrop
                  sx={{ color: '#fff', zIndex: 9 }}
                  open={open}
                >
                  <div className={cx('add-form')}>
                    <form action="/upload" method="post" className={cx('form')} onSubmit={handleSubmit} encType="multipart/form-data">
                      <div className={cx('title')}>
                        <p style={{fontSize: '1.5rem', fontWeight: '500'}}>CHỈNH SỬA THÔNG TIN HÃNG SẢN XUẤT</p>
                        <button type='button' className={cx('close-btn')} onClick={handleCloseAddForm}>×</button>
                      </div>
                      <br />
                      <div className={cx('inputs')}>
                        <label>ID hãng sản xuất:</label>
                        <input 
                          id="id"
                          type='number' 
                          name="id"
                          placeholder='ID hãng sản xuất' 
                          className={cx('input-name')}
                          value={idBrand}                     
                        />
                        <br />
                        <label>Chỉnh sửa tên hãng sản xuất:</label>
                        <input 
                          id="name"
                          type='text' 
                          name="name"
                          placeholder='Tên hãng sản xuất' 
                          className={cx('input-name')}
                          value={name}
                          onChange={handleNameChange}
                        />
                        <br />
                        <label>Chọn/chỉnh sửa hình ảnh:</label>
                        <input 
                          id="image"  
                          type="file"
                          accept="image/*"
                          name="image"
                          onChange={handleImageUpload}
                        />
                      </div>
                      <div className={cx('show-image')}>
                        <Image src={imageUrl}/>
                      </div>
                      <Button small primary>Xác nhận</Button>
                    </form>   
                  </div>
                </Backdrop>
            </>
          ) : (
            <>
              <Link to={`/detailBrand/${data.name}`}>
                <div className={cx('user-ui')}>
                  <ImageBrand src={data.image}/>
                </div>
              </Link>
            </>
          )}
        </div>
    </div>
  );
};

export default BrandComponent;
