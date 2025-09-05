import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/slices/authSlice'
import { toast } from 'react-toastify'
import NavBar from '../components/NavBar'

export default function LoginPage(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()
  const loc = useLocation()
  const dispatch = useDispatch()

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{
      setLoading(true)
      const user = await loginUser(email, password)
      dispatch(setUser(user))
      toast.success('Welcome back!')
      const dest = (loc.state as any)?.from?.pathname || '/'
      nav(dest, { replace: true })
    }catch(err:any){
      toast.error(err.message || 'Login failed')
    }finally{ setLoading(false) }
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="card" style={{maxWidth:480, margin:'48px auto'}}>
          <h2 style={{marginTop:0}}>Sign in</h2>
          <form className="grid" onSubmit={submit}>
            <div>
              <label>Email</label>
              <input className="input" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} required />
            </div>
            <div>
              <label>Password</label>
              <input type="password" className="input" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} required />
            </div>
            <button className="button button-primary" disabled={loading}>{loading?'Signing in...':'Login'}</button>
          </form>
          <p className="small" style={{marginTop:12}}>No account? <Link to="/register">Register</Link></p>
        </div>
      </div>
    </>
  )
}
