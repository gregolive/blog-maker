import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Post.css';
import ServerError from '../error/ServerError';

const PostDelete = () => {
  const navigate = useNavigate();
  const post = useLocation();
  const [serverError, setServerError] = useState(false);

  const formSubmit = () => {
    const apiURL = `https://bitblog-go.herokuapp.com/api/v1/post/${post.state._id}/delete`;

    axios.post(apiURL).then(
      (res) => navigate('/dashboard', { state: res.data.msg }),
      (err) => setServerError(err)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formSubmit();
  };

  return ((serverError) ? <ServerError error={serverError} /> : (
    <main>
      <h1>Delete blog post</h1>

      <p>Are you sure you want to delete your post titled <strong>{post.state.title}</strong>?</p>

      <form onSubmit={(e) => handleSubmit(e)} className='PostForm'>
        <div className='ButtonGroup'>
          <button className='Btn PrimaryBtn'>Delete</button>
          <Link to='/dashboard' className='Btn SecondaryBtn'>Cancel</Link>
        </div>
      </form>
    </main>
  ));
};

export default PostDelete;
