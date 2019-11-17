Rails.application.routes.draw do

  root 'articles#index'

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    passwords:     'users/passwords',
  }

  devise_scope :user do
    get "sign_in", to: "users/sessions#new"
    get "sign_out", to: "users/sessions#destroy"
  end

  resources :articles, only: [:index, :show]

  # searchwordを保存するアクションのURL
  get "articles/:id/save" => "articles#save_word"

  resources :users, only: [:show] do
    resources :browsing_histories, only: [:index]
  end
  resources :searchwords, only: [:index, :create, :destroy]
  resources :favorites, only: [:create, :destroy]
  resources :genres, only: [:create]
end
