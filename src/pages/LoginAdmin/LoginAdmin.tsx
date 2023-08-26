import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import 'sweetalert2/dist/sweetalert2.min.css';
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import styles from './LoginAdmin.module.scss';
import logo from '../../assets/logo.png';
import Button from '../../components/Button';
import { AuthContext } from '../../Context/AuthContext';
import { LoginQuery, Login } from '../../hooks/loginQuery';

const cx = classNames.bind(styles)

const LoginAdmin: React.FC<any> = () => {
  const MySwal = withReactContent(Swal);
  const { token, setToken } = useContext(AuthContext);
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const navigate = useNavigate();

  type IFormInput = {
    username: string | null;
    password: string | null;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      username: username,
      password: password,
    },
  });

  const { refetch } = LoginQuery({ username, password });

  const isTokenValid = (token: string | null): boolean => {
    if (!token) return false;

    const tokenData = JSON.parse(atob(token.split('.')[1]));
    const expireAt = tokenData.exp * 1000;

    return Date.now() < expireAt;
  };

  useEffect(() => {
    // Kiểm tra xem token có hiệu lực không
    if (isTokenValid(token)) {
      navigate('/admin'); // Điều hướng đến trang admin nếu token hợp lệ
    }
  }, [navigate, token]);

  const handleLogin: SubmitHandler<IFormInput> = async (res) => {
    if (res.username && res.password) {
      try {
        const { data } = await Login(res.username, res.password);
        console.log('Data from server:', data); // In dữ liệu từ server để kiểm tra cấu trúc
        setToken(data.token);
        setUsername("");
        setPassword("");
        MySwal.fire({
          title: 'Đăng nhập thành công!',
          icon: 'success',
          didOpen: () => {
            MySwal.showLoading();
          },
          timer: 1500,
        });
        navigate('/admin');
      } catch (error) {
        MySwal.fire({
          title: 'Đăng nhập thành công!',
          icon: 'success',
          didOpen: () => {
            MySwal.showLoading();
          },
          timer: 1500,
        });
        navigate('/admin');
        console.error('Error from server:', error); // Log lỗi từ server
      }
    }
    // Xử lý khi không có username hoặc password
  };

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
        <h4 style={{ color: '#4f7496' }}>Đăng nhập</h4>
        <div className={cx('inputs')}>
          <input
            type='text'
            placeholder='Tên đăng nhập'
            className={cx('input-name')}
            {...register("username", { required: true })}
          />
          <br />
          <input
            type='password'
            placeholder='Mật khẩu'
            className={cx('input-pass')}
            {...register("password", { required: true })}
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
