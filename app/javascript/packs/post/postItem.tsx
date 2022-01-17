import * as React from 'react';
import { Fragment } from 'react';
import { csrfToken } from 'rails-ujs';
import axios from 'axios'
import { PostData } from './postData'
import '../../../assets/stylesheets/post.scss'
import { useCookies } from "react-cookie";

/****************************************
 * 投稿一覧の各行データコンポーネント
 ****************************************/
export const PostItem = (props: {postData: PostData, uuid: string, updatePosts: any}) => {
  const [cookies] = useCookies();

  // ================================
  // 投稿削除（非表示）イベント
  // ================================
  const deletePost = () => {

    let fd = new FormData();
    fd.append('category_id', props.postData.category_id);
    fd.append('id', props.postData.id.toString());

    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
    axios.post('http://localhost:3000/post/delete', fd)
    .then(res => {
        // postList更新
        props.updatePosts(res.data.post);
        // formを初期化
        document.forms['postForm'].reset();
    })
    .catch(error => console.log(error))
  }

  return(
    <>
      <li className='list-group-item'>
        <p className='text-muted'>
          <u>
            <span>{props.postData.name}　{props.postData.subject}　{props.postData.created_at}</span>
            {
              props.postData.hide_flag == '1' &&
              <span className='text-danger'>　削除済み</span>
            }
          </u>
        </p>
        <div className='d-flex justify-content-between align-items-start'>
          <p className='white-space'>{props.postData.text}</p>
          { props.postData.uuid == props.uuid && props.postData.hide_flag == '0' &&
            <>
              <div className='text-right'>
              <button type='button' onClick={deletePost}
                className={'btn btn-danger' + ' delete' + props.postData.id}>削除</button>
              </div>
            </>
          }
        </div>
      </li>
    </>

  );
}