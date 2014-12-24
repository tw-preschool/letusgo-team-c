require 'active_record'

class Customer_information < ActiveRecord::Base
  validates :countname, :password, presence: true
  validates :name, length: { maximum: 128 }
  validates :phone, numericality: true
  has_many :items
end
