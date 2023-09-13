import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames/bind";

import styles from './ProductAdminComponent.module.scss';
import Image from "../Image";
import Button from "../Button";

const cx = classNames.bind(styles);

const ProductAdminComponent: React.FC<any> = ({ data }) => {
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

    return (
        <div className={cx('wrapper')} onClick={handleClick}>
            <Link to={`/detailProduct/${data.id}`}>
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
                </div>
            </Link>
        </div>
    )
}

export default ProductAdminComponent;
