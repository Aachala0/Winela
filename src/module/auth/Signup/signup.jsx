import { useEffect, React } from "react";
import { object, string, ref } from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const base_url = import.meta.env.VITE_API_URL;

const Signup = () => {
  const navigate = useNavigate();

  let userSchema = object({
    firstName: string().required(),
    lastName: string().required(),
    mobile: string().required(),
    email: string().required().email(),
    password: string().required().min(6),
    confirmPassword: string()
      .oneOf([ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const formik = useFormik({
    validationSchema: userSchema,
    initialValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (data) => {
      console.log(data);
      signupApiCall(data);
    },
  });
  const { errors, getFieldProps } = formik;

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const signupApiCall = (data) => {
    console.log(base_url);
    axios
      .post(`${base_url}/api/user/register`, data)
      .then((res) => {
        console.log(res.data);
        navigate("/login");
        if (setShowModal) {
          setShowModal(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section>
      <div className="flex items-center justify-center bg-red-800 px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="bg-white rounded-md my-5 w-1/2 mx-auto p-4">
          <h3 className="text-center font-semibold text-2xl mt-4">Sign Up</h3>
          <p className="text-center">Signup to continue:)</p>
          <form noValidate onSubmit={formik.handleSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="firstName"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  First Name{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="First Name"
                    id="firstName"
                    {...getFieldProps("firstName")}
                  ></input>
                </div>
                {errors.firstName && (
                  <label className="text-sm text-red-700">
                    {errors.firstName}
                  </label>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Last Name{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Last Name"
                    id="lastName"
                    {...getFieldProps("lastName")}
                  ></input>
                </div>
                {errors.lastName && (
                  <label className="text-sm text-red-700">
                    {errors.lastName}
                  </label>
                )}
              </div>
              <div>
                <label
                  htmlFor="mobile"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Mobile{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Mobile"
                    id="mobile"
                    {...getFieldProps("mobile")}
                  ></input>
                </div>
                {errors.mobile && (
                  <label className="text-sm text-red-700">
                    {errors.mobile}
                  </label>
                )}
              </div>
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
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Confirm Password{" "}
                  </label>
                </div>

                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    {...getFieldProps("confirmPassword")}
                  ></input>
                </div>
                {errors.confirmPassword && (
                  <label className="text-sm text-red-700 ">
                    {errors.confirmPassword}
                  </label>
                )}
              </div>
              <p className="mt-2 text-base text-cyan-500 text-center">
                Already have an account?{" "}
                <a
                  href="login"
                  title=""
                  className="text-cyan-500 transition-all duration-200 hover:underline"
                >
                  Login
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
};

export default Signup;
