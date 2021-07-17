Rails.application.routes.draw do
  root to: 'posts#index'
  # フォーム投稿時に投稿ページに遷移しないためnewアクションのルーティングは不要。
  post 'posts', to: 'posts#create'
end
