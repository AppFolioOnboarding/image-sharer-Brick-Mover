Rails.application.routes.draw do
  root 'images#index'
  resources :images, only: [:index]
end
