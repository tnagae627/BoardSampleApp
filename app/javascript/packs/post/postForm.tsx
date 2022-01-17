import * as React from 'react';
import { useForm } from 'react-hook-form'
import { csrfToken } from 'rails-ujs';
import axios from 'axios'
import { useState, useEffect, Fragment} from 'react';
import { PostData } from './postData';

/****************************************
 * 新規投稿コンポーネント
 ****************************************/
export const PostForm = (props) => {
    const {category_id, updatePosts, loginUser} = props;
    /** 名前 */
    const [name, setName] = useState('');
    /** メール */
    const [mail, setEmail] = useState('');

    // ================================
    // バリデーション設定
    // ================================
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm<PostData>({
        mode: "onChange",
        criteriaMode: "all",
        shouldFocusError: false,
    });

    // ================================
    // form送信イベント
    // ================================
    const onSubmit = () => {
        axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
        axios.post('http://localhost:3000/post/regist', new FormData(document.forms['postForm']))
        .then(res => {
            // postList更新
            updatePosts(res.data.post);
            // 初期化
            document.getElementById('error_message').innerHTML='';
            document.forms['postForm'].reset();
        })
        .catch(error => {
            // サーバサイドバリデーションをレンダリング
            document.getElementById('error_message').innerHTML=error.response.data.errors.text;
        });
    }

    useEffect(() => {
        if(loginUser!= undefined) {
            setName(loginUser.name);
            setEmail(loginUser.email);
        }
    }, [loginUser]);

    return(
        <>
            <h2 className='bg-primary text-white p-1'>新規投稿</h2>
            <div id="error_message" className='text-danger my-4'></div>
            <form onSubmit={handleSubmit(onSubmit)} id='postForm' className='mb-5'>
                <input type='hidden' name='category_id' value={category_id} />
                <div className='form-group'>
                    <label htmlFor='name'>名前</label>
                    <input type='text' className='form-control' id='name' name='name' placeholder='名無し'
                         {...register("name", { maxLength: 256 })} value={name}
                         onChange={event => setName(event.target.value)} />
                    {errors.name?.types?.maxLength && <span className='text-danger'>名前は256文字以内で入力してください</span>}
                </div>
                <div className='form-group'>
                    <label htmlFor='mail'>メールアドレス</label>
                    <input type='email' className='form-control' id='mail' name='mail' placeholder='aaa@mail.com'
                     {...register("mail", { maxLength: 256 })} value={mail} onChange={event => setEmail(event.target.value)} />
                    {errors.mail?.types?.maxLength && <span className='text-danger'>メールアドレスは256文字以内で入力してください</span>}
                </div>
                <div className='form-group'>
                    <label htmlFor='subject'>件名</label>
                    <input type='text' className='form-control' id='subject' name='subject'
                         placeholder='〇〇について' {...register("subject", { maxLength: 256 })} />
                    {errors.subject?.types?.maxLength && <span className='text-danger'>件名は256文字以内で入力してください</span>}
                </div>
                <div className='form-group'>
                    <label htmlFor='subject'>件名</label>
                    <textarea className='form-control'
                        id='text' name='text' {...register("text", { required: true, maxLength: 10000 })} />
                    {errors.text?.types?.required && <span className='text-danger'>本文は必須です</span>}
                    {errors.text?.types?.maxLength && <span className='text-danger'>本文は10000文字以内で入力してください</span>}
                </div>
                <button type='submit' className='btn btn-success'>投稿</button>
            </form>
        </>
    );
};