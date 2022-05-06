import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './User.css';
import { useAuth } from '../../helpers/Auth';
import Loading from '../loading/Loading';
import ServerError from '../error/ServerError';
import PostCard from '../post/PostCard';
import doodle from '../../img/DancingDoodle.png';

const PostForm = () => {
  const { user } = useAuth();
  const userMsg = useLocation();
  const [showMsg, setShowMsg] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [postCount, setPostCount] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  // Fetch user post count
  useEffect(() => {
    const apiURL = `http://localhost:3001/api/v1/user/${user._id}`;
  
    axios.get(apiURL).then(
      (res) => {
        setPostCount(res.data.post_count);
        setRecentPosts(res.data.recent_posts);
        console.log(res.data.post_count)
      },
      (err) => setServerError(err)
    );
  }, [user]);

  return ((postCount !== null) ? (
    <>
      {(userMsg.state && showMsg) ? (
        <div className='WelcomeMsg'>
          {userMsg.state}
          <button type='button' className='Btn' onClick={() => setShowMsg(false)}>
            <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'><path d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z' /></svg>
          </button>
        </div> 
      ) : null}

      <main className='UserDetail'>
        <section>
          <h1>Hello {user.name}!</h1>

          <div className='ButtonGroup'>
            <Link to={`/user/${user.username}/edit`} className='Btn PrimaryBtn DashboardBtn'>Update account</Link>
            <Link to={`/user/${user.username}/delete`} className='Btn SecondaryBtn DashboardBtn'>Delete account</Link>
          </div>

          <h2>Account details</h2>

          <ul>
            <li><strong>Username:</strong> {user.username}</li>
            <li><strong>First name:</strong> {user.first_name}</li>
            <li><strong>Last name:</strong> {user.last_name}</li>
            <li><strong>Email:</strong> {user.email}</li>
          </ul>
        </section>

        <section className='UserPosts'>
          <h2>Blog posts</h2>

          {(postCount > 0) ? (
            <>
              <p>You have made <strong>{postCount}</strong> blog {(postCount === 1) ? 'post' : 'posts'}.</p>

              <div className='PostGrid'>
                {recentPosts.map((post, index) =>
                  <PostCard post={post} key={index} />
                )}
                <Link to={`/posts/${user.username}`} className='InlineLink IconLink'>
                  See all posts
                  <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='20' height='20' viewBox='0 0 24 24' fill='currentColor'><path d='M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z' /></svg>
                </Link>
              </div>
            </>
          ) : (
            <p>You haven't made any blog posts yet.</p>
          )}
        </section>

        <img src={doodle} alt='dancing doodle' />
      </main>
    </>) : ((serverError) ? <ServerError error={serverError} /> : <Loading />)
  );
};

export default PostForm;
