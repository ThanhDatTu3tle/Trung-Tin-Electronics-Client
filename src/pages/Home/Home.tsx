import * as React from 'react';
import classNames from "classnames/bind";

import styles from './Home.module.scss';

const cx = classNames.bind(styles)

const Home: React.FC<any> = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            Ngu
        </div>
    )
}

export default Home;
