import React from 'react';
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Links } from '../api/links'

export default class LinksList extends React.Component {
  state = {
    links: []
  }
  componentDidMount(){
    this.linksTracker = Tracker.autorun(()=>{
      Meteor.subscribe('links')
      const links = Links.find().fetch()
      this.setState({links})
    })
  }
  componentWillMount(){
    console.log('will mount')
  }
  componentWillUnmount(){
    this.linksTracker.stop()
  }

  renderLinks = () => {
    return this.state.links.map((link)=>{
      return <p key={link._id}>{link.url}</p>
    })
  }
  render(){
    return (
      <div>
        <p>Links List</p>
        <div>

          {this.renderLinks()}
        </div>
      </div>
    )
  }
}
