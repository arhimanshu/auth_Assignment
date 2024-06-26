import React from 'react';
import { useAuth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Logout() {
  const Navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const LogoutFn = () => {
    // Clear auth state and localStorage
    setAuth({ user_id: null, jwt_token: '' });
    localStorage.removeItem('auth');
    toast.success("logged Out : Navigating to Login Page")
    // Navigate to the login page after logout
    setTimeout(() => {
      Navigate('/login');
    }, 2000);
   
  };

  return (
    <>
      <ToastContainer />

      {auth.jwt_token ? (
        <button onClick={LogoutFn}>Logout</button>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Logout;
