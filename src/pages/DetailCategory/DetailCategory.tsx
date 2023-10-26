import * as React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './DetailCategory.module.scss';
import ProductComponent from '../../components/ProductCom/ProductComponent';

import CategoryService from '../../service/CategoryService';
import { axiosClient } from '../../axios';

const cx = classNames.bind(styles);

const DetailCategory: React.FC = () => {
  const { name } = useParams();

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const fetchAPICategories = async () => {
    try {
      const res = await CategoryService.GetAllCategory();
      return res.data;
    } catch (error) {}
  };

  const { data: categoriesData, refetch: refetchCategories } = useQuery(
    ['categoryImages'],
    fetchAPICategories,
    {}
  );

  useEffect(() => {
    const fetchAllAPIs = async () => {
      await Promise.all([refetchCategories()]);
    };
    fetchAllAPIs();
  }, [refetchCategories]);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  const category = categories.find((category) => category.name === name);

  useEffect(() => {
    if (!category || filteredProducts.length > 0) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axiosClient.post('product/getAllByIdCategory', [category.id]);
        setFilteredProducts(response.data);
      } catch (error) {}
    };

    fetchData();
  }, [category, filteredProducts]);

  if (!category) {
    return <div>Danh mục không tồn tại</div>;
  }

  return (
    <div className={cx('wrapper')}>
      <h2>{category.name}</h2>
      <br />
      <div className={cx('machine')}>
        {filteredProducts.length > 0 ? (
          <div className={cx('product')}>
            {filteredProducts
            .filter((product) => product.status === true)
            .map((data) => (
              <ProductComponent key={data.id} data={data} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default DetailCategory;
