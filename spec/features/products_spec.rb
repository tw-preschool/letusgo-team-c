# encoding: utf-8

require_relative '../spec_helper'

describe 'Products Application' do

  context 'products list' do
  	before { get '/products' }
    it 'show properly' do
      expect(last_response.status).to eq 200
    end
    it 'have no product yet' do
    	products = JSON.parse(last_response.body)
    	expect(products.length).to eq 0
    end
  end

  context 'add new product' do
  	let(:body) { {:name => "Mac Book Pro", :price => 13456.89, :unit => "台"} }
  	before { post 'products', body, {'Content-Type' => 'application/json'} }

  	it 'insert into database properly' do
  		expect(last_response.status).to eq 201
  	end

  	it 'can find in database' do
  		Product.all.last.name.should == "Mac Book Pro"
  		Product.all.last.price.should == 13456.89
  		Product.all.last.unit.should == "台"
  	end

  end
end
