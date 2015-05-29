require 'yelp'

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
    input = params[:input]
    client = Yelp::Client.new({ consumer_key: ENV['Yelp_Key'], consumer_secret: ENV['Yelp_Secret'], token: ENV['Yelp_Token'], token_secret: ENV['Yelp_Token_Secret']})
    searchParams = { term: 'dinner' }
    @responses = client.search(input, searchParams).businesses
  end

end
