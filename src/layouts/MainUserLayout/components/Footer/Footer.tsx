import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from "classnames/bind";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

import Container from '@mui/material/Container';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

import { useCategory } from '../../../../Context/CategoryContext';

import styles from './Footer.module.scss';
import zaloLogo from '../../../../assets/zalo-icon.png';
import Image from '../../../../components/Image';

const cx = classNames.bind(styles);

const faFacebookIcon = faFacebookF as IconProp;
const faYoutubeIcon = faYoutube as IconProp;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let screenWidth = window.innerWidth;

function updateScreenSize() {
  screenWidth = window.innerWidth;
}

updateScreenSize();

window.addEventListener("resize", updateScreenSize);

const Footer: React.FC<any> = () => {
    const history = useNavigate();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
    
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
    }, []);

    const categories = useCategory(); 

    return (
        <div className={cx('wrapper')}>
            <Container maxWidth='xl'>
                <div className={cx('container')}>
                    <div className={cx('information')}>
                        <p>THÔNG TIN LIÊN HỆ</p>
                        <div className={cx('company-name')}>
                            <p>CÔNG TY TNHH TRUNG TÍN</p>
                        </div>
                        <div className={cx('contact')}>
                            <p>Địa chỉ: 28/17/19F Đường 9A, Bình Hưng Hoà A, Bình Tân, Tp HCM</p>
                            <p>Hotline: 0903 382 582</p>
                            <p>Email: </p>
                        </div>
                        <br />
                        <div className={cx('extra-info')}>
                            <p>Website: </p>
                            <p style={{fontSize: '1rem'}}>CÔNG TY TNHH TRUNG TÍN</p>
                            <p>
                                Số ĐKKD 0316471069 do Sở Kế Hoạch & Đầu Tư Tp HCM 
                                <br />
                                cấp ngày 10/09/2020
                            </p>
                        </div>
                        <div className={cx('social-media-logo')}>
                            <FontAwesomeIcon className={cx('logo-fb')} icon={faFacebookIcon} />
                            <FontAwesomeIcon className={cx('logo-yt')} icon={faYoutubeIcon} />
                            <div>
                                <img className={cx('logo-zalo')} src={zaloLogo} alt='Zalo logo' />
                            </div>
                        </div>
                    </div>
                    <div className={cx('categories')}>
                        <p>DANH MỤC SẢN PHẨM</p>
                        <div className={cx('details')}>
                            {categories.map((category, index) => (
                                <p 
                                    key={index}
                                    onClick={(event) => {
                                        history(`/detailCategory/${category.name}`);
                                    }}
                                    className={cx('detail')}
                                >* 
                                    {category.name}
                                </p>
                            ))}                        
                        </div>
                    </div>
                    <div className={cx('policies')}>
                        <p>CHÍNH SÁCH HỖ TRỢ</p>
                        <div className={cx('details')}>
                            <p
                                onClick={(event) => {
                                    history(`/chinh-sach-bao-mat`);
                                }}
                                className={cx('detail')}
                            >
                                * Chính sách bảo mật
                            </p>
                            <p
                                onClick={(event) => {
                                    history(`/huong-dan-mua-hang`);
                                }}
                                className={cx('detail')}
                            >
                                * Hướng dẫn mua hàng
                            </p>
                            <p
                                onClick={(event) => {
                                    history(`/chinh-sach-thanh-toan`);
                                }}
                                className={cx('detail')}
                            >
                                * Chính sách thanh toán
                            </p>
                            <p
                                onClick={(event) => {
                                    history(`/chinh-sach-van-chuyen`);
                                }}
                                className={cx('detail')}
                            >
                                * Chính sách vận chuyển
                            </p>
                            <p
                                onClick={(event) => {
                                    history(`/chinh-sach-hoan-tien`);
                                }}
                                className={cx('detail')}
                            >
                                * Chính sách đổi trả hoàn tiền
                            </p>
                        </div>
                        <div className={cx('logo-legit')}>
                            <LazyLoadImage src="https://storethietbi.com/upload/hinhanh/bct-9539_160x60.png" effect="blur" width="100%"/>
                        </div>
                    </div>
                    <div className={cx('fanpage')}>
                        <p>FANPAGE</p>
                        {/* <iframe src="https://www.facebook.com/profile.php?id=100007187049398" width="300" height="200" style={{border: 'none', overflow: 'hidden'}} allow="encrypted-media"></iframe> */}
                    </div>
                </div>
            </Container>
            {screenWidth >= 540 ? 
                (
                    <Container maxWidth='xl' className={cx('copyright')}>
                        <p>Copyright © 2023 by CÔNG TY TNHH TRUNG TÍN. All rights reserved. Design by Tu3tle & Sodana Co.,Ltd</p>
                    </Container>
                ) : (
                    <Container maxWidth='xl' className={cx('copyright')}>
                        <p>
                            Copyright © 2023 by CÔNG TY TNHH TRUNG TÍN. 
                            <br />
                            All rights reserved. Design by Tu3tle & Sodana
                        </p>
                    </Container>
                )
            } 
        </div>
    )
}

export default Footer;
