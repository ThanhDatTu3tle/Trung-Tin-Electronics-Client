import * as React from 'react';
import classNames from "classnames/bind";

import styles from './BrandComponent.module.scss';
import Image from "../Image";

const cx = classNames.bind(styles)

const BrandComponent: React.FC<any> = ({ data }) => {

    console.log(data.image)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Image src={data.image.slice(7)}/>
            </div>
        </div>
    )
}

export default BrandComponent;
