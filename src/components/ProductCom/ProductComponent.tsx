import * as React from 'react';
import { useState } from "react";
import classNames from "classnames/bind";

import styles from './ProductComponent.module.scss';
import Image from "../Image";
import Button from "../Button";

const cx = classNames.bind(styles)

const ProductComponent: React.FC<any> = ({ data }) => {

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Image src={data.img}/>
                <h3>
                    <a title="" href="/category/product">{data.name}</a>
                </h3>
                {/* <div className={cx('specifications')}>
                    {data.specification.map((content: string) => (
                        <div className={cx('specification')}>{content}</div>
                    ))}
                </div> */}
                <div className={cx('description')}>{data.description}</div>
                <div className={cx('product-price')}>
                    {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                </div>
                {/* <Button primary>Chỉnh sửa</Button> */}
            </div>
        </div>
    )
}

export default ProductComponent;
