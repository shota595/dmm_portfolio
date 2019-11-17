class BrowsingHistoriesController < ApplicationController
  def index
    @user = current_user
    @histories = @user.browsing_histories.all.order(created_at: :desc)
  end
end
