import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'
import shortid from 'shortid'
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

    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null
    })

  },
  'links.setVisibility'(id, visible){
    if (!this.userId){
      throw new Meteor.Error('Non authorisé!')
    }

    new SimpleSchema({
      id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    }).validate({id, visible});

    Links.update({_id:id, userId: this.userId}, { $set: {visible}})
  },
  'links.trackVisit'(_id){
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({_id});

    Links.update({_id}, {
      $set: {
        lastVisitedAt: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    })
  },
  'links.updateLink'(_id, url){
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({_id, url})

    Links.update({_id}, {$set: {url}})
  },
  'links.delete'(_id) {
    if (!this.userId){
      throw new Meteor.Error('Non authorisé!');
    }

    Links.remove(_id)
  }
})
