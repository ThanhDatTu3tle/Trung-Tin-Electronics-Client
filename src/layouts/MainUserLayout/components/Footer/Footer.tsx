import * as React from 'react';
import { useState, useEffect } from 'react';
import classNames from "classnames/bind";

import Container from '@mui/material/Container';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

import styles from './Footer.module.scss';
import zaloLogo from '../../../../assets/zalo-icon.png';
import Image from '../../../../components/Image';

const cx = classNames.bind(styles);

const faFacebookIcon = faFacebookF as IconProp;
const faYoutubeIcon = faYoutube as IconProp;

let screenWidth = window.innerWidth;

function updateScreenSize() {
  screenWidth = window.innerWidth;

  console.log("Width: " + screenWidth);
}

updateScreenSize();

window.addEventListener("resize", updateScreenSize);

const Footer: React.FC<any> = () => {
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
                            <p>* Dụng cụ máy pin</p>
                            <p>* Dụng cụ máy điện</p>
                            <p>* Máy xịt rửa, phụ kiện</p>
                            <p>* Máy nén khí</p>
                            <p>* Dụng cụ đồ nghề</p>
                            <p>* Thiết bị đo lường</p>
                            <p>* Thùng, hộp đựng dụng cụ</p>
                            <p>* Đồ bảo hộ</p>
                        </div>
                    </div>
                    <div className={cx('policies')}>
                        <p>CHÍNH SÁCH HỖ TRỢ</p>
                        <div className={cx('details')}>
                            <p>* Chính sách bảo mật</p>
                            <p>* Hướng dẫn mua hàng</p>
                            <p>* Chính sách thanh toán</p>
                            <p>* Chính sách vận chuyển</p>
                            <p>* Chính sách đổi trả hoàn tiền</p>
                        </div>
                        <div className={cx('logo-legit')}>
                            <Image src="https://storethietbi.com/upload/hinhanh/bct-9539_160x60.png"/>
                        </div>
                    </div>
                    <div className={cx('fanpage')}>
                        <p>FANPAGE</p>
                        <iframe src="https://www.facebook.com/profile.php?id=100007187049398" width="300" height="200" style={{border: 'none', overflow: 'hidden'}} allow="encrypted-media"></iframe>
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
