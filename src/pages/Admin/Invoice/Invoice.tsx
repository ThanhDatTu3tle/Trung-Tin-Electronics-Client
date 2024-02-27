import * as React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import classNames from "classnames/bind";

import dayjs, { Dayjs } from "dayjs";
import { io } from 'socket.io-client';

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import styles from "./Invoice.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faArrowRight,
  faChevronRight,
  faClipboardCheck,
  faListCheck,
  faBan,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";

import { useProduct } from "../../../Context/ProductContext";
import InvoiceService from "../../../service/InvoiceService";

import InvoiceManagementRow from "../../../components/InvoiceManagementRow";
import Button from "../../../components/Button";
import Clock from "../../../components/Clock";

const cx = classNames.bind(styles);

const Invoice: React.FC<any> = () => {
  const [dayFilter, setDayFilter] = React.useState<Dayjs | any>(dayjs());
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const handleStatusFilterChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setStatusFilter(event.target.value);
  };
  const handlePaymentFilterChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPaymentFilter(event.target.value);
  };

  const products = useProduct();
  const [newOrderNotification, setNewOrderNotification] = useState(false);

  const [, setInvoices] = useState<
    {
      id: number;
      customerName: string;
      phone: string;
      address: string;
      email: string;
      content: string;
      status: boolean;
      confirm: boolean;
      total: number;
      payment: string;
      invoiceDetail: {
        id: number;
        idInvoice: number;
        idProduct: string;
        number: number;
      };
      createdAt: any;
    }[]
  >([]);
  const [filteredInvoicesResult, setFilteredInvoicesResult] = useState<
    {
      id: number;
      customerName: string;
      phone: string;
      address: string;
      email: string;
      content: string;
      status: boolean;
      confirm: boolean;
      total: number;
      payment: string;
      invoiceDetail: {
        id: number;
        idInvoice: number;
        idProduct: string;
        number: number;
      };
      createdAt: any;
    }[]
  >([]);
  const [initialInvoices, setInitialInvoices] = useState<
    {
      id: number;
      customerName: string;
      phone: string;
      address: string;
      email: string;
      content: string;
      status: boolean;
      confirm: boolean;
      total: number;
      payment: string;
      invoiceDetail: {
        id: number;
        idInvoice: number;
        idProduct: string;
        number: number;
      };
      createdAt: any;
    }[]
  >([]);

  useEffect(() => {
    const socket = io('ws://https://2cc3-27-3-232-145.ngrok-free.app/api/v1/'); // Thay 'your-server-url' bằng URL của máy chủ của bạn

    socket.on('newOrder', () => {
      // Khi nhận được thông điệp về đơn hàng mới
      setNewOrderNotification(true); // Hiển thị thông báo
      // Cập nhật danh sách đơn hàng
      fetchAPIInvoices(); // Hàm fetch danh sách đơn hàng từ API
    });

    return () => {
      socket.disconnect(); // Đóng kết nối khi component unmount
    };
  }, []);

  const fetchAPIInvoices = async () => {
    try {
      const res = await InvoiceService.GetAllInvoice();
      return res.data;
    } catch (error) {}
  };
  const { data: invoicesData, refetch: refetchInvoices } = useQuery(
    ["invoicesImages"],
    fetchAPIInvoices,
    {}
  );

  useEffect(() => {
    const fetchAllAPIs = async () => {
      await Promise.all([refetchInvoices()]);
    };
    fetchAllAPIs();
  }, [refetchInvoices]);
  useEffect(() => {
    if (invoicesData) {
      setInvoices(invoicesData);
    }
  }, [invoicesData]);

  useEffect(() => {
    const fetchInitialInvoices = async () => {
      try {
        const res = await InvoiceService.GetAllInvoice();
        const initialInvoiceData = res.data;

        setInitialInvoices(initialInvoiceData);

        setFilteredInvoicesResult(initialInvoiceData);
      } catch (error) {}
    };

    fetchInitialInvoices();
  }, []);

  const handleChangeDayFilter = (newValue: any) => {
    setDayFilter(newValue);
  };

  const applyFilters = () => {
    // Bắt đầu từ danh sách sản phẩm ban đầu
    let filteredInvoices = [...initialInvoices];

    // Áp dụng bộ lọc trạng thái sản phẩm
    if (statusFilter !== "all") {
      filteredInvoices = filteredInvoices.filter(
        (invoice) => invoice.status === (statusFilter === "published")
      );
    }

    if (paymentFilter !== "all" && paymentFilter !== "transfer") {
      filteredInvoices = filteredInvoices.filter(
        (invoice) => invoice.payment === "cash"
      );
    } else {
      filteredInvoices = filteredInvoices.filter(
        (invoice) => invoice.payment === "transfer"
      );
    }

    if (dayFilter?.toString().charAt(0) === "0") {
      filteredInvoices = filteredInvoices.filter(
        (invoice) =>
          dayjs(invoice.createdAt).format("DD/MM/YYYY") ===
          dayjs(dayFilter.toString()).format("DD/MM/YYYY").slice(1)
      );
    } else {
      filteredInvoices = filteredInvoices.filter(
        (invoice) =>
          dayjs(invoice.createdAt).format("DD/MM/YYYY") ===
          dayjs(dayFilter.toString()).format("DD/MM/YYYY")
      );
      console.log(dayjs(dayFilter.toString()).format("DD/MM/YYYY"));
    }

    setFilteredInvoicesResult(filteredInvoices);
  };

  const clearFilters = () => {
    setStatusFilter("all");

    setFilteredInvoicesResult(initialInvoices);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("left")}>
          <p style={{ width: "fit-content", fontWeight: 700 }}>ĐƠN HÀNG</p>
          {newOrderNotification && (
            <div className="notification">
              <p>Có đơn hàng mới được đặt!</p>
              <button onClick={() => setNewOrderNotification(false)}>Đóng</button>
            </div>
          )}
        </div>
        <div className={cx("right")}>
          <div className={cx("current-position")}>
            <Clock />
            <FontAwesomeIcon icon={faHouse} style={{ paddingRight: "1rem" }} />
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ width: "1rem", height: "1rem", paddingRight: "1rem" }}
            />
            <p>Đơn hàng</p>
          </div>
        </div>
      </div>
      <div className={cx("main-container")}>
        <div className={cx("filter")}>
          <div className={cx("period")}>
            <div className={cx("calender")}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Lọc theo thời gian"
                    value={dayFilter}
                    onChange={handleChangeDayFilter}
                    format="DD/MM/YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>
          <div className={cx("sorting")}>
            <select
              id="stock"
              name="stock"
              className={cx("selector")}
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              <option className={cx("option-first")} value="all" disabled>
                Trạng thái đơn hàng
              </option>
              <option value="published">Đã giao hàng</option>
              <option value="hided">Chưa giao hàng</option>
            </select>

            <select
              id="payment"
              name="payment"
              className={cx("selector")}
              value={paymentFilter}
              onChange={handlePaymentFilterChange}
            >
              <option className={cx("option-first")} value="all" disabled>
                Phương thức thanh toán
              </option>
              <option value="cash">Tiền mặt</option>
              <option value="transfer">Chuyển khoản</option>
            </select>

            <div className={cx("btns-filters")}>
              <Button primary small onClick={applyFilters}>
                Áp dụng
                <FontAwesomeIcon
                  icon={faChevronRight}
                  style={{
                    width: "1rem",
                    height: "1rem",
                    paddingLeft: "0.5rem",
                  }}
                />
              </Button>
              <Button outline small onClick={clearFilters}>
                Gỡ bỏ
              </Button>
            </div>
          </div>
        </div>
        <div className={cx("general-statistics")}>
          <div className={cx("diagram")}>
            BIỂU ĐỒ
          </div>
          <div className={cx("statistics")}>
            <div className={cx("icon")} style={{ background: '#018ec3' }}>
              <FontAwesomeIcon
                icon={faClipboardCheck}
                style={{ width: "2.2rem", height: "2.2rem" }}
              />
            </div>
            <h5>Đơn hàng thành công</h5>
            <b>{filteredInvoicesResult.filter((invoice) => invoice.confirm === true).length}</b>
          </div>
          <div className={cx("statistics")}>
            <div className={cx("icon")} style={{ background: 'green' }}>
              <FontAwesomeIcon
                icon={faListCheck}
                style={{ width: "2.2rem", height: "2.2rem" }}
              />
            </div>
            <h5>Đơn chưa xác nhận</h5>
            <b>{filteredInvoicesResult.filter((invoice) => invoice.status === false && invoice.confirm === false).length}</b>
          </div>
          <div className={cx("statistics")}>
            <div className={cx("icon")} style={{ background: '#fec806' }}>
              <FontAwesomeIcon
                icon={faTruckFast}
                style={{ width: "2.2rem", height: "2.2rem" }}
              />
            </div>
            <h5>Đơn hàng đang giao</h5>
            <b>{filteredInvoicesResult.filter((invoice) => invoice.status === true && invoice.confirm === false).length}</b>
          </div>
          <div className={cx("statistics")}>
            <div className={cx("icon")} style={{ background: '#FF5470' }}>
              <FontAwesomeIcon
                icon={faBan}
                style={{ width: "2.2rem", height: "2.2rem" }}
              />
            </div>
            <h5>Đơn hàng đã hủy</h5>
            <b>0</b>
          </div>
        </div>
        <div className={cx("table")}>
          <div className={cx("titles")}>
            <div className={cx("id")}># Mã</div>
            <div className={cx("customer-name")}>Tên khách hàng</div>
            <div className={cx("phone")}>Số điện thoại</div>
            <div className={cx("address")}>Địa chỉ</div>
            <div className={cx("email")}>Email</div>
            <div className={cx("total")}>Chi trả</div>
            <div className={cx("payment")}>Cách thức thanh toán</div>
            <div className={cx("status")}>Trạng thái đơn hàng</div>
            <div className={cx("content")}>Ghi chú của khách hàng</div>
            <div className={cx("time")}>Thời gian</div>
            <div className={cx("edit")}>Chi tiết</div>
          </div>
          <div className={cx("information")}>
            {filteredInvoicesResult
              .filter((invoice) => !invoice.confirm)
              .map((invoice) => (
                <InvoiceManagementRow
                  key={invoice.id}
                  data={invoice}
                  products={products}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
