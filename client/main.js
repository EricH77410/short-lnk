import { Meteor } from 'meteor/meteor'
import ReactDOM from 'react-dom'
import { Session } from 'meteor/session'
import { Tracker } from 'meteor/tracker'
import '../imports/startup/simple-schema-conf.js'

import { routes, onAuthChange } from '../imports/routes/routes'

import { Links } from '../imports/api/links'

Tracker.autorun(()=>{
  const isAuthenticated = !!Meteor.userId()
  onAuthChange(isAuthenticated)
})

Meteor.startup(()=>{
  Session.set('showVisible', true)
  ReactDOM.render(routes, document.getElementById('app'))
})
