import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RiEditBoxLine, RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { getOrders } from "../features/auth/authSlice";

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
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
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
        name: orderState[i].orderby?.firstname,
        product: (
          <Link to={`/admin/order/${orderState[i].orderby?._id}`}>
            View Orders
          </Link>
        ),
        amount: orderState[i].paymentIntent?.amount,
        date: new Date(orderState[i].createdAt).toLocaleString(),
        action: (
          <>
            <Link to="/" className="fs-3 text-danger">
              <RiEditBoxLine />
            </Link>
            <Link className="ms-3 fs-3 text-danger" to="/">
              <RiDeleteBin5Line />
            </Link>
          </>
        ),
      });
    }
  }

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;
