import * as React from 'react';
import { useState } from "react";
import classNames from "classnames/bind";

import styles from './CategoryComponent.module.scss';
import Image from "../Image";
import Button from "../Button";

const cx = classNames.bind(styles)

const CategoryComponent: React.FC<any> = ({ data }) => {

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Image src={data.img}/>
                <p>{data.name}</p>
            </div>
        </div>
    )
}

export default CategoryComponent;
