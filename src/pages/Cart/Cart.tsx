import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import classNames from "classnames/bind";

import styles from './Cart.module.scss';
import CartRow from '../../components/CartRow';
import ProductService from '../../service/ProductService';
import Button from '../../components/Button';
import { axiosClient } from '../../axios';

const cx = classNames.bind(styles);

const Cart: React.FC<any> = () => {
    const history = useNavigate();

    const [products, setProducts] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const cartData = JSON.parse(localStorage.getItem('cart') || "[]");

    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [provinces, setProvinces] = useState<{ 
        name: string; 
        code: number;
        division_type: string;
        codename: string;
        phone_code: number; 
    }[]>([]);
    const [districts, setDistricts] = useState<{ 
        name: string; 
        code: number;
        division_type: string;
        codename: string;
        province_code: number;
    }[]>([]);
    const [wards, setWards] = useState<{
        name: string;
        code: number;
        division_type: string;
        codename: string;
        district_code: number;
    }[]>([]);
    const [address, setAddress] = useState('');
    const [content, setContent] = useState('');

    const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(event.target.value);
    };
    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    };
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const responseProvinces = await fetch("https://provinces.open-api.vn/api/p");
                const dataProvinces = await responseProvinces.json();
                setProvinces(dataProvinces);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProvinces();
    }, []);
    const handleProvinceChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProvinceCode = Number(event.target.value);
        
        try {
            const response = await fetch(`https://provinces.open-api.vn/api/d`);
            const data = await response.json();
    
            const selectedDistricts = data.filter((district: { province_code: number; }) => district.province_code === selectedProvinceCode);
            
            setDistricts(selectedDistricts);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const responseDistricts = await fetch("https://provinces.open-api.vn/api/w");
                const dataDistricts = await responseDistricts.json();
                setDistricts(dataDistricts);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDistricts();
    }, []);
    const handleDistrictChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDistrictCode = Number(event.target.value);
        
        try {
            const response = await fetch(`https://provinces.open-api.vn/api/w`);
            const data = await response.json();
    
            const selectedWards = data.filter((ward: { district_code: number; }) => ward.district_code === selectedDistrictCode);
            
            setWards(selectedWards);
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };
    const handleContentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setContent(event.target.value);
    };

    if (cartData.length === 0) {
        history("/");
    }

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
            setIsLoadingProducts(false); 
        };

        if (isLoadingProducts) {
            fetchAllProductDetails();
        }
    }, [isLoadingProducts, cartData]);

    const handleDeleteProduct = (productId: string) => {
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);

        const updatedCartData = cartData.filter((item: { productId: string; }) => item.productId !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCartData));
        window.location.reload();

        setIsLoadingProducts(true);

        if (updatedProducts.length === 0) {
            history("/");
            window.location.reload();
        }
    };

    useEffect(() => {
        const calculateTotalPrice = () => {
            const totalPrice = products.reduce((total, product) => {
                return total + product.price * product.quantity;
            }, 0);
            setTotalPrice(totalPrice);
        };

        calculateTotalPrice();
    }, [products]);

    const handleOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // Tạo một đối tượng FormData để chứa dữ liệu cần gửi
        const formData = new FormData();
    
        // Thêm thông tin cá nhân của người dùng vào formData
        formData.append('fullName', fullName);
        formData.append('phoneNumber', phoneNumber);
        formData.append('email', email);
        formData.append('address', address);
        formData.append('content', content);
    
        // Thêm thông tin sản phẩm trong giỏ hàng vào formData
        products.forEach((product, index) => {
            formData.append(`products[${index}].id`, product.id);
            formData.append(`products[${index}].quantity`, product.quantity.toString());
            // Thêm các thông tin khác của sản phẩm nếu cần
        });
    
        // Thêm tổng giá vào formData
        formData.append('totalPrice', totalPrice.toString());
    
        // Thực hiện cuộc gọi POST với axios hoặc phương thức bạn sử dụng
        try {
            const response = await axiosClient.post('invoice/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Đảm bảo đúng Content-Type
                },
            });
    
            // Xử lý phản hồi từ server (nếu cần)
            console.log('Response from server:', response);
        } catch (error) {
            console.error('Error:', error);
        }
    }

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
            <div className={cx('result')}>
                    <h4>Tổng giá: {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</h4>
            </div>
            <br />
            <div className={cx('add-form')}>
                <form action="/upload" method="post" onSubmit={(event) => handleOrder(event)}>  
                    <h3>THÔNG TIN KHÁCH HÀNG</h3>
                    <div className={cx('inputs')}>
                        <input 
                            id="customer_name"
                            type='text' 
                            placeholder='Họ và tên' 
                            className={cx('input')}
                            value={fullName}
                            onChange={handleFullNameChange}
                        />
                        <input 
                            id="phone"
                            type='text' 
                            placeholder='Số điện thoại' 
                            className={cx('input')}
                            value={phoneNumber}
                            onChange={handlePhoneChange}
                        />
                        <input 
                            id="email"
                            type='text' 
                            placeholder='Email' 
                            className={cx('input')}
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <select
                            name="province"
                            className={cx('input')}
                            onChange={handleProvinceChange}
                        >
                            <option value="">Chọn tỉnh/thành phố</option>
                            {provinces.map((province) => (
                                <option key={province.code} value={province.code}>
                                    {province.name}
                                </option>
                            ))}
                        </select>
                        <select
                            name="district"
                            className={cx('input')}
                            onChange={handleDistrictChange}
                        >
                            <option value="">Chọn quận/huyện</option>
                            {districts.map((district) => (
                                <option key={district.code} value={district.code}>
                                    {district.name} 
                                </option>
                            ))}
                        </select>
                        <select
                            name="ward"
                            className={cx('input')}
                        >
                            <option value="">Chọn phường/xã</option>
                            {wards.map((ward) => (
                                <option key={ward.code} value={ward.code}>
                                    {ward.name}
                                </option>
                            ))}
                        </select>
                        <input 
                            id="address"
                            type='text' 
                            placeholder='Địa chỉ' 
                            className={cx('input')}
                            value={address}
                            onChange={handleAddressChange}
                        />
                        <label htmlFor="content">Nội dung:</label>
                        <textarea
                            id="content"
                            name="content"
                            value={content}
                            onChange={handleContentChange}
                            rows={3} 
                        />
                    </div>
                </form>            
                <div className={cx('buttons')}>
                    <div className={cx('confirm')}>
                        <Button primary onClick={handleOrder}>Tiến hành đặt hàng</Button>
                    </div>
                    
                    <div className={cx('continue')}>
                        <Link to={`/`}>
                            <Button outline>Chọn thêm sản phẩm khác</Button>
                        </Link>
                    </div>
                </div>      
            </div>
        </div>
    );
};

export default Cart;
