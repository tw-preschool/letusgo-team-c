class CreateItems < ActiveRecord::Migration
    def change   
        create_table :items do |t|
            t.string :name
            t.float :price
            t.string :unit
            t.integer :num
            t.float :total_money
            t.string :promoted
            t.float :saving_money
            t.timestamps 
        end
    end
end