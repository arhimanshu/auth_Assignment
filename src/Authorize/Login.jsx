
import React,{useState} from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from 'react-router-dom';
import Profile from '../pages/Profile';
import {useAuth} from "../context/Auth"
import Dashboard from '../pages/Dashboard';
import ResetPassword from "./ResetPassword"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [showdiv, setshowdiv] = useState(true)
  const [mail,setMail]=useState("")

  auth.jwt_token && navigate("/dashboard")
  // if(auth.jwt_token){
  // return <Redirect to="/dashboard"/>;}
 

  const schema = yup.object({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });



  const handleLogin = async (data) => {
    try {
      const res = await axios.post(
        'https://stgapi-bnpl.tarality.io/api/v1/user/login',
        {
          email: data.email,
          password: data.password,
        }
      );
      
      if (res && res.data.status === 200) {
        console.log('Login successful:', res.data);
        console.log('Login successful:', res);

        toast.success(`Logged in successfully`);

        setAuth({
          ...auth,
          user_id: res.data.params.user_id,
          jwt_token: res.data.params.jwt_token,
        });
        
        localStorage.setItem("auth", JSON.stringify(res.data));
     
      }
     else if (res && res.data.status === 400) {
        console.log('Error during login:', res.data.message);
        console.log('Error during login:', res);
        console.log('Error during login:', res.data);


        toast.error(`Login failed: ${res.data.message}`);}    
      // else {
      //   console.log('Unexpected error during login:', res);
      //   toast.error("Something went wrong. Please try again later.");
      // }
    } catch (error) {
      console.log('Error during login:', error.message);
      toast.error(`Something went wrong: ${error.message}`);

    
    }
  };

const onChangeFunc=e=>{
  setMail(e.target.value)
}
  return (
    <>
  <ToastContainer />
    <div className=''>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            {...register('email')}
            className="form-control"
            placeholder="Enter your email"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            {...register('password')}
            className="form-control"
            placeholder="Enter your password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button><span> <Link to="/ResetPassword" className="mx-1 btn btn-primary">Reset-Password</Link></span>
      </form>
      </div> 
      </>
  );
}

export default Login;
















// import React from 'react';
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import axios from 'axios';
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useNavigate } from 'react-router-dom';
// import Profile from './Profile';
// import {useAuth} from "../context/Auth"
// import Dashboard from './Dashboard';
// const Login = () => {
//   const schema = yup.object().shape({
//     email: yup.string().email('Invalid email format').required('Email is required'),
//     password: yup.string().required('Password is required'),
//   });

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const [auth,setAuth]=useAuth()
// const Navigate=useNavigate()
//   const handleLogin = async (data) => {
//     try {
//       const res = await axios.post(
//         'https://stgapi-bnpl.tarality.io/api/v1/user/login',
//         {
//           email: data.email,
//           password: data.password,
//         }
//       );
  
//       if (res && res.status === 200) {
//         // Handle successful login (e.g., store token, redirect, etc.)
//         console.log('Login successful:', res.data); // Log the response data
//         setAuth({
//           ...auth,
//           user_id: res.data.params.user_id,
//           jwt_token: res.data.params.jwt_token,
//         });
//         console.log(auth)
//         localStorage.setItem("auth", JSON.stringify(res.data));
//         Navigate("/dashboard")
//       } else {
//         // Handle login failure (e.g., show error message)
//         console.log('Login failed');
//       }
//     } catch (error) {
//       console.log('Error during login:', error);
//     }
//   };
  
//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit(handleLogin)}>
//         <div className="mb-3">
//           <input
//             type="email"
//             name="email"
//             {...register('email')}
//             className="form-control"
//             placeholder="Enter your email"
//           />
//           {errors.email && <p>{errors.email.message}</p>}
//         </div>
//         <div className="mb-3">
//           <input
//             type="password"
//             name="password"
//             {...register('password')}
//             className="form-control"
//             placeholder="Enter your password"
//           />
//           {errors.password && <p>{errors.password.message}</p>}
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

