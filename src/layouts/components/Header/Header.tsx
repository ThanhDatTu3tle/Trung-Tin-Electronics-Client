import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames/bind";

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

import styles from './Header.module.scss';
import config from '../../../config';

const cx = classNames.bind(styles)

const faPropIcon = faFacebookF as IconProp;

const Header: React.FC = () => {
    return (
        <Grid>
            <Grid className={cx('address-bar')}>
                <Container maxWidth='xl'>
                    <Box component="div" display="flex" alignItems="center" justifyContent="space-between" textAlign="center">
                        <p style={{ fontSize: '1.2rem' }}>
                            Địa chỉ: 28/17/19F Đường 9A, Bình Hưng Hoà A, Bình Tân, Thành phố Hồ Chí Minh.
                        </p>
                        <div className={cx('icons-social-media')}>
                            <FontAwesomeIcon 
                                icon={faPropIcon} 
                                style={{
                                    color: "#4f7496", 
                                    backgroundColor: '#fff', 
                                    width: '1.5rem', 
                                    height: '1.5rem',
                                    padding: '0.5rem',
                                    borderRadius: '50%'
                                }} 
                            />
                        </div>
                    </Box>                 
                </Container>
            </Grid>

            <Grid className={cx('logo-bar')}>
                <Container maxWidth='xl'>
                    <div className={cx('logo')}>
                        <Link to={config.routes.home}>
                            LOGO
                        </Link>
                    </div>
                </Container>
            </Grid>

            <Grid className={cx('menu-bar')}>
                <Container maxWidth='xl'>
                </Container>
            </Grid>
        </Grid>
    )
}

export default Header;
