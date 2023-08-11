import { useState  } from 'react';
import classNames from "classnames/bind";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import styles from './DetailProduct.module.scss';
import Button from "../../components/Button";
import Image from '../../components/Image';

const faStarIcon = faStar as IconProp;

const cx = classNames.bind(styles);

const data = {
    'id': 'M21-IW520NCP',
    'name': 'MÁY SIẾT BULONG',
    'description': 'THÔNG SỐ KỸ THUẬT SÚNG BẮN BULONG PIN DEKTON M21-IW520NCP Thương hiệu: DEKTON Mẫu máy: M21-IW520NCP Sản xuất: Trung Quốc Bảo hành: 6 tháng Motor: BRUSHLESS Điện áp: 21v Đầu 1/2 (17mm) Tốc độ không tải: 0-2300 v/p Tốc độ 1: 0 – 1100v/p Tốc độ 2: 0 – 1700v/p Tốc độ 3: 0 – 2300v/p Chân Pin: Makita thông dụng',
    "specification": [
        {
            "id": 1,
            "idProduct": "M21-IW520NCP",
            "specification": "Thương hiệu: DEKTON"
        },
        {
            "id": 2,
            "idProduct": "M21-IW520NCP",
            "specification": "Mẫu máy: M21-IW520NCP"
        },
        {
            "id": 3,
            "idProduct": "M21-IW520NCP",
            "specification": "Sản xuất: Trung Quốc"
        },
        {
            "id": 4,
            "idProduct": "M21-IW520NCP",
            "specification": "Bảo hành: 6 tháng"
        },
        {
            "id": 5,
            "idProduct": "M21-IW520NCP",
            "specification": "Motor: BRUSHLESS"
        },
        {
            "id": 6,
            "idProduct": "M21-IW520NCP",
            "specification": "Điện áp: 21v"
        },{
            "id": 7,
            "idProduct": "M21-IW520NCP",
            "specification": "Đầu 1/2 (17mm)"
        },
        {
            "id": 8,
            "idProduct": "M21-IW520NCP",
            "specification": "Tốc độ không tải: 0-2300 v/p"
        },
        {
            "id": 9,
            "idProduct": "M21-IW520NCP",
            "specification": "Tốc độ 1: 0 – 1100v/p"
        },
        {
            "id": 10,
            "idProduct": "M21-IW520NCP",
            "specification": "Tốc độ 2: 0 – 1700v/p"
        },
        {
            "id": 11,
            "idProduct": "M21-IW520NCP",
            "specification": "Tốc độ 3: 0 – 2300v/p"
        },
        {
            "id": 12,
            "idProduct": "M21-IW520NCP",
            "specification": "Chân Pin: Makita thông dụng"
        }
    ],
    "imageProducts": [
        {
            "id": 1,
            "image": "https://storethietbi.com/product/500x490x1/upload/product/m21-iw520ncp-may-siet-bulong-pin-dekton-6895_500x490.jpg",
            "idProduct": "M21-IW520NCP"
        },
        {
            "id": 2,
            "image": "https://storethietbi.com/product/500x490x1/upload/product/z4334500546487fd059e50194fbec63ec4d81147899e46-453_500x490.jpg",
            "idProduct": "M21-IW520NCP"
        },
        {
            "id": 3,
            "image": "https://storethietbi.com/product/500x490x1/upload/product/z43345005424893070bcf463e472f0ea87378d3c38a7d1-5189_500x490.jpg",
            "idProduct": "M21-IW520NCP"
        },
        {
            "id": 4,
            "image": "https://storethietbi.com/product/500x490x1/upload/product/z4334500535458764facd8838bff8e9ec958407d822d88-1047_500x490.jpg",
            "idProduct": "M21-IW520NCP"
        }
    ],
    'price': 1710000,
    'brand': 'Dekton',
    'category': 'Máy siết',
    'status': true,
    'id_event': '50%',
}

const DetailProduct: React.FC = () => {
    const [count, setCount] = useState(0);
    const handleMinus = () => {
        if (count <= 0) {
            return count;
        } else {
            setCount(count - 1);
        }
    }
    const handleAdd = () => {
        setCount(count + 1);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-detail')}>
                <ul className={cx('list-title')}>
                    <li>
                        <a href="http://192.168.0.115:3000/" title="Sản phẩm">Trang chủ</a>
                        &nbsp;&nbsp;»&nbsp;&nbsp;
                    </li>
                    <li>
                        <a href="http://192.168.0.115:3000/" title="Sản phẩm">Tên danh mục</a>
                        &nbsp;&nbsp;»&nbsp;&nbsp;
                    </li>
                    <li>
                        <a href="http://192.168.0.115:3000/" title="Sản phẩm">Tên sản phẩm</a>
                    </li>
                </ul>
            </div>

            <div className={cx('product-info')}>
                <div className={cx('product-images')}>
                    <br />
                    <Image src={data.imageProducts[0].image}/>
                </div>
                <div className={cx('main-info')}>
                    <br/>
                    <p className={cx('name')}>{data.name} {data.id}</p>
                    <p className={cx('text')}>Giá: {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</p>
                    <div className={cx('stars')}>
                        <FontAwesomeIcon icon={faStarIcon} style={{color: "#fec806",}} />
                        <FontAwesomeIcon icon={faStarIcon} style={{color: "#fec806",}} />
                        <FontAwesomeIcon icon={faStarIcon} style={{color: "#fec806",}} />
                        <FontAwesomeIcon icon={faStarIcon} style={{color: "#fec806",}} />
                        <FontAwesomeIcon icon={faStarIcon} style={{color: "#fec806",}} />
                    </div>
                    <p className={cx('text')}>Mã sản phẩm: {data.id}</p>
                    {data.status === true ? (
                        <>
                            <p className={cx('text')}>Tình trạng: Còn hàng</p>
                        </>
                    ) : (
                        <>
                            <p className={cx('text')}>Tình trạng: Hết hàng</p>
                        </>
                    )}
                    <p className={cx('description')}>
                        {data.description}
                    </p>
                    <p className={cx('quantity')}>
                        Số lượng:
                        <div className={cx('count')}>
                            <Button primary small onClick={handleMinus}>-</Button>
                            <Button outline large>{count}</Button>
                            <Button primary small onClick={handleAdd}>+</Button>
                        </div>                      
                    </p>
                    <br />
                    <Button primary>Mua sản phẩm</Button>
                </div>
            </div>
        </div>
    )
}

export default DetailProduct;
