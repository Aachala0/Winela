import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import {
  HiMiniArrowTrendingDown,
  HiMiniArrowTrendingUp,
} from "react-icons/hi2";
import { Column } from "@ant-design/plots";

const data = [
  { type: "Jan", value: 0.16 },
  { type: "Feb", value: 0.125 },
  { type: "Mar", value: 0.24 },
  { type: "Apr", value: 0.19 },
  { type: "Jun", value: 0.22 },
  { type: "Jul", value: 0.05 },
  { type: "Aug", value: 0.01 },
  { type: "Sep", value: 0.015 },
  { type: "Oct", value: 0.05 },
  { type: "Nov", value: 0.1 },
  { type: "Dec", value: 0.15 },
];
const columns = [
  {
    title: "S.No.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
];
const Dashboard = () => {
  const config = {
    data,
    xField: "type",
    yField: "value",
    style: {
      fill: ({ type }) => {
        return "#008080";
      },
    },
    label: {
      text: (originData) => {
        const val = parseFloat(originData.value);
        if (val < 0.05) {
          return (val * 100).toFixed(1) + "%";
        }
        return "";
      },
      offset: 10,
    },
    legend: false,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const orderState = useSelector((state) => state.auth.orders);

  const data1 = [];
  if (orderState) {
    for (let i = 0; i < orderState.length; i++) {
      data1.push({
        key: i + 1,
        name: orderState[i].orderby.firstname,
        product: (
          <Link to={`/admin/order/${orderState[i].orderby._id}`}>
            View Orders
          </Link>
        ),
        date: new Date(orderState[i].createdAt).toLocaleString(),
      });
    }
  }
  return (
    <div className="mb-4">
      <h3 className="title">Dashboard</h3>
      <div className="d-flex gap-3 justify-content-between align-items-center">
        <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white rounded-3 p-3 border border-1">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">NRP10000</h4>
          </div>
          <div className="d-flex flex-column align-items-end desc">
            <h6 className="red">
              <HiMiniArrowTrendingDown />
              30%
            </h6>
            <p className="mb-0">Compared to June 2024</p>
          </div>
        </div>
        <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white rounded-3 p-3 border border-1">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">NRP10000</h4>
          </div>
          <div className="d-flex flex-column align-items-end desc">
            <h6 className="green">
              <HiMiniArrowTrendingUp />
              30%
            </h6>
            <p className="mb-0">Compared to June 2024</p>
          </div>
        </div>
        <div className="d-flex flex-grow-1 justify-content-between align-items-end bg-white rounded-3 p-3 border border-1">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">NRP10000</h4>
          </div>
          <div className="d-flex flex-column align-items-end desc">
            <h6 className="red">
              <HiMiniArrowTrendingDown />
              30%
            </h6>
            <p className="mb-0">Compared to June 2024</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center gap-3 ">
        <div className="mt-4 w-50 flex-grow-1">
          <h3 className="mb-4 mt-4 title">Income Statics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4 w-50 flex-grow-1 recent-orders">
          <h6 className="title">Recent Orders</h6>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
