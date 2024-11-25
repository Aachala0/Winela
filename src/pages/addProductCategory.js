import React, { useEffect, useState } from "react";
import CustomInput from "../components/customInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createCategory,
  getAProductCategory,
  resetState,
  updateAProductCategory,
} from "../features/prdtCat/PrdtCategorySlice";
let schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

const AddProductCategory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getPCatId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const newCategory = useSelector((state) => state.PrdtCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    categoryName,
    updatedCategory,
  } = newCategory;
  useEffect(() => {
    if (getPCatId !== undefined) {
      dispatch(getAProductCategory(getPCatId));
    } else {
      dispatch(resetState());
    }
  }, [getPCatId]);
  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added Successfullly!");
    }
    if (isSuccess && updatedCategory) {
      toast.success("Category Updated Successfullly!");
      navigate("/admin/list-category");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getPCatId !== undefined) {
        const data = { id: getPCatId, pCatData: values };
        dispatch(updateAProductCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-3 title">
        {getPCatId !== undefined ? "Edit" : "Add"} Product Categories
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter product categories"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
            id="brand"
          />
          <button type="submit" className="btn btn-success border-0 rounded-3">
            {getPCatId !== undefined ? "Edit" : "Add"} Categories
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductCategory;
