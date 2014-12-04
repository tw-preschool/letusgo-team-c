require 'sinatra'
require 'rack/contrib'
require 'active_record'
require 'json'

require './models/product'



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


    use Rack::Session::Pool, :expire_after => 2592000
    configure do
      enable :sessions
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
        return session[:admin].to_json
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
        content_type :html
        File.open('public/views/add.html').read
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

    after do
        ActiveRecord::Base.connection.close
    end
end
