import * as React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Grid from "@mui/material/Grid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMagnifyingGlass,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Header.module.scss";
import config from "../../../../config";
import logo from "../../../../assets/logo.png";
import InvoiceService from "../../../../service/InvoiceService";
import { useNewOrder } from "../../../../Context/NewOrderContext ";

const cx = classNames.bind(styles);

const Header: React.FC<any> = () => {
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
  const [, setInitialInvoices] = useState<
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
  const { hasNewOrder, setHasNewOrder } = useNewOrder();

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

  useEffect(() => {
    if (hasNewOrder) {
        toast.error("Có đơn hàng mới!", { transition: Bounce });
        setHasNewOrder(false); // Đặt lại trạng thái sau khi thông báo đã hiển thị
    }
}, [hasNewOrder, setHasNewOrder]);

  return (
    <Grid container className={cx("wrapper")}>
      <Grid item md={2} className={cx("left-function")}>
        <div className={cx("logo-brand")}>
          <Link to={config.routes.home}>
            <img className={cx("logo")} src={logo} alt="Logo" />
          </Link>
          <p style={{ fontSize: "1.5rem", fontWeight: "700" }}>Điện Máy Trung Tín</p>
        </div>
        <div className={cx("menu-hamburger")}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </Grid>

      <Grid item md={10} className={cx("right-function")}>
        <div className={cx("search-bar")}>
          <input
            id="search"
            type="text"
            placeholder="Tìm kiếm sản phẩm"
            className={cx("input-name")}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{
              position: "absolute",
              left: "270px",
              pointerEvents: "none",
              color: "#888",
            }}
          />
        </div>
        <div>
          <ToastContainer
            position="top-center"
            autoClose={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="colored"
          />
        </div>
        <div className={cx("button-manage")}>
          <img className={cx("avatar")} src={logo} alt="Avatar" />
          <FontAwesomeIcon icon={faBell} style={{ color: "#018ec3" }} />
          <div className={cx("badge")}>
            {
              filteredInvoicesResult.filter(
                (invoice) =>
                  invoice.status === false && invoice.confirm === false
              ).length
            }
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Header;
