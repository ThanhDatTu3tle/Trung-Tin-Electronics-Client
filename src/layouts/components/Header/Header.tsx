import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames/bind";

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import config from '../../../config';
import zaloLogo from '../../../assets/zalo-icon.png';
import logo from '../../../assets/logo.png';
import Titles from './MenuTitles';

const cx = classNames.bind(styles)

const faFacebookIcon = faFacebookF as IconProp;
const faYoutubeIcon = faYoutube as IconProp;
const faAddressIcon = faLocationDot as IconProp;
const faPhoneIcon = faPhoneVolume as IconProp;
const faClockIcon = faClock as IconProp;
const faBarsIcon = faBars as IconProp;

const Header: React.FC = () => {
    return (
        <Grid>
            <Grid className={cx('address-bar')}>
                <Container maxWidth='xl'>
                    <div className={cx('bar')}>
                        <div className={cx('address-info')}>
                            <p className={cx('address')} style={{ fontSize: '0.8rem' }}>
                                <span>
                                    <FontAwesomeIcon 
                                        icon={faAddressIcon}
                                        style={{marginRight: '0.2rem'}} 
                                    />
                                </span>
                                Địa chỉ: 28/17/19F Đường 9A, Bình Hưng Hoà A, Bình Tân, Thành phố Hồ Chí Minh
                            </p>
                            <p className={cx('hotline')} style={{ fontSize: '0.8rem' }}>
                                <span>
                                    <FontAwesomeIcon 
                                        icon={faPhoneIcon}
                                        style={{marginRight: '0.2rem'}} 
                                    />
                                </span>
                                Hotline: 0903 382 582
                            </p>
                            <p className={cx('open-time')} style={{ fontSize: '0.8rem' }}>
                                <span>
                                    <FontAwesomeIcon 
                                        icon={faClockIcon}
                                        style={{marginRight: '0.2rem'}} 
                                    />
                                </span>
                                Giờ mở cửa: 8h30 - 18h00
                            </p>
                        </div>
                        <div className={cx('logos')}>
                            <FontAwesomeIcon className={cx('logo-fb')} icon={faFacebookIcon} />
                            <FontAwesomeIcon className={cx('logo-yt')} icon={faYoutubeIcon} />
                            <div>
                                <img className={cx('logo-zalo')} src={zaloLogo} alt='Zalo logo' />
                            </div>
                        </div>
                    </div>                 
                </Container>
            </Grid>
            
            <Grid className={cx('logo-bar')}>
                <Container maxWidth='xl'>
                    <div className={cx('logo-wrapper')}>
                        <Link to={config.routes.home}>
                            <img 
                                className={cx('logo')}
                                src={logo} 
                                alt='Logo'
                            />
                        </Link>
                        <div className={cx('search-bar')}>
                            <input type='search'/>
                        </div>
                    </div>
                </Container>
            </Grid>

            <Grid className={cx('menu-bar')}>
                <Container maxWidth='xl' className={cx('menu')}>
                    <Grid xs={4} className={cx('menu-hamburger')}>
                        <FontAwesomeIcon 
                            icon={faBarsIcon}
                            style={{marginRight: '0.5rem'}} 
                        />
                        DANH MỤC SẢN PHẨM
                    </Grid>
                    <Grid xs={8} className={cx('menu-titles')}>
                        <Titles />
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    )
}

export default Header;
