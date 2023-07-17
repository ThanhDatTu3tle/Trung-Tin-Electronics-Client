import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames/bind";

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import config from '../../../config';
import zaloLogo from '../../../assets/zalo-icon.png';
import logo from '../../../assets/logo.png';

const cx = classNames.bind(styles)

const faFacebookIcon = faFacebookF as IconProp;
const faYoutubeIcon = faYoutube as IconProp;
const faAddressIcon = faLocationDot as IconProp;
const faPhoneIcon = faPhoneVolume as IconProp;
const faClockIcon = faClock as IconProp;

const Header: React.FC = () => {
    return (
        <Grid>
            <Grid className={cx('address-bar')}>
                <Container maxWidth='xl'>
                    <div className={cx('bar')}>
                        <div className={cx('address')}>
                            <p style={{ fontSize: '0.8rem' }}>
                                <span>
                                    <FontAwesomeIcon 
                                        icon={faAddressIcon}
                                        style={{marginRight: '0.2rem'}} 
                                    />
                                </span>
                                Địa chỉ: 28/17/19F Đường 9A, Bình Hưng Hoà A, Bình Tân, Thành phố Hồ Chí Minh
                            </p>
                            <p style={{ fontSize: '0.8rem' }}>
                                <span>
                                    <FontAwesomeIcon 
                                        icon={faPhoneIcon}
                                        style={{marginRight: '0.2rem'}} 
                                    />
                                </span>
                                Hotline: 0903 382 582
                            </p>
                            <p style={{ fontSize: '0.8rem' }}>
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
                            <FontAwesomeIcon 
                                icon={faFacebookIcon} 
                                style={{
                                    color: "#4f7496", 
                                    backgroundColor: '#fff', 
                                    width: '1rem', 
                                    height: '1rem',
                                    padding: '0.5rem',
                                    borderRadius: '50%',
                                    marginRight: '1rem'
                                }} 
                            />
                            <FontAwesomeIcon 
                                icon={faYoutubeIcon} 
                                style={{
                                    color: "#e50914", 
                                    backgroundColor: '#fff', 
                                    width: '1rem', 
                                    height: '1rem',
                                    padding: '0.5rem',
                                    borderRadius: '50%',
                                    marginRight: '1rem'
                                }} 
                            />
                            <div>
                                <img 
                                    src={zaloLogo} 
                                    alt='Zalo logo' 
                                    style={{
                                        backgroundColor: '#fff', 
                                        width: '2rem',
                                        height: '2rem',
                                        padding: '0.1rem',
                                        borderRadius: '50%',
                                        marginTop: '0.5rem'
                                    }}
                                />
                            </div>
                        </div>
                    </div>                 
                </Container>
            </Grid>
            
            <Grid className={cx('logo-bar')}>
                <Container maxWidth='xl'>
                    <div className={cx('logo')}>
                        <Link to={config.routes.home}>
                            <img 
                                src={logo} 
                                alt='Logo'
                                style={{
                                    backgroundColor: '#fff', 
                                    width: '10rem',
                                    height: '10rem',
                                    marginTop: '0.5rem',
                                    marginBottom: '0.1rem',
                                    marginLeft: '5rem',
                                    marginRight: '5rem',
                                }}
                            />
                        </Link>
                        <div className={cx('search-bar')}>
                            <input type='search'/>
                        </div>
                    </div>
                </Container>
            </Grid>

            <Grid className={cx('menu-bar')}>
                <Container maxWidth='xl'>
                    <div className={cx('menu')}>
                        DANH MỤC SẢN PHẨM
                    </div>
                </Container>
            </Grid>
        </Grid>
    )
}

export default Header;
