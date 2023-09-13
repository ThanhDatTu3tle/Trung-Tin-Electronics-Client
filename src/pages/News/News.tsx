import * as React from 'react';
import classNames from "classnames/bind";

import styles from './News.module.scss';

const cx = classNames.bind(styles)

const News: React.FC<any> = () => {
    return (
        <div className={cx('wrapper')}>
            TIN TỨC
        </div>
    )
}

export default News;
