import React, { useEffect, useState } from 'react'
import ImageUpload from './ImageUpload'

type Props = {
  open: boolean
  onClose: () => void
  list: any | null
  onSave: (data: any) => void
}

export default function EditModal({ open, onClose, list, onSave }: Props){
  const [form, setForm] = useState({ name:'', quantity:1, notes:'', category:'', image:'' })

  useEffect(()=>{
    if(list){
      setForm({
        name: list.name || '',
        quantity: list.quantity || 1,
        notes: list.notes || '',
        category: list.category || '',
        image: list.image || ''
      })
    } else {
      setForm({ name:'', quantity:1, notes:'', category:'', image:'' })
    }
  }, [list])

  if(!open) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="card modal" onClick={e=>e.stopPropagation()}>
        <h3 style={{marginTop:0}}>📝 {list ? 'Edit' : 'Add'} Shopping List</h3>
        <div className="grid">
          <div>
            <label>Name</label>
            <input className="input" value={form.name} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setForm({...form, name: e.target.value})} />
          </div>
          <div>
            <label>Quantity</label>
            <input type="number" className="input" min={1} value={String(form.quantity)} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setForm({...form, quantity: Number(e.target.value||1)})} />
          </div>
          <div>
            <label>Category</label>
            <input className="input" value={form.category} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setForm({...form, category: e.target.value})} />
          </div>
          <div>
            <label>Notes</label>
            <textarea className="input" rows={3} value={form.notes} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>setForm({...form, notes: e.target.value})} />
          </div>
          <ImageUpload value={form.image} onChange={(b: string)=> setForm({...form, image:b})} />
        </div>
        <div className="row" style={{justifyContent:'flex-end', marginTop:12}}>
          <button className="button button-ghost" onClick={onClose}>Cancel</button>
          <button className="button button-primary" onClick={()=>onSave(form)}>Save</button>
        </div>
      </div>
    </div>
  )
}
