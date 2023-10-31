import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './DetailCategory.module.scss';

import { useCategory } from "../../Context/CategoryContext";
import { axiosClient } from '../../axios';

const cx = classNames.bind(styles);

const ProductComponent = React.lazy(() => import('../../components/ProductCom'));

const DetailCategory: React.FC = () => {
  const { name } = useParams();

  const categories = useCategory(); 
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

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
              <React.Suspense fallback="" key={data.id}>
                <ProductComponent data={data} />
              </React.Suspense>
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
