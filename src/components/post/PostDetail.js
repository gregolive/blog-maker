import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import parse from 'html-react-parser';
import './Post.css';
import { useAuth } from '../../helpers/Auth';
import Loading from '../loading/Loading';
import ServerError from '../error/ServerError';

const PostForm = () => {
  const { postTitle } = useParams();
  const { user } = useAuth();
  const postMsg = useLocation();
  const [showMsg, setShowMsg] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [post, setPost] = useState({});
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentMsg, setCommentMsg] = useState(null);
  const [markDelete, setMarkDelete] = useState(null);
  const [markEdit, setMarkEdit] = useState(null);

  // Fetch post data
  useEffect(() => {
    const apiURL = `https://bitblog-go.herokuapp.com/api/v1/post/${postTitle}`;
  
    axios.get(apiURL).then(
      (res) => {
        setPost(res.data.post);
        setComments(res.data.comments);
      },
      (err) => setServerError(err)
    );
  }, [postTitle]);

  // Create new comment
  const createFormSubmit = () => {
    const apiURL = `https://bitblog-go.herokuapp.com/api/v1/post/${post._id}/comments/create`;

    axios.post(apiURL, {
      content: newComment,
      user_id: user._id,
    }).then((res) => {
      setComments([res.data.comment, ...comments]);
      setNewComment('');
    }, (err) => setServerError(err));
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (newComment !== '') { createFormSubmit(); }
  };

  // Delete comment
  const handleDelete = () => {
    const apiURL = `http://localhost:3001/api/v1/post/${post._id}/comments/${markDelete._id}/delete`;

    axios.post(apiURL).then((res) => {
      setComments(comments.filter((comment) => comment !== markDelete));
      setCommentMsg(res.data.msg);
      setMarkDelete(null);
    }, (err) => setServerError(err));
  };

  // Edit comment
  const editFormSubmit = () => {
    const apiURL = `http://localhost:3001/api/v1/post/${post._id}/comments/${markEdit._id}/update`;

    axios.post(apiURL, {
      content: markEdit.content,
      user_id: user._id,
    }).then((res) => {
      setComments(comments.map((comment) => {
        if (comment._id !== markEdit._id) { return comment; }
        return res.data.comment;
      }));
      setCommentMsg(res.data.msg);
      setMarkEdit(null);
    }, (err) => setServerError(err));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editFormSubmit();
  };

  return ((Object.keys(post).length > 0) ? (
    <>
      {(postMsg.state && showMsg) ? (
        <div className='PopupMsg'>
          {postMsg.state}
          <button type='button' className='Btn' onClick={() => setShowMsg(false)}>
            <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'><path d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z' /></svg>
          </button>
        </div> 
      ) : null}

      {(commentMsg) ? (
        <div className='PopupMsg'>
          {commentMsg}
          <button type='button' className='Btn' onClick={() => setCommentMsg(null)}>
            <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'><path d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z' /></svg>
          </button>
        </div> 
      ) : null}

      <main>
        <section className='Post'>
          {(user._id === post.author._id) ? (
            <div className='PostButtons'>
              <Link to={post.url + '/edit'} state={post} className='Btn'>
                <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='18' height='18' viewBox='0 0 24 24' fill='currentColor'><path d='M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z' /></svg>
                Edit
              </Link>
              <Link to={post.url + '/delete'} state={post} className='Btn'>
                <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='18' height='18' viewBox='0 0 24 24' fill='currentColor'><path d='M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z' /></svg>
                Delete
              </Link>
            </div>
          ) : null}

          <h1 className='PostTitle'>{post.title}</h1>
          <small className='PostInfo'>{post.author.first_name} {post.author.last_name} · {format(parseISO(post.created_at), 'MMMM dd, yyyy')}</small>

          <div className='PostBody'>{parse(parse(post.content))}</div>

          <section className='PostComments'>
            <h2>Comments <span className='CommentCount'>{comments.length}</span></h2>

            <div className='CommentGrid'>
              <form className='CommentForm' onSubmit={(e) => handleCreateSubmit(e)}>
                <fieldset>
                  <label htmlFor='comment' />
                  <input type='text' id='comment' name='comment' placeholder='Add comment' value={newComment} onChange={(e) => setNewComment(e.target.value)} className='CommentInput' />
                </fieldset>
                <button type='submit' className='Btn InlineBtn'>
                  <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='20' height='20' viewBox='0 0 24 24' fill='currentColor'><path d='M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z' /></svg>
                </button>
              </form>

              {comments.map((comment, index) =>
                (markEdit && comment._id === markEdit._id) ? (
                  <form className='EditCommentForm' onSubmit={(e) => handleEditSubmit(e)} key={index}>
                    <fieldset>
                      <label htmlFor='comment' />
                      <input type='text' id='comment' name='comment' placeholder='Add comment' value={markEdit.content} onChange={(e) => setMarkEdit({...markEdit, content: e.target.value})} className='CommentInput' />
                    </fieldset>
                    <div className='CommentEditBtns'>
                      <button type='submit' className='Btn'>Save</button>
                      <button type='button' className='Btn' onClick={() => setMarkEdit(null)}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className='Comment' key={index}>
                    <strong>{comment.author.username}</strong>
                    <p>{comment.content}</p>
                    <small>
                      {format(parseISO(comment.created_at), ' MMMM dd, yyyy hh:mm aa')}
                      {(user._id === comment.author._id) ? (
                        <div className='CommentButtons'>
                          <button type='button' className='Btn' onClick={() => setMarkEdit(comment)}>
                            <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='18' height='18' viewBox='0 0 24 24' fill='currentColor'><path d='M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z' /></svg>
                          </button>
                          <button type='button' className='Btn' onClick={() => setMarkDelete(comment)}>
                            <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='18' height='18' viewBox='0 0 24 24' fill='currentColor'><path d='M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z' /></svg>
                          </button>
                        </div>
                      ) : null}
                    </small>
                  </div>
                )
              )}
            </div>
          </section>
        </section>
      </main>

      <div className={(markDelete) ? 'CommentModal' : 'CommentModal Hidden'}>
        <section className='ModalBody'>
          <p><strong>Are you sure you want to delete your comment?</strong></p>
          <div className='ButtonGroup'>
            <button className='Btn PrimaryBtn DashboardBtn' onClick={handleDelete}>Delete</button>
            <button className='Btn SecondaryBtn DashboardBtn' onClick={() => setMarkDelete(false)}>Cancel</button>
          </div>
        </section>
      </div>
    </>) : ((serverError) ? <ServerError error={serverError} /> : <Loading />)
  );
};

export default PostForm;
