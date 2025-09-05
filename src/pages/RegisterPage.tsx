import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'
import { toast } from 'react-toastify'
import NavBar from '../components/NavBar'

export default function RegisterPage(){
  const [form, setForm] = useState({ email:'', password:'', name:'', surname:'', cell:'' })
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{
      setLoading(true)
      await registerUser(form)
      toast.success('Registered. Please log in.')
      nav('/login')
    }catch(err:any){
      toast.error('Register failed')
    }finally{ setLoading(false) }
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="card" style={{maxWidth:560, margin:'48px auto'}}>
          <h2 style={{marginTop:0}}>Create account</h2>
          <form className="grid" onSubmit={submit}>
            <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:12}}>
              <div>
                <label>Name</label>
                <input className="input" value={form.name} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setForm({...form, name:e.target.value})} required />
              </div>
              <div>
                <label>Surname</label>
                <input className="input" value={form.surname} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setForm({...form, surname:e.target.value})} required />
              </div>
            </div>
            <div>
              <label>Cell number</label>
              <input className="input" value={form.cell} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setForm({...form, cell:e.target.value})} required />
            </div>
            <div>
              <label>Email</label>
              <input className="input" type="email" value={form.email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setForm({...form, email:e.target.value})} required />
            </div>
            <div>
              <label>Password</label>
              <input type="password" className="input" value={form.password} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setForm({...form, password:e.target.value})} required />
            </div>
            <button className="button button-primary" disabled={loading}>{loading?'Creating...':'Register'}</button>
          </form>
          <p className="small" style={{marginTop:12}}>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </>
  )
}
