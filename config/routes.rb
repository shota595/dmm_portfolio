Rails.application.routes.draw do
  get 'categories/create'
  get 'article_histories/index'
  get 'searchwords/index'
  get 'searchwords/create'
  get 'searchwords/destroy'
  get 'favorites/create'
  get 'favorites/destroy'
  get 'articles/index'
  get 'articles/show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
