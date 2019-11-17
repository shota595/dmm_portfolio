class ArticlesController < ApplicationController
  before_action :configure_permitted_parameters, if: :devise_controller?
  require "open-uri"
  require "news-api"

  def index
    @articles = Article.order(created_at: :desc).page(params[:page])
  end

  def show
    @article = Article.find(params[:id])
    # history = @article.browsing_histories.news
    # history.user_id = current_user.id

  end


  # 検索した単語を保存する
  # searchwordに保存するデータはjsから渡される
  def save_word
    @article = Article.find(params[:id])
    user = current_user.id
    searchwordhistory = Searchword.new(word_name: params[:word], word_meaning: params[:meaning], user_id: user)
    searchwordhistory.save
  end

  def save_article
    article = BrowsingHistories.find(params[:id])
    user = current_user.id
    article.create(user_id: user, article_id: article)
  end
end

