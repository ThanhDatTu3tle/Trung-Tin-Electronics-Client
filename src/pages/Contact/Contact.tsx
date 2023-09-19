import * as React from 'react';
import classNames from "classnames/bind";

import styles from './Contact.module.scss';

const cx = classNames.bind(styles)

const Contact: React.FC<any> = () => {
    return (
        <div className={cx('wrapper')}>
            <h3>LIÊN HỆ</h3>
            <br />
            <div className={cx('content')}></div>
        </div>
    )
}

export default Contact;
