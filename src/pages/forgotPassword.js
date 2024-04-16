import React from "react";
import CustomInput from "../components/customInput"; // Import the CustomInput component

const forgotPassword = () => {
  return (
    <div className="py-5" style={{ background: "#7D0A0A", minHeight: "100vh" }}>
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Forgot password?</h3>
        <p className="text-center"> Please enter your registered email:(</p>
        <form action="">
          <CustomInput type="text" label="Email Address" i_id="email" />
          <button
            className="border-0 px- py-2 fw-bold w-100"
            style={{ background: "#7D0A0A" }}
            type="Submit"
          >
            <span style={{ color: "white" }}>Send Link</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default forgotPassword;
