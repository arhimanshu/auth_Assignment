import { useState, useEffect } from "react";
import { useAuth } from "../context/Auth"
import { Outlet } from "react-router-dom";
import Spinner from "./Spinner";


export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (auth?.jwt_token){setOk(true)}
  }, [auth?.jwt_token]);

  return ok ? <Outlet/> : <Spinner/>
}