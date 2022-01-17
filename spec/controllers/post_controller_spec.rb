require 'rails_helper'

RSpec.describe PostController, type: :controller do
  describe "GetAPI" do
    it "投稿TOPを表示" do
        get 'index'
        expect(response.status).to eq(200)
      end
    it "投稿データを取得" do
      get 'get', params: {category_id: 1}
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
    end
    it "カテゴリデータを取得（アクセスエラー）" do
      get 'get', params: {category_id: 3}
      json = JSON.parse(response.body)
      expect(response.status).to eq(422)
    end
  end
  describe "PostAPI" do
    it "投稿データを登録" do
      session[:uuid] = 'A0E7CA6D-E568-4FED-8562-318E0620F47F'
      expect { post 'regist', params: { category_id: 1 , name:'', mail: '', text: 'テストです'} }.to change(Post, :count).by(+1)
      expect(response.status).to eq(200)
    end
    it "投稿データを削除" do
        category_id = 1
        id = 1
      post 'delete', params: { category_id: category_id, id: id}
      expect(response.status).to eq(200)
      expect(Post.find(id).hide_flag).to eq('1')
    end
  end
end