import * as React from 'react';
import classNames from "classnames/bind";

import styles from './Introduce.module.scss';

const cx = classNames.bind(styles)

const Introduce: React.FC<any> = () => {
    return (
        <div className={cx('wrapper')}>
            <h3>GIỚI THIỆU</h3>
            <br />
            <div className={cx('content')}>
                <h4>ĐIỆN MÁY TRUNG TÍN - GIỚI THIỆU</h4>
                <i>Xin chào quý khách,</i>
                <p>Với hơn 2 năm kinh nghiệm, 
                    Điện máy Trung Tín đã cung cấp sản phẩm cho nhiều khách hàng
                    và nhận được sự hài lòng gần như tuyệt đối của khách hàng. 
                    Điện máy Trung Tín xin đưa ra 5 lý do hầu hết các phòng thu mua chọn
                    dịch vụ của mình:
                </p>
                <br />
                <h4></h4>
            </div>
        </div>
    )
}

export default Introduce;
