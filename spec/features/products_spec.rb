# encoding: utf-8

require_relative '../spec_helper'
 
describe 'Products Application' do

  describe 'List all products' do
    #before { get '/views/items' }
    
    it 'is successful' do
      get '/views/items'
      expect(last_response.status).to eq 200
    end
  end
end