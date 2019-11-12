class ArticlesController < ApplicationController
  before_action :configure_permitted_parameters, if: :devise_controller?
  require "open-uri"
  require "news-api"

  def index
    @tips = Article.all
  end

  def show
    @article = Article.find(params[:id])
  end
end

