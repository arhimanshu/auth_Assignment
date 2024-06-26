import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import OtpVerification from "./OtpVerification";
import {Link} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  // Define Yup schema for validation
  const schema = yup
    .object({
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
      userType: yup.string().required("User type is required"),
      parent_ref_code: yup.string(),
    })
    .required();

  const [emaill, setemaill] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), //Yup
  });
  let emailss;

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "https://stgapi-bnpl.tarality.io/api/v2/user/register",
        data
      );

      setemaill(data.email);
      console.log("email from dataemail",data.email)
      console.log("thr vsl og ", emaill);
      sethide(false);
      if (res && res.status === 200) {
        sethide(false);
        toast.success(`res.data.message`);
        console.log("if", res);
        // navigate("/login");
      } else {
        toast.error(`Something went wrong: ${res.data.message}`);
        console.log("else", data);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong: ${error.message}`);
    }
  };
  const [hide, sethide] = useState(true);

  return (
    <>
     <ToastContainer />
    <h2>Registeration Page</h2>
      {hide ? (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              {...register("email")}
              className="form-control"
              placeholder="Enter your email"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password")}
              className="form-control"
              placeholder="Enter your password"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              {...register("confirmPassword")}
              className="form-control"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="userType">User Type</label>
            <input
              type="text"
              id="userType"
              name="userType"
              {...register("userType")}
              className="form-control"
              placeholder="Enter your user type"
            />
            {errors.userType && <p>{errors.userType.message}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="parent_ref_code">Parent Ref Code</label>
            <input
              type="text"
              id="parent_ref_code"
              name="parent_ref_code"
              {...register("parent_ref_code")}
              className="form-control"
              placeholder="Enter your parent ref code"
            />
          </div>

          <button type="submit" className=" btn btn-primary">
            REGISTER
          </button>
          <Link to="/login" className="mx-1 btn btn-primary">
            Login
          </Link>

         
        </form>
        
        </div>
      ) : (
       
        <OtpVerification emails={emaill} value="abc" />
      )}
    </>
  );
};

export default Register;
//   return (
//     <>
//       {hide ? (
//         <form onSubmit={handleSubmit(onsubmit)}>
//            <div className="mb-3">
//             <input
//               type="email"
//               name="email"
//               {...register("email")}
//               className="form-control"
//               placeholder="Enter Your email"
//             />
//             {errors.email && <p>{errors.email.message}</p>}
//           </div>

//           <div className="mb-3">
//             <input
//               type="password"
//               name="password"
//               {...register("password")}
//               className="form-control"
//               placeholder="Enter Your password"
//             />
//             {errors.password && <p>{errors.password.message}</p>}
//           </div>
//           <div className="mb-3">
//           <input
//             type="password"
//             name="confirmPassword"
//             {...register("confirmPassword")}
//             className="form-control"
//               placeholder="Enter Your password"
//           />
//           {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
// </div>
// <div className="mb-3">
//           <input type="text" name="userType" {...register("userType")} className="form-control"
//               placeholder="Enter Your userType"/>
//           {errors.userType && <p>{errors.userType.message}</p>}
// </div>
// <div className="mb-3">
//           <input
//             type="text"
//             name="parent_ref_code"
//             {...register("parent_ref_code")} className="form-control"
//             placeholder="Enter Your parent_ref_code"
//           />
// </div>
//           <button type="submit" className="btn btn-primary">
//             REGISTER
//           </button>
//         </form>
//       ) : (
//         <OtpVerification emails={emaill} value="abc"></OtpVerification>
//       )}
//     </>
//   );
// };
// // {console.log("email from data.email is ",emails)}
// export default Register;
