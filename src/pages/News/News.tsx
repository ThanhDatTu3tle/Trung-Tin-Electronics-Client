import * as React from 'react';
import classNames from "classnames/bind";

import styles from './News.module.scss';

const cx = classNames.bind(styles)

const News: React.FC<any> = () => {
    return (
        <div className={cx('wrapper')}>
            <h3>TIN TỨC</h3>
            <br />
            <h4>Hiện vẫn chưa có tin tức mới</h4>
            <div className={cx('content')}>

            </div>
        </div>
    )
}

export default News;
