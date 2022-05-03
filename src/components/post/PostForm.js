import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import parse from 'html-react-parser';
import './Post.css';
import { useAuth } from '../../helpers/Auth';
import InputWithValidator from '../../helpers/Validate';

const PostForm = ({ title, location }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const post = useLocation();
  const [postData, setPostData] = useState({
    title: post.state.title || '',
    content: parse(post.state.content) || '',
    preview: post.state.preview || '',
    visibility: post.state.visibility || 'Visible',
  });
  const [submitError, setSubmitError] = useState(false);

  console.log(post)

  const formSubmit = () => {
    const apiURL = (post) ? 'http://localhost:3001/api/v1/post/create' : `http://localhost:3001/api/v1/post/${post._id}/update`;

    axios.post(apiURL, {
      title: postData.title,
      content: postData.content,
      author: user._id,
      preview: postData.preview,
      visibility: postData.visibility,
    }).then((res) => {
      navigate(res.data.post.url, { state: (post) ? 'Blog post updated! 👍' : 'Blog post created! 🙌' });
    }, (err) => {
      console.log(err);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validForm = !(Object.values(postData).some((input) => input === ''));
    if (validForm) {
      setSubmitError(false);
      formSubmit();
    } else {
      setSubmitError(true);
    }
  };

  const handleChange = (e) => setPostData({ ...postData, [e.target.name]: e.target.value });
  const handleEditorChange = (e) => setPostData({ ...postData, 'content': e });

  return (
    <main>
      <h1>{title}</h1>

      <form onSubmit={(e) => handleSubmit(e)} className='PostForm'>
        <InputWithValidator
          required={true}
          labelText='Title'
          inputProps={{ type:'text', maxLength:'100' }}
          id='title'  
          checks={['valueMissing']}
          errorMessage='Title required'
          value={postData.title} 
          onChange={(e) => handleChange(e)}
        />

        <fieldset>
          <label htmlFor='content' className='RequiredField'>Content</label>
          <Editor
            apiKey={process.env.REACT_APP_TINYMCE}
            init={{
              height: 500,
              menubar: false,
              toolbar: 'undo redo | formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            id='content'
            name='content'
            value={postData.content}
            onEditorChange={(e) => handleEditorChange(e)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor='preview' className='RequiredField'>Preview</label>
          <textarea name='preview' id='preview' className='DynamicInput PostInput' rows='5' maxLength='200' value={postData.preview} onChange={(e) => handleChange(e)} />
        </fieldset>

        <fieldset>
          <label htmlFor='visibility' className='RequiredField'>Visibility</label>
          <select name='visibility' id='visibility' className='DynamicInput PostInput' value={postData.visibility} onChange={(e) => handleChange(e)} >
            <option value="Visible">Visible</option>
            <option value="Hidden">Hidden</option>
          </select>
        </fieldset>

        <p className={(submitError) ? 'Error' : 'Error Hidden'}>Please complete required fields</p>

        <div className='ButtonGroup'>
          <button className='Btn PrimaryBtn'>Submit</button>
          <Link to='/dashboard' className='Btn SecondaryBtn'>Cancel</Link>
        </div>
      </form>
    </main>
  ); 
};

export default PostForm;
