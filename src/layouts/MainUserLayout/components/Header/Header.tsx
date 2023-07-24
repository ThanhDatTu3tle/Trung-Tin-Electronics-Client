import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames/bind";

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import config from '../../../../config';
import zaloLogo from '../../../../assets/zalo-icon.png';
import logo from '../../../../assets/logo.png';
import Titles from './MenuTitles';
import Category from '../../../../components/Category';
import SocialMedia from '../../../../components/SocialMedia';
import InputSearch from '../../../../components/InputSearch';

const cx = classNames.bind(styles)

const faFacebookIcon = faFacebookF as IconProp;
const faYoutubeIcon = faYoutube as IconProp;
const faAddressIcon = faLocationDot as IconProp;
const faPhoneIcon = faPhoneVolume as IconProp;
const faClockIcon = faClock as IconProp;
const faBarsIcon = faBars as IconProp;

let screenWidth = window.innerWidth;

function updateScreenSize() {
  screenWidth = window.innerWidth;

  console.log("Width: " + screenWidth);
}

updateScreenSize();

window.addEventListener("resize", updateScreenSize);

const options = [
    'Máy khoan',
    'Máy cắt',
    'Máy mài',
    'Máy pin',
    'Máy điện',
    'Máy xịt rửa',
    'Thiết bị đo',
    'Đồ bảo hộ',
];

const Header: React.FC = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    // const [dropDown, setDropDown] = useState(false);
    // const dropdownRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number,
      ) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
          anchorRef.current &&
          anchorRef.current.contains(event.target as HTMLElement)
        ) {
          return;
        }
    
        setOpen(false);
    };

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
                                    <InputSearch />
                                ) : (
                                    <div style={{backgroundColor: "#f5f5f5", width: '0', height: '0'}}></div>
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
                    {screenWidth >= 580 ? 
                        (
                            <>
                                <div className={cx('menu-hamburger')} onClick={handleToggle}>                      
                                    <div ref={anchorRef}>
                                        <FontAwesomeIcon 
                                            icon={faBarsIcon}
                                            style={{marginRight: '0.5rem'}} 
                                        />
                                    </div>
                                    <Popper
                                        sx={{
                                            zIndex: 1,
                                        }}
                                        open={open}
                                        anchorEl={anchorRef.current}
                                        role={undefined}
                                        transition
                                        disablePortal
                                    >
                                        {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                                width: '200px',
                                                backgroundColor: 'black'
                                            }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList id="split-button-menu" autoFocusItem>
                                                        {options.map((option, index) => (
                                                            <MenuItem
                                                                key={option}
                                                                // disabled={index === 0}
                                                                // selected={index === selectedIndex}
                                                                onClick={(event) => handleMenuItemClick(event, index)}
                                                                sx={{ fontSize: '1.2rem', backgroundColor: '#434343', color: '#fff' }}
                                                            >
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                        )}
                                    </Popper>
                                    DANH MỤC SẢN PHẨM
                                </div>                         
                                <div className={cx('menu-titles')}>
                                    <Titles />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={cx('hamburger')}>
                                    <FontAwesomeIcon 
                                        icon={faBarsIcon}
                                    />
                                </div>
                                <InputSearch />
                                <p className={cx('hotline-mini')}>
                                    0903 382 582
                                </p>
                            </>
                        )
                    }
                </Container>
            </Grid>
        </Grid>
    )
}

export default Header;
