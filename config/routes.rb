Rails.application.routes.draw do
  root 'images#index'
  resources :images, only: [:index, :new, :create, :show]
end
