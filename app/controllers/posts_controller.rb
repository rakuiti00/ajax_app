class PostsController < ApplicationController

  def index
    @posts = Post.order(id: "DESC")
  end

  # def new
  # end

  def create
    #デフォルトはHTMLを返す設定になってる
    # Post.create(content: params[:content])
    # redirect_to action: :index

    #JSON形式で返す場合（ajax)
    post = Post.create(content: params[:content])
    render json:{post: post}

  end
end
