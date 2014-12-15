# encoding: utf-8

require_relative '../spec_helper'

describe 'Products Application' do
  describe 'List all products' do
    before { get '/products' }

    it 'is successful' do
      expect(last_response.status).to eq 200
    end

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

  end
end
