import * as React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import classNames from "classnames/bind";

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRange } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import styles from './Invoice.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import CategoryService from '../../../service/CategoryService';
import ProductService from '../../../service/ProductService';
import InvoiceService from '../../../service/InvoiceService';
import InvoiceManagementRow from '../../../components/InvoiceManagementRow';

const cx = classNames.bind(styles);

const Invoice: React.FC<any> = () => {
    const [value, setValue] = React.useState<DateRange<Dayjs>>([
        dayjs('2022-04-17'),
        dayjs('2022-04-21'),
    ]);

    const [categoryFilter, setCategoryFilter] = useState('');

    const handleCategoryFilterChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setCategoryFilter(event.target.value);
    };

    const [categories, setCategories] = useState<{ id: number; name: string; status: boolean }[]>([]);
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

    const fetchAPICategories = async () => {
        try {
            const res = await CategoryService.GetAllCategory();
            return res.data;
        } catch (error) { }
    };
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

    const { data: categoriesData, refetch: refetchCategories } = useQuery(
        ["categoryImages"],
        fetchAPICategories,
        {}
    );
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
                refetchCategories(),
                refetchProducts(),
                refetchInvoices()
            ]);
        };
        fetchAllAPIs();
    }, [
        refetchCategories,
        refetchProducts,
        refetchInvoices
    ]);
    useEffect(() => {
        if (categoriesData && productsData) {
            setCategories(categoriesData);
            // setFilteredProductsResult(productsData);
            setProducts(productsData);
            setInvoices(invoicesData);
        }
    }, [
        categoriesData,
        productsData,
        invoicesData
    ]);

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
                                <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
                                    <DemoItem label="Controlled picker" component="DateRangePicker">
                                        <DateRangePicker
                                            value={value}
                                            onChange={(newValue) => setValue(newValue)}
                                        />
                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className={cx('sorting')}>
                        <select
                            id="category"
                            name="category"
                            value={categoryFilter}
                            className={cx('selector')}
                            onChange={handleCategoryFilterChange}
                        >
                            <option className={cx('option-first')} value="" disabled>
                                Danh mục sản phẩm
                            </option>
                            {categories.map((category) => (
                                <option className={cx('option')} key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
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
