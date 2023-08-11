import * as React from 'react';
import classNames from "classnames/bind";

import Grid from '@mui/material/Grid';

import styles from './MainAdminLayout.module.scss';
import Header from '../MainAdminLayout/components/Header';
import SideNav from './components/SideNav/SideNav';

const cx = classNames.bind(styles)

const MainAdminLayout: React.FC<any> = ({ children }) => {
    return (
        <Grid container>
            <Header/>
            <Grid container className={cx('wrapper')}>
                <Grid item md={2}>
                    <SideNav />
                </Grid>
                <Grid item md={10} className={cx('content')}>
                    {children}
                </Grid>
            </Grid>  
        </Grid>
    )
}

export default MainAdminLayout;
