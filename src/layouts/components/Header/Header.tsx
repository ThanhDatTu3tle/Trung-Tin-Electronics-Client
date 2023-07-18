import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames/bind";

import { styled, alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

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
import Category from '../../../components/Category';
import SocialMedia from '../../../components/SocialMedia';

const cx = classNames.bind(styles)

const faFacebookIcon = faFacebookF as IconProp;
const faYoutubeIcon = faYoutube as IconProp;
const faAddressIcon = faLocationDot as IconProp;
const faPhoneIcon = faPhoneVolume as IconProp;
const faClockIcon = faClock as IconProp;
const faBarsIcon = faBars as IconProp;

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(0),
      marginLeft: theme.spacing(0),
      width: 'auto',
    },
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 0, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(2)})`,
      paddingRight: `calc(1em + ${theme.spacing(1)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
}));

let screenWidth = window.innerWidth;

function updateScreenSize() {
  screenWidth = window.innerWidth;

  console.log("Width: " + screenWidth);
}

updateScreenSize();

window.addEventListener("resize", updateScreenSize);

const Header: React.FC = () => {
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
                            {screenWidth >= 940 ? 
                                (
                                    <Search>
                                        <SearchIconWrapper>
                                            <SearchIcon />
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            placeholder="Máy khoan, máy cưa..."
                                            inputProps={{ 'aria-label': 'search' }}
                                        />
                                    </Search>
                                ) : (
                                    <div style={{backgroundColor: "#f5f5f5"}}></div>
                                )
                            }                           
                        </div>
                        <div className={cx('categories')}>
                            {screenWidth >= 940 ? 
                                (
                                    <Category />
                                ) : (
                                    <SocialMedia />
                                )
                            }
                        </div>
                    </div>
                </Container>
            </Grid>

            <Grid className={cx('menu-bar')}>
                <Container maxWidth='xl' className={cx('menu')}>
                    <div className={cx('menu-hamburger')}>
                        <FontAwesomeIcon 
                            icon={faBarsIcon}
                            style={{marginRight: '0.5rem'}} 
                        />
                        DANH MỤC SẢN PHẨM
                    </div>
                    <div className={cx('menu-titles')}>
                        <Titles />
                    </div>
                </Container>
            </Grid>
        </Grid>
    )
}

export default Header;
