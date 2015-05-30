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
    # Find restaurant results
    input = params[:input]
    client = Yelp::Client.new({ consumer_key: ENV['Yelp_Key'], consumer_secret: ENV['Yelp_Secret'], token: ENV['Yelp_Token'], token_secret: ENV['Yelp_Token_Secret']})
    searchParams = { term: 'dinner' }
    restaurants = client.search(input, searchParams).businesses

    # Find attraction results
    searchParams = { term: 'clubs or bars' }
    attractions = client.search(input, searchParams).businesses

    # Calculate results with Google Maps Distance Matrix API
    output = 'json'

    location_hash = {}
    distances = []
    restaurants.each do |r|

      restaurant_addr = r.location.address[0] + ' ' + r.location.city + ', ' + r.location.state_code + ' ' + r.location.postal_code
      restaurant_addr.gsub!(' ', '+')

      attractions.each do |a|
        attraction_addr = a.location.address[0] + ' ' + a.location.city + ', ' + a.location.state_code + ' ' + a.location.postal_code
        attraction_addr.gsub!(' ', '+')

        parameters = 'origins=' + restaurant_addr + '&destinations=' + attraction_addr
        response = HTTParty.get('https://maps.googleapis.com/maps/api/distancematrix/' + output + '?' + parameters).body
        response = JSON.parse(response)
        distance = response["rows"][0]["elements"][0]["distance"]["value"]
        distances.push(distance)
        location_hash[distance] = [r, a]
      end
    end

    distances.sort
    @results = {}

    for i in 0...7
      @results[distances[i]] = JSON.parse(location_hash[distances[i]].to_json)
    end

  end

end
