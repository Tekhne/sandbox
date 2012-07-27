Spine = require('spine')

class Contact extends Spine.Model
  # Configure name & attributes
  @configure 'Contact', 'name', 'email'

  # Persist with Local Storage
  @extend @Local

  @filter: (query) ->
    return @all() unless query
    query = query.toLowerCase()
    @select (item) ->
      item.name?.toLowerCase().indexOf(query) isnt -1 or
        item.email?.toLowerCase().indexOf(query) isnt -1

module.exports = Contact
