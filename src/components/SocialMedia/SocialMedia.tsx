import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames/bind";

import styles from './SocialMedia.module.scss';
import Image from '../Image';

const cx = classNames.bind(styles)

const logos = [
    {
        'img': 'https://storethietbi.com/upload/hinhanh/youtube-8174_35x35.png'
    },
    {
        'img': 'https://storethietbi.com/upload/hinhanh/facebook-1-1344_35x35.png'
    },
    {
        'img': 'https://storethietbi.com/upload/hinhanh/store-thiet-bi-doi-tra-5002_35x35.png'
    }
]

const SocialMedia: React.FC<any> = ({ children }) => {
    return (
        <>
            {logos.map((logo) => (
                <div className={cx('wrapper')}> 
                    <Image className={cx('img-category')} src={logo.img}/>
                </div>
            ))}
        </>
    )
}

export default SocialMedia;
