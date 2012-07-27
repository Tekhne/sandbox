Spine   = require('spine')
Contact = require('models/contact')
$       = Spine.$

class Show extends Spine.Controller
  # Set the HTML class
  className: 'show'

  events:
    'click .edit': 'edit'

  constructor: ->
    super

    # Bind the change() callback to the *active* event
    @active @change

  render: ->
    # Render a template, replacing the controller's HTML
    @html require('views/show')(@item)

  change: (params) =>
    @item = Contact.find(params.id)
    @render()

  edit: ->
    # Navigate to the 'edit' view whenever the edit link is clicked
    @navigate('/contacts', @item.id, 'edit')
