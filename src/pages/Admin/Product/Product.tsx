import * as React from 'react';
import { useState, useEffect  } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
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

const faHouseIcon = faHouse as IconProp;
const faArrowRightIcon = faArrowRight as IconProp;

const cx = classNames.bind(styles);

// eslint-disable-next-line @typescript-eslint/no-redeclare
const Product: React.FC<any> = () => {
  const MySwal = withReactContent(Swal);
  // const { nameParent } = useParams();

  const [selectedBrandButton, setSelectedBrandButton] = useState<number | null>(null);

  const [brand0, setBrand0] = useState(true);
  const [filteredBrands, setFilteredBrands] = useState<{ id: number; name: string; status: boolean }[]>([]);
  const [brandChanged, setBrandChanged] = useState(false);
  const handleClickBrand0 = () => {
    setBrand0(!brand0);
    setBrandChanged(false);
  }

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [category0, setCategory0] = useState(true);
  const [filteredCategory, setFilteredCategory] = useState<{ id: number; name: string; status: boolean }[]>([]);
  const [categoryChanged, setCategoryChanged] = useState(false);
  const handleClickCategory0 = () => {
    setCategory0(!category0);
    setCategoryChanged(false);
  }

  const [open, setOpen] = useState(false);
  const handleCloseAddForm = () => setOpen(false);
  const handleOpenAddForm = () => {
    const swalContainer = document.querySelector('.swal2-container') as HTMLElement;
    if (swalContainer) {
      swalContainer.style.zIndex = '99999';
    }
    setOpen(true);
  };

  const [brands, setBrands] = useState<{ id: number; name: string; status: boolean }[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string; status: boolean }[]>([]);
  
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [filteredProductsResult, setFilteredProductsResult] = useState<any[]>([]);

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
      refetchCategories,
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

  const handleClickBrandAll = (brandId: number) => {
    // Toggle trạng thái nút
    setSelectedBrandButton(brandId === selectedBrandButton ? null : brandId);
    // Lọc danh sách hãng tương ứng
    let updatedFilteredBrand: React.SetStateAction<{ id: number; name: string; status: boolean; }[]> = [];
    if (brandId !== selectedBrandButton) {
      updatedFilteredBrand = brands.filter((brand) => brand.id === brandId);
    } 
    // Sử dụng updatedFilteredBrand trong hàm setState
    setFilteredBrands(updatedFilteredBrand);
    setCategory0(false);
  };

  const handleCategoryToggle = (categoryName: string) => {
    
    // const category = categories.find((category) => category.name === categoryName);

    if (selectedCategoryIds.includes(categoryName)) {
      setSelectedCategoryIds(selectedCategoryIds.filter(id => id !== categoryName));
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, categoryName]);
      // console.log(selectedCategoryIds);
    }
  };

  useEffect(() => {
    // console.log(filteredProducts)
    
    const filteredProductsResult = filteredProducts.filter((product: { categoryName: string; }) =>
      selectedCategoryIds.includes(product.categoryName)
    );
    setFilteredProductsResult(filteredProductsResult);
    console.log(selectedCategoryIds);
    console.log(filteredProductsResult);
  }, [selectedCategoryIds, filteredProducts]);

  // const category = categories.find((category) => category.name === nameParent);

  // useEffect(() => {
  //   if (!category || filteredProducts.length > 0) {
  //     return;
  //   }

  //   const fetchData = async () => {
  //     try {
  //       const response = await axiosClient.post('product/getAllByIdCategory', selectedCategoryIds);
  //       setFilteredProducts(response.data);
  //     } catch (error) {}
  //   };

  //   fetchData();
  // }, [selectedCategoryIds, filteredProducts]);

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

  const handleSpecChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    const newSpecificationArray = newValue.split('\n').map(item => item.trim());
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
          <p style={{width: 'fit-content'}}>TẤT CẢ SẢN PHẨM</p>
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
        </div>
      </div>
      <div className={cx('main-container')}>
        <div className={cx('products')}>
          {category0 === true ? (
            <>
              {categories.map((data) => (
                <div className={cx('machine')}>
                  <div className={cx('title-wrapper')}>
                    <div className={cx('title')}>{data.name}</div>
                  </div>
                  <div className={cx('product')}>
                    {filteredProductsResult.filter((product: { category: string; }) => product.category === data.name).map((data: { id: any; }) => (
                        <ProductComponent key={data.id} data={data} />
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {filteredCategory.map((data) => (
                <div className={cx('machine')}>
                  <div className={cx('title-wrapper')}>
                    <div className={cx('title')}>{data.name}</div>
                  </div>
                  <div className={cx('product')}>
                    {filteredProductsResult.filter((product: { category: string; }) => product.category === data.name).map((data: { id: any; }) => (
                        <ProductComponent key={data.id} data={data} />
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className={cx('filter')}>
          <h3>Bộ lọc</h3>
          <h4>Lọc theo danh mục</h4>
          <>
            <Button primary onClick={handleClickCategory0}>Tất cả sản phẩm</Button>
          </>
          {categories.map(category => (
            <>
              {selectedCategoryIds.includes(category.name) === true ? (
                <Button primary onClick={() => handleCategoryToggle(category!.name)} key={category.id}>{category.name}</Button>
              ) : (
                <Button outline onClick={() => handleCategoryToggle(category!.name)} key={category.id}>{category.name}</Button>
              )}
            </>
          ))}
          <h4>Lọc theo hãng</h4>
          <>
            <Button primary onClick={handleClickBrand0}>Tất cả các hãng</Button>
          </>
          {brands.map((brand) => (
            <>
              {selectedBrandButton === brand.id ? (
                <Button primary onClick={() => handleClickBrandAll(brand!.id)} key={brand.id}>{brand.name}</Button>
              ) : (
                <Button outline onClick={() => handleClickBrandAll(brand!.id)} key={brand.id}>{brand.name}</Button>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
