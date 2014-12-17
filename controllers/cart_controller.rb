require 'active_record'



def load_products
    @products = Product.where("number>=1")
    @count = get_shoppingcart_num
    erb :items
end

def add_into_cart(name,price,unit)
    item = Item.where(:name => params['name']).first
    if  item.nil?
        item = Item.create(:name => name,
                   :price => price,
                   :unit => unit,
                   :num => 1
                   )
    else
        item.num += 1;
    end
    item.save
end

def show_shoppingcart
  	products = Product.all || []
  	items = Item.all || []

  	items.each do |item|
  		products.each do |product|
  			if item.name == product.name
  			   item.promoted = product.promoted
  			   next
  			end
  		end
  	end

  	@items = items;
    @count = items.length
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
    Item.all.length
end

def clear_shoppingcart
    Item.delete_all('id >= 1')
end
