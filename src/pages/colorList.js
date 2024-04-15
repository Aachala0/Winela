import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { RiEditBoxLine, RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAColor,
  getColors,
  resetState,
} from "../features/color/colorSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "S.No.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");

  const showModal = (e) => {
    setOpen(true);
    setColorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, [dispatch]);

  const colorState = useSelector((state) => state.color.colors);

  const data1 = colorState.map((color, index) => ({
    key: index + 1,
    name: color.title,
    action: (
      <>
        <Link to={`/admin/color/${color._id}`} className="fs-3 text-danger">
          <RiEditBoxLine />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => showModal(color._id)}
        >
          <RiDeleteBin5Line />
        </button>
      </>
    ),
  }));

  const deleteColor = (colorId) => {
    dispatch(deleteAColor(colorId));

    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Colors</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteColor(colorId);
        }}
        title="Are you sure you want to delete this color?"
      />
    </div>
  );
};

export default ColorList;
