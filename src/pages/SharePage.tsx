import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getListById } from '../services/listService'
import NavBar from '../components/NavBar'

export default function SharePage(){
  const { id } = useParams()
  const [list, setList] = useState<any | null>(null)

  useEffect(()=>{
    (async()=>{
      const data = await getListById(Number(id))
      setList(data)
    })()
  }, [id])

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="card" style={{maxWidth:700, margin:'24px auto'}}>
          {!list? <p>Loading...</p> : (
            <div>
              <h2 style={{marginTop:0}}>Shared List: {list.name}</h2>
              {list.image && <img src={list.image} style={{width:'100%', maxHeight:260, objectFit:'cover', borderRadius:12}} />}
              <p><b>Quantity:</b> {list.quantity}</p>
              <p><b>Category:</b> {list.category}</p>
              <p><b>Notes:</b> {list.notes}</p>
              <p className="small">Date: {new Date(list.dateAdded).toLocaleString()}</p>
              <Link to="/" className="button button-ghost">Back</Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
