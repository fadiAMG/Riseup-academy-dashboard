import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMCE = (props) => {
  return (
    <Editor
      apiKey="f1tp1iztw6bg5273ymx9eywo4kq1mlr8eyzw9i7at6iuhckk"
      initialValue="<p>This is the initial content of the editor</p>"
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        selector: 'textarea', // change this value according to your HTML
        images_upload_handler: function (blobInfo, success, failure) {
          var xhr, formData;

          xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.open(
            'POST',
            process.env.REACT_APP_API_DOMAIN + '/api/v1/academy/upload'
          );
          xhr.setRequestHeader(
            'Authorization',
            'Bearer ' + localStorage.getItem('token')
          );
          xhr.onload = function () {
            var json;

            if (xhr.status !== 201) {
              failure('HTTP Error: ' + xhr.status);
              return;
            }

            json = { location: xhr.responseText };

            if (!json || typeof json.location != 'string') {
              failure('Invalid JSON: ' + xhr.responseText);
              return;
            }

            success(json.location);
          };

          formData = new FormData();
          formData.append('file', blobInfo.blob(), blobInfo.filename());

          xhr.send(formData);
        },
        toolbar:
          // eslint-disable-next-line no-multi-str
          'undo redo | formatselect | bold italic backcolor | \
                   alignleft aligncenter alignright alignjustify | \
                   bullist numlist outdent indent | removeformat | help | image',
      }}
      onEditorChange={props.handleEditorChange}
    />
  );
};
export default TinyMCE;
