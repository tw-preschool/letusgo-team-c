class ChangeCustomerInformations < ActiveRecord::Migration
  def change
    change_table :customer_informations do |t|
    t.string :guid
    t.text :details
    t.timestamps
    end
  end
end
