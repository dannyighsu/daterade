function generate_date(var1)
{
var auth = {
  //
  // Update with your auth tokens.
  //
  consumerKey: "CyuobtCmBgwBU0EiFnedJA", 
  consumerSecret: "BbfsvMDUCmGbJUfRMezwy8L0STM",
  accessToken: "ZHuWjGBZuA1uo_ttsbHolbI5ghDXOb0A",
  accessTokenSecret: "agD8fy7oQibPJZy0pGBPGlGBl_U",
  serviceProvider: { 
    signatureMethod: "HMAC-SHA1"
  }
};
var terms = 'dinner';
var near = 'var1';
//var sort = 2
var limit = 40;
//var category = 'restaurant, food'
//var radius_filter = 5;
var restaurant_list = new Array();
var accessor = {
  consumerSecret: auth.consumerSecret,
  tokenSecret: auth.accessTokenSecret
};
parameters = [];
parameters.push(['term', terms]);
parameters.push(['location', near]);
parameters.push(['limit', 20]);
//parameters.push(['sort', sort]);
//parameters.push('category_filter', category)
parameters.push(['callback', 'cb']);
parameters.push(['oauth_consumer_key', auth.consumerKey]);
parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
parameters.push(['oauth_token', auth.accessToken]);
//parameters.push(['radius_filter', radius_filter]);
parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
var message = { 
  'action': 'http://api.yelp.com/v2/search',
  'method': 'GET',
  'parameters': parameters 
};

function Restaurant(rest_name, snippet, rating, address, phone_number) {
    
    this.rest_name = rest_name;
    this.phone_number = phone_number;
    this.address = address;
    this.snippet = snippet;
    this.rating = rating;

    this.rest_name = this.rest_name.fontsize(24);

    this.getInfo = function() {
      return this;
  }

OAuth.setTimestampAndNonce(message);
OAuth.SignatureMethod.sign(message, accessor);
var parameterMap = OAuth.getParameterMap(message.parameters);
parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
console.log(parameterMap);
$.ajax({
  'url': message.action,
  'data': parameterMap,
  'cache': true,
  'dataType': 'jsonp',
  'jsonpCallback': 'cb',
  'success': function(data, textStats, XMLHttpRequest) {
    console.log(data);
    var output = prettyPrint(data);
    for (i = 0; i < data.businesses.length; i++) {
      var restaurant = new Restaurant(data.businesses[i].name, data.businesses[i].snippet_text, data.businesses[i].rating, data.businesses[i].location.display_address, data.businesses[i].display_phone)
      restaurant_list[i] = restaurant
      
    }
  }
});



var auth = { 
  //
  // Update with your auth tokens.
  //
  consumerKey: "CyuobtCmBgwBU0EiFnedJA", 
  consumerSecret: "BbfsvMDUCmGbJUfRMezwy8L0STM",
  accessToken: "ZHuWjGBZuA1uo_ttsbHolbI5ghDXOb0A",
  // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
  // You wouldn't actually want to expose your access token secret like this in a real application.
  accessTokenSecret: "agD8fy7oQibPJZy0pGBPGlGBl_U",
  serviceProvider: { 
    signatureMethod: "HMAC-SHA1"
  }
};
//var category = 'restaurant, food'
//var radius_filter = 5;
//var sort = 2
var terms = 'attraction';
var near = var1;
var limit = 40;
var attraction_list = new Array();
var accessor = {
  consumerSecret: auth.consumerSecret,
  tokenSecret: auth.accessTokenSecret
};
parameters = [];
parameters.push(['term', terms]);
parameters.push(['location', near]);
parameters.push(['limit', 20]);
//parameters.push(['sort', sort]);
//parameters.push('category_filter', category)
parameters.push(['callback', 'cb']);
parameters.push(['oauth_consumer_key', auth.consumerKey]);
parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
parameters.push(['oauth_token', auth.accessToken]);
//parameters.push(['radius_filter', radius_filter]);
parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
var message = { 
  'action': 'http://api.yelp.com/v2/search',
  'method': 'GET',
  'parameters': parameters 
};

function Attraction(attraction_name, snippet, rating, address, phone_number) {
    
    this.attraction_name = attraction_name;
    this.phone_number = phone_number;
    this.address = address;
    this.snippet = snippet;
    this.rating = rating;

    this.attraction_name = this.attraction_name.fontsize(24);

    this.getInfo = function() {
      return this.attraction_name.bold() + "<br>" + this.snippet.bold() + "<br>" + this.rating + "<br>" + this.address + "<br>" + this.phone_number + "<br><br>";
    };
  }
OAuth.setTimestampAndNonce(message);
OAuth.SignatureMethod.sign(message, accessor);
var parameterMap = OAuth.getParameterMap(message.parameters);
parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
console.log(parameterMap);
$.ajax({
  'url': message.action,
  'data': parameterMap,
  'cache': true,
  'dataType': 'jsonp',
  'jsonpCallback': 'cb',
  'success': function(data, textStats, XMLHttpRequest) {
    console.log(data);
    var output = prettyPrint(data);
    for (i = 0; i < data.businesses.length; i++) {
      var attraction = new Attraction(data.businesses[i].name, data.businesses[i].snippet_text, data.businesses[i].rating, data.businesses[i].location.display_address, data.businesses[i].display_phone)
      attraction_list[i] = attraction
      document.write(attraction.getInfo())
      
    } 
  }
});
var final = new Array();
final[0] = restaurant_list;
final[1] = attraction_list;

  numOfDataLocations = 2;
  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay;
  var map;
  var geocoder = new google.maps.Geocoder();
  var marker;
  var points = new Array();
  var random_num1, random_num2;

      function initialize() {

         var featureOpts = [
      {
        stylers: [
          { hue: '#700000' },
          { visibility: 'simplified' },
          { gamma: 0.5 },
          { weight: 0.5 }
        ]
      },
      {
        elementType: 'labels',
        stylers: [
        { visibility: 'off' }
        ]
      },
      {
        featureType: 'water',
        stylers: [
        { color: '#6495ED' }
        ]
      }
      ];

    var styledMapOptions = {
      name: 'Date Style'
    };
        
        var mapOptions = {
          center: new google.maps.LatLng((37.876058 + 37.870310)/2, (-122.264920 -122.268021)/2),
          zoom: 13,
          mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
          },
          mapTypeId: MY_MAPTYPE_ID
        };

        map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);

        var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

        map.mapTypes.set(MY_MAPTYPE_ID, customMapType);


        random_num1 = Math.floor(Math.random()*final[0].length);
        random_num1 = Math.floor(Math.random()*final[1].length);

        var locations = [["restaurant", final[0][random_num1].address, 1], ["attraction", final[1][random_num2].address, 2]];

        var i;

        for (i = 0; i < locations.length; i++) {
      
            geocoder.geocode( {'address': locations[i][1]}, function(results, status) {
              
              if (status == google.maps.GeocoderStatus.OK) {
                
                  map.setCenter(results[0].geometry.location);
                   marker =  new google.maps.Marker({
                    map: map,
                    position:  results[0].geometry.location
                   });
                  points[i] =  results[0].geometry.location;
              }
              else {
                alert("Geocode failed to convert the address!");
              }
            });
            
        }

        var request = {
            origin: points[0], destination: points[1], travelMode: google.maps.TravelMode.WALKING
        };

        directionsService.route(request,function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(result);
            }
        });

      }

      google.maps.event.addDomListener(window, 'load', initialize);

return 
}
