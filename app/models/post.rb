class Post < ApplicationRecord
    # ============================
    # validate:uuid
    # ============================
    # 必須項目
    validates :uuid, presence: { message: "投稿処理が失敗しました。ページを更新して再度お試しください。" }
    # ============================
    # validate:name
    # ============================
    # 最大桁数:256
    validates :name, length: {maximum: 256, message: "名前は256文字以内で入力してください"}
    # ============================
    # validate:mail
    # ============================
    # 最大桁数:256
    validates :mail, length: {maximum: 256, message: "メールアドレスは256文字以内で入力してください"}
    # ============================
    # validate:subject
    # ============================
    #　最大桁数:256
    validates :subject, length: {maximum: 256, message: "件名は256文字以内で入力してください"}
    # ============================
    # validate:text
    # ============================
    # 必須項目
    validates :text, presence: { message: "本文は必須です" }
    # 最大桁数:10000
    validates :text, length: {maximum:10000, message: "本文は10000文字以内で入力してください"}
end
