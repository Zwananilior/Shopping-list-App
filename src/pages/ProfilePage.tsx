import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import NavBar from '../components/NavBar'
import api from '../services/api'
import { setUser } from '../redux/slices/authSlice'
import { toast } from 'react-toastify'
import CryptoJS from 'crypto-js'

const SECRET = 'dev-secret-key'

export default function ProfilePage(){
  const user = useSelector((s:RootState)=> s.auth.user)
  const dispatch = useDispatch()
  const [name, setName] = useState(user?.name || '')
  const [surname, setSurname] = useState(user?.surname || '')
  const [cell, setCell] = useState(user?.cell || '')
  const [email, setEmail] = useState(user?.email || '')
  const [newPassword, setNewPassword] = useState('')

  if(!user) return <div className="container"><NavBar/><div className="card">Please log in</div></div>

  const save = async ()=>{
    try{
      let payload: any = { ...user, name, surname, cell, email }
      if(newPassword){
        payload.password = CryptoJS.AES.encrypt(newPassword, SECRET).toString()
      }
      const res = await api.put(`/users/${user.id}`, payload)
      dispatch(setUser(res.data))
      setNewPassword('')
      toast.success('Profile updated')
    }catch(e){
      toast.error('Failed to update')
    }
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="card" style={{maxWidth:700, margin:'24px auto'}}>
          <h2 style={{marginTop:0}}>Profile</h2>
          <div className="grid">
            <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:12}}>
              <div><label>Name</label><input className="input" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)} /></div>
              <div><label>Surname</label><input className="input" value={surname} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSurname(e.target.value)} /></div>
            </div>
            <div><label>Cell</label><input className="input" value={cell} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setCell(e.target.value)} /></div>
            <div><label>Email</label><input className="input" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} /></div>
            <hr/>
            <div><label>Change Password</label><input type="password" className="input" value={newPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setNewPassword(e.target.value)} placeholder="Leave blank to keep current" /></div>
            <div className="row" style={{justifyContent:'flex-end'}}>
              <button className="button button-primary" onClick={save}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
