import * as React from 'react';
import classNames from "classnames/bind";

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import styles from './MainAdminLayout.module.scss';
import Header from '../MainAdminLayout/components/Header';
import Titles from './components/SideNav/Menu/Titles';
import SideNav from './components/SideNav/SideNav';

const cx = classNames.bind(styles)

const MainAdminLayout: React.FC<any> = ({ children }) => {
    return (
        <Grid>
            <Header/>
            <Grid container className={cx('wrapper')}>
                <Grid md={2}>
                    <SideNav />
                </Grid>
                <Grid md={10} className={cx('content')}>
                    {children}
                </Grid>
            </Grid>  
        </Grid>
    )
}

export default MainAdminLayout;
