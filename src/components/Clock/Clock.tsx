import * as React from 'react';
import classNames from "classnames/bind";

import styles from './Clock.module.scss';

const cx = classNames.bind(styles);

const Clock: React.FC<any> = () => {
    const dateObj = new Date();
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                {`Ngày ${day} tháng ${month} ${hours}:${minutes}`}
            </div>
        </div>
    );
}

export default Clock;
