class ArticlesController < ApplicationController
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?
  require "open-uri"
  require "news-api"

  def index
    @articles = Article.order(created_at: :desc).page(params[:page])
  end

  def show
    @article = Article.find(params[:id])
    @favorite = Favorite.new
    gon.translate_key = ENV['translate_API']
    # 閲覧履歴の作成/古い方の履歴
    history = @article.browsing_histories.new
    history.user_id = current_user.id
    if current_user.browsing_histories.exists?(article_id: "#{params[:id]}")
      old_history = current_user.browsing_histories.find_by(article_id: "#{params[:id]}")
      old_history.destroy
    end
    history.save

    # 一人のユーザーが保有できる閲覧履歴の設定
    histories_stock_limit = 10
    histories = current_user.browsing_histories.all
    if histories.count > histories_stock_limit
      histories[0].destroy
    end
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

