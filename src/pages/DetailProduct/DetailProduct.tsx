import classNames from "classnames/bind";

import styles from './DetailProduct.module.scss';

const cx = classNames.bind(styles)

const DetailProduct: React.FC = () => {
    return (
        <div className={cx('wrapper')}>
            CHI TIẾT SẢN PHẨM
        </div>
    )
}

export default DetailProduct;
