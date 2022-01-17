import * as React from 'react'
import * as Modal from 'react-modal';
import { csrfToken } from 'rails-ujs';
import { Link } from 'react-router-dom'
import axios from 'axios';

import { CategoryData } from './categoryData';
import { PostCount } from './postCount';

/****************************************
 * カテゴリの各行データコンポーネント
 ****************************************/
export const CategoryItem = (props: {categoryData: CategoryData, updateCategories: any, loggedInStatus: boolean}) => {
  /** モーダル */
  const [modalIsOpen,setIsOpen] = React.useState(false);
  /** カテゴリ名編集 */
  const [newCategoryName, setNewCategoryName] = React.useState('');

  const onNeCategoryChange = (e) => setNewCategoryName(e.target.value);

  // ================================
  // カテゴリ削除（非表示）イベント
  // ================================
  const deleteCategory = () => {

    let fd = new FormData();
    fd.append('category_id', props.categoryData.id.toString());

    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
    axios.post('http://localhost:3000/category/delete', fd)
    .then(res => {
        // カテゴリList更新
        props.updateCategories(res.data);
    })
    .catch(error => console.log(error))
  }

  // モーダルのスタイル
  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  Modal.setAppElement("#app");
  // モーダル表示
  const openModal = () => setIsOpen(true);
  // モーダル非表示
  const closeModal = () => setIsOpen(false);
  // ================================
  // カテゴリ（編集）イベント
  // ================================
  const editCategory = () => {

    let fd = new FormData();
    fd.append('category_id', props.categoryData.id.toString());
    fd.append('category_name', newCategoryName);

    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
    axios.post('http://localhost:3000/category/edit', fd)
    .then(res => {
        // カテゴリList更新
        props.updateCategories(res.data);
        closeModal();
        setNewCategoryName('');
    })
    .catch(error => console.log(error))
  }

  return(
    <>
      <div className='list-group-item d-flex justify-content-between align-items-start'>
        <Link to={'/post/index?category_id=' + props.categoryData.id}>
          {props.categoryData.category_name}
        </Link>
        { props.loggedInStatus &&
        <>
          <PostCount id={props.categoryData.id} key={props.categoryData.id} />
          <div>
            <button className='mx-2 btn btn-primary' onClick={openModal}>編集</button>
            <button type='button' onClick={deleteCategory} className='mx-2 btn btn-danger'>削除</button>
          </div>
        </>
        }
      </div>
      <Modal isOpen={modalIsOpen} style={customStyles}>
            <h2>{props.categoryData.category_name}</h2>
            <input type='text' className='form-control' id='new_category_name'
             name='new_category_name' onChange={onNeCategoryChange} value={newCategoryName} />
            <div className='my-2 text-right'>
              <button className="mr-2 btn btn-secondry" onClick={closeModal}>キャンセル</button>
              <button className="mr-2 btn btn-primary" onClick={editCategory}>変更</button>
            </div>
      </Modal>
    </>
  );
}