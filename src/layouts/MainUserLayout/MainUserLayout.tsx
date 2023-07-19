import * as React from 'react';
import classNames from "classnames/bind";

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import styles from './MainUserLayout.module.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';

const cx = classNames.bind(styles)

const MainUserLayout: React.FC<any> = ({ children }) => {
    return (
        <Grid>
            <Header/>
            <Container maxWidth='xl'>
                <div className={cx('content')}>
                    {children}
                </div>  
            </Container>
            <Footer />
        </Grid>
    )
}

export default MainUserLayout;
