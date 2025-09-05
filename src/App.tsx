import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import SharePage from './pages/SharePage'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { ToastContainer } from 'react-toastify'

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = useSelector((s: RootState)=> s.auth.user)
  const loc = useLocation()
  if(!user) return <Navigate to="/login" state={{from: loc}} replace />
  return children
}
const BlockWhenAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = useSelector((s: RootState)=> s.auth.user)
  if(user) return <Navigate to="/" replace />
  return children
}

export default function App(){
  return (
    <>
      <Routes>
        <Route path="/" element={<RequireAuth><HomePage/></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><ProfilePage/></RequireAuth>} />
        <Route path="/share/:id" element={<SharePage/>} />
        <Route path="/login" element={<BlockWhenAuth><LoginPage/></BlockWhenAuth>} />
        <Route path="/register" element={<BlockWhenAuth><RegisterPage/></BlockWhenAuth>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer position="top-right" theme="dark" />
    </>
  )
}
