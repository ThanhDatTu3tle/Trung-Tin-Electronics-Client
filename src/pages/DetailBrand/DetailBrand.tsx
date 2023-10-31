import * as React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './DetailBrand.module.scss';
import ProductComponent from '../../components/ProductCom/ProductComponent';

import { useBrand } from '../../Context/BrandContext';
import { useProduct } from "../../Context/ProductContext";

const cx = classNames.bind(styles);

const DetailBrand: React.FC = () => {
    const { name } = useParams();
    const brands = useBrand(); 
    const products = useProduct();

    const brand = brands.find((brand) => brand.name === name);
    const filteredProducts = products.filter((product) => product.brand.name === name);

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
