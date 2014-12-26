require 'active_record'



def load_products
    @products = Product.where("number>=1")
    @count = get_shoppingcart_num
    erb :items
end

def add_into_cart(name, price, unit, userid)
    item = Item.where(:name => params['name'], :customer_information_id => userid).first
    if  item.nil?
        item = Item.create(:name => name,
                   :price => price,
                   :unit => unit,
                   :num => 1,
                   :customer_information_id => userid
                   )
    else
        item.update(num: item.num + 1)
    end
end

def show_shoppingcart
  	products = Product.all || []
  	items = Item.all || []

  	items.each do |item|
  		products.each do |product|
  			if item.name == product.name
           item.update(promoted: product.promoted)
  			   next
  			end
  		end
  	end
    loginUser = find_login_user_id()
  	@items = Item.where(customer_information_id: loginUser);
    @count = @items.length
    erb :cart
end

def delete_shoppingcart(id)
    item = Item.where(:id => id).first
    item.destroy  unless item == nil
end


def add_promotion(item_id)
    product = Product.where(:id => item_id).first
    if product != nil
      product.attributes = {:promoted => 'true'}
      product.save
    end
end

def delete_promotion(item_id)
  	product = Product.where(:id => item_id).first
    if product != nil
      product.attributes = {:promoted => 'false'}
      product.save
    end
end

def get_shoppingcart_num
    loginUser = find_login_user_id()
    Item.where(customer_information_id: loginUser).length
end

def clear_shoppingcart
    loginUser = find_login_user_id()
    Item.delete_all(customer_information_id: loginUser)
end

def find_login_user_id
    customer = Customer_information.where(:countname => session[:name]).first
    @loginUserId = customer ? customer.id : nil
end
