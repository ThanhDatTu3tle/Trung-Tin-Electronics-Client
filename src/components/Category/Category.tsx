import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames/bind";

import styles from './Category.module.scss';
import Image from '../Image';

const cx = classNames.bind(styles)

const categories = [
    {
        'img': 'https://storethietbi.com/upload/product/dung-cu-may-pin-4476_55x50.png',
        'name': 'Dụng cụ máy pin',
    },
    {
        'img': 'https://storethietbi.com/upload/product/dung-cu-may-dien-6106_55x50.png',
        'name': 'Dụng cụ máy điện',
    },
    {
        'img': 'https://storethietbi.com/upload/product/may-nen-khi-6389_55x50.png',
        'name': 'Máy nén khí',
    },
    {
        'img': 'https://storethietbi.com/upload/product/may-xit-rua-9996_55x50.png',
        'name': 'Máy xịt rửa',
    }
]

const Category: React.FC<any> = () => {
    return (
        <>
            {categories.map((category) => (
                <div className={cx('wrapper')}> 
                    <Image className={cx('img-category')} src={category.img}/>
                    <br />
                    <p>{category.name}</p>
                </div>
            ))}
        </>
    )
}

export default Category;
