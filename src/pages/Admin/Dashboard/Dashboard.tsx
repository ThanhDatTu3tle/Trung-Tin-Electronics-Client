import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import * as Utils from "../../../hooks/utilsChart";

import classNames from "classnames/bind";
import logo from "../../../assets/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faArrowRight,
  faKaaba,
} from "@fortawesome/free-solid-svg-icons";
import { faGem, faMoneyBill1 } from "@fortawesome/free-regular-svg-icons";

import styles from "./Dashboard.module.scss";
import Clock from "../../../components/Clock";
import { useInvoice } from "../../../Context/InvoiceContext";
import { useGoods } from "../../../Context/GoodsContext";

const cx = classNames.bind(styles);

const Dashboard: React.FC<any> = () => {
  ChartJS.register(CategoryScale);
  const invoices = useInvoice();
  const goodss = useGoods();

  interface Invoice {
    id: string;
    address: string;
    description: string;
    content: string;
    createdAt: Date;
    customerName: string;
    email: string;
    payment: string;
    phone: string;
    status: boolean;
    total: number;
    updatedAt: Date;
    confirm: boolean;
  }

  interface Goods {
    id: string;
    quantity: number;
    goodsDetail: {
      id: number;
      idGoods: number;
      idProduct: string;
      cost: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
  }

  interface MonthData {
    month: string;
    total: number;
  }

  interface MonthDataCost {
    month: string;
    cost: number;
  }

  interface YearData {
    year: string;
    months: MonthData[];
  }

  interface YearDataCost {
    year: string;
    months: MonthDataCost[];
  }

  function organizeData(invoices: Invoice[]): YearData[] {
    const result: YearData[] = [];

    // Lọc các đơn hàng đã được giao
    const confirmedInvoices = invoices.filter((invoice) => invoice.confirm);

    // Duyệt qua các đơn hàng đã được giao
    confirmedInvoices.forEach((invoice) => {
      const createdAt = new Date(invoice.createdAt);
      const year = createdAt.getFullYear().toString();
      const month = (createdAt.getMonth() + 1).toString(); // Tháng bắt đầu từ 0

      // Tìm hoặc tạo một mục cho năm trong mảng kết quả
      let yearEntry = result.find((entry) => entry.year === year);
      if (!yearEntry) {
        yearEntry = { year, months: [] };
        // Tạo mảng tháng với 12 mục, mỗi mục đại diện cho một tháng trong năm
        for (let i = 1; i <= 12; i++) {
          yearEntry.months.push({ month: i.toString(), total: 0 });
        }
        result.push(yearEntry);
      }

      // Thêm giá trị total vào tháng tương ứng
      const monthIndex = parseInt(month) - 1;
      yearEntry.months[monthIndex].total += invoice.total;
    });

    return result;
  }

  // Hàm tổ chức dữ liệu chi phí
  function organizeCostData(goodss: Goods[]): YearDataCost[] {
    const result: YearDataCost[] = [];

    // Lặp qua danh sách các lần đặt hàng
    goodss.forEach((order) => {
      const createdAt = new Date(order.createdAt);
      const year = createdAt.getFullYear().toString();
      const month = (createdAt.getMonth() + 1).toString();

      // Tính toán giá trị chi phí của mỗi lần đặt hàng
      const orderCost = order.quantity * order.goodsDetail[0].cost;

      // Tìm hoặc tạo một mục cho năm trong mảng kết quả
      let yearEntry = result.find((entry) => entry.year === year);
      if (!yearEntry) {
        yearEntry = { year, months: [] };
        // Tạo mảng tháng với 12 mục, mỗi mục đại diện cho một tháng trong năm
        for (let i = 1; i <= 12; i++) {
          yearEntry.months.push({ month: i.toString(), cost: 0 });
        }
        result.push(yearEntry);
      }

      // Thêm giá trị cost vào tháng tương ứng
      const monthIndex = parseInt(month) - 1;
      yearEntry.months[monthIndex].cost += orderCost;
    });

    return result;
  }

  // Sử dụng hàm tổ chức dữ liệu
  const organizedData = organizeData(invoices);
  // Sử dụng hàm tổ chức dữ liệu chi phí
  const costData = organizeCostData(goodss);

  const dateObj = new Date();
  const year = dateObj.getFullYear();

  const labels = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Thống Kê Bán Hàng ${year}`,
      },
    },
  };
  const optionsLastYear = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Thống Kê Bán Hàng ${year - 1}`,
      },
    },
  };
  const optionsIncomeYear = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Thu Nhập Qua Các Năm`,
      },
    },
  };
  const invoicesData = {
    labels: labels,
    datasets: [
      {
        fill: false,
        label: "Doanh thu",
        data: organizedData
          ?.filter((y) => y.year === `${year}`)
          .map((data) => data.months)[0]
          ?.map((x) => x.total),
        borderColor: "#00BA9D",
        backgroundColor: Utils.transparentize("#00BA9D", 0.5),
      },
      {
        fill: false,
        label: "Chi phí",
        data: costData
          ?.filter((y) => y.year === `${year}`)
          .map((data) => data.months)[0]
          ?.map((x) => x.cost),
        borderColor: "#FF5470",
        backgroundColor: Utils.transparentize("#FF5470", 0.5),
      },
    ],
  };
  const invoicesDataLastYear = {
    labels: labels,
    datasets: [
      {
        fill: false,
        label: "Doanh thu",
        data: organizedData
          ?.filter((y) => y.year === `${year - 1}`)
          .map((data) => data.months)[0]
          ?.map((x) => x.total),
        borderColor: "#00BA9D",
        backgroundColor: Utils.transparentize("#00BA9D", 0.5),
      },
      {
        fill: false,
        label: "Chi phí",
        data: costData
          ?.filter((y) => y.year === `${year - 1}`)
          .map((data) => data.months)[0]
          ?.map((x) => x.cost),
        borderColor: "#FF5470",
        backgroundColor: Utils.transparentize("#FF5470", 0.5),
      },
    ],
  };

  const labelYears = [`${year}`, `${year + 1}`, `${year + 2}`];
  const incomeYears = (
    invoices
      .filter((invoice) => invoice.confirm)
      .reduce((a, b) => a + b.total, 0) -
    goodss
      .map((goods) => {
        const costDetail = goods.goodsDetail.find((x) => x.cost);
        if (costDetail) {
          return goods.quantity * costDetail.cost;
        } else {
          return 0;
        }
      })
      .reduce((a, b) => a + b, 0)
  ).toString();

  const incomeDataLastYear = {
    labels: labelYears,
    datasets: [
      {
        fill: false,
        label: "Thu Nhập",
        data: incomeYears,
        borderColor: '#018EC3',
        backgroundColor: Utils.transparentize('#018EC3', 0.5),
      },
    ],
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("left")}>
          <p style={{ width: "fit-content", fontWeight: 700 }}>BẢNG THỐNG KÊ</p>
        </div>
        <div className={cx("right")}>
          <div className={cx("current-position")}>
            <Clock />
            <FontAwesomeIcon icon={faHouse} style={{ paddingRight: "1rem" }} />
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ width: "1rem", height: "1rem", paddingRight: "1rem" }}
            />
            <p>Bảng thống kê</p>
          </div>
        </div>
      </div>
      <div className={cx("main-container")}>
        <div className={cx("content-left")}>
          <div className={cx("synthetic")}>
            <div className={cx("logo")}>
              <img src={logo} alt="Avatar" />
            </div>
            <div className={cx("info")}>
              <h3>Điện Máy Trung Tín</h3>
              <h5>Thống kê doanh thu năm {year}</h5>
              <br />
              <div className={cx("revenue")}>
                <div className={cx("revenue-child")}>
                  <div className={cx("income-icon")}>
                    <FontAwesomeIcon
                      icon={faGem}
                      style={{ width: "2rem", height: "2rem" }}
                    />
                  </div>
                  <div className={cx("parameter")}>
                    <h5>
                      {invoices
                        .filter((invoice) => invoice.confirm)
                        .reduce((a, b) => a + b.total, 0)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      đ
                    </h5>
                    <p style={{ fontSize: "1.2rem" }}>Doanh thu</p>
                  </div>
                </div>
                <div className={cx("revenue-child")}>
                  <div className={cx("expense-icon")}>
                    <FontAwesomeIcon
                      icon={faMoneyBill1}
                      style={{ width: "2rem", height: "2rem" }}
                    />
                  </div>
                  <div className={cx("parameter")}>
                    <h5>
                      {goodss
                        .map((goods) => {
                          const costDetail = goods.goodsDetail.find(
                            (x) => x.cost
                          );
                          if (costDetail) {
                            return goods.quantity * costDetail.cost;
                          } else {
                            return 0;
                          }
                        })
                        .reduce((a, b) => a + b, 0)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </h5>
                    <p style={{ fontSize: "1.2rem" }}>Chi phí</p>
                  </div>
                </div>
                <div className={cx("revenue-child")}>
                  <div className={cx("orders-icon")}>
                    <FontAwesomeIcon
                      icon={faKaaba}
                      style={{ width: "2rem", height: "2rem" }}
                    />
                  </div>
                  <div className={cx("parameter")}>
                    <h3>
                      {
                        invoices.filter((invoice) => invoice.status === true)
                          .length
                      }
                    </h3>
                    <p style={{ fontSize: "1.2rem" }}>Tổng đơn đã giao</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cx("chart")}>
            <Line options={options} data={invoicesData} />
          </div>
        </div>

        <div className={cx("content-right")}>
          <div className={cx("total-balance")}>
            <div className={cx("parameter")}>
              <h3>Tổng thu nhập</h3>
              <p style={{ fontSize: "1.4rem" }}>
                {(
                  invoices
                    .filter((invoice) => invoice.confirm)
                    .reduce((a, b) => a + b.total, 0) -
                  goodss
                    .map((goods) => {
                      const costDetail = goods.goodsDetail.find((x) => x.cost);
                      if (costDetail) {
                        return goods.quantity * costDetail.cost;
                      } else {
                        return 0;
                      }
                    })
                    .reduce((a, b) => a + b, 0)
                )
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                VNĐ
              </p>
            </div>
          </div>

          <div className={cx("chart-last-year")}>
            <Bar options={optionsLastYear} data={invoicesDataLastYear} />
          </div>

          <div className={cx("total-report")}>
            <div className={cx("chart")}>
              <Bar options={optionsIncomeYear} data={incomeDataLastYear} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
