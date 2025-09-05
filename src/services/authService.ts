import api from './api'
import CryptoJS from 'crypto-js'

const SECRET = 'dev-secret-key' // demo only

export async function registerUser(user: any){
  const enc = CryptoJS.AES.encrypt(user.password, SECRET).toString()
  const payload = { ...user, password: enc }
  const res = await api.post('/users', payload)
  return res.data
}

export async function loginUser(email: string, password: string){
  const res = await api.get(`/users?email=${encodeURIComponent(email)}`)
  const candidate = res.data?.[0]
  if(!candidate) throw new Error('User not found')

  const bytes = CryptoJS.AES.decrypt(candidate.password, SECRET)
  const decrypted = bytes.toString(CryptoJS.enc.Utf8)
  if(decrypted !== password) throw new Error('Invalid credentials')
  return candidate
}
