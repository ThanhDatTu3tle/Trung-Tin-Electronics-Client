import * as React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import classNames from "classnames/bind";

import styles from './Cart.module.scss';
import CartRow from '../../components/CartRow';
import ProductService from '../../service/ProductService';

const cx = classNames.bind(styles);

const Cart: React.FC<any> = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const cartData = JSON.parse(localStorage.getItem('cart') || "[]");

    useEffect(() => {
        const fetchProductDetails = async (productId: string) => {
            try {
                const res = await ProductService.GetProduct(productId);
                return res.data;
            } catch (error) {
                console.error(error);
                return null;
            }
        };

        const fetchAllProductDetails = async () => {
            const productDetails = await Promise.all(
                cartData.map(async (cartItem: { productId: string, quantity: number }) => {
                    const productDetail = await fetchProductDetails(cartItem.productId);
                    if (productDetail) {
                        return {
                            ...productDetail,
                            quantity: cartItem.quantity
                        };
                    }
                    return null;
                })
            );

            setProducts(productDetails.filter(product => product !== null));
            setIsLoadingProducts(false); // Kết thúc việc gọi API
        };

        if (isLoadingProducts) {
            fetchAllProductDetails();
        }
    }, [isLoadingProducts, cartData]);

    const handleDeleteProduct = (productId: string) => {
        // Loại bỏ sản phẩm có productId khỏi danh sách products
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);

        // Cập nhật danh sách sản phẩm trong localStorage
        const updatedCartData = cartData.filter((item: { productId: string; }) => item.productId !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCartData));

        // Đặt isLoadingProducts thành true để gọi API lại
        setIsLoadingProducts(true);
    };

    return (
        <div className={cx('wrapper')}>
            <h3>GIỎ HÀNG</h3>
            <br />
            <div className={cx('table')}>
                <div className={cx("titles")}>
                    <div className={cx("image")}>Hình ảnh</div>
                    <div className={cx("name")}>Tên sản phẩm</div>
                    <div className={cx("small-title")}>Giá tiền</div>
                    <div className={cx("small-title")}>Số lượng</div>
                    <div className={cx("small-title")}>Tổng giá</div>
                    <div className={cx("small-title")}>Xóa</div>
                </div>

                <div className={cx("information")}>
                {products.map((product) => (
                    <CartRow key={product.id} data={product} onDeleteProduct={handleDeleteProduct} />
                ))}
                </div>
            </div>
        </div>
    );
};

export default Cart;
