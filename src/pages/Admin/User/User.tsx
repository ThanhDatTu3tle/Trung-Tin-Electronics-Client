import * as React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import classNames from "classnames/bind";

import styles from "./User.module.scss";
import InvoiceService from "../../../service/InvoiceService";
import UserManagementRow from "../../../components/UserManagementRow";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Clock from "../../../components/Clock";

const cx = classNames.bind(styles);

const User: React.FC<any> = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [invoices, setInvoices] = useState<
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
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("left")}>
          <p style={{ width: "fit-content", fontWeight: 700 }}>KHÁCH HÀNG</p>
        </div>
        <div className={cx("right")}>
          <div className={cx("current-position")}>
            <Clock />
            <FontAwesomeIcon icon={faHouse} style={{ paddingRight: "1rem" }} />
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ width: "1rem", height: "1rem", paddingRight: "1rem" }}
            />
            <p>Khách hàng</p>
          </div>
        </div>
      </div>
      <div className={cx("main-container")}>
        <div className={cx("search-bar")}>
          <input
            id="search"
            type="text"
            placeholder="Tìm kiếm sản phẩm"
            className={cx("input-name")}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        <br />
        <div className={cx("table")}>
          <div className={cx("titles")}>
            <div className={cx("customer-name")}>Tên khách hàng</div>
            <div className={cx("email")}>Email</div>
            <div className={cx("phone")}>Số điện thoại</div>
            <div className={cx("address")}>Địa chỉ</div>
          </div>
          <div className={cx("information")}>
            {invoices.map((invoice) => (
              <UserManagementRow key={invoice.id} data={invoice} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
