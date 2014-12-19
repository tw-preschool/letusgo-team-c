class CreateCustomerInformations < ActiveRecord::Migration
  def change
    create_table:customer_informations do |t|
      t.string :countname
      t.string :password
      t.string :name
      t.string :address
      t.string :phone
    end
  end
end
