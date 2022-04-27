import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import './PostForm.css';

const PostForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState('');
  const [visibility, setVisibility] = useState('Visible');

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiURL = 'http://localhost:3001/api/v1/post/create';
    axios.post(apiURL, {
      title,
      content,
      preview,
      visibility,
    }).then((res) => {
      navigate(`/post/${res.data}`);
    }, (err) => {
      console.log(err);
    });
  };

  return (
    <main>
      <h1>New blog post</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <label htmlFor='title' className='required-field'>Title</label>
          <input type='text' name='title' id='title' className='dynamic-input' maxLength='100' value={title} onChange={(e) => setTitle(e.target.value)} />
        </fieldset>

        <fieldset>
          <label htmlFor='content' className='required-field'>Content</label>
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
          <textarea name='preview' id='preview' className='dynamic-input' rows='5' maxLength='200' value={preview} onChange={(e) => setPreview(e.target.value)} />
        </fieldset>

        <fieldset>
          <label htmlFor='visibility' className='required-field'>Visibility</label>
          <select name='visibility' id='visibility' className='dynamic-input' value={visibility} onChange={(e) => setVisibility(e.target.value)} >
            <option value="Visible">Visible</option>
            <option value="Hidden">Hidden</option>
          </select>
        </fieldset>

        <div className='button-group'>
          <button className='btn primary-btn'>Create</button>
          <Link to='/' className='btn secondary-btn'>Cancel</Link>
        </div>
      </form>
    </main>
  ); 
};

export default PostForm;
