import React from 'react'
import { Link } from 'react-router'
import { Accounts } from 'meteor/accounts-base'

class Signup extends React.Component {
  state = {
    error: ''
  }
  onSubmit = (e) => {
    e.preventDefault();

    let email = this.refs.email.value.trim()
    let password = this.refs.password.value.trim()

    if (password.length < 4){
      return this.setState({error: 'Password must be more than 4 char'})
    }

    Accounts.createUser({email,password}, (err) => {
      if (err) {
        this.setState({error: err.reason})
      } else {
        this.setState({error:''})
      }
    })
  }
  render() {
    return (
      <div>
        <h1>Join Short Lnk</h1>

        { this.state.error ? <p>{this.state.error}</p> : undefined }

        <form onSubmit={this.onSubmit} noValidate>
          <input type="email" ref="email" name="email" placeholder="Email"/>
          <input type="password" ref="password" name="password" placeholder="Password"/>
          <button>Create Account</button>
        </form>

        <p><Link to="/">Already have an account</Link></p>
      </div>
    )
  }
}

export default Signup
