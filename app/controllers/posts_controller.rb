class PostsController < ApplicationController

  def index
    @posts = Post.order(id: "DESC")
    # 取得した全てのメモはidカラムを基準に降順(新しい順)に並べる
  end

  # newアクションは不要なのでコメントアウトしておく
  # def new
  # end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index # メモ内容保存後トップページへリダイレクトする。
  end
end
