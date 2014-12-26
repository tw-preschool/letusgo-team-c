ENV['RACK_ENV'] = 'development'
require './app'


run POSApplication.new
