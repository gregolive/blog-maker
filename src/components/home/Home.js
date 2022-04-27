import { Link } from 'react-router-dom';
import './Home.css';
import Doodle from '../../img/FloatDoodle.png';

const Home = () => {
  return (
    <main className='Home'>
      <div className='BannerText'>
        <h1>Welcome to <span className='BitBlog'>bitblog</span></h1>
        <p>Create your own blog and share your story with the world!</p>
        <Link to='/register' className='Btn PrimaryBtn'>Start now</Link>
      </div>

      <img src={Doodle} alt='float doodle' className='BannerImg' />
    </main>
  );
};

export default Home;
