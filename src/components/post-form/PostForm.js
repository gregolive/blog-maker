import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import './PostForm.css';

const PostForm = () => {
  const [contentEditor, setContentEditor] = useState();
  const handleEditorChange = (content) => setContentEditor(content);

  return (
    <main>
      <h1>New blog post</h1>

      <form>
        <fieldset>
          <label htmlFor='title'>Title</label>
          <input type='text' name='title' id='title' className='dynamic-input' />
        </fieldset>

        <fieldset>
          <label htmlFor='content'>Content</label>
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
            value={contentEditor}
            onEditorChange={handleEditorChange}
          />
        </fieldset>

        <fieldset>
          <label htmlFor='preview'>Preview</label>
          <textarea name='preview' id='preview' rows='4' />
        </fieldset>

        <fieldset>
          <label htmlFor='visibility'>Visibility</label>
          <select name='visibility' id='visibility' className='dynamic-input'>
            <option value="visible">Visible</option>
            <option value="hidden">Hidden</option>
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
