import * as React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import classNames from "classnames/bind";
import styles from './ProductAdminComponent.module.scss';
import Image from "../Image";
import Button from "../Button";

import ProductService from '../../service/ProductService';

const cx = classNames.bind(styles);

const ProductAdminComponent: React.FC<any> = ({ data }) => {

    const [state, setState] = useState(data.status);

    const handleClick = () => {
        if (!localStorage.getItem('seen')) {
            localStorage.setItem('seen', JSON.stringify([]));
        }

        const seenProducts = JSON.parse(localStorage.getItem('seen') || '[]');
        if (!seenProducts.includes(data.id)) {
            seenProducts.push(data.id);
            localStorage.setItem('seen', JSON.stringify(seenProducts));
        }
    }

    const updateProductStatus = async (productId: string, newStatus: number) => {
        try {
          if (data.status === true) {
            const response = await ProductService.UpdateProductStatus(data.id, 0);
            setState(!state);
            console.log('Response from server:', response);
          } else {
            const response = await ProductService.UpdateProductStatus(data.id, 1);
            setState(!state);
            console.log('Response from server:', response);
          }
        } catch (error) {
          console.error('Có lỗi xảy ra khi cập nhật trạng thái sản phẩm:', error);
        }
      };

    return (
        <div className={cx('wrapper')} onClick={handleClick}>
            <div className={cx('inner')}>
                {data.imageProducts && data.imageProducts.length > 0 && (
                    <Image src={data.imageProducts[0].image} />
                )}
                <div className={cx('name')}>
                    <a title="" href="/category/product">{data.name} {data.id}</a>
                </div>
                <div className={cx('specifications')}>
                    {data.specification.map((content: any) => (
                        <div key={content.id} className={cx('specification')}>{content.specification}</div>
                    ))}
                </div>
                <div className={cx('description')}>{data.description}</div>
                <br />
                {data.event === null ? (
                    <>
                        <div className={cx('product-price')}>
                            {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                        </div>
                    </>
                ) : (
                    <>
                        <div className={cx('product-price-sale')}>
                            <div className={cx('price-sale')}>
                                {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                            </div>
                            <div className={cx('price-origin')}>
                                <s>{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</s>
                            </div>
                        </div>
                    </>
                )}
                <br />  
                <Button primary>Chỉnh sửa</Button>
                <br />
                {state === true ? (
                    <>
                        <Button primary onClick={updateProductStatus}>Ẩn sản phẩm</Button>
                    </>
                ) : (
                    <>
                        <Button outline onClick={updateProductStatus}>Hiện sản phẩm</Button>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProductAdminComponent;
