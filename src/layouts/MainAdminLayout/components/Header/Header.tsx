import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames/bind";

import Grid from '@mui/material/Grid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import logo from '../../../../assets/logo.png';
import InputSearch from '../../../../components/InputSearch';
import Button from '../../../../components/Button';

const cx = classNames.bind(styles);

const faBarsIcon = faBars as IconProp;
const faGearIcon = faGear as IconProp;

const Header: React.FC<any> = () => {
  return (
    <Grid container className={cx('wrapper')}>
        <Grid md={2} className={cx('left-function')}>
            <div className={cx('logo-brand')}>
                <img 
                    className={cx('logo')}
                    src={logo} 
                    alt='Logo'
                />
                <p style={{fontSize: '1.2rem'}}>Trung Tín</p>
            </div>
            <div className={cx('menu-hamburger')}>
                <FontAwesomeIcon icon={faBarsIcon} />
            </div>
        </Grid>
      
        <Grid md={10} className={cx('right-function')}>
            <div className={cx('search-bar')}>
                <InputSearch />
            </div>
            <div className={cx('button-manage')}>
                <img 
                    className={cx('avatar')}
                    src={logo} 
                    alt='Avatar'
                />
                <FontAwesomeIcon icon={faGearIcon} style={{color: '#018ec3'}}/>
            </div>
        </Grid>
    </Grid>
  );
}

export default Header;
