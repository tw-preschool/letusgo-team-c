
def load_products
    products = Product.all
    @products = products
    @count = products.length
    erb :items
end

def add_into_cart(name,price,unit,num)
    puts name,price,unit,num
end

def show_shoppingcart
	#products = Product.all || []
    #        products.to_json
    # @body = Product.all
    #    erb :cart
end

def add_promotion(item_id)
	Product.update(item_id.to_i,:promoted=>'true')
end

def delete_promotion(item_id)
	Product.update(item_id,:promoted=>'false')
	puts 'Suceess remove the promotion from this product!'
end

