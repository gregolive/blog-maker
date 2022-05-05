import { format, parseISO } from 'date-fns';
import './Post.css';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className='PostCard'>
      <h3>{post.title}</h3>
      <small>{post.author.first_name} {post.author.last_name} · {format(parseISO(post.created_at), 'MMMM dd, yyyy')}</small>
      {(post.preview) ? (
        <p>{post.preview}</p>
      ) : null}
      <Link to={post.url} className='InlineLink'>Read more</Link>
    </div>
  );
}

export default PostCard;
