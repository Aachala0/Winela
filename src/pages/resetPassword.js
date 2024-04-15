import React from "react";
import CustomInput from "../components/customInput"; // Import the CustomInput component

const resetPassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffb379", minHeight: "100vh" }}>
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Reset Password</h3>
        <p className="text-center">Enter your new password:)</p>
        <form action="">
          <CustomInput type="password" label="New Password" i_id="pass" />
          <CustomInput
            type="password"
            label="Confirm Password"
            i_id="cfnpass"
          />
          <button
            className="border-0 px- py-2 fw-bold w-100"
            style={{ background: "#ffb379" }}
            type="Submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default resetPassword;
