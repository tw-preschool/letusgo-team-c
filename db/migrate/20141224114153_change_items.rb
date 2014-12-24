class ChangeItems < ActiveRecord::Migration
  def change
  	change_table :items do |t|
  		t.integer :customer_information_id
  	end
  end
end
