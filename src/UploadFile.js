import React, { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';

function UploadFile() {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchFileList();
  }, []);

  function fetchFileList() {
    Storage.list('', {
      level: 'private',
    })
      .then(({ results }) => {
        setFileList(results);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function downloadFile(fileKey) {
    Storage.get(fileKey, { level: 'private' })
      .then((result) => {
        const downloadUrl = result;
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', fileKey);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('Error downloading file', error);
        // Handle the error scenario
      });
  }

  return (
    <div className="upload-file-container">
      <ul className="file-list">
        {fileList.map((file, index) => (
          <li key={index}>
            <span>{file.key}</span>
            <button onClick={() => downloadFile(file.key)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UploadFile;
