import React from 'react';
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

import { Links } from '../api/links'
import LinksList from './LinksList'

export default class Link extends React.Component {
  onLogout = () => {
    Accounts.logout();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const url = this.refs.url.value.trim()

    if (url) {
      Meteor.call('links.insert', url)
      this.refs.url.value = ''
    }

  }

  render(){
    return (
      <div>
        <h1>You Links</h1>
        <button onClick={this.onLogout}>Logout</button>
        <LinksList />
        <p>Add Link</p>
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="Url" ref="url"/>
          <button>Add</button>
        </form>
      </div>
    )
  }
}