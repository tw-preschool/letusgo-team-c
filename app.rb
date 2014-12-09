require 'rubygems'
require 'sinatra'
require 'rack/contrib'
require 'active_record'
require 'json'
require './models/product'
require './models/item'
require './controllers/cart_controller'
class LoginScreen < Sinatra::Base
  use Rack::Session::Pool, :expire_after => 60*60*24*7
  configure do
    set :username, 'admin'
    set :password, 'admin'
  end

  post '/login' do
    if params[:name] == settings.username && params[:password] == settings.password
       session[:admin] = true
       return session[:admin].to_json
    else
      session[:admin] = false
      return session[:admin].to_json
    end
  end

  get '/login' do
    content_type :html
    File.open('public/views/login.html').read
  end

  get '/judgelogin' do
  redirect '/login' unless session[:admin]
  redirect '/admin'
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
           :number => params[:number]
        }

        if product.save
            [201, {:message => "products/#{product.id}"}.to_json]
        else
            halt 500, {:message => "update product failed"}.to_json
        end
    end

    get '/views/items' do
       load_products
    end

    post '/items' do
        add_into_cart(params[:id],params[:name],params[:price],params[:unit])
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
            :unit => params[:unit])
            if product.save
                [201, {:message => "products/#{product.id}"}.to_json]
            else
                halt 500, {:message => "create product failed"}.to_json
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
        show_shoppingcart
    end

    post '/deleteCartItem' do
        delete_shoppingcart(params[:id])
    end

    post '/addPromotion' do
        puts params[:item_name]
        add_promotion(params[:item_id])
    end

    post '/deletePromotion' do
        delete_promotion(params[:item_id])
    end


    after do
        ActiveRecord::Base.connection.close
    end
end
