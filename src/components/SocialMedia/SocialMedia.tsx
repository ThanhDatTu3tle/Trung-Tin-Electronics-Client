import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames/bind";

import styles from './SocialMedia.module.scss';
import Image from '../Image';

const cx = classNames.bind(styles)

const logos = [
    {
        'id': 1,
        'img': 'https://storethietbi.com/upload/hinhanh/youtube-8174_35x35.png'
    },
    {
        'id': 2,
        'img': 'https://storethietbi.com/upload/hinhanh/facebook-1-1344_35x35.png'
    },
    {
        'id': 3,
        'img': 'https://storethietbi.com/upload/hinhanh/store-thiet-bi-doi-tra-5002_35x35.png'
    }
]

const SocialMedia: React.FC<any> = () => {
    return (
        <>
            {logos.map((logo) => (
                <div key={logo.id} className={cx('wrapper')}> 
                    <Image className={cx('img-category')} src={logo.img}/>
                </div>
            ))}
        </>
    )
}

export default SocialMedia;
