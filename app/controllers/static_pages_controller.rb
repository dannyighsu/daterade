require 'net/http'

class StaticPagesController < ApplicationController
  def home
  end

  def help
  end

  def about
  end

  def contact
  end

  def match
    limit = 5
    result_limit = 5

    # Find restaurant results
    input = params[:input]
    client = Yelp::Client.new({ consumer_key: ENV['Yelp_Key'], consumer_secret: ENV['Yelp_Secret'], token: ENV['Yelp_Token'], token_secret: ENV['Yelp_Token_Secret']})
    searchParams = { term: 'dinner', limit: limit }
    restaurants = client.search(input, searchParams).businesses

    # Find attraction results
    searchParams = { term: 'clubs or bars', limit: limit }
    attractions = client.search(input, searchParams).businesses

    # Calculate results with Google Maps Distance Matrix API
    # construct query string
    queryString = 'https://maps.googleapis.com/maps/api/distancematrix/json?'
    origins = 'origins='
    destinations = '&destinations='

    restaurants.each do |r|
      restaurant_addr = r.location.address[0] + ' ' + r.location.city + ', ' + r.location.state_code + ' ' + r.location.postal_code
      restaurant_addr.gsub!(' ', '+')
      origins = origins + restaurant_addr + '%7c'
    end
    origins = origins[0..-4]

    attractions.each do |a|
      attraction_addr = a.location.address[0] + ' ' + a.location.city + ', ' + a.location.state_code + ' ' + a.location.postal_code
      attraction_addr.gsub!(' ', '+')
      destinations = destinations + attraction_addr + '%7c'
    end
    destinations = destinations[0..-4]

    # Make get request to Maps API and parse result
    response = HTTParty.get(queryString + origins + destinations + '&key=' + ENV['Google_Key']).body
    response = JSON.parse(response)
    logger.info(response)

    location_hash = {}
    distances = []
    for i in 0 ... limit * limit
      distance = response["rows"][i / limit]["elements"][i % limit]["distance"]["value"]
      distances.push(distance)
      origin = restaurants[i / limit]
      destination = attractions[i % limit]
      location_hash[distance] = [origin, destination]
    end

    distances.sort
    @results = {}

    for i in 0...result_limit
      @results[distances[i]] = JSON.parse(location_hash[distances[i]].to_json)
    end

  end

end
