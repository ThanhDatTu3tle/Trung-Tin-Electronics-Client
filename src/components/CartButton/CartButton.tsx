import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import styles from './CartButton.module.scss';
import Button from '../Button';
import { useCart } from '../../Context/CartContext';
import config from '../../config';

const faCartShoppingIcon = faCartShopping as IconProp;

const cx = classNames.bind(styles);

let screenWidth = window.innerWidth;
function updateScreenSize() {
  screenWidth = window.innerWidth;
}
updateScreenSize();
window.addEventListener('resize', updateScreenSize);

const CartButton: React.FC = () => {
    const { cartItems } = useCart();
  
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  
    return (
      <div className={cx('wrapper')}>
        <Link to={config.routes.cart}>
          {screenWidth >= 800 ? (
            <>
              <Button cart="true">
                <FontAwesomeIcon
                  icon={faCartShoppingIcon}
                  style={{ color: '#fec806', marginRight: '1rem' }}
                />
                Giỏ Hàng ({totalQuantity})
              </Button>
            </>
          ) : (
            <>
              <Button cart="true">
                <FontAwesomeIcon
                  icon={faCartShoppingIcon}
                  style={{ color: '#fec806', marginRight: '1rem' }}
                />
                ({totalQuantity})
              </Button>
            </>
          )}
        </Link>
      </div>
    );
  };
  

export default CartButton;
