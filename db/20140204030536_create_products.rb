class CreateProducts < ActiveRecord::Migration
    def change
        create_table :products do |t|
            t.string :name
            t.float :price
            t.string :unit
            t.string :promoted
            t.timestamps 
        end
    end
end
