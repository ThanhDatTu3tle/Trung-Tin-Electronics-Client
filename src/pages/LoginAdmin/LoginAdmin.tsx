import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import classNames from "classnames/bind";

import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import styles from './LoginAdmin.module.scss';
import logo from '../../assets/logo.png';
import Button from '../../components/Button';
import { AuthContext } from '../../Context/AuthContext';
import LoginQuery from '../../hooks/loginQuery';

const cx = classNames.bind(styles)

const LoginAdmin: React.FC<any> = () => {
    const {token, setToken} = useContext(AuthContext);
    const [username, setUsername] = useState<String | null>(null);
    const [password, setPassword] = useState<String | null>(null);
    const [error1, setError1] = useState(false);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    interface IFormInput {
        username: String|null;
        password: String|null;
    }
      
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormInput>({
        defaultValues:{
          username: username,
          password: password
        } 
    });
      
    const {data, isLoading, isSuccess, refetch} = LoginQuery({username, password});
    
    if(isSuccess) {
        setToken(localStorage.getItem('token')as string);
    }
    useEffect(() => {
        if(token) {
          navigate('/admin')
        }
    }, [token])
    
    const getError = localStorage.getItem('errorlogin') || null;
    
    useEffect(() => {
        if(getError) {
          setIsError(true)
        }
    }, [getError])
      
    useEffect(() => {
        if(username && password) {
          refetch()
          setUsername("")
          setPassword("")
        }
    }, [username, password])
    
    
    const handleLogin: SubmitHandler<IFormInput>= async(res: { username: React.SetStateAction<String | null>; password: React.SetStateAction<String | null>; })=>{
        if(res.username && res.password) {
          console.log(res)
          setUsername(res.username)
          setPassword(res.password)
          setError1(false)
          window.location.href = "/admin"
        } else {
          setError1(true)
          setIsError(false)
        }
    }

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')}>
                <div className={cx('logo-brand')}>
                    <img 
                        className={cx('logo')}
                        src={logo} 
                        alt='Logo'
                    />
                    <h3>Công ty Trung Tín</h3>
                </div>
                <h4 style={{color: '#4f7496'}}>Đăng nhập</h4>
                <div className={cx('inputs')}>
                    <input 
                        type='text' 
                        placeholder='Tên đăng nhập' 
                        className={cx('input-name')}
                        {...register("username", { required: true})}
                    />
                    <br />
                    <input 
                        type='password' 
                        placeholder='Mật khẩu' 
                        className={cx('input-pass')}
                        {...register("password", {required:true})}
                    />
                    <br />
                </div>
                <Button primary small onClick={handleSubmit(handleLogin)}>Đăng nhập</Button>
                <br />
            </form>
        </div>
    )
}

export default LoginAdmin;
