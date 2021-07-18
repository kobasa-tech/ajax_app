class PostsController < ApplicationController

  def index
    @posts = Post.order(id: "DESC")
    # 取得した全てのメモはidカラムを基準に降順(新しい順)に並べる
  end

  # newアクションは不要なのでコメントアウトしておく
  # def new
  # end

  def create
    post = Post.create(content: params[:content])
    render json:{post: post}
    # render json:{キー: 値} jsonオプションでpostというキーとセットで変数postの値をJSON形式で返却している
    # Ajaxを用いた非同期通信のレスポンスではJSON形式のデータそのものを返している。
  end
end
