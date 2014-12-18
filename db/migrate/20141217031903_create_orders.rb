class CreateOrders < ActiveRecord::Migration
  def change
  	create_table :orders do |t|
			t.string :guid
			t.text :details
			t.timestamps 
    end
  end
end
