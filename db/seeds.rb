# カテゴリ新規登録
Category.create(category_name:'時事ニュース', deleted_flag:'0')
Category.create(category_name:'スポーツ', deleted_flag:'0')
Category.create(category_name:'削除カテゴリ', deleted_flag:'1')
# 投稿データ登録
Post.create(category_id: 1, hide_flag: '0', uuid: 'A0E7CA6D-E568-4FED-8562-318E0620F47F', name:'名無し', mail: 'nanashi@test.com', subject: '最近のニュース', text:'何か見た？')
# ユーザ作成
User.create(name: "admin", email:"test@test.com", password:"admin", password_confirmation:"admin")