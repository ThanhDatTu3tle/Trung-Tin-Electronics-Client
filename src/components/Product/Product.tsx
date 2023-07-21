import * as React from 'react';
import { useState } from "react";
import classNames from "classnames/bind";

import styles from './Product.module.scss';
import Image from "../Image";
import Button from "../Button";

const cx = classNames.bind(styles)

const Product: React.FC<any> = ({ data }) => {

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Image src={data.image}/>
                <h3>
                    <a title="Combo Sum Vầy 1" href="/category/product">{data.name}</a>
                </h3>
                <div className={cx('descriptions')}>
                    {data.description.map((content: string) => (
                        <div className={cx('description')}>{content}</div>
                    ))}
                </div>
                <div className={cx('product-price')}>
                    {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                </div>
                <Button primary>Add to cart</Button>
            </div>
        </div>
    )
}

export default Product;
