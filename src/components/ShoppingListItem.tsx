import React, { Component } from 'react'

type Props = {
  list: any
  onEdit: (list:any)=>void
  onShare: (list:any)=>void
}

export default class ShoppingListItem extends Component<Props>{
  render(){
    const { list, onEdit, onShare } = this.props
    return (
      <div>
        {list.image && <img src={list.image} alt={list.name} style={{width:'100%', height:160, objectFit:'cover', borderRadius:12}} />}
        <div className="row" style={{justifyContent:'space-between', marginTop:8}}>
          <span className="badge">{list.category || 'Uncategorised'}</span>
          <span className="small">{new Date(list.dateAdded).toLocaleString()}</span>
        </div>
        <p style={{margin:'8px 0 0 0', fontWeight:700}}>{list.name} × {list.quantity}</p>
        {list.notes && <p className="small" style={{marginTop:4}}>{list.notes}</p>}
        <div className="row" style={{marginTop:10}}>
          <button className="button button-ghost" onClick={()=>onEdit(list)}>Edit</button>
          <button className="button button-primary" onClick={()=>onShare(list)}>Share</button>
        </div>
      </div>
    )
  }
}
