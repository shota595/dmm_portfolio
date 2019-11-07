class ArticlesController < ApplicationController
  before_action :configure_permitted_parameters, if: :devise_controller?

  def index
  end

  def show
  end
end
