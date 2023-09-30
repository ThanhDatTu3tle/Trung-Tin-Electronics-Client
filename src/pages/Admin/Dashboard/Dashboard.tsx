import React from 'react';
import classNames from "classnames/bind";
import logo from '../../../assets/logo.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Dashboard.module.scss';

const faHouseIcon = faHouse as IconProp;
const faArrowRightIcon = faArrowRight as IconProp;

const cx = classNames.bind(styles);

const Dashboard: React.FC<any> = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('left')}>
          <p style={{width: 'fit-content', fontWeight: 700}}>BẢNG THỐNG KÊ</p>
        </div>
        <div className={cx('right')}>
          <div className={cx('current-position')}>
            <FontAwesomeIcon 
                icon={faHouseIcon}
                style={{paddingRight: '1rem'}} 
            />
            <FontAwesomeIcon 
                icon={faArrowRightIcon}
                style={{width: '1rem', height: '1rem', paddingRight: '1rem'}} 
            />
            <p>Bảng thống kê</p>
          </div>
        </div>
      </div>
      <div className={cx('main-container')}>
        <div className={cx('content-left')}>
          <div className={cx('synthetic')}>
            <div className={cx('logo')}>
              <img 
                src={logo} 
                alt='Avatar'
              />
            </div>
            <div className={cx('info')}>
              <h3>Điện Máy Trung Tín</h3>
              <h5>Thống kê doanh thu năm 2023</h5>
              <div className={cx('revenue')}>
              
              </div>
            </div>
          </div>
          <div className={cx('chart')}>
          
          </div>
        </div>

        <div className={cx('content-left')}>
          <div className={cx('total-balance')}>
            NGU
          </div>
          <div className={cx('total-report')}>
          
          </div>  
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
