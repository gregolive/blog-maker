import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import './Dashboard.css';
import { useAuth } from '../../helpers/Auth';
import Loading from '../loading/Loading';
import doodle from '../../img/UnboxingDoodle.png';

const Dashboard = () => {
  const { user } = useAuth();
  const dashboardMsg = useLocation();
  const [showMsg, setShowMsg] = useState(true);
  const [recentPosts, setRecentPosts] = useState([]);
  const [explorePosts, setExplorePosts] = useState([]);

  // Fetch and post data
  useEffect(() => {
    const apiURL = 'http://localhost:3001/api/v1/post/all';
  
    axios.get(apiURL).then(
      (res) => {
        const posts = res.data.posts;
        setRecentPosts(posts.filter((post) => post.author._id === user._id).slice(0, 3));
        setExplorePosts(posts.filter((post) => post.author._id !== user._id).slice(0, 4));
      }, 
      (err) => console.log(err)
    );
  }, [user]);

  return (explorePosts.length > 0) ? (
    <>
      {(dashboardMsg.state && showMsg) ? (
        <div className='WelcomeMsg'>
          {dashboardMsg.state}
          <button type='button' className='Btn' onClick={() => setShowMsg(false)}>
            <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='24' height='24' viewBox='0 0 24 24' fill='currentColor'><path d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z' /></svg>
          </button>
        </div> 
      ) : null}

      <main className='Dasboard'>
        <div>
          <h1>Welcome back {user.name}!</h1>
          <div className='ButtonGroup'>
            <Link to='/post/new' className='Btn PrimaryBtn DashboardBtn'>+ Create new post</Link>
            <Link to={`/user/${user.username}/edit`} className='Btn SecondaryBtn DashboardBtn'>Update profile</Link>
          </div>
        </div>

        {(recentPosts.length > 0) ? (
          <section>  
            <h2>Your recent posts</h2>

            <div className='PostGrid'>
              {recentPosts.map((post, index) =>
                <div className='PostCard' key={index}>
                  <h3>{post.title}</h3>
                  <small>{post.author.first_name} {post.author.last_name} · {format(parseISO(post.created_at), 'MMMM dd, yyyy')}</small>
                  {(post.preview) ? (
                    <p>{post.preview}</p>
                  ) : null}
                  <Link to={post.url} className='InlineLink'>Read more</Link>
                </div>
              )}
              <Link to={`/posts/${user.username}`} className='InlineLink SeeAllLink'>
                See all posts
                <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='20' height='20' viewBox='0 0 24 24' fill='currentColor'><path d='M2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2A10,10 0 0,0 2,12M4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12M10,17L15,12L10,7V17Z' /></svg>
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
              <div className='PostCard' key={index}>
                <h3>{post.title}</h3>
                <small>{post.author.first_name} {post.author.last_name} · {format(parseISO(post.created_at), 'MMMM dd, yyyy')}</small>
                {(post.preview) ? (
                  <p>{post.preview}</p>
                ) : null}
                <Link to={post.url} className='InlineLink'>Read more</Link>
              </div>
            )}
            <img src={doodle} alt='unboxing doodle' />
            <Link to='/posts' className='InlineLink SeeAllLink'>
              Explore posts
              <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='20' height='20' viewBox='0 0 24 24' fill='currentColor'><path d='M2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2A10,10 0 0,0 2,12M4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12M10,17L15,12L10,7V17Z' /></svg>
            </Link>
          </div>
        </section>
      </main>
    </>) : (<Loading />);
};

export default Dashboard;
