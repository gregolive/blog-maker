import { useState, useEffect } from 'react';
import axios from 'axios';
import './Post.css';
import Loading from '../loading/Loading';
import ServerError from '../error/ServerError';
import PostCard from '../post/PostCard';

const PostList = () => {
  const [serverError, setServerError] = useState(false);
  const [posts, setPosts] = useState([]);

  // Fetch post data
  useEffect(() => {
    const apiURL = 'https://bitblog-go.herokuapp.com/api/v1/post/all';
  
    axios.get(apiURL).then(
      (res) => setPosts(res.data.posts), 
      (err) => setServerError(err)
    );
  }, []);

  return ((posts.length > 0) ? (
    <>
      <main className='Dashboard'>
        <h1>Explore New Blog Posts</h1>

        <div className='PostGrid'>
          {posts.map((post, index) =>
            <PostCard post={post} key={index} />
          )}
        </div>
      </main>
    </>) : ((serverError) ? <ServerError error={serverError} /> : <Loading />)
  );
};

export default PostList;
