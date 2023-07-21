import React from 'react';
import classNames from "classnames/bind";

import styles from './Dashboard.module.scss';

const cx = classNames.bind(styles);

const Dashboard: React.FC<any> = () => {
  return (
    <div className={cx('wrapper')}>
      DASHBOARD
    </div>
  );
}

export default Dashboard;
