class ChangeProducts < ActiveRecord::Migration
  def change
  	change_table :products do |t|
  		t.integer :number
  	end
  end
end
