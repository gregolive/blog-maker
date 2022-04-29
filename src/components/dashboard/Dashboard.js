import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';
import { useAuth } from '../../helpers/Auth';

const Dashboard = () => {
  const { user } = useAuth();
  const [recentPosts, setRecentPosts] = useState([]);

  // Fetch post data
  useEffect(() => {
    const apiURL = `http://localhost:3001/api/v1/post/all/${user._id}`;
  
    axios.get(apiURL).then(
      (data) => setRecentPosts(data), 
      (err) => console.log(err)
    );
  }, [user]);

  console.log(recentPosts)

  return (
    <main>
      <h1>Welcome back {user.name}!</h1>

      {(recentPosts.length > 1) ? (
        <>
          <Link to='/post/new' className='InlineLink'>+ Create a new post</Link>
          <section>
            <h2>Your recent posts</h2>
          </section>
        </>
      ) : (
        <p>You don't have any blog posts. <Link to='/post/new' className='InlineLink'>Create one now!</Link></p>
      )}
    </main>
  );
};

export default Dashboard;
