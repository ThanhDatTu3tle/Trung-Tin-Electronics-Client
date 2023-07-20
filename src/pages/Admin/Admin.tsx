import * as React from 'react';
import classNames from "classnames/bind";

import styles from './Admin.module.scss';

const cx = classNames.bind(styles)

const Admin: React.FC<any> = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            Admin
        </div>
    )
}

export default Admin;
