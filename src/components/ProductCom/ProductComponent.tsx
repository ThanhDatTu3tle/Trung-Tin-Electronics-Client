import * as React from 'react';
import classNames from "classnames/bind";

import styles from './ProductComponent.module.scss';
import Image from "../Image";
import Button from "../Button";

const cx = classNames.bind(styles);

const currentPath = window.location.pathname;

const ProductComponent: React.FC<any> = ({ data }) => {

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {}
                <Image src={data.img}/>
                <div className={cx('name')}>
                    <a title="" href="/category/product">{data.name}</a>
                </div>
                <div className={cx('specifications')}>
                    {data.specification.map((content: string) => (
                        <div className={cx('specification')}>{content}</div>
                    ))}
                </div>
                <div className={cx('description')}>{data.description}</div>
                <br />
                {data.id_event === null ? (
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
                {currentPath === '/admin' ? (
                    <>
                    </>
                ) : (
                    <>
                        <Button primary>Đặt hàng</Button>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProductComponent;
