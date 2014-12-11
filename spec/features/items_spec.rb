# encoding: utf-8
require_relative '../spec_helper'

describe 'Shopping Cart:' do

  describe ' visting shopping cart ' do    
    it 'is successful' do
      get '/shop'
      expect(last_response.status).to eq 200
    end
  end

  describe ' adding an item in shopping cart ' do    
  	let(:body) { {:id => 999,:name => "Mac Book Pro", :price => 13456.89, :unit => "台"} }
    it 'is successful' do
      post '/items',body,{'Content-Type' => 'application/json'}
      expect(last_response.status).to eq 200
    end
  end

  describe ' remove an item from shopping cart ' do    
  	let(:body) { {:id => 999} }
    it 'is successful' do
      post '/deleteCartItem',body,{'Content-Type' => 'application/json'}
      expect(last_response.status).to eq 200
    end
  end
  
  describe ' set promotion for a product  ' do    
  	let(:body) { {:id => 999} }
    it 'is successful' do
      post '/addPromotion',body,{'Content-Type' => 'application/json'}
      expect(last_response.status).to eq 200
    end
  end

  describe ' cancel promotion for a product  ' do    
  	let(:body) { {:id => 999} }
    it 'is successful' do
      post '/deletePromotion',body,{'Content-Type' => 'application/json'}
      expect(last_response.status).to eq 200
    end
  end


end