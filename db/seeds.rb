# encoding: utf-8
require './models/product.rb'
require './models/customer_information.rb'
Product.delete_all

items = []

items.push :name => '可口可乐', :unit => '瓶', :price => 3.00,:number => 1, :information => '这是好喝的饮料',:promoted => 'true'
items.push :name => '雪碧', :unit => '瓶', :price => 3.00,:number => 1, :information => '这是好喝的饮料',:promoted => 'true'
items.push :name => '苹果', :unit => '斤', :price => 5.50, :number => 1,:information => '这是酸甜的水果',:promoted => 'false'
items.push :name => '荔枝', :unit => '斤', :price => 15.00,:number => 1, :information => '这个水果不能久放',:promoted => 'false'
items.push :name => '电池', :unit => '个', :price => 2.00, :number => 1,:information => '旧电池要谨慎回收',:promoted => 'false'
items.push :name => '方便面', :unit => '袋', :price => 4.50, :number => 1,:information => '上火车必备',:promoted => 'false'

items.each do |item|
  puts Product.create item
end



Customer_information.delete_all

customItems = []

customItems.push :countname => "xxj@qq.com",:password => "111111",:name => "xxj",:address => "fuck",:phone => "123445678"

customItems.each do |customItems|
  puts Customer_information.create customItems
end
