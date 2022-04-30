import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import './Post.css';
import { useAuth } from '../../helpers/Auth';

const PostForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState('');
  const [visibility, setVisibility] = useState('Visible');

  const formSubmit = () => {
    const apiURL = 'http://localhost:3001/api/v1/post/create';

    axios.post(apiURL, {
      title,
      content,
      author: user._id,
      preview,
      visibility,
    }).then((res) => {
      navigate(res.data.post.url, { state: 'Blog post created! 🙌' });
    }, (err) => {
      console.log(err);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formSubmit();
  };

  return (
    <main>
      <h1>New blog post</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <label htmlFor='title' className='RequiredField'>Title</label>
          <input type='text' name='title' id='title' className='DynamicInput PostInput' maxLength='100' value={title} onChange={(e) => setTitle(e.target.value)} />
        </fieldset>

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
            value={content}
            onEditorChange={(e) => setContent(e)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor='preview'>Preview</label>
          <textarea name='preview' id='preview' className='DynamicInput PostInput' rows='5' maxLength='200' value={preview} onChange={(e) => setPreview(e.target.value)} />
        </fieldset>

        <fieldset>
          <label htmlFor='visibility' className='RequiredField'>Visibility</label>
          <select name='visibility' id='visibility' className='DynamicInput PostInput' value={visibility} onChange={(e) => setVisibility(e.target.value)} >
            <option value="Visible">Visible</option>
            <option value="Hidden">Hidden</option>
          </select>
        </fieldset>

        <div className='ButtonGroup'>
          <button className='Btn PrimaryBtn'>Create</button>
          <Link to='/' className='Btn SecondaryBtn'>Cancel</Link>
        </div>
      </form>
    </main>
  ); 
};

export default PostForm;
