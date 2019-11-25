class SearchwordsController < ApplicationController
  before_action :configure_permitted_parameters, if: :devise_controller?

  def index
    @words = current_user.searchwords.order(created_at: :desc).all
  end

  def create
  end

  def destroy
    word = current_user.searchwords.find(params[:id])
    word.destroy
    redirect_to user_searchwords_path
  end
end
