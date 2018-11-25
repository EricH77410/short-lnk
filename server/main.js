import { Meteor } from 'meteor/meteor';
import '../imports/api/users'
import '../imports/api/links'

Meteor.startup(() => {
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
