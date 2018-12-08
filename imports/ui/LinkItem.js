import React from 'react';
import { Meteor } from 'meteor/meteor'
import moment from 'moment'
import Clipboard from 'clipboard'

export default class LinkItem extends React.Component {

  state = {
    isCopied: false
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy)
    this.clipboard.on('success', () => {
      this.setState({ isCopied: true }, () => {
        setTimeout(()=>this.setState({ isCopied: false }), 1500)
      })
    }).on('error', () => {
      alert('Unable to copy')
    })
  }

  componentWillUnmount(){
    this.clipboard.destroy()
  }

  renderStats = () => {
    const visitMsg = this.props.visitedCount > 1 ? 'visits' : 'visit'
    let visitedMessage = null;
    if (typeof this.props.lastVisitedAt === 'number'){
      visitedMessage = `(visited ${ moment(this.props.lastVisitedAt).fromNow() })`
    }
    return ( <p className="item__message">{this.props.visitedCount} {visitMsg} {visitedMessage}</p> )
  }

  render(){
    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message">{this.props.shortUrl}</p>
        {this.renderStats()}
        <div className="button-group">
          <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">Visit</a>
          <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
            {this.state.isCopied ? 'Copied!': 'Copy'}
          </button>
          <button className="button button--pill" onClick={()=>Meteor.call('links.setVisibility', this.props._id, !this.props.visible)}>
            {this.props.visible ? 'Hide':'Unhide'}
          </button>
        </div>

      </div>
    )
  }
}

LinkItem.propTypes = {
  _id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  shortUrl: React.PropTypes.string.isRequired,
  visible: React.PropTypes.bool.isRequired,
  visitedCount: React.PropTypes.number.isRequired,
  lastVisitedAt: React.PropTypes.number
}
