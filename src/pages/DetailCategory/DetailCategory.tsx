import * as React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './DetailCategory.module.scss';
import ProductComponent from '../../components/ProductCom/ProductComponent';

import CategoryService from '../../service/CategoryService';
import ProductService from '../../service/ProductService';

const cx = classNames.bind(styles);

const DetailCategory: React.FC = () => {
    const { name } = useParams();

    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
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
                refetchCategories(),
                refetchProducts()
            ]);
        };
        fetchAllAPIs();
      }, [
          refetchCategories,
          refetchProducts
      ]);
    useEffect(() => {
    if (categoriesData && productsData) {
        setCategories(categoriesData);
        setProducts(productsData);
    }
    }, [
        categoriesData,
        productsData
    ]);

    const category = categories.find((category) => category.name === name);
    const filteredProducts = products.filter((product) => product.category === name);

    if (!category) {
        return <div>Danh mục không tồn tại</div>;
    }
  
    return (
        <div className={cx('wrapper')}>
            <h2>{category.name}</h2>
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
                        <p>Chưa có sản phẩm thuộc danh mục này!</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default DetailCategory;
