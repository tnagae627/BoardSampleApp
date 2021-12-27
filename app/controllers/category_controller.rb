class CategoryController < ApplicationController
  def getCategories
    category = Category.where(deleted_flag: '0')
    render plain:category.to_json
  end

  def regist
    # ============================
    # 現在のカテゴリIDの最大値
    # ============================
    maxCategoryId = Category.all.maximum(:category_id)
    maxCategoryId = maxCategoryId == nil ? 1 : maxCategoryId + 1

    # ============================
    # 投稿データの登録
    # ============================
    categoryData = Category.create(
      category_id: maxCategoryId,
      category_name: params['category_name'],
      deleted_flag: '0'
    )

    # ============================
    # データの返却
    # ============================
    if categoryData.save then
      # 更新データの返却
      getCategories
    else
      # modelのバリデーション結果を返却
      render json: { errors: postData.errors.keys.map { |key| [key, postData.errors.full_messages_for(key)]}.to_h, render: 'show.json.jbuilder' }, status: :unprocessable_entity
    end
  end

  def delete
    # ============================
    # データの返却（削除処理同時実施）
    # ============================
    if Category.where(category_id: params['category_id']).update_all(deleted_flag: '1') then
      # 更新データの返却
      getCategories
    else
      # modelのバリデーション結果を返却
      render json: { errors: categoryData.errors.keys.map { |key| [key, categoryData.errors.full_messages_for(key)]}.to_h, render: 'show.json.jbuilder' }, status: :unprocessable_entity
    end
  end

  def edit
    # ============================
    # データの返却（編集処理同時実施）
    # ============================
    if Category.where(category_id: params['category_id']).update_all(category_name: params['category_name']) then
      # 更新データの返却
      getCategories
    else
      # modelのバリデーション結果を返却
      render json: { errors: categoryData.errors.keys.map { |key| [key, categoryData.errors.full_messages_for(key)]}.to_h, render: 'show.json.jbuilder' }, status: :unprocessable_entity
    end
  end
end