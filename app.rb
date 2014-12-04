require 'sinatra'
require 'rack/contrib'
require 'active_record'
require 'json'

require './models/product'
require './controllers/cart_controller'
class POSApplication < Sinatra::Base
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

    get '/add' do
        product = Product.new(:name => params[:name],
            :price => params[:price],
            :unit => params[:unit],
            :promoted => params[:promoted])
        puts params[:promoted]

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
            [404, {:message => e.message}.to_json]
        end
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
        @products = Product.all
        erb :admin
    end

    get '/shop' do
        show_shoppingcart
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

