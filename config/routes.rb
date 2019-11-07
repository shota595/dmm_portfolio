Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users
  get 'categories/create'
  get 'article_histories/index'
  get 'searchwords/index'
  get 'searchwords/create'
  get 'searchwords/destroy'
  get 'favorites/create'
  get 'favorites/destroy'
  get 'articles/index'
  get 'articles/show'
end
