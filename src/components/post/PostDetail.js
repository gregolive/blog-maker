import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import parse from 'html-react-parser';
import { format } from 'date-fns';
import './Post.css';
import Loading from '../loading/Loading';

const PostForm = () => {
  const { postTitle } = useParams();
  const postData = useLocation();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(postData.state);

  // Fetch post data
  useEffect(() => {
    if (!postData) {
      const apiURL = `http://localhost:3001/api/v1/post/${postTitle}`;
    
      axios.get(apiURL).then(
        (data) => setPost(data),
        (err) => console.log(err)
      );
    }
  }, [postData, postTitle]);

  // Turn off loading when post loads
  useEffect(() => {
    if (Object.keys(post).length > 0) { setLoading(false); }
  }, [post]);

  const postDetail = (
    <main>
      <section className='Post'>
        <h1 className='PostTitle'>{post.title}</h1>
        <small>{format(post.created_at, 'MMMM dd, yyyy')} · {post.author}</small>

        <div className='PostBody'>{parse(parse(post.content))}</div>
      </section>
    </main>
  );

  return ((loading) ? <Loading /> : postDetail);
};

export default PostForm;
