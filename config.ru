ENV['RACK_ENV'] = 'test'
require './app'

run POSApplication.new