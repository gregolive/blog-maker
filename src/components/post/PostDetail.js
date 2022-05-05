import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import parse from 'html-react-parser';
import './Post.css';
import { useAuth } from '../../helpers/Auth';
import Loading from '../loading/Loading';

const PostForm = () => {
  const { postTitle } = useParams();
  const { user } = useAuth();
  const postMsg = useLocation();
  const [showMsg, setShowMsg] = useState(true);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  // Fetch post data
  useEffect(() => {
    const apiURL = `http://localhost:3001/api/v1/post/${postTitle}`;
  
    axios.get(apiURL).then(
      (res) => {
        setPost(res.data.post);
        setComments(res.data.comments);
      },
      (err) => console.log(err)
    );
  }, [postTitle]);

  return ((Object.keys(post).length > 0) ? (
    <>
      {(postMsg.state && showMsg) ? (
        <div className='WelcomeMsg'>
          {postMsg.state}
          <button type='button' className='Btn' onClick={() => setShowMsg(false)}>
            <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'><path d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z' /></svg>
          </button>
        </div> 
      ) : null}

      <main>
        <section className='Post'>
        {(user._id === post.author._id) ? (
            <div className='PostButtons'>
              <Link to={post.url + '/edit'} state={ post } className='Btn'>
                <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='18' height='18' viewBox='0 0 24 24' fill='currentColor'><path d='M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z' /></svg>
                Edit
              </Link>
              <Link to={post.url + '/delete'} state={ post } className='Btn'>
                <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='18' height='18' viewBox='0 0 24 24' fill='currentColor'><path d='M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z' /></svg>
                Delete
              </Link>
            </div>
          ) : null}

          <h1 className='PostTitle'>{post.title}</h1>
          <small>{post.author.first_name} {post.author.last_name} · {format(parseISO(post.created_at), 'MMMM dd, yyyy')}</small>

          <div className='PostBody'>{parse(parse(post.content))}</div>

          <section className='PostComments'>
            <h2>Comments <span className='CommentCount'>{comments.length}</span></h2>

            <div className='CommentGrid'>
              {comments.map((comment) =>
                <div className='Comment'>
                  <strong>{comment.author.username}</strong>
                  <small>{format(parseISO(comment.created_at), 'MMMM dd, yyyy')}</small>
                  <p>{comment.content}</p>
                </div>
              )}
            </div>
          </section>
        </section>
      </main>
    </>) : <Loading />
  );
};

export default PostForm;
