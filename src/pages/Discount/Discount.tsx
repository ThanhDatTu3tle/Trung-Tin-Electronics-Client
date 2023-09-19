import * as React from 'react';
import classNames from "classnames/bind";

import styles from './Discount.module.scss';

const cx = classNames.bind(styles)

const Discount: React.FC<any> = () => {
    return (
        <div className={cx('wrapper')}>
            <h3>KHUYẾN MÃI</h3>
            <br />
            <h4>Hiện vẫn chưa có khuyến mãi mới</h4>
            <div className={cx('content')}>

            </div>
    </div>
    )
}

export default Discount;
