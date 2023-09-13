import * as React from 'react';
import classNames from "classnames/bind";

import styles from './Contact.module.scss';

const cx = classNames.bind(styles)

const Contact: React.FC<any> = () => {
    return (
        <div className={cx('wrapper')}>
            LIÊN HỆ
        </div>
    )
}

export default Contact;
