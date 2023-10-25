import * as React from 'react';
import { useState, useEffect  } from 'react';
import { useQuery } from 'react-query';
import classNames from "classnames/bind";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Product.module.scss';
import Button from '../../../components/Button';
import ProductAdminComponent from '../../../components/ProductAdminCom/ProductAdminComponent';

import BrandService from '../../../service/BrandService';
import CategoryService from '../../../service/CategoryService';
import ProductService from '../../../service/ProductService';

const faHouseIcon = faHouse as IconProp;
const faArrowRightIcon = faArrowRight as IconProp;

const cx = classNames.bind(styles);

// eslint-disable-next-line @typescript-eslint/no-redeclare
const Product: React.FC<any> = () => {
  const [selectedBrandButton, setSelectedBrandButton] = useState<number | null>(null);

  const [brand0, setBrand0] = useState(true);
  const [, setFilteredBrands] = useState<{ id: number; name: string; status: boolean }[]>([]);
  const [, setBrandChanged] = useState(false);
  const handleClickBrand0 = () => {
    setBrand0(!brand0);
    setBrandChanged(false);
  }

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [category0, setCategory0] = useState(true);
  const [, setCategoryChanged] = useState(false);
  const handleClickCategory0 = () => {
    setCategory0(!category0);
    setCategoryChanged(false);
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
        setFilteredProductsResult(productsData);
    }
  }, [
      brandsData, 
      categoriesData,
      productsData
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
    if (selectedCategoryIds.includes(categoryName)) {      
      setSelectedCategoryIds(selectedCategoryIds.filter(name => name !== categoryName));
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, categoryName]);
      setCategory0(!true);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('left')}>
          <p style={{width: 'fit-content', fontWeight: 700}}>BỘ LỌC SẢN PHẨM</p>
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
            <FontAwesomeIcon 
                icon={faArrowRightIcon}
                style={{width: '1rem', height: '1rem', paddingRight: '1rem'}} 
            />
            <p>Bộ lọc sản phẩm</p>
          </div>
        </div>
      </div>
      <div className={cx('main-container')}>
        <div className={cx('products')}>
          {category0 === true ? (
            <>
              {categories.map((dataa) => (
                <div className={cx('machine')} key={dataa.id}>
                  <div className={cx('title-wrapper')}>
                    <div className={cx('title')}>{dataa.name}</div>
                  </div>
                  <div className={cx('product')}>
                    {filteredProductsResult.filter((data) => data.category.name === dataa.name).map((data) => (
                        <ProductAdminComponent key={data.id} data={data} />
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {selectedCategoryIds.map((dataa) => (
                <div className={cx('machine')} key={dataa}>
                  <div className={cx('title-wrapper')}>
                    <div className={cx('title')}>{dataa}</div>
                  </div>
                  <div className={cx('product')}>
                    {filteredProductsResult.filter((data) => data.category.name === dataa).map((data) => (
                        <ProductAdminComponent key={data.id} data={data} />
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
          {category0 === true ? (
            <Button primary onClick={handleClickCategory0}>Tất cả sản phẩm</Button>   
          ) : (
            <Button outline onClick={handleClickCategory0}>Tất cả sản phẩm</Button>   
          )}
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
