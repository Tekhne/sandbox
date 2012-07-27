Spine   = require('spine')
Contact = require('models/contact')
$       = Spine.$

Main    = require('controllers/contacts_main')
Sidebar = require('controllers/contacts_sidebar')

class Contacts extends Spine.Controller
  className: 'contacts'

  constructor: ->
    super

    @sidebar = new Sidebar
    @main    = new Main

    @routes
      '/contacts/:id/edit': (params) ->
        @sidebar.active(params)
        @main.edit.active(params)
      '/contacts/:id': (params) ->
        @sidebar.active(params)
        @main.show.active(params)

    @append @sidebar, @main

    Contact.fetch()

module.exports = Contacts
