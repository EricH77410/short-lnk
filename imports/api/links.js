import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'
import '../startup/simple-schema-conf.js'

export const Links = new Mongo.Collection('links')


if (Meteor.isServer){
  // Il n'est pas possible de récupérer le resultat de la fonction Meteor.userId
  // dans la methode 'publish'... on utilise alors une function ES5 pour avoir acces
  // à 'this' ... à checker si le probleme est toujours valable avec une version supérieru de Meteor
  Meteor.publish('links', function () {

    return Links.find({ userId: this.userId})

  })
}

Meteor.methods({
  'links.insert'(url){

    if (!this.userId){
      throw new Meteor.Error('Non authorisé!')
    }

      new SimpleSchema({
        url: {
          type: String,
          label: 'Your link',
          regEx: SimpleSchema.RegEx.Url
        }
      }).validate({url})
      throw new Meteor.Error('400', e.message)

    Links.insert({
      url,
      userId: this.userId
    })

  }
})
