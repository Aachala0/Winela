import React from "react";
import CustomInput from "../components/customInput"; // Import the CustomInput component

const forgotPassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffb379", minHeight: "100vh" }}>
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Forgot password?</h3>
        <p className="text-center"> Please enter your registered email:(</p>
        <form action="">
          <CustomInput type="text" label="Email Address" i_id="email" />
          <button
            className="border-0 px- py-2 fw-bold w-100"
            style={{ background: "#ffb379" }}
            type="Submit"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default forgotPassword;
