import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import './Dashboard.css';
import { useAuth } from '../../helpers/Auth';

const Dashboard = () => {
  const { user } = useAuth();
  const [recentPosts, setRecentPosts] = useState([]);

  // Fetch post data
  useEffect(() => {
    const apiURL = `http://localhost:3001/api/v1/post/all/${user._id}`;
  
    axios.get(apiURL).then(
      (res) => setRecentPosts(res.data.posts), 
      (err) => console.log(err)
    );
  }, [user]);

  return (
    <main>
      <h1>Welcome back {user.name}!</h1>

      {(recentPosts.length > 0) ? (
        <>
          <Link to='/post/new' className='InlineLink'>+ Create new post</Link>
          <h2>Your recent posts</h2>

          <section className='PostGrid'>
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
          </section>
        </>
      ) : (
        <p>You don't have any blog posts. <Link to='/post/new' className='InlineLink'>Create one now!</Link></p>
      )}
    </main>
  );
};

export default Dashboard;
