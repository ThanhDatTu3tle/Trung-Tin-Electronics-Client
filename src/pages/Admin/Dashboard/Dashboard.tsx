import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import classNames from "classnames/bind";
import logo from '../../../assets/logo.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faArrowRight, faKaaba } from '@fortawesome/free-solid-svg-icons';
import { faGem, faMoneyBill1 } from '@fortawesome/free-regular-svg-icons';

import styles from './Dashboard.module.scss';

const cx = classNames.bind(styles);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Thống Kê Bán Hàng 2023',
    },
  },
};

const labels = [
  'January', 
  'February', 
  'March', 
  'April', 
  'May', 
  'June', 
  'July', 
  'August', 
  'September', 
  'October', 
  'November', 
  'December'
];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Doanh Thu',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const Dashboard: React.FC<any> = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('left')}>
          <p style={{ width: 'fit-content', fontWeight: 700 }}>BẢNG THỐNG KÊ</p>
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
              <br />
              <div className={cx('revenue')}>
                <div className={cx('revenue-child')}>
                  <div className={cx('income-icon')}>
                    <FontAwesomeIcon
                      icon={faGem}
                      style={{ width: '2rem', height: '2rem' }}
                    />
                  </div>
                  <div className={cx('parameter')}>
                    <h3>Ngu</h3>
                    <p style={{ fontSize: '1.2rem' }}>Thu nhập</p>
                  </div>
                </div>
                <div className={cx('revenue-child')}>
                  <div className={cx('expense-icon')}>
                    <FontAwesomeIcon
                      icon={faMoneyBill1}
                      style={{ width: '2rem', height: '2rem' }}
                    />
                  </div>
                  <div className={cx('parameter')}>
                    <h3>Ngu</h3>
                    <p style={{ fontSize: '1.2rem' }}>Chi phí</p>
                  </div>
                </div>
                <div className={cx('revenue-child')}>
                  <div className={cx('orders-icon')}>
                    <FontAwesomeIcon
                      icon={faKaaba}
                      style={{ width: '2rem', height: '2rem' }}
                    />
                  </div>
                  <div className={cx('parameter')}>
                    <h3>Ngu</h3>
                    <p style={{ fontSize: '1.2rem' }}>Đơn hàng mới</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cx('chart')}>
            <Line options={options} data={data} />
          </div>
        </div>

        <div className={cx('content-right')}>
          <div className={cx('total-balance')}>
            <div className={cx('parameter')}>
              <h3>Tổng Số Dư</h3>
              <p style={{ fontSize: '1.2rem' }}>Ngu</p>
            </div>
            <div className={cx('logo')}>
              <img
                src='https://shop-point.merku.love/assets/balance-c2e80db3.webp'
                alt='Avatar'
              />
            </div>
          </div>

          <div className={cx('total-report')}>
            <h3>Tóm Tắt Doanh Thu</h3>
            <h5>Tính từ 01/01/2023 - 01/10/2023</h5>
            <div className={cx('total-revenue')}>

            </div>
            <div className={cx('total-expense')}>

            </div>
            <div className={cx('total-profit')}>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
