import React, { useState } from "react";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUnorderedList,
  AiOutlineQuestionCircle,
  AiOutlinePicLeft,
  AiOutlinePicRight,
  AiOutlineBell,
} from "react-icons/ai";
import { SiBlogger, SiBloglovin } from "react-icons/si";
import { GoPeople } from "react-icons/go";
import { RiPagesLine, RiCoupon4Line, RiCoupon3Line } from "react-icons/ri";
import {
  TbBrandBeats,
  TbCategory,
  TbColorFilter,
  TbClipboardList,
} from "react-icons/tb";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h3 className="text-center text-white py-3 fs-5">
            <span className="sm-logo">WN</span>
            <span className="lg-logo">Winela</span>
          </h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <GoPeople className="fs-4" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <RiPagesLine className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineShoppingCart className="fs-6" />,
                  label: "Add Products",
                },
                {
                  key: "product-list",
                  icon: <AiOutlineUnorderedList className="fs-6" />,
                  label: "Products List",
                },
                {
                  key: "brand",
                  icon: <TbBrandBeats className="fs-6" />,
                  label: "Add Brands",
                },
                {
                  key: "brand-list",
                  icon: <AiOutlineUnorderedList className="fs-6" />,
                  label: "Brands List",
                },
                {
                  key: "category",
                  icon: <TbCategory className="fs-6" />,
                  label: "Add Categories",
                },
                {
                  key: "category-list",
                  icon: <AiOutlineUnorderedList className="fs-6" />,
                  label: "Categories List",
                },
                {
                  key: "color",
                  icon: <TbColorFilter className="fs-6" />,
                  label: "Add Colors",
                },
                {
                  key: "color-list",
                  icon: <AiOutlineUnorderedList className="fs-6" />,
                  label: "Colors List",
                },
              ],
            },
            {
              key: "orders",
              icon: <TbClipboardList className="fs-4" />,
              label: "Orders",
            },
            {
              key: "coupons",
              icon: <RiCoupon4Line className="fs-4" />,
              label: "Coupons",
              children: [
                {
                  key: "coupon",
                  icon: <RiCoupon3Line className="fs-6" />,
                  label: "Add Coupons",
                },
                {
                  key: "coupon-list",
                  icon: <AiOutlineUnorderedList className="fs-6" />,
                  label: "Coupons List",
                },
              ],
            },
            {
              key: "blogs",
              icon: <SiBlogger className="fs-4" />,
              label: "Blog",
              children: [
                {
                  key: "blog",
                  icon: <SiBloglovin className="fs-6" />,
                  label: "Add Blogs",
                },
                {
                  key: "blog-list",
                  icon: <AiOutlineUnorderedList className="fs-6" />,
                  label: "Blogs List",
                },
                {
                  key: "blog-category",
                  icon: <TbCategory className="fs-6" />,
                  label: "Add Blog Categories",
                },
                {
                  key: "blog-category-list",
                  icon: <AiOutlineUnorderedList className="fs-6" />,
                  label: "Blog Catagories List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <AiOutlineQuestionCircle className="fs-4" />,
              label: "Enquiries",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-3 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <AiOutlinePicRight /> : <AiOutlinePicLeft />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-3 align-item-center">
            <div className="position-relative">
              <span className="fs-5">
                <AiOutlineBell />
              </span>
              <span className="badge bg-info rounded-circle position-absolute">
                1
              </span>
            </div>
            <div className="d-flex gap-3 align-item-center">
              <div>
                <img
                  src="https://cdn5.vectorstock.com/i/1000x1000/92/59/simple-lettering-bold-random-logo-vector-33589259.jpg"
                  alt=""
                  style={{
                    height: "35px",
                    width: "35px",
                  }}
                />
              </div>

              <div class="dropdown">
                <a
                  className="namail"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <h5>Winela</h5>
                  <p>wine@gmail.com</p>
                </a>

                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li>
                    <Link class="dropdown-item" to="/">
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/signout">
                      Signout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
