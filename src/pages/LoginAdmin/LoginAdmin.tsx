import * as React from 'react';
import { useState } from 'react';
import classNames from "classnames/bind";

import styles from './LoginAdmin.module.scss';
import logo from '../../assets/logo.png';
import Button from '../../components/Button';

const cx = classNames.bind(styles)

const LoginAdmin: React.FC<any> = ({ handleLogin }) => {
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 

    // Hàm xử lý khi nhập username
    const handleUsernameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setUsername(event.target.value);
    };

    // Hàm xử lý khi nhập password
    const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(event.target.value);
    };

    // Hàm xử lý khi nhấn nút đăng nhập
    const handleLoginClick = () => {
        handleLogin(username, password);
    };

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
                    <input 
                        type='text' 
                        placeholder='Tên đăng nhập' 
                        className={cx('input-name')}
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <br />
                    <input 
                        type='text' 
                        placeholder='Mật khẩu' 
                        className={cx('input-pass')}
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <br />
                </div>
                <Button primary small onClick={handleLoginClick}>Đăng nhập</Button>
                <br />
            </div>
        </div>
    )
}

export default LoginAdmin;
