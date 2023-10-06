import * as React from 'react';
import classNames from "classnames/bind";

import styles from './User.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles)

const User: React.FC<any> = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('left')}>
                    <p style={{ width: 'fit-content', fontWeight: 700 }}>KHÁCH HÀNG</p>
                </div>
                <div className={cx('right')}>
                    <div className={cx('current-position')}>
                        <FontAwesomeIcon
                            icon={faHouse}
                            style={{ paddingRight: '1rem' }}
                        />
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            style={{ width: '1rem', height: '1rem', paddingRight: '1rem' }}
                        />
                        <p>Khách hàng</p>
                    </div>
                </div>
            </div>
            <div className={cx('main-container')}>
                <div className={cx('filter')}>

                </div>
            </div>
        </div>
    )
}

export default User;
