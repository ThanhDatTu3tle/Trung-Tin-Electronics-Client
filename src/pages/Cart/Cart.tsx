import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import 'sweetalert2/dist/sweetalert2.min.css';

import styles from './Cart.module.scss';
import CartRow from '../../components/CartRow';
import ProductService from '../../service/ProductService';
import Button from '../../components/Button';
import { axiosClient } from '../../axios';

const cx = classNames.bind(styles);

let screenWidth = window.innerWidth;
function updateScreenSize() {
  screenWidth = window.innerWidth;
}
updateScreenSize();
window.addEventListener("resize", updateScreenSize);

const Cart: React.FC<any> = () => {
    const MySwal = withReactContent(Swal);
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
    const status = false;
    
    const [selectedWard, setSelectedWard] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

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
            setSelectedProvince(event.target.value); 
            setSelectedDistrict(''); 
            setWards([]); 
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
            setSelectedDistrict(event.target.value); 
        } catch (error) {
            console.error(error);
        }
    };
    const handleWardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedWard(event.target.value);
    };
    
    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value.trim());
    };
    const handleContentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setContent(event.target.value);
    };
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
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
    
        const formData = new FormData();
        const addressRaw = `
            ${address} 
            ${wards.find(ward => ward.code === Number(selectedWard))?.name || ''} 
            ${districts.find(district => district.code === Number(selectedDistrict))?.name || ''} 
            ${provinces.find(province => province.code === Number(selectedProvince))?.name || ''}
        `;
        const lines = addressRaw.split('\n').filter(line => line.trim() !== '');
        const completeAddress = lines.map(line => line.trim()).join(' ');
        // let status = 1;

        formData.append('customerName', fullName);
        formData.append('phone', phoneNumber);
        formData.append('email', email);
        formData.append('address', completeAddress);
        formData.append('content', content);
        formData.append('status', status.toString());
    
        products.forEach((product, index) => {
            formData.append(`invoiceDetail[${index}].idProduct`, product.id);
            formData.append(`invoiceDetail[${index}].number`, product.quantity.toString());
        });
        formData.append('total', totalPrice.toString());
        formData.append('payment', selectedOption);
    
        try {
            const response = await axiosClient.post('invoice/create', formData, {
                headers: {
                    'Content-Type': 'application/json', 
                },
            });
            MySwal.fire({
                title: 'Đặt hàng thành công!',
                icon: 'success',
                didOpen: () => {
                  MySwal.showLoading();
                },
                timer: 1500,
            });
            console.log('Response from server:', response);
            window.location.href = "/";
        } catch (error) {
            MySwal.fire({
                title: 'Đã có lỗi xảy ra!',
                icon: 'error',
                didOpen: () => {
                  MySwal.showLoading();
                },
                timer: 1500,
            });
            console.error('Error:', error);
        }
    }

    return (
        <div className={cx('wrapper')}>
            <h3>GIỎ HÀNG</h3>
            <br />
            <div className={cx('table')}>
                <div className={cx("titles")}>
                    {screenWidth >= 279 ? (
                        <>
                            <div className={cx("image")}>Hình ảnh</div>
                        </>
                    ): (
                        <></>
                    )}
                    <div className={cx("name")}>Tên sản phẩm</div>
                    <div className={cx("small-title")}>Giá tiền</div>
                    <div className={cx("small-title")}>Số lượng</div>
                    <div className={cx("small-title")}>Tổng</div>
                    <div className={cx("small-title")}>Xóa</div>
                </div>

                <div className={cx("information")}>
                    {products.map((product) => (
                        <CartRow key={product.id} data={product} onDeleteProduct={handleDeleteProduct} />
                    ))}
                </div>
            </div>
            <div className={cx('result')}>
                <p className={cx('price')}>Tổng giá: {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</p>
            </div>
            <br />
            <div className={cx('add-form')}>
                <form action="/upload" method="post" onSubmit={(event) => handleOrder(event)}>  
                    <p className={cx('big-title')}>THÔNG TIN KHÁCH HÀNG</p>
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
                            onChange={handleWardChange}
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
                        <label htmlFor="content" className={cx('big-title')}>Nội dung:</label>
                        <textarea
                            id="content"
                            name="content"
                            value={content}
                            onChange={handleContentChange}
                            rows={3} 
                        />
                    </div>
                    <br />
                    <p className={cx('big-title')}>HÌNH THỨC GIAO DỊCH</p>
                    <div className={cx('payments')}>
                        <div>
                            <input 
                                id="transfer"
                                type='radio' 
                                className={cx('payment')}
                                value="transfer"
                                checked={selectedOption === 'transfer'}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="transfer" className={cx('title-transfer')}>Thanh toán bằng hình thức chuyển khoản</label>
                        </div>
                        <div>
                            <input 
                                id="cash"
                                type='radio' 
                                className={cx('payment')}
                                value="cash"
                                checked={selectedOption === 'cash'}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor="cash" className={cx('title-cash')}>Thanh toán khi nhận hàng</label>
                        </div>
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
