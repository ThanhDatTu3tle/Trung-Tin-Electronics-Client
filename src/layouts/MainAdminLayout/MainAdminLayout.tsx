import * as React from 'react';
import classNames from "classnames/bind";

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import styles from './MainAdminLayout.module.scss';

const cx = classNames.bind(styles)

const MainAdminLayout: React.FC<any> = ({ children }) => {
    return (
        <Grid>
            <Container maxWidth='xl'>
                <div className={cx('content')}>
                    {children}
                </div>  
            </Container>
        </Grid>
    )
}

export default MainAdminLayout;
