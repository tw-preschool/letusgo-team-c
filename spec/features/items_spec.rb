# encoding: utf-8
require_relative '../spec_helper'

describe 'Shopping Cart:' do
  before :each do
    Item.create(name: '红牛', price: 2.30, unit: '罐', num: 1, customer_information_id: 2)
    Item.create(name: '雪碧', price: 3.00, unit: '瓶', num: 3, customer_information_id: 2)
  end

  describe ' adding an item in shopping cart ' do    
  	let(:body) { {:name => "Mac Book Pro", :price => 13456.89, :unit => "台", :userid => 2} }
    before { post '/items', body, {'Content-Type' => 'application/json'} }

    it 'is successful' do
      expect(last_response.status).to eq 200
    end

    it 'can find in items table' do
      Item.all.last.name.should == "Mac Book Pro"
      Item.all.last.price.should == 13456.89
      Item.all.last.unit.should == "台"
      Item.all.last.num.should == 1
    end

    it 'if item exists, add num by 1' do
      expect { post '/items', body, {'Content-Type' => 'application/json'} }.to change { Item.all.last.num }.by(1)
    end
  end

  describe ' remove an item from shopping cart ' do 
  	let(:body) { {:id => Item.where(:name => '雪碧').first.id } }
    before { post '/deleteCartItem',body,{'Content-Type' => 'application/json'} }

    it 'is successful' do
      expect(last_response.status).to eq 200
    end

    it 'can not find delete product in database' do 
      Item.where(:name => '雪碧').should be_empty
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