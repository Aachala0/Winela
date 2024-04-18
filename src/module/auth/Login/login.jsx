import React, { useContext, useEffect } from "react";
import { object, string, ref } from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { AuthContext } from "../../../Context/auth/AuthContext";
import { ToastContext } from "../../../Context/toast/ToastContext";
import { useNavigate } from "react-router-dom";

const base_url = import.meta.env.VITE_API_URL;

export default function Login() {
  const { login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  const navigate = useNavigate();

  let userSchema = object({
    email: string().required().email(),
    password: string().required().min(6),
  });

  const formik = useFormik({
    validationSchema: userSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (data) => {
      console.log(data);
      loginApiCall(data);
    },
  });

  const { errors, getFieldProps } = formik;

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const loginApiCall = (data) => {
    console.log(base_url);
    axios
      .post(`${base_url}/api/user/login`, data)
      .then((res) => {
        console.log(res.data);
        login(res.data);
        showToast({
          show: true,
          title: "Welcome Back",
          message: "Login Success",
          type: "success",
        });
        navigate("/");
      })
      .catch((err) => {
        showToast({
          show: true,
          title: "Error",
          message: err.response?.data.error || "Server Error",
          type: "error",
        });

        console.log(err);
      });
  };
  return (
    <section>
      <div className="flex items-center justify-center bg-red-800 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="bg-white rounded-md my-5 w-80 mx-auto p-4">
          <h3 className="text-center font-semibold text-2xl mt-4">Log In</h3>
          <p className="text-center">Login to continue:)</p>
          <form noValidate onSubmit={formik.handleSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    {...getFieldProps("email")}
                  ></input>
                </div>
                {errors.email && (
                  <label className="text-sm text-red-700 ">
                    {errors.email}
                  </label>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                </div>

                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    {...getFieldProps("password")}
                  ></input>
                </div>
                {errors.password && (
                  <label className="text-sm text-red-700 ">
                    {errors.password}
                  </label>
                )}
              </div>
              <p className="mt-2 text-base text-cyan-500 text-center">
                <a
                  href="#"
                  title=""
                  className="text-cyan-500 transition-all duration-200 hover:underline"
                >
                  Forgot Password?
                </a>
              </p>
              <p className="mt-2 text-base text-cyan-500 text-center">
                Don't have an account?{" "}
                <a
                  href="signup"
                  title=""
                  className="text-cyan-500 transition-all duration-200 hover:underline"
                >
                  Signup
                </a>
              </p>

              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-red-800 px-3.5 py-2.5 font-semibold leading-7 text-black"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
