import * as React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import 'sweetalert2/dist/sweetalert2.min.css';
import Backdrop from '@mui/material/Backdrop';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Category.module.scss';
import Button from '../../../components/Button';
import { axiosClient } from '../../../axios';
import CategoryService from '../../../service/CategoryService';
import CategoryComponent from '../../../components/CategoryCom/CategoryComponent';

const faHouseIcon = faHouse as IconProp;
const faArrowRightIcon = faArrowRight as IconProp;

const cx = classNames.bind(styles);

interface Category {
  id: number;
  name: string;
  image: string;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const Category: React.FC<any> = () => {
  const MySwal = withReactContent(Swal);

  const [open, setOpen] = useState(false);
  const handleCloseAddForm = () => setOpen(false);
  const handleOpenAddForm = () => {
    const swalContainer = document.querySelector('.swal2-container') as HTMLElement;
    if (swalContainer) {
      swalContainer.style.zIndex = '99999';
    }

    setOpen(true);
  };

  const [name, setName] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');

  const linkRef = React.useRef<HTMLAnchorElement>(null);

  const upload = (file: File) => {
    if (!file || !file.type.match(/image.*/)) return;

    MySwal.fire({
      title: 'Đang tải lên...',
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
    formData.append('name', name);
    formData.append('image', imageUrl);

    try {
      const response = await axiosClient.post('category/create', formData);
      MySwal.fire({
        title: "Thêm thành công!",
        icon: "success",
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 1500,
      });
      setOpen(false);
      window.location.reload();
      console.log('Response from server:', response);

    } catch (error) {
      MySwal.fire({
        title: "Đã có lỗi xảy ra!",
        icon: "error",
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 1500,
      });
      console.error('Error:', error);
    }
  };

  const [categories, setCategories] = useState<Category[]>([]);
  const fetchAPIBrands = async () => {
    try {
      const res = await CategoryService.GetAllCategory();
      return res.data;
    } catch (error) { }
  };

  const { data, refetch } = useQuery(
    ["brandImages"],
    fetchAPIBrands,
    {}
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      refetch()
    }, 1000)
    setCategories(data);
    return () => {
      clearTimeout(timer);
    }
  }, [data, refetch]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('left')}>
          <p style={{ width: 'fit-content' }}>Danh mục sản phẩm</p>
        </div>
        <div className={cx('right')}>
          <div className={cx('current-position')}>
            <FontAwesomeIcon
              icon={faHouseIcon}
              style={{ paddingRight: '1rem' }}
            />
            <FontAwesomeIcon
              icon={faArrowRightIcon}
              style={{ width: '1rem', height: '1rem', paddingRight: '1rem' }}
            />
            <p>Danh mục sản phẩm</p>
          </div>
          <div className={cx('add-btn')}>
            <Button primary small onClick={handleOpenAddForm}>Thêm danh mục</Button>
            <Backdrop
              sx={{ color: '#fff', zIndex: 9 }}
              open={open}
            >
              <div className={cx('add-form')}>
                <form action="/upload" method="post" className={cx('form')} onSubmit={handleSubmit}>
                  <div className={cx('title')}>
                    <p style={{ fontSize: '1.5rem', fontWeight: '500' }}>THÊM DANH MỤC SẢN PHẨM</p>
                    <button type='button' className={cx('close-btn')} onClick={handleCloseAddForm}>×</button>
                  </div>
                  <div className={cx('inputs')}>
                    <label>Điền tên danh mục sản phẩm:</label>
                    <input
                      type='text'
                      placeholder='Tên danh mục sản phẩm'
                      className={cx('input-name')}
                      onChange={handleNameChange}
                    />
                    <label>Chọn hình ảnh:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
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
        <div className={cx('categories')}>
          {categories !== undefined ? (
            <>
              <div className={cx('category')}>
                {categories.map((data) => (
                  <CategoryComponent key={data.id} data={data} />
                ))}
              </div>
            </>
          ) : (
            <></>
          )
          }
        </div>
      </div>
    </div>
  );
}

export default Category;
