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
end