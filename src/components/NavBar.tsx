import React, { Component } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../redux/slices/authSlice'
import type { RootState } from '../redux/store'

class NavBarInner extends Component<any> {
  render(){
    const { user, onLogout } = this.props
    return (
      <nav className="nav">
        <div className="row">
          <span className="brand">🛒 ShopList</span>
          <Link to="/">Home</Link>
          {user && <Link to="/profile">Profile</Link>}
        </div>
        <div className="row">
          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/register">Register</Link>}
          {user && <button className="button button-ghost" onClick={onLogout}>Logout</button>}
        </div>
      </nav>
    )
  }
}

function NavBar(props:any){
  const navigate = useNavigate()
  return <NavBarInner {...props} onLogout={()=>{ props.logout(); navigate('/login') }} />
}

export default connect(
  (s:RootState)=>({ user: s.auth.user }),
  { logout }
)(NavBar)
