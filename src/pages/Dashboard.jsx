import React from 'react'
import { useAuth } from '../context/Auth'
import { Link } from 'react-router-dom'
import Profile from './Profile'
function Dashboard() {
    const [auth,setAuth]=useAuth()
  return (
    <>
    <div>Dashboard</div>
    {auth ?<div>you have successfully logged in user {auth.user_id}</div> : <div></div>}
    <Link to ="/Dashboard/Profile">Profile</Link>
    </>
  )
}

export default Dashboard