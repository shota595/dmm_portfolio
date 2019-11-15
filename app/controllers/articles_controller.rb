class ArticlesController < ApplicationController
  before_action :configure_permitted_parameters, if: :devise_controller?
  require "open-uri"
  require "news-api"

  def index
    @articles = Article.order(created_at: :desc).page(params[:page])
  end

  def show
    @article = Article.find(params[:id])
  end
end

