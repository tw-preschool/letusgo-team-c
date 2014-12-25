# -*- encoding : utf-8 -*-
require 'rubygems'
require 'sinatra'
require 'sinatra/activerecord'
require 'rack/contrib'
require 'active_record'
require 'json'
require './models/product'
require './models/item'
require './models/order'
require './models/customer_information.rb'
require './controllers/cart_controller'


class LoginScreen < Sinatra::Base

  use Rack::Session::Pool, :expire_after => 60*60*24*7
  set :views, settings.root + '/public/views'
  configure do
    set :username, 'admin'
    set :password, 'admin'
  end


    post '/login' do
      if params[:name] == settings.username && params[:password] == settings.password
         session[:admin] = true
         session[:login] = true
         return session[:admin].to_json
      else
        session[:admin] = false
        session[:login] = false
        return session[:admin].to_json
      end
    end

    set :views, settings.root + '/public/views'
    get '/login' do
      erb :login
    end

    get '/judgelogin' do
    redirect '/login' unless session[:admin]
    redirect '/admin'
    end

    post '/logout' do
    if(session[:login] == true)
      session[:login] = false
      session[:admin] = false
      session[:name] = nil
      return true.to_json
    else
      session[:login] = false
      return session[:login].to_json
    end
  end

    get "/showUser" do
    if session[:login] == true
      if session[:admin] == true
         return settings.username.to_json
      else
         return session[:name].to_json
      end
    else
       return false.to_json
    end
  end

  post "/customlogin" do
      if customer_information = Customer_information.where(:countname => params[:name]).first
          if customer_information.password == params[:password]
             session[:name] = customer_information.countname
             session[:login] = true
             return true.to_json
          else
             return "password_error".to_json
          end
      else
      return "user_not_exit".to_json
      end
  end


  post '/judgeregister'do
    if customer_information = Customer_information.where(:countname => params[:customerEmail]).first
       return true.to_json
    else
       return false.to_json
     end
  end

  post '/register' do
   if  customer = Customer_information.where(:countname => params[:customerEmail]).first
       return false.to_json
  else
     customer_information = Customer_information.new(
      :countname => params[:customerEmail],
      :password => params[:customerPassword],
      :name => params[:customerName],
      :address => params[:customerAddress],
      :phone => params[:customerTelephone] )
      if customer_information.save
         [201, {:message => "customer_informations/#{customer_information.id}", :customer_informationId => customer_information.id}.to_json]
       else
         halt 500, {:message => "create customer failed"}.to_json
       end
   end
end

  get '/register' do
    erb :register
  end
end


class POSApplication < Sinatra::Base
    use LoginScreen
    set :views, settings.root + '/public/views'
    dbconfig = YAML.load(File.open("config/database.yml").read)

    configure :development do
        require 'sqlite3'
        ActiveRecord::Base.establish_connection(dbconfig['development'])
    end

    configure :test do
        require 'sqlite3'
        ActiveRecord::Base.establish_connection(dbconfig['test'])
    end


    use Rack::PostBodyContentTypeParser
    get '/' do
        content_type :html
        File.open('public/index.html').read
    end

    get '/delete' do
        begin
            product = Product.where(:name => params['name'])[0]
            product.destroy
        rescue  ActiveRecord::RecordNotFound => e
            [404, {:message => e.message}.to_json]
        end
    end

    post '/add' do
        product = Product.new(:name => params[:name],
            :price => params[:price],
            :unit => params[:unit],
            :number => params[:number],
            :information => params[:information],
            :promoted => params[:promoted])
        puts params[:promoted]

        if product.save
            [201, {:message => "products/#{product.id}", :productId => product.id}.to_json]
        else
            halt 500, {:message => "create product failed"}.to_json
        end
    end

    post '/edit' do
       product = Product.where(:name => params['name']).first
       product.attributes = {
           :name => params[:newName],
           :price => params[:price],
           :unit => params[:unit],
           :number => params[:number],
           :information => params[:information]
        }
        if product.save
            [201, {:message => "products/#{product.id}"}.to_json]
        else
            halt 500, {:message => "update product failed"}.to_json
        end
    end

    get '/views/items' do
      @loginUser = session[:name]
      @loginUserId = find_login_user_id()
      load_products
    end

    post '/items' do
        add_into_cart(params[:name], params[:price], params[:unit], params[:userid])
    end

    get '/products/:id' do
        begin
            product = Product.find(params[:id])
            product.to_json
        rescue  ActiveRecord::RecordNotFound => e
            [404, {:message => e.message}.to_json]
        end
    end

    post '/products' do
        product = Product.create(:name => params[:name],
            :price => params[:price],
            :unit => params[:unit],
            :information => params[:information])
            if product.save
                [201, {:message => "products/#{product.id}"}.to_json]
            else
                halt 500, {:message => "create product failed"}.to_json
            end
    end

    get '/products' do
        begin
          products = Product.all || []
          products.to_json
        rescue ActiveRecord::RecordNotFound => e
            [404, {:message => e.message}.to_json ]
        end
    end


    get '/admin' do
        redirect '/login' unless session[:admin]
        products = Product.all
        @products = products
        @count = get_shoppingcart_num
        erb :admin
    end

    get '/shop' do
      redirect '/login' unless session[:name]
      show_shoppingcart
    end

    post '/deleteCartItem' do
        delete_shoppingcart(params[:id])
    end

    post '/addPromotion' do
        add_promotion(params[:item_id])
    end

    post '/deletePromotion' do
        delete_promotion(params[:item_id])
    end

    post '/close' do
        clear_shoppingcart
    end

    get '/payment' do
        erb :payment
    end

    post '/payment' do
        Order.create(:guid => params[:guid] ,:details => params[:list]).save
    end

    get '/orders' do
        redirect '/login' unless session[:admin]
        orders = Order.find_by_sql(['select * from orders order by created_at DESC']) || []
        list = []
        orders.each do |order|
            obj = JSON.parse order.details
            obj["guid"] = order.guid
            obj["time"] = order.created_at
            list.push(obj)
        end
        @orderlist = list
        erb :orderlist
    end
    get '/orders/:guid' do
        order = Order.where(:guid => params[:guid]).first
        unless order.nil?
            obj = JSON.parse order.details
            #puts obj["shopping_items"]
            @shopping_items = obj["shopping_items"]
            @promotion_items = obj["promotion_items"]
            @total = obj["totalMoney"]
            @subTotal = obj["totalSavingMoney"]
            @guid = order.guid
            @time = order.created_at
            erb :order
        end
    end

    post '/deleteOrder' do
        order = Order.where(:guid => params[:guid]).first
        unless order.nil?
            order.destroy
        end
    end

    after do
        ActiveRecord::Base.connection.close
    end
end
