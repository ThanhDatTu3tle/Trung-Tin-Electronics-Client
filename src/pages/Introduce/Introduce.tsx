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
                <h4>ĐIỆN MÁY TRUNG TÍN</h4>
                <i>Xin chào quý khách,</i>
                <p>Với hơn 2 năm kinh nghiệm, 
                    Điện Máy Trung Tín đã cung cấp sản phẩm cho nhiều khách hàng
                    và nhận được sự hài lòng gần như tuyệt đối của khách hàng. 
                    Điện Máy Trung Tín xin đưa ra 3 lý do hầu hết các phòng thu mua chọn
                    dịch vụ của mình:
                </p>
                <br />
                <h4>1. Giá Cả Cạnh Tranh Nhất:</h4>
                <p>Giá cả luôn là yếu tố quan trọng nhất, 
                    quý khách có thể thấy giá cả của Điện Máy Trung Tín 
                    luôn cạnh tranh nhất nhờ vào ưu thế đại lý. 
                    Trường hợp quý khách tin tưởng Điện Máy Trung Tín 
                    nhưng thấy giá chưa cạnh tranh hãy liên hệ
                    với Điện Máy Trung Tín qua số điện thoại hotline 
                    <i> 0903 382 582 </i> 
                    để nhận được giá tốt nhất. 
                </p>
                <br />
                <h4>2. Phương Thức Thanh Toán Linh Hoạt:</h4>
                <p>Để thuận tiên cho phòng thu mua Điện Máy Trung Tín 
                    luôn có chính sách thanh toán linh hoạt: 
                    thanh toán khi nhận hàng, 
                    chính sách chiết khấu hấp dẫn với đơn hàng giá trị cao. 
                    Với các đơn hàng giá trị lớn quý khách hãy liên hệ 
                    trực tiếp với Điện Máy Trung Tín hoặc qua số điện thoại
                    hotline <i> 0903 382 582 </i> để trao đổi 
                    phương thức thanh toán phù hợp.
                </p>
                <br />
                <h4>3. Báo Giá Nhanh & Đảm Bảo Đủ Các Mẫu Sản Phẩm:</h4>
                <p>Đa phần đơn hàng của quý khách thường có nhiều sản phẩm, 
                    với yêu cầu đa dạng về tính năng chi tiết nhưng chưa rõ mã sản phẩm 
                    và thương hiệu. Với kinh nghiệm 2 năm Điện Máy Trung Tín 
                    sẽ nhanh chóng tìm được dòng sản phẩm phù hợp với yêu cầu
                    của quý khách và sẽ tư vấn nhiệt tình cũng như đầy đủ nhất.
                </p>
            </div>
        </div>
    )
}

export default Introduce;
