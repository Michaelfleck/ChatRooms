Rails.application.routes.draw do
  
  resources :user_channels
  resources :messages
  resources :channels
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  # route to: "static#home"
  # get "/channels", to: "channels#list"

  resources :users, param: :_username
  post '/auth/login', to: 'authentication#login'
  
  get '/channels/list/:id', to: 'channels#list'








  get '/*a', to: 'application#not_found'
end
