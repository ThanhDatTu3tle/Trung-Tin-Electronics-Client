import * as React from 'react';
import classNames from "classnames/bind";

import styles from './LoginAdmin.module.scss';
import logo from '../../assets/logo.png';
import Button from '../../components/Button';

const cx = classNames.bind(styles)

const LoginAdmin: React.FC<any> = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('form')}>
                <div className={cx('logo-brand')}>
                    <img 
                        className={cx('logo')}
                        src={logo} 
                        alt='Logo'
                    />
                    <p>Công ty Trung Tín</p>
                </div>
                <h4 style={{color: '#4f7496'}}>Đăng nhập</h4>
                <div className={cx('inputs')}>
                    <input type='text' placeholder='Tên đăng nhập' className={cx('input-name')}/>
                    <br />
                    <input type='password' placeholder='Mật khẩu' className={cx('input-pass')}/>
                    <br />
                </div>
                <Button primary small>Đăng nhập</Button>
                <br />
            </div>
        </div>
    )
}

export default LoginAdmin;
