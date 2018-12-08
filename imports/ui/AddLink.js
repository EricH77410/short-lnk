import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Links } from '../api/links'
import Modal from 'react-modal'

export default class AddLink extends React.Component {

  state = {
    url: '',
    isOpen: false,
    error: ''
  }

  componentWillMount() {
    Modal.setAppElement('body') // Pour éviter un message d'erreur dans la console
  }

  onSubmit = (e) => {
    e.preventDefault();
    const url = this.state.url

      Meteor.call('links.insert', url, (err, res) => {
        if (!err){
          this.handleModalclose()
        } else {
          this.setState({ error: err.reason })
        }
      })
  }

  onChange = (e) => {
    this.setState({ url: e.target.value.trim() })
  }

  handleModalclose = () => {
    this.setState({
      url:'',
      isOpen: false,
      error: ''
    })
  }

  render(){
    return (
      <div>
        <button className="button" onClick={() => this.setState({isOpen: true})}>+ Add Link</button>

          <Modal
            isOpen={this.state.isOpen}
            contentLabel="Add link"
            onAfterOpen={()=>this.refs.url.focus()}
            onRequestClose={this.handleModalclose}
            className="boxed-view__box"
            overlayClassName="boxed-view boxed-view--modal"
          >
            <h1>Add Link</h1>
            { this.state.error ? <p>{this.state.error}</p> : undefined }
            <form onSubmit={this.onSubmit} className="boxed-view__form">
              <input
                type="text"
                placeholder="Url"
                ref="url"
                value={this.state.url}
                onChange={this.onChange}
              />
            <button className="button">Add Link</button>
              <button type="button" className="button button--secondary" onClick={this.handleModalclose}>Cancel</button>
            </form>

          </Modal>
      </div>
    )
  }
}
