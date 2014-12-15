# encoding: utf-8

require_relative '../spec_helper'
require 'rubygems'
require 'sinatra'
require 'rack/contrib'
require 'active_record'


describe 'Admin Application' do
    describe 'login' do
      let(:body) { {:name => 'admin',:password => 'admin'} }
      it 'is successful login' do
      post '/login' , body, {'Content-Type' => 'application/json'}
      expect(last_response.status).to eq 200
    end
  end

   describe 'View all existing products.' do
     let(:loginBody) { {:name => 'admin',:password => 'admin'} }
     it 'is successful' do
     post '/login' , loginBody, {'Content-Type' => 'application/json'}
     get '/admin'
     expect(last_response.status).to eq 200
   end
  end

  describe 'Add a Product' do
    let(:body) { {:name => "Mac Book Pro", :price => 13456.89, :unit => "台",
                  :number => 1, :information => "cool", :promoted => true} }
    it 'add a product'  do
      post '/add', body, {'Content-Type' => 'application/json'}
      expect(last_response.status).to eq 201
    end
  end

  describe 'Edit a Product' do
    let(:getBody) { {:name => "Mac Book Pro",:newName => "HP Book Pro" ,:price => 1111, :unit => "瓶",
                  :number => 1, :information => "cool"} }
    let(:sendBody) { {:name => "Mac Book Pro", :price => 13456.89, :unit => "台",
                  :number => 1, :information => "cool", :promoted => true} }
    it 'edit a product'  do
      post '/add', sendBody, {'Content-Type' => 'application/json'}
      post '/edit', getBody, {'Content-Type' => 'application/json'}
      expect(last_response.status).to eq 201
    end
  end

  describe 'Delete a Product' do
    let(:getBody) { {:name => "Mac Book Pro"} }
    let(:sendBody) { {:name => "Mac Book Pro", :price => 13456.89, :unit => "台",
                  :number => 1, :information => "cool", :promoted => true} }
    it 'delete a product'  do
      post '/add', sendBody, {'Content-Type' => 'application/json'}
      get '/delete', getBody, {'Content-Type' => 'application/json'}
      expect(last_response.status).to eq 200
    end
  end

end
