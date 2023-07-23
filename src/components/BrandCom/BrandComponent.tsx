import * as React from 'react';
import classNames from "classnames/bind";

import styles from './BrandComponent.module.scss';
import Image from "../Image";

const cx = classNames.bind(styles)

const BrandComponent: React.FC<any> = ({ data }) => {

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Image src={data.img}/>
            </div>
        </div>
    )
}

export default BrandComponent;
