import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames/bind";

import Grid from '@mui/material/Grid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faGear } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import config from '../../../../config';
import logo from '../../../../assets/logo.png';

const cx = classNames.bind(styles);

const Header: React.FC<any> = () => {
    return (
        <Grid container className={cx('wrapper')}>
            <Grid item md={2} className={cx('left-function')}>
                <div className={cx('logo-brand')}>
                    <Link to={config.routes.home}>
                        <img
                            className={cx('logo')}
                            src={logo}
                            alt='Logo'
                        />
                    </Link>
                    <p style={{ fontSize: '1.2rem' }}>Trung Tín</p>
                </div>
                <div className={cx('menu-hamburger')}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </Grid>

            <Grid item md={10} className={cx('right-function')}>
                <div className={cx('search-bar')}>
                    <input
                        id="search"
                        type='text'
                        placeholder='Tìm kiếm sản phẩm'
                        className={cx('input-name')}
                    />
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        style={{ position: 'absolute', left: '270px', pointerEvents: 'none', color: '#888' }}
                    />
                </div>
                <div className={cx('button-manage')}>
                    <img
                        className={cx('avatar')}
                        src={logo}
                        alt='Avatar'
                    />
                    <FontAwesomeIcon icon={faGear} style={{ color: '#018ec3' }} />
                </div>
            </Grid>
        </Grid>
    );
}

export default Header;
