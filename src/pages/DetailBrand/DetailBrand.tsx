import * as React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './DetailBrand.module.scss';
import ProductComponent from '../../components/ProductCom/ProductComponent';

import BrandService from '../../service/BrandService';
import ProductService from '../../service/ProductService';

const cx = classNames.bind(styles);

const DetailBrand: React.FC = () => {
    const { name } = useParams();

    const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);
    const [products, setProducts] = useState<{
      id: string;
      name: string;
      description: string;
      specification: { id: number; specification: string }[];
      imageProducts: { id: number; image: string }[];
      price: number;
      brand: string;
      event: null;
      status: boolean;
      category: string;
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
    const { data: productsData, refetch: refetchProducts } = useQuery(
        ["productImages"],
        fetchAPIProducts,
        {}
    );
    
    useEffect(() => {
        const fetchAllAPIs = async () => {
            await Promise.all([
                refetchBrands(), 
                refetchProducts()
            ]);
        };
        fetchAllAPIs();
      }, [
          refetchBrands, 
          refetchProducts
      ]);
    useEffect(() => {
    if (brandsData && productsData) {
        setBrands(brandsData); 
        setProducts(productsData);
    }
    }, [
        brandsData, 
        productsData
    ]);

    const brand = brands.find((brand) => brand.name === name);
    const filteredProducts = products.filter((product) => product.brand === name);

    if (!brand) {
        return <div>Hãng không tồn tại</div>;
    }
  
    return (
        <div className={cx('wrapper')}>
            <h2>{brand.name}</h2>
            <br />
            <div className={cx('machine')}>
                {filteredProducts !== undefined ? (
                    <>
                        <div className={cx('product')}>
                            {filteredProducts.map((data) => (
                                <ProductComponent key={data.id} data={data} />
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <p>Chưa có sản phẩm thuộc hãng này!</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default DetailBrand;
