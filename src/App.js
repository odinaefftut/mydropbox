import React, { useState } from 'react';
import { Amplify, Storage } from 'aws-amplify';
import awsExports from './aws-exports';
import './App.css';
import UploadFile from './UploadFile';
import { withAuthenticator } from '@aws-amplify/ui-react';
import logo from "./logo.svg"

Amplify.configure(awsExports);

function App() {
  const [file, setFile] = useState(null);

  function uploadFile() {
    if (file) {
      Storage.put(file.name, file, {
        level: 'private',
      })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error uploading file', error);
          // Handle the error scenario
        });
    }
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  }

  return (
    <div className="app-container">

      <img src={logo} className="logoapp"/>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload</button>
      <UploadFile />
    </div>
  );
}

export default withAuthenticator(App);
