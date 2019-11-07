class UsersController < ApplicationController
    before_action :configure_permitted_parameters, if: :devise_controller?

    def index
    end

    def show
        @user = User.find(params[:id])
    end
end
