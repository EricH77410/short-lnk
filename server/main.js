import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp'

import '../imports/api/users'
import { Links } from '../imports/api/links'

Meteor.startup(() => {

  // Set http status to 302
  // Set 'Location' header to 'http://www.google.fr'
  // Call res.end()

  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1)
    const link = Links.findOne({ _id })

    if (link) {
      res.statusCode = 302
      res.setHeader('Location', link.url)
      res.end()
      Meteor.call('links.trackVisit', _id)
    } else {
      next()
    }

  })

  // code to run on server at startup

  // const petSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 200
  //   },
  //   age: {
  //     type: Number,
  //     min: 0
  //   },
  //   contact: {
  //     type: String,
  //     regEx: SimpleSchema.RegEx.Phone,
  //     optional: true
  //   }
  // })
  //
  // petSchema.validate({
  //   name: "Huggy",
  //   age: 2,
  //   contact: '+33164808596'
  // })

  // const persoSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 200
  //   },
  //   hourlyWage: {
  //     type: Number,
  //     min: 1
  //   },
  //   email: {
  //     type: String,
  //     regEx: SimpleSchema.RegEx.Email
  //   }
  // })
  // persoSchema.validate({
  //   name: 'Rico',
  //   hourlyWage: 37,
  //   email: 'rico@club.fr'
  // })

});
