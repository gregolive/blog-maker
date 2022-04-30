import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import parse from 'html-react-parser';
import './Post.css';
import Loading from '../loading/Loading';

const PostForm = () => {
  const { postTitle } = useParams();
  const creationMsg = useLocation();
  const [showMsg, setShowMsg] = useState(true);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  // Fetch post data
  useEffect(() => {
    const apiURL = `http://localhost:3001/api/v1/post/${postTitle}`;
  
    axios.get(apiURL).then(
      (data) => {
        setPost(data.data.post);
        setComments(data.data.comments);
      },
      (err) => console.log(err)
    );
  }, [postTitle]);

  return (Object.keys(post).length > 0) ? (<>
    {(creationMsg.state && showMsg) ? (
      <div className='WelcomeMsg'>
        {creationMsg.state}
        <button type='button' className='Btn' onClick={() => setShowMsg(false)}>
          <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'><path d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z' /></svg>
        </button>
      </div> 
    ) : null}

    <main>
      <section className='Post'>
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
  </>) : (<Loading />);
};

export default PostForm;
