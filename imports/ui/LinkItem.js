import React from 'react';
import { Meteor } from 'meteor/meteor'
import moment from 'moment'
import Clipboard from 'clipboard'
import AddLink from './AddLink'

export default class LinkItem extends React.Component {

  state = {
    isCopied: false,
    edit: false,
    editedUrl: ''
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

  editLink = () => {
    const label = this.refs.edit.textContent
    if(label === 'Save') {
      Meteor.call('links.updateLink', this.props._id, this.state.editedUrl, (err, res) => {
        if (err) {
          console.log(err)
        }
      })
      this.setState({edit: false, editedUrl: ''})
    } else {
      this.setState({edit: true, editedUrl: this.props.url})
    }

  }

  onDelete = () => {
    Meteor.call('links.delete', this.props._id, (err, res)=>{
      if (err){
        console.log(err)
      }
    })
  }

  onChange = () => {
    const url = this.refs.editedUrl.value.trim()
    this.setState({editedUrl: url})
  }

  render(){
    const editText = this.state.edit ? 'Save':'Edit'
    return (
      <div className="item">
        {this.state.edit ? <input ref="editedUrl" type="text" value={this.state.editedUrl} onChange={this.onChange} />:<h2>{this.props.url}</h2>}

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
          <button ref="edit" className="button button--pill" onClick={this.editLink}>{editText}</button>
          <button className="button button--pill button--del" onClick={this.onDelete}>Delete</button>
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
