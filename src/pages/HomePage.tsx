import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setLists, addList as addListAction, updateList as updateListAction, deleteList as deleteListAction } from '../redux/slices/listSlice'
import { fetchLists, addList, updateList, deleteList } from '../services/listService'
import { useSearchParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import ShoppingListItem from '../components/ShoppingListItem'
import EditModal from '../components/EditModal'
import { toast } from 'react-toastify'

export default function HomePage(){
  const user = useSelector((s:RootState)=> s.auth.user)
  const lists = useSelector((s:RootState)=> s.lists.lists)
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editing, setEditing] = useState<any | null>(null)

  const q = searchParams.get('q') || ''
  const sort = searchParams.get('sort') || ''

  useEffect(()=>{
    if(!user) return
    ;(async()=>{
      setLoading(true)
      const data = await fetchLists(user?.id ?? 0)
      dispatch(setLists(data))
      setLoading(false)
    })()
  }, [user, dispatch])

  const filtered = lists.filter((l:any)=> (l.name||'').toLowerCase().includes(q.toLowerCase()))
  const sorted = [...filtered].sort((a:any,b:any)=>{
    if(sort==='name') return (a.name||'').localeCompare(b.name||'')
    if(sort==='category') return (a.category||'').localeCompare(b.category||'')
    if(sort==='date') return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
    return 0
  })

  const handleDelete = async (id:number)=>{
    if(!confirm('Delete this list?')) return
    await deleteList(id)
    dispatch(deleteListAction(id))
    toast.info('Deleted')
  }

  const handleEdit = (l:any)=>{ setEditing(l); setEditOpen(true) }

  const handleSave = async (data:any)=>{
    if(editing){
      const payload = { ...editing, ...data }
      const res = await updateList(editing.id, payload)
      dispatch(updateListAction(res))
      toast.success('Updated')
    }else{
      if(!user) return
      const payload = { ...data, userId: user?.id ?? 0, dateAdded: new Date().toISOString() }
      const created = await addList(payload)
      dispatch(addListAction(created))
      toast.success('Added')
    }
    setEditOpen(false)
    setEditing(null)
  }

  const handleShare = async (l:any)=>{
    const url = `${window.location.origin}/share/${l.id}`
    try{ await navigator.clipboard.writeText(url); toast.success('Link copied!') }
    catch{ toast.info(url) }
  }

  const handleSearch = (val:string)=>{
    const sp = new URLSearchParams(searchParams.toString())
    if(val) sp.set('q', val); else sp.delete('q')
    setSearchParams(sp, { replace: true })
  }
  const handleSort = (val:string)=>{
    const sp = new URLSearchParams(searchParams.toString())
    if(val) sp.set('sort', val); else sp.delete('sort')
    setSearchParams(sp, { replace: true })
  }

  if(!user) return null

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row" style={{marginBottom:16, justifyContent:'space-between'}}>
          <h2 style={{margin:0}}>Welcome, {user?.name} 👋</h2>
          <div className="row">
            <input className="input" placeholder="Search..." value={q} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>handleSearch(e.target.value)} />
            <select className="input" value={sort} onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>handleSort(e.target.value)} style={{width:180}}>
              <option value="">Sort</option>
              <option value="name">Name</option>
              <option value="category">Category</option>
              <option value="date">Date Added</option>
            </select>
            <button className="button button-primary" onClick={()=>{ setEditing(null); setEditOpen(true) }}>Add List</button>
          </div>
        </div>

        {loading? <div className="card">Loading...</div> : (
          <div className="grid grid-3">
            {sorted.map((l:any)=>(
              <div className="card" key={l.id}>
                <div className="row" style={{justifyContent:'space-between'}}>
                  <div>
                    <h3 style={{margin:'4px 0'}}>{l.name}</h3>
                    <div className="small" style={{opacity:.8}}>{l.category} • {new Date(l.dateAdded).toLocaleDateString()}</div>
                  </div>
                  <div className="row">
                    <button className="button button-ghost" onClick={()=>handleEdit(l)}>Edit</button>
                    <button className="button button-danger" onClick={()=>handleDelete(l.id)}>Delete</button>
                  </div>
                </div>
                <div style={{marginTop:10}}>
                  <ShoppingListItem list={l} onEdit={handleEdit} onShare={handleShare} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <EditModal open={editOpen} onClose={()=>{ setEditOpen(false); setEditing(null) }} list={editing} onSave={handleSave} />
    </>
  )
}
