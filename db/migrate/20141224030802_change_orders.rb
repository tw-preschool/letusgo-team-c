class ChangeOrders < ActiveRecord::Migration
  def change
    change_table :orders do |t|
    t.string :countname
  end
  end
end
