import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";

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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  const customerstate = useSelector((state) => state.customer.customers);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]); // Add dispatch as a dependency

  const data1 = customerstate
    .filter((customer) => customer.role !== "admin")
    .map((customer, index) => ({
      key: index + 1,
      name: `${customer.firstName} ${customer.lastName}`,
      email: customer.email,
      mobile: customer.mobile,
    }));

  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Customers;
