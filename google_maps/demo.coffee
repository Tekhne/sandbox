###

    var apiKey = 'AIzaSyCnHEfrA5ra6H6SySHr3OFF-OJ-FFRK0ug';
    var defaultZoom = 8;
    var geocoder;
    var mapData = [];
    var scriptURL = 'http://maps.googleapis.com/maps/api/js?v=3.9&key=' + apiKey + '&sensor=false';

    var buildMarkerSetter = function (renderedMap) {
      return function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          marker = new google.maps.Marker({
            map: renderedMap,
            position: results[0].geometry.location
          });
        }
      };
    };

    var buildMap = function (mapDataIndex) {
      var mapDatum = mapData[mapDataIndex];
      var mapElement = $(mapDatum.elementID).get(0);
      var mapOptions = {
        center: new google.maps.LatLng(
          mapDatum.options.centerLat,
          mapDatum.options.centerLng
        ),
        zoom: mapDatum.options.zoom || defaultZoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      return new google.maps.Map(mapElement, mapOptions);
      // var aMap = new google.maps.Map($('#map_canvas').get(0), {
        // center: new google.maps.LatLng( 39.737567, -104.98471790000002),
        // zoom: 8,
        // mapTypeId: google.maps.MapTypeId.ROADMAP
      // });
      // return aMap;
    };

    var buildMarkers = function (renderedMap, mapDataIndex) {
      var addresses = mapData[mapDataIndex].addresses;
      var i;

      for (i = 0; i < addresses.length; i += 1) {
        geocoder.geocode({address: addresses[i]},
                         buildMarkerSetter(renderedMap));
      }
    };

    var setGeocoder = function () {
      geocoder = new google.maps.Geocoder();
    };

    var setMapData = function (data) {
      mapData = data;
    };

    var injectScript = function () {
      var script = $('<script type="text/javascript"></script>');
      script.attr('src', scriptURL + '&callback=demo.maps.initialize');
      $('body').append(script);
    };

    // public

    maps.initialize = function () {
      var i;

      setGeocoder(new google.maps.Geocoder());

      for (i = 0; i < mapData.length; i += 1) {
        buildMarkers(buildMap(i), i);
      }
    };

    maps.render = function (mapData) {
      setMapData(mapData);
      injectScript();
    };

$(function () {
  demo.maps.render(
    [
      {
        elementID: '#map_canvas',
        options: {
          centerLat: 39.737567,
          centerLng: -104.98471790000002,
          zoom: 11
        },
        addresses: [
          '12975 Vallejo Circle, Denver, CO 80234',
          '7501 E Lowry Blvd, Denver, CO 80230'
        ]
      }
    ]
  );
});

###

# Create or re-use a module named `demo`.
demo = ((demo) ->

  # Create or re-use a module named `maps` within the `demo` module.
  demo.maps = ((maps) ->

    maps.render = (data) ->
      setData data
      injectScript()

    setData = (data) ->
      mapData = data

    mapData = []

    injectScript = ->
      script = $('<script type="text/javascript"></script>')
      script.attr 'src', scriptURL + '&callback=demo.maps.initialize'
      $('body').append script

    maps.initialize = ->

    maps

  )(demo.maps or {})

  demo

)(demo or {})


# Setup the window ready event.
$ ->
  demo.maps.render [

    elementID: "#map_canvas"

    options:
      centerLat:  39.737567
      centerLng:  -104.98471790000002
      zoom:       11

    addresses: [
      "12975 Vallejo Circle, Denver, CO 80234",
      "7501 E Lowry Blvd, Denver, CO 80230"
    ]

  ]
