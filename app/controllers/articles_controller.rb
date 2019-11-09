class ArticlesController < ApplicationController
  before_action :configure_permitted_parameters, if: :devise_controller?
  require "open-uri"
  require "news-api"
  def index
    url = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey='
    article_serialized = open(url).read
    articles = JSON.parse(article_serialized)
    # @num = @articles["totalResults"].to_i
    # @author = articles["articles"][0]["author"]

    # n = News.new("API_key")
    # n.get_sources(country: 'us', language: 'en')
    # n.get_headline_top_headlines(sources: "bbc-news", category: "business")


    # News APIから取得したデータをデータベースに保存
    # articles["articles"].each do |item|
    #   begin
    #     article =Article.new(author   = item["author"],
    #                           title   = item["title"] ,
    #                           content = item["content"])
    #     article.save
    #   rescue
    #     next
    #   end
    # <% end %>

  end

  def show
  end
end
