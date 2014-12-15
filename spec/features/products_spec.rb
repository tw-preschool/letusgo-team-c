# encoding: utf-8

require_relative '../spec_helper'

describe 'Products Application' do

  describe 'List all products' do
<<<<<<< HEAD
    before { get '/products' }

=======
    #before { get '/views/items' }
    
>>>>>>> 0ee9d67fa77d35924b795ae9f41962b397115dd7
    it 'is successful' do
      get '/views/items'
      expect(last_response.status).to eq 200
    end
<<<<<<< HEAD

    it 'is empty at the very begining' do
      list = get '/products'
      expect(list.length).to eq 0
    end
  end

  describe 'Create a Product' do
  	let(:body) { {:name => "Mac Book Pro", :price => 13456.89, :unit => "台",:information => "coo"} }

  	it 'create a product'  do
  		post '/products', body, {'Content-Type' => 'application/json'}
  		expect(last_response.status).to eq 201

  	end

=======
>>>>>>> 0ee9d67fa77d35924b795ae9f41962b397115dd7
  end
end
