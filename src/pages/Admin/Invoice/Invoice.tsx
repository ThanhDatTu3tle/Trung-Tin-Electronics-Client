import * as React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import classNames from "classnames/bind";

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';

import styles from './Invoice.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faArrowRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import ProductService from '../../../service/ProductService';
import InvoiceService from '../../../service/InvoiceService';

import InvoiceManagementRow from '../../../components/InvoiceManagementRow';
import Button from '../../../components/Button';

const cx = classNames.bind(styles);

const Invoice: React.FC<any> = () => {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

    const [statusFilter, setStatusFilter] = useState('all');
    const [paymentFilter, setPaymentFilter] = useState('all');

    const handleStatusFilterChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setStatusFilter(event.target.value);
    };
    const handlePaymentFilterChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPaymentFilter(event.target.value);
    };

    const [products, setProducts] = useState<{
        id: string;
        name: string;
        description: string;
        specification: { id: number; specification: string }[];
        imageProducts: { id: number; image: string }[];
        price: number;
        brand: { id: number; name: string; image: string };
        event: null;
        status: boolean;
        category: { id: number; name: string; image: string; status: boolean };
        idBrand: number;
        idCategory: number;
        idEvent: number;
        quantity: number;
    }[]>([]);
    const [invoices, setInvoices] = useState<{
        id: number;
        customerName: string;
        phone: string;
        address: string;
        email: string;
        content: string;
        status: boolean;
        total: number;
        payment: string;
        invoiceDetail: { id: number; idInvoice: number; idProduct: string; number: number };
    }[]>([]);
    const [filteredInvoices, setFilteredInvoices] = useState<{
        id: number;
        customerName: string;
        phone: string;
        address: string;
        email: string;
        content: string;
        status: boolean;
        total: number;
        payment: string;
        invoiceDetail: { id: number; idInvoice: number; idProduct: string; number: number };
    }[]>([]);
    const [initialInvoices, setInitialInvoices] = useState<{
        id: number;
        customerName: string;
        phone: string;
        address: string;
        email: string;
        content: string;
        status: boolean;
        total: number;
        payment: string;
        invoiceDetail: { id: number; idInvoice: number; idProduct: string; number: number };
    }[]>([]);

    const fetchAPIProducts = async () => {
        try {
            const res = await ProductService.GetAllProduct();
            return res.data;
        } catch (error) { }
    };
    const fetchAPIInvoices = async () => {
        try {
            const res = await InvoiceService.GetAllInvoice();
            return res.data;
        } catch (error) { }
    };
    const { data: productsData, refetch: refetchProducts } = useQuery(
        ["productImages"],
        fetchAPIProducts,
        {}
    );
    const { data: invoicesData, refetch: refetchInvoices } = useQuery(
        ["invoicesImages"],
        fetchAPIInvoices,
        {}
    );

    useEffect(() => {
        const fetchAllAPIs = async () => {
            await Promise.all([
                refetchProducts(),
                refetchInvoices()
            ]);
        };
        fetchAllAPIs();
    }, [
        refetchProducts,
        refetchInvoices
    ]);
    useEffect(() => {
        if (productsData && invoicesData) {
            setProducts(productsData);
            setInvoices(invoicesData);
        }
    }, [
        productsData,
        invoicesData
    ]);

    const applyFilters = () => {
        // Bắt đầu từ danh sách sản phẩm ban đầu
        let filteredInvoices = [...initialInvoices];

        // Áp dụng bộ lọc trạng thái sản phẩm
        if (statusFilter !== 'all') {
            filteredInvoices = filteredInvoices.filter(invoice => invoice.status === (statusFilter === 'published'));
        }

        // Cập nhật danh sách hóa đơn hiển thị
        setFilteredInvoices(filteredInvoices);
    };

    useEffect(() => {
        // Fetch danh sách sản phẩm ban đầu từ API
        const fetchInitialProducts = async () => {
            try {
                const res = await InvoiceService.GetAllInvoice();
                const initialInvoiceData = res.data;

                setInitialInvoices(initialInvoiceData);

                setFilteredInvoices(initialInvoiceData);
            } catch (error) {
                // Xử lý lỗi nếu cần
            }
        };

        fetchInitialProducts();
    }, []);

    const clearFilters = () => {
        // Đặt lại giá trị của các bộ lọc về mặc định
        setStatusFilter('all');
    
        // Hiển thị danh sách sản phẩm ban đầu
        setFilteredInvoices(initialInvoices);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('left')}>
                    <p style={{ width: 'fit-content', fontWeight: 700 }}>ĐƠN HÀNG</p>
                </div>
                <div className={cx('right')}>
                    <div className={cx('current-position')}>
                        <FontAwesomeIcon
                            icon={faHouse}
                            style={{ paddingRight: '1rem' }}
                        />
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            style={{ width: '1rem', height: '1rem', paddingRight: '1rem' }}
                        />
                        <p>Đơn hàng</p>
                    </div>
                </div>
            </div>
            <div className={cx('main-container')}>
                <div className={cx('filter')}>
                    <div className={cx('period')}>
                        Giai đoạn bán hàng
                        <div className={cx('calender')}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimeField', 'DateTimeField']}>
                                    <DateTimeField
                                        value={value}
                                        onChange={(newValue) => setValue(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className={cx('sorting')}>
                        <select
                            id="stock"
                            name="stock"
                            className={cx('selector')}
                            value={statusFilter}
                            onChange={handleStatusFilterChange}
                        >
                            <option className={cx('option-first')} value="all" disabled>
                                Trạng thái đơn hàng
                            </option>
                            <option value="published">Đã giao hàng</option>
                            <option value="hided">Chưa giao hàng</option>
                        </select>

                        <select
                            id="payment"
                            name="payment"
                            className={cx('selector')}
                            value={paymentFilter}
                            onChange={handlePaymentFilterChange}
                        >
                            <option className={cx('option-first')} value="all" disabled>
                                Phương thức thanh toán
                            </option>
                            <option value="published">Tiền mặt</option>
                            <option value="hided">Chuyển khoản</option>
                        </select>

                        <div className={cx('btns-filters')}>
                            <Button primary small onClick={applyFilters}>
                                Áp dụng
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    style={{ width: '1rem', height: '1rem', paddingLeft: '0.5rem' }}
                                />
                            </Button>
                            <Button outline small onClick={clearFilters}>Gỡ bỏ</Button>
                        </div>
                    </div>
                </div>
                <div className={cx('table')}>
                    <div className={cx("titles")}>
                        <div className={cx("id")}># Đơn hàng</div>
                        <div className={cx("customer-name")}>Tên khách hàng</div>
                        <div className={cx("phone")}>Số điện thoại</div>
                        <div className={cx("address")}>Địa chỉ</div>
                        <div className={cx("email")}>Email</div>
                        <div className={cx("total")}>Chi trả</div>
                        <div className={cx("payment")}>Cách thức thanh toán</div>
                        <div className={cx("status")}>Trạng thái đơn hàng</div>
                        <div className={cx("content")}>Ghi chú của khách hàng</div>
                        <div className={cx("edit")}>Chỉnh sửa</div>
                    </div>
                    <br />
                    <div className={cx("information")}>
                        {invoices.map((invoice) => (
                            <InvoiceManagementRow key={invoice.id} data={invoice} products={products} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Invoice;
