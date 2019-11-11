class ArticlesController < ApplicationController
  before_action :configure_permitted_parameters, if: :devise_controller?
  require "open-uri"
  require "news-api"

  def index
    news_API = ENV["news_API"]

    url = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=' + news_API
    article_serialized = open(url).read
    articles = JSON.parse(article_serialized)
    # @num = @articles["totalResults"].to_i
    # @author = articles["articles"][0]["author"]

    # n = News.new("API_key")
    # n.get_sources(country: 'us', language: 'en')
    # n.get_headline_top_headlines(sources: "bbc-news", category: "business")


    # News APIから取得したデータをデータベースに保存
    #実装したいコード：データベースに検索をかけてあればsaveをしない、なければsaveをする
    articles["articles"].each do |item|
      begin
        article =Article.create!({author:item["author"],
                              title:item["title"] ,
                              content:item["content"],
                              article_image:item["url"] ,
                              article_url:item["urlToImage"] ,
                              published_at:item["publishedAt"],
                              genre_id:1})
        # article.save
      rescue
        next
      end
    end
    @tips = Article.all
    # @tip = Article.find(params[:id])

  end

  def show
    @article = Article.find(params[:id])
  end
end

