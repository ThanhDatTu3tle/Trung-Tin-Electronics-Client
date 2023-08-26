import * as React from 'react';
import classNames from "classnames/bind";

import styles from './Category.module.scss';
import Image from '../Image';

const cx = classNames.bind(styles)

const categories = [
    {
        'id': 1,
        'img': 'https://i.imgur.com/RC694Aa.png',
        'name': 'Máy rửa xe',
    },
    {
        'id': 2,
        'img': '	https://i.imgur.com/p4lR49U.png',
        'name': 'Máy nén khí',
    },
    {
        'id': 3,
        'img': 'https://i.imgur.com/1PjDi1k.png',
        'name': 'Máy khoan',
    },
    {
        'id': 4,
        'img': 'https://i.imgur.com/KUi1GlN.png',
        'name': 'Máy cầm tay',
    }
]

const Category: React.FC<any> = () => {
    return (
        <>
            {categories.map((category) => (
                <div key={category.id} className={cx('wrapper')}> 
                    <Image className={cx('img-category')} src={category.img}/>
                    <br />
                    <p>{category.name}</p>
                </div>
            ))}
        </>
    )
}

export default Category;
