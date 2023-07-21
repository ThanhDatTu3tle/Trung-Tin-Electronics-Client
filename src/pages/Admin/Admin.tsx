// Admin.tsx
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import classNames from "classnames/bind";

import styles from './Admin.module.scss';

const cx = classNames.bind(styles);

const Admin: React.FC<any> = ({ isAuthenticated }) => {
  useEffect(() => {
    // Code bên trong useEffect sẽ được thực thi mỗi khi isAuthenticated thay đổi
    console.log('isAuthenticated changed:', isAuthenticated);
  }, [isAuthenticated]);

  // Kiểm tra xem người dùng đã xác thực hay chưa
  if (!isAuthenticated) {
    // Nếu người dùng chưa xác thực, điều hướng về trang login
    return <Navigate to="/login" replace />;
  }

  // Nếu người dùng đã xác thực, hiển thị trang Admin
  return (
    <div className={cx('wrapper')}>
      Admin
    </div>
  );
}

export default Admin;
