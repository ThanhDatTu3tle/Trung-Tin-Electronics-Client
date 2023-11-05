import * as React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import classNames from "classnames/bind";

import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import styles from "./Bill.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faArrowRight,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { useProduct } from "../../../Context/ProductContext";
import InvoiceService from "../../../service/InvoiceService";

import Button from "../../../components/Button";
import BillManagementRow from "../../../components/BillManagementRow";
import Clock from "../../../components/Clock";

const cx = classNames.bind(styles);

const Bill: React.FC<any> = () => {
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

  // useEffect(() => {
  //     // Áp dụng bộ lọc ở đây
  //     applyFilters();
  // }, [dayFilter]);

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
          <p style={{ width: "fit-content", fontWeight: 700 }}>HÓA ĐƠN</p>
        </div>
        <div className={cx("right")}>
          <div className={cx("current-position")}>
            <Clock />
            <FontAwesomeIcon icon={faHouse} style={{ paddingRight: "1rem" }} />
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ width: "1rem", height: "1rem", paddingRight: "1rem" }}
            />
            <p>Hóa đơn</p>
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
              .filter((invoice) => invoice.confirm)
              .map((invoice) => (
                <BillManagementRow
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

export default Bill;
