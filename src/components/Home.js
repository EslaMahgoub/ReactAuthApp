import React, { Component } from 'react'
import Registration from './auth/Registration'
import Login from './auth/Login'
import axios from 'axios';


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleSuccessfulAuth(data){
    // TODOUpdate Parent Component
    this.props.handleLogin(data);
    // redirect to dasboard page
    this.props.history.push('/dashboard/');
  }

  handleLogoutClick() {
    axios.delete("http://localhost:3001/logout", { withCredentials: true}).then(response => {
    this.props.handleLogout();
    }).catch(error => {
      console.log("error", error)
    })

  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h1>Status: {this.props.loggedInStatus}</h1> 
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    )
  }
}
