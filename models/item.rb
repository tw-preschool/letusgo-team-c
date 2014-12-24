require 'active_record'

class Item < ActiveRecord::Base
	validates :customer_information_id, presence: true
	belongs_to :customer_information
end