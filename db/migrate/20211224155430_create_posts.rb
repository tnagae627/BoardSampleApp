class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.integer :category_id, null: false
      t.string  :hide_flag, limit: 1
      t.string :uuid, null: false
      t.string :name, limit: 256
      t.string :mail, limit: 256
      t.string :subject, limit: 256
      t.text :text, null: false, limit: 256

      t.timestamps
    end
  end
end
