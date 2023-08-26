import React from 'react';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import styles from './CartRow.module.scss';
import Button from '../Button';

const faTrashCanIcon = faTrashCan as IconProp;

const cx = classNames.bind(styles);

const CartRow: React.FC<any> = ({ data, onDeleteProduct }) => {
    const handleDeleteProductClick = () => {
        console.log(data.id);
        onDeleteProduct(data.id);
    };
  
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('image')}>
                    <img className={cx('img')} src={data.imageProducts[0].image} alt=''/>
                </div>
                <div className={cx('name')}>{data.name} {data.id}</div>
                <div className={cx('small-title')}>
                    {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                </div>
                <div className={cx('small-title')}>{data.quantity}</div>
                <div className={cx('small-title')}>
                    {(data.price * data.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
                </div>
                <div className={cx('small-title')}>
                    <Button onClick={handleDeleteProductClick }>
                        <FontAwesomeIcon icon={faTrashCanIcon} style={{ color: '#fec806', fontSize: '2rem' }} />
                    </Button>
                </div>
            </div>

        <div className={cx('line')}></div>
        </div>
    );
  };
  

export default CartRow;
