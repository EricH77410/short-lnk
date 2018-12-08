import React from 'react';
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { Tracker } from 'meteor/tracker'
import { Links } from '../api/links'
import FlipMove from 'react-flip-move'
import LinkItem from './LinkItem'

export default class LinksList extends React.Component {
  state = {
    links: []
  }
  componentDidMount(){
    this.linksTracker = Tracker.autorun(()=>{
      Meteor.subscribe('links')
      const links = Links.find({visible: Session.get('showVisible')}).fetch()
      this.setState({links})
    })
  }

  componentWillUnmount(){
    this.linksTracker.stop()
  }

  renderLinks = () => {

    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No Links found</p>
        </div>
      )
    }

    return this.state.links.map((link)=>{
      const shortUrl  = Meteor.absoluteUrl(link._id)
      return <LinkItem key={link._id} shortUrl={shortUrl} {...link}/>
    })
  }
  render(){
    return (
      <div>
          <FlipMove maintainContainerHeight={true}>
            {this.renderLinks()}
          </FlipMove>
      </div>
    )
  }
}
