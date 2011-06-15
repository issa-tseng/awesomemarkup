# quick and easy dev server

require 'rubygems'
require 'rack/static'

run Rack::Directory.new('.')

