
def load_product
	 product = Product.create(:name => params[:name],
            :price => params[:price],
            :unit => params[:unit])
	 @product =product;
	 erb :items
        if product.save
            #[201, {:message => "products/#{product.id}"}.to_json]
        else
            #halt 500, {:message => "create product failed"}.to_json
        end
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

