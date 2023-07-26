import * as React from 'react';
import classNames from "classnames/bind";

import styles from './BrandComponent.module.scss';
import Image from "../Image";

const cx = classNames.bind(styles)

const BrandComponent: React.FC<any> = ({ data }) => {

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <p>{data.name}</p>
                <Image src={data.image}/>
            </div>
        </div>
    )
}

export default BrandComponent;
