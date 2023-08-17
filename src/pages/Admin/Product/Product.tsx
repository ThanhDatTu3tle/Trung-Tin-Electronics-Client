import * as React from 'react';
import { useState, useEffect  } from 'react';
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

import styles from './Product.module.scss';
import Button from '../../../components/Button';
import ProductComponent from '../../../components/ProductCom/ProductComponent';
import { axiosClient } from '../../../axios';

import BrandService from '../../../service/BrandService';
import CategoryService from '../../../service/CategoryService';
import ProductService from '../../../service/ProductService';

const faHouseIcon = faHouse as IconProp;
const faArrowRightIcon = faArrowRight as IconProp;

const cx = classNames.bind(styles);

// eslint-disable-next-line @typescript-eslint/no-redeclare
const Product: React.FC<any> = () => {
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

  const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [products, setProducts] = useState<{
    id: string;
    name: string;
    description: string;
    specification: { id: number; specification: string }[];
    imageProducts: { id: number; image: string }[];
    price: number;
    status: boolean;
    idBrand: number;
    idCategory: number;
    idEvent: number;
  }[]>([]);
  
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

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSelectBrandChange = (event: any) => {
    setSelectedBrand(event.target.value);
  };
  const handleSelectCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  // const [idEvent, setIdEvent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [specification, setSpecification] = useState<string[]>([]);

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const priceValue = Number(event.target.value); 
    setPrice(priceValue);
  };
  // const handleIdBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const idBrandValue = Number(event.target.value); 
  //   setIdBrand(idBrandValue);
  // };
  // const handleIdCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const idCategoryValue = Number(event.target.value); 
  //   setIdCategory(idCategoryValue);
  // };
  // const handleIdEventChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const idEventValue = Number(event.target.value); 
  //   setIdEvent(idEventValue);
  // };

  const upload = async (files: File[]) => {
    try {
      const uploadedImages = await Promise.all(
        files.map(file => {
          if (!file || !file.type.match(/image.*/)) return null;
  
          return new Promise<string | null>((resolve, reject) => {
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
              resolve(link);
              MySwal.close();
            };

            xhr.onerror = function () {
              reject(new Error('Failed to upload image'));
            };
            xhr.setRequestHeader('Authorization', 'Client-ID 983c8532c49a20e');
            xhr.send(fd);
          });
        })
      );
  
      return {
        uploadedImages,
      };
    } catch (error) {
      console.error('Error uploading images:', error);
      return {
        uploadedImages: [],
      };
    }
  };
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
  
    const newImages: File[] = [];
  
    for (let i = 0; i < event.target.files.length; i++) {
      newImages.push(event.target.files[i]);
    }
  
    setImages([...images, ...newImages]);
  };

  const handleSpecChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const newSpecificationArray = newValue.split(',').map(item => item.trim());
    setSpecification(newSpecificationArray);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, images: File[]) => {
    event.preventDefault();
  
    try {      
      const { uploadedImages } = await upload(images);
      console.log('uploadedImages: ', uploadedImages);

      const validImages = uploadedImages.filter((link): link is string => link !== null);
      console.log('validImages: ', validImages)

      const selectedBrandData = brands.find(brand => brand.name === selectedBrand);
      const selectedCategoryData = categories.find(category => category.name === selectedCategory);
    
      if (!selectedBrandData || !selectedCategoryData) {
        return;
      }
    
      const formData = new FormData();
      formData.append('id', id);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price.toString());
      formData.append('idBrand', selectedBrandData.id.toString());
      formData.append('idCategory', selectedCategoryData.id.toString());
      validImages.forEach((image, index) => {
        formData.append(`imageProducts[${index}].image`, image);
      });
      specification.forEach((specItem, index) => {
        formData.append(`specification[${index}]`, specItem);
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
    
      const response = await axiosClient.post('product/create', formData, config);
      MySwal.fire({
        title: 'Thêm thành công!',
        icon: 'success',
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
        title: 'Đã có lỗi xảy ra!',
        icon: 'error',
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 1500,
      });
      console.error('Error:', error);
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
                sx={{ color: '#fff', zIndex: 9 }}
                open={open}
              >
                <div className={cx('add-form')}>
                  <form action="/upload" method="post" className={cx('form')} onSubmit={(event) => handleSubmit(event, images)}>                    
                    <div className={cx('title')}>
                      <p style={{fontSize: '1.5rem', fontWeight: '500'}}>THÊM SẢN PHẨM</p>
                      <button type='button' className={cx('close-btn')} onClick={handleCloseAddForm}>×</button>
                    </div>
                    <div className={cx('inputs')}>
                      <label htmlFor="id">Điền mã sản phẩm:</label>
                      <input 
                        id="id"
                        type='text' 
                        placeholder='Mã sản phẩm' 
                        className={cx('input-name')}
                        onChange={handleIdChange}
                      />
                      <label htmlFor="name">Điền tên sản phẩm:</label>
                      <input 
                        id="name"
                        type='text' 
                        placeholder='Tên sản phẩm' 
                        className={cx('input-name')}
                        onChange={handleNameChange}
                      />
                      <label htmlFor="description">Mô tả sản phẩm:</label>
                      <input 
                        id="description"
                        type='text' 
                        placeholder='Mô tả sản phẩm' 
                        className={cx('input-name')}
                        onChange={handleDescriptionChange}
                      />
                      <label htmlFor="price">Giá tiền sản phẩm:</label>
                      <input 
                        id="price"
                        type='number' 
                        placeholder='Giá tiền sản phẩm' 
                        className={cx('input-name')}
                        onChange={handlePriceChange}
                      />
                      <label htmlFor="brand">Chọn hãng sản xuất:</label>
                      <select
                        id="brand"
                        name="brand"
                        value={selectedBrand}
                        className={cx('selector')}
                        onChange={handleSelectBrandChange}
                      >
                        <option className={cx('option-first')} value="" disabled>
                          Hãng sản xuất
                        </option>
                        {brands.map((brand) => (
                          <option className={cx('option')} key={brand.id} value={brand.name}>
                            {brand.name}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="category">Chọn danh mục sản phẩm:</label>
                      <select
                        name="category"
                        value={selectedCategory}
                        className={cx('selector')}
                        onChange={handleSelectCategoryChange}
                      >
                        <option className={cx('option-first')} value="" disabled>
                          Danh mục sản phẩm
                        </option>
                        {categories.map((category) => (
                          <option className={cx('option')} key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="image">Chọn hình ảnh:</label>
                      <input 
                        id="image"  
                        type="file"
                        accept="image/*"
                        multiple
                        name="image"
                        onChange={handleImageUpload}
                      />
                      <br />
                      <label htmlFor="specification">Thêm thông số cho sản phẩm:</label>
                      <input 
                        id="specification"  
                        type="text"
                        name="spec"
                        placeholder='Thông số sản phẩm' 
                        className={cx('input-name')}
                        value={specification}
                        onChange={handleSpecChange}
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
                          <ProductComponent key={data.id} data={data} />
                      ))}
                  </div>
              </>
              ) : (
              <>
                <p>Chưa có sản phẩm!!!</p>
              </>
              )
          }
        </div>

        <div className={cx('filter')}>
          FILTER
        </div>
      </div>
    </div>
  );
}

export default Product;
