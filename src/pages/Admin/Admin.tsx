// Admin.tsx
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import classNames from "classnames/bind";

import styles from './Admin.module.scss';

const cx = classNames.bind(styles);

const Admin: React.FC<any> = ({ children }) => {

  // Nếu người dùng đã xác thực, hiển thị trang Admin
  return (
    <div className={cx('wrapper')}>
      Admin
    </div>
  );
}

export default Admin;
