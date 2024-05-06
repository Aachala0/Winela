import React, { useState, useEffect } from "react";
import RichTextEditor from "react-rte";
import CustomInput from "../components/customInput";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/prdtCat/PrdtCategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";
const { Dragger, props } = Upload;

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  quantity: yup.number().required("Quantity is Required"),
});

const AddProduct = () => {
  const [descValue, setDescValue] = useState(RichTextEditor.createEmptyValue());

  const handleDescChange = (value) => {
    setDescValue(value); // Update RichTextEditor value state
    formik.setFieldValue("description", value.toString("html")); // Update formik value for description field
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);
  console.log(color);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.PrdtCategory.PrdtCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [color, img]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });
  const handleColors = (e) => {
    setColor(e);
    console.log(color);
  };

  return (
    <div>
      <h3 className="mb-0 title">Add Product</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product title"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <select
            className="form-control py-3 mb-3"
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
          >
            <option>Select Product Category</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>

          <Select
            mode="multiple"
            allowClear
            className="form-control py-3 mb-3"
            placeholder="Select colors"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            options={coloropt}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          <div className="mb-3">
            <RichTextEditor
              value={descValue} // Pass value state
              onChange={handleDescChange} // Pass handleChange function
            />
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>
          </div>
          <CustomInput
            type="number"
            label="Enter Product price"
            name="price"
            onChange={formik.handleChange("price")}
            onBlur={formik.handleBlur("price")}
            value={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <CustomInput
            type="number"
            label="Enter Product quantity"
            name="quantity"
            onChange={formik.handleChange("quantity")}
            onBlur={formik.handleBlur("quantity")}
            value={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="mt-3">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 mt-3"
          >
            {getProductId !== undefined ? "Edit" : "Add"} Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
