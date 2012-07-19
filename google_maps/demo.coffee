window.demo ?= {}
window.demo.maps ?= {}

window.demo.maps.API_KEY = 'AIzaSyCnHEfrA5ra6H6SySHr3OFF-OJ-FFRK0ug'
window.demo.maps.API_VERSION = '3.9'

class window.demo.maps.Maps
  # Define at this level to force the closure on the class.
  instance = undefined

  # Must be a class/static method.
  @instance: (mapRecords) ->
    instance ?= new window.demo.maps._Maps mapRecords

class window.demo.maps._Maps
  constructor: (records) ->
    @defaultZoom = 8
    @geocoder = undefined
    @records = records
    @scriptURL = 'http://maps.googleapis.com/maps/api/js?v=' + API_VERSION + '&key=' + API_KEY + '&sensor=false'

  render: ->
    script = $('<script type="text/javascript"></script>')
    script.attr 'src', @scriptURL + '&callback=window.demo.maps._Maps.initialize'
    $('body').append script

  # Must be static and take no arguments (cross-domain callback).
  @initialize: ->
    @geocoder = new google.maps.Geocoder()
    for record in @mapRecords
      buildMap record
      buildMapMarkers record
      setMapCenter record

  buildMap = (record) ->
    record.map = new google.maps.Map($(record.elementID).get(0), {
      zoom: record.zoom or defaultZoom
      mapTypeId: google.maps.MapTypeId.ROADMAP
    })

  buildMapMarkers = (record) ->
    record.markers = []
    for address in record.addresses
      @geocoder.geocode({address: address}, (results, status) ->
        if status == google.maps.GeocoderStatus.OK
          record.markers.push new google.maps.Marker({
            map: record.map,
            position: results[0].geometry.location
          })
      )

  setMapCenter = (record) ->
    # record.map.setCenter(new google.maps.LatLng(...))

$ ->
  window.demo.maps.Maps.instance([
    elementID:  "#map_canvas"
    addresses:  [
      "12975 Vallejo Circle, Denver, CO 80234",
      "7501 E Lowry Blvd, Denver, CO 80230"
    ]
  ]).render()
