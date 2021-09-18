import React, { Component } from 'react'
import axios from 'axios';

export default class Registration extends Component {
  constructor(props) {
    super(props);


    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
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
    const {
      email, 
      password, 
      password_confirmation
    } = this.state;
     // {withCredentials: true} tells our api to set the cookie in our client 
    axios.post("http://localhost:3001/registrations",
    {
      user: {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
    }, {withCredentials: true})
         .then( response => {
           if (response.data.status === 'created'){
             this.props.handleSuccessfulAuth(response.data)
           }
         }).catch(error => {
           console.log("registration Error",error )
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
          <input
            type="password"
            name="password_confirmation"
            placeholder="password_confirmation"
            required
            value={this.state.password_confirmation}
            onChange={this.handleChange}
          />

          <button type="submit">Register</button>
        </form>
      </div>
    )
  }
}
