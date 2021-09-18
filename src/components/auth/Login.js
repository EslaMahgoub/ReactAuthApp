import React, { Component } from 'react'
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { email, password} = this.state;
     // {withCredentials: true} tells our api to set the cookie in our client 
    axios.post("http://localhost:3001/sessions",
    {
      user: {
        email: email,
        password: password
      }
    }, {withCredentials: true})
         .then(response => {
           console.log("response", response);
           if (response.data.logged_in){
             this.props.handleSuccessfulAuth(response.data)
        }
         }).catch(error => {
           console.log("login Error", error)
         })
    event.preventDefault();

  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="email"
            required
            value={this.state.email}
            onChange={this.handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="password"
            required
            value={this.state.password}
            onChange={this.handleChange}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}
