require 'active_record'

def load_products
    products = Product.all
    @products = products
    @count = products.length
    erb :items
end

def add_into_cart(id,name,price,unit)
        #item = Item.find(:first, :conditions => [ "name = ?", params[:name]])  
        item = Item.where(:name => params['name']).first
        if  item == nil
            puts "can not be founded!"
            item = Item.create(:name => params[:name],
                       :price => params[:price],
                       :unit => params[:unit],
                       :num => 1
                       )
        else 
            item.num += 1;
            item.save
            puts item.num
        end
        item.save
end

def show_shoppingcart
	@items = Item.all || []
    erb :cart
end

def add_promotion(item_id)
	Product.update(item_id.to_i,:promoted=>'true')
end

def delete_promotion(item_id)
	Product.update(item_id,:promoted=>'false')
	puts 'Suceess remove the promotion from this product!'
end
