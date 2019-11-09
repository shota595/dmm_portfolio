# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?

# require 'open-uri'
# require 'news-api'

# url = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey='
# article_serialized = open(url).read
# articles = JSON.parse(article_serialized)

# articles['articles'].each do |item|
#     Exchange.create(item["author"])
# end

