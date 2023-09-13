import * as React from 'react';
import classNames from "classnames/bind";

import styles from './Discount.module.scss';

const cx = classNames.bind(styles)

const Discount: React.FC<any> = () => {
    return (
        <div className={cx('wrapper')}>
            KHUYẾN MÃI
        </div>
    )
}

export default Discount;
