import React, { useState } from 'react';
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import * as yup from "yup";
import Profile from '../pages/Profile';
// import ResetpasswordPage from "../pages/ResetpasswordPage"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ResetPassword() {
        //Yup schema
        const schema = yup
        .object({
          password: yup
            .string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
          confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords must match"),
        })
        .required();

  const [Mail, setMail] = useState("");
  const [hide,setHide]=useState(true)
  const [showPsk,setShowPsk]=useState(false)
  const [otp,setOtp]=useState("")
  const [showOtp,setShowOtp]=useState(true)

  const navigate=useNavigate()
  
  const mailChange = (e) => {
    setMail(e.target.value);
  };

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema), //Yup
    });

  const forgotPasswordFunctionality = async () => {
    try {
      console.log("MAIL", Mail);
      const res = await axios.post("https://stgapi-bnpl.tarality.io/api/v2/user/forgotPassword", { email: Mail });
      if (res && res.status === 200) {
          console.log('Enter the otp');
          toast.success(`Check your mail ${res.data.message}`)
          setHide(false)
      }
    } catch (error) {
      console.log('Error during forgot password:', error);
      toast.error(`Error during forgot password ${error}`)
    }
  };


  const verifyNow=async ()=>{
    try {
    const res = await axios.post("https://stgapi-bnpl.tarality.io/api/v2/user/verifyOTP", { email:Mail,otp:otp });
    if (res && res.status === 200) {
        console.log('Success',res);
        toast.success(`Verified ${res.data.message}`)
        // navigate("/ResetpasswordPage")
        setShowPsk(true)
        setHide(false)
        setShowOtp(false)
    }
  }catch(error){
    console.log("Errors",error)
    toast.error(`Error during verifying Otp ${error}`)

  }
    
}

const onSubmit = async (data) => {
    try {
      const res = await axios.put(
        "https://stgapi-bnpl.tarality.io/api/v2/user/resetPassword",
        {email:Mail,password:data.password,confirmPassword:data.confirmPassword}
        
      );
      if (res && res.status === 200) {
        console.log("password changed successfully")}
        toast.success(`Password Changed ${res.data.message}`)

        navigate("/login")
      }catch(error){
        console.log("error is",error)
        toast.error(`Error during Password Change ${error}`)

      }
    }
      return (
        <>
             <ToastContainer />
          <div className='d-flex justify-content-center'>ResetPassword</div>
          {hide ? (
            <div>
              <input
                className="form-control"
                type="email"
                onChange={mailChange}
                value={Mail}
                placeholder="Enter the email id here"
              />
              <button onClick={forgotPasswordFunctionality } className="m-1 btn btn-primary">Verify</button>
            </div>
          ) : (
             <div>
               <label for="Otp-Box" className='mx-3'>Otp-Box</label>
              <input placeholder='Enter the OTP' className="form-control" onChange={(e) => setOtp(e.target.value)}  />
              <button className="m-1 btn btn-primary" onClick={verifyNow}>Verify-Now</button>
            </div>
          )}
      
          {showPsk && (
           <div className="container mt-5">
           <h2>Reset Password</h2>
           <form onSubmit={handleSubmit(onSubmit)}>
             <div className="mb-3">
               <label htmlFor="password" className="form-label">Password</label>
               <input
                 type="password"
                 name="password"
                 className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                 {...register("password")}
               />
               {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
             </div>
             <div className="mb-3">
               <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
               <input
                 type="password"
                 name="confirmPassword"
                 className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                 {...register("confirmPassword")}
               />
               {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
             </div>
             <button type="submit" className="btn btn-primary">Change Password</button>
           </form>
         </div>
          )}
        </>
      );
   
}