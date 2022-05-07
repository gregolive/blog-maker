import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import { useAuth } from '../../helpers/Auth';
import Loading from '../loading/Loading';
import ServerError from '../error/ServerError';
import PostCard from '../post/PostCard';
import doodle from '../../img/UnboxingDoodle.png';

const Dashboard = () => {
  const { user } = useAuth();
  const dashboardMsg = useLocation();
  const [showMsg, setShowMsg] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [recentPosts, setRecentPosts] = useState([]);
  const [explorePosts, setExplorePosts] = useState([]);

  // Fetch post data
  useEffect(() => {
    const apiURL = 'https://bitblog-go.herokuapp.com/api/v1/post/all';
  
    axios.get(apiURL).then(
      (res) => {
        const posts = res.data.posts;
        setRecentPosts(posts.filter((post) => post.author._id === user._id).slice(0, 3));
        setExplorePosts(posts.filter((post) => post.author._id !== user._id).slice(0, 4));
      }, 
      (err) => setServerError(err)
    );
  }, [user]);

  return ((explorePosts.length > 0) ? (
    <>
      {(dashboardMsg.state && showMsg) ? (
        <div className='PopupMsg'>
          {dashboardMsg.state}
          <button type='button' className='Btn' onClick={() => setShowMsg(false)}>
            <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'><path d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z' /></svg>
          </button>
        </div> 
      ) : null}

      <main className='Dashboard'>
        <section>
          <h1>Welcome back {user.name}!</h1>
          <div className='ButtonGroup'>
            <Link to='/post/new' className='Btn PrimaryBtn DashboardBtn'>+ Create new post</Link>
            <Link to={`/user/${user.username}/edit`} className='Btn SecondaryBtn DashboardBtn'>Update profile</Link>
          </div>
        </section>

        {(recentPosts.length > 0) ? (
          <section>  
            <h2>Your recent posts</h2>

            <div className='PostGrid'>
              {recentPosts.map((post, index) =>
                <PostCard post={post} key={index} />
              )}
              <Link to={`/posts/${user.username}`} className='InlineLink IconLink'>
                See all posts
                <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='20' height='20' viewBox='0 0 24 24' fill='currentColor'><path d='M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z' /></svg>
              </Link>
            </div>
          </section>
        ) : (
          <p>You don't have any blog posts. Click the button above to make one now!</p>
        )}

        <section>
          <h2>Explore bitblog</h2>
          <p>Discover the blogs posts that have people talking.</p>

          <div className='ExploreGrid'>
            {explorePosts.map((post, index) =>
              <PostCard post={post} key={index} />
            )}
            <img src={doodle} alt='unboxing doodle' />
            <Link to='/posts' className='InlineLink IconLink'>
              Explore posts
              <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='20' height='20' viewBox='0 0 24 24' fill='currentColor'><path d='M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z' /></svg>
            </Link>
          </div>
        </section>
      </main>
    </>) : ((serverError) ? <ServerError error={serverError} /> : <Loading />)
  );
};

export default Dashboard;
