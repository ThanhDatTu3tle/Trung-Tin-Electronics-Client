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

import styles from './ProductManagement.module.scss';
import Button from '../../../components/Button';

import { axiosClient } from '../../../axios';
import BrandService from '../../../service/BrandService';
import CategoryService from '../../../service/CategoryService';
import ProductService from '../../../service/ProductService';
import ProductManagementRow from '../../../components/ProductManagementRow';

const faHouseIcon = faHouse as IconProp;
const faArrowRightIcon = faArrowRight as IconProp;

const cx = classNames.bind(styles);

// eslint-disable-next-line @typescript-eslint/no-redeclare
const ProductManagement: React.FC<any> = () => {
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

  const [statusProduct, setStatusProduct] = useState('all')
  const handleStatusAllProduct = () => {
    setStatusProduct('all');
  }
  const handleStatusPublishedProduct = () => {
    setStatusProduct('published');
  }
  const handleStatusHidedProduct = () => {
    setStatusProduct('hided');
  }

  const [brands, setBrands] = useState<{ id: number; name: string; status: boolean }[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string; status: boolean }[]>([]);
  const [filteredProductsResult, setFilteredProductsResult] = useState<{
    id: string;
    name: string;
    description: string;
    specification: { id: number; specification: string }[];
    imageProducts: { id: number; image: string }[];
    price: number;
    brand: { id: number; name: string; image: string };
    event: null;
    status: boolean;
    category: { id: number; name: string; image: string; status: boolean };
    idBrand: number;
    idCategory: number;
    idEvent: number;
    quantity: number;
  }[]>([]);

  const fetchAPIBrands = async () => {
    try {
      const res = await BrandService.GetAllBrand();
      return res.data;
    } catch (error) { }
  };
  const fetchAPICategories = async () => {
    try {
      const res = await CategoryService.GetAllCategory();
      return res.data;
    } catch (error) { }
  };
  const fetchAPIProducts = async () => {
    try {
      const res = await ProductService.GetAllProduct();
      return res.data;
    } catch (error) { }
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
      setFilteredProductsResult(productsData);
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
  const [images, setImages] = useState<File[]>([]);
  const [specification, setSpecification] = useState<string[]>([]);

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const priceValue = Number(event.target.value);
    setPrice(priceValue);
  };

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

  const handleSpecChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    const newSpecificationArray = newValue.split('\n').map(item => item.trim());
    setSpecification(newSpecificationArray);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, images: File[]) => {
    event.preventDefault();

    try {
      const { uploadedImages } = await upload(images);
      const validImages = uploadedImages.filter((link): link is string => link !== null);
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
      console.log('validImages: ', validImages);
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

      axiosClient.post('product/create', formData, config);
      MySwal.fire({
        title: 'Thêm thành công!',
        icon: 'success',
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 2000,
      });
      setOpen(false);
      window.location.reload();
    } catch (error) {
      MySwal.fire({
        title: 'Đã có lỗi xảy ra!',
        icon: 'error',
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 2000,
      });
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('left')}>
          <p style={{ width: 'fit-content', fontWeight: 700 }}>QUẢN LÝ SẢN PHẨM</p>
        </div>
        <div className={cx('right')}>
          <div className={cx('current-position')}>
            <FontAwesomeIcon
              icon={faHouseIcon}
              style={{ paddingRight: '1rem' }}
            />
            <FontAwesomeIcon
              icon={faArrowRightIcon}
              style={{ width: '1rem', height: '1rem', paddingRight: '0.5rem' }}
            />
            <p>Sản phẩm</p>
            <FontAwesomeIcon
              icon={faArrowRightIcon}
              style={{ width: '1rem', height: '1rem', paddingRight: '0.5rem', paddingLeft: '0.5rem' }}
            />
            <p>Quản lý sản phẩm</p>
          </div>
        </div>
      </div>
      <div className={cx('main-container')}>
        <div className={cx('all-products-info')}>
          <b>Sản phẩm:</b>
          {statusProduct === 'all' ? (
            <>
              <p style={{ marginLeft: '1rem', color: '#018ec3', fontWeight: 700, cursor: 'pointer' }} onClick={handleStatusAllProduct}>Tất cả sản phẩm ({filteredProductsResult.length}) | </p>
              <p style={{ marginLeft: '1rem', color: '#000', cursor: 'pointer' }} onClick={handleStatusPublishedProduct}>Sản phẩm đang được bày bán ({filteredProductsResult.filter((data) => data.status === true).length}) | </p>
              <p style={{ marginLeft: '1rem', color: '#000', cursor: 'pointer' }} onClick={handleStatusHidedProduct}>Sản phẩm đang được ẩn đi ({filteredProductsResult.filter((data) => data.status === false).length})</p>
            </>
          ) : (
            <>
              {statusProduct === 'published' ? (
                <>
                  <p style={{ marginLeft: '1rem', color: '#000', cursor: 'pointer' }} onClick={handleStatusAllProduct}>Tất cả sản phẩm ({filteredProductsResult.length}) | </p>
                  <p style={{ marginLeft: '1rem', color: '#018ec3', fontWeight: 700, cursor: 'pointer' }} onClick={handleStatusPublishedProduct}>Sản phẩm đang được bày bán ({filteredProductsResult.filter((data) => data.status === true).length}) | </p>
                  <p style={{ marginLeft: '1rem', color: '#000', cursor: 'pointer' }} onClick={handleStatusHidedProduct}>Sản phẩm đang được ẩn đi ({filteredProductsResult.filter((data) => data.status === false).length})</p>
                </>
              ) : (
                <>
                  <p style={{ marginLeft: '1rem', color: '#000', cursor: 'pointer' }} onClick={handleStatusAllProduct}>Tất cả sản phẩm ({filteredProductsResult.length}) | </p>
                  <p style={{ marginLeft: '1rem', color: '#000', cursor: 'pointer' }} onClick={handleStatusPublishedProduct}>Sản phẩm đang được bày bán ({filteredProductsResult.filter((data) => data.status === true).length}) | </p>
                  <p style={{ marginLeft: '1rem', color: '#018ec3', fontWeight: 700, cursor: 'pointer' }} onClick={handleStatusHidedProduct}>Sản phẩm đang được ẩn đi ({filteredProductsResult.filter((data) => data.status === false).length})</p>
                </>
              )}
            </>
          )}
        </div>
        <br />
        <div className={cx('add-btn')}>
          <Button primary small onClick={handleOpenAddForm}>Thêm sản phẩm</Button>
          <Backdrop
            sx={{ color: '#fff', zIndex: 9 }}
            open={open}
          >
            <div className={cx('add-form')}>
              <form action="/upload" method="post" className={cx('form')} onSubmit={(event) => handleSubmit(event, images)}>
                <div className={cx('title')}>
                  <p style={{ fontSize: '1.5rem', fontWeight: '500' }}>THÊM SẢN PHẨM</p>
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
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    rows={3}
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
                  {/* <div className={cx('show-image')}>
                        {filteredProductsResult.imageProducts.map((img) => (
                          <Image src={img.image}/>
                        ))}
                      </div> */}
                  <br />
                  <label htmlFor="specification">Thêm thông số cho sản phẩm:</label>
                  <textarea
                    id="specification"
                    name="specification"
                    value={specification}
                    onChange={handleSpecChange}
                    rows={3}
                  />
                </div>
                <Button primary small>Xác nhận</Button>
              </form>
            </div>
          </Backdrop>
        </div>
        <br />
        <div className={cx('table')}>
          <div className={cx("titles")}>
            <div className={cx("image")}>Hình ảnh</div>
            <div className={cx("name")}>Tên sản phẩm</div>
            <div className={cx("id")}>Mã sản phẩm</div>
            <div className={cx("category")}>Danh mục</div>
            <div className={cx("brand")}>Hãng sản xuất</div>
            <div className={cx("price")}>Giá tiền</div>
            <div className={cx("stock")}>Hàng hóa</div>
            <div className={cx("status")}>Trạng thái</div>
            <div className={cx("date")}>Chỉnh sửa gần nhất</div>
            <div className={cx("edit")}>Chỉnh sửa</div>
          </div>
          <br />
          <div className={cx("information")}>
            {filteredProductsResult.map((product) => (
              <ProductManagementRow key={product.id} data={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;
