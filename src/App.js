import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import ResetPassword from "./pages/resetPassword";
import ForgotPassword from "./pages/forgotPassword";
import MainLayout from "./components/mainLayout";
import Enquiries from "./pages/enquiries";
import BlogList from "./pages/blogList";
import Blog from "./pages/addBlog";
import BlogCategoryList from "./pages/blogCategoryList";
import BlogCategory from "./pages/addBlogCategory";
import Orders from "./pages/orders";
import Customers from "./pages/customers";
import Color from "./pages/addColor";
import ColorList from "./pages/colorList";
import Coupon from "./pages/addCoupon";
import CouponList from "./pages/couponList";
import Brand from "./pages/addBrand";
import BrandList from "./pages/brandList";
import Product from "./pages/addProduct";
import ProductList from "./pages/productList";
import ProductCategory from "./pages/addProductCategory";
import ProductCategoryList from "./pages/productCategoryList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/enquiries" element={<Enquiries />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/product" element={<Product />} />
          <Route path="/admin/product-list" element={<ProductList />} />
          <Route path="/admin/category" element={<ProductCategory />} />
          <Route
            path="/admin/category-list"
            element={<ProductCategoryList />}
          />
          <Route path="/admin/blog" element={<Blog />} />
          <Route path="/admin/blog-list" element={<BlogList />} />
          <Route
            path="/admin/blog-category-list"
            element={<BlogCategoryList />}
          />
          <Route path="/admin/blog-category" element={<BlogCategory />} />
          <Route path="/admin/brand" element={<Brand />} />
          <Route path="/admin/brand-list" element={<BrandList />} />
          <Route path="/admin/color" element={<Color />} />
          <Route path="/admin/color-list" element={<ColorList />} />
          <Route path="/admin/coupon" element={<Coupon />} />
          <Route path="/admin/coupon-list" element={<CouponList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
