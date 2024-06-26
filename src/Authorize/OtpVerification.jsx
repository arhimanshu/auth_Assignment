import React, { useState } from "react";
import axios from "axios"; // Import Axios for API calls
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OtpVerification = ({emails:email,value}) => {
  const [otp, setOtp] = useState("");
const Navigate=useNavigate()
  const handleOtpChange = (e) => {
    setOtp(e.target.value)
    console.log("otp in inputbox is ",otp)
    // const otpValue = e.target.value;
    // const otpNumber = parseInt(otpValue, 10); // Convert to an integer
    // setOtp(otpNumber);
    // console.log(otpNumber);
    console.log("hoc",email)
  };
console.log("emailss",email)
console.log("value",value)
const data={email:email,otp:otp}
  const verifyOtp = async () => {
    try {
      console.log("data",data)
      const res = await axios.post(
        "https://stgapi-bnpl.tarality.io/api/v2/user/verifyOTP",
        data // Send email and OTP to the backend
      );

      if (res && res.status === 200) {
        console.log( "OTP verification successful",res)
        toast.success(`OTP verification successful : ${res.data.message}`)
        Navigate("/Login")
        // Redirect to login page or show success message
      } else {
        console.log("Invalid OTP")
        toast.error(`Invalid OTP" : ${res.data.message}`)
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error(`Error verifying Otp ${error}`)

      // Handle error (e.g., show error message)
    }
  };

  //resend otp
  const resendOtp = async () => {
    try {
      console.log("coming from resendotp func",email)

      // Make an API call to resend the OTP
      const res = await axios.put(
        "https://stgapi-bnpl.tarality.io/api/v2/user/resendOtp",
        { email:email } // Send the email to the backend
      );
  
      if (res && res.status === 200) {
        console.log("OTP resent successfully");
        toast.success(`coming from resendotp func ${res.data.message}`)

        // setOtpSent(true); // Mark OTP as sent
        
      } else {
        toast.error(`Invalid OTP" : ${res.data.message}`)

        // Show error message
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error(`Error resending OTP : ${error}`)
    }
  };
  

  return (
    
    <div>
      <ToastContainer />
      <h4>OTP Verification</h4>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={handleOtpChange}
      />
      <button onClick={verifyOtp}>Verify OTP</button><span><button onClick={resendOtp}>Resend OTP</button>
</span>
    </div>
  );
};

export default OtpVerification;
