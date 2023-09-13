import * as React from 'react';
import classNames from "classnames/bind";

import styles from './Introduce.module.scss';

const cx = classNames.bind(styles)

const Introduce: React.FC<any> = () => {
    return (
        <div className={cx('wrapper')}>
            <h3>GIỚI THIỆU</h3>
        </div>
    )
}

export default Introduce;
