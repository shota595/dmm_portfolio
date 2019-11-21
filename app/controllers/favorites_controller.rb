class FavoritesController < ApplicationController
  def create
    @article = Article.find(params[:article_id])
    favorite = current_user.favorites.new(article_id: @article.id)
    favorite.save
    render 'favorite'
  end

  def destroy
    @article       = Article.find(params[:article_id])
    favorite = current_user.favorites.find_by(article_id: @article.id)
    favorite.destroy
    render 'favorite'
  end
end
