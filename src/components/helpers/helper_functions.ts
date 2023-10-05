const axios = require('axios');
const fs = require('fs');

export const uploadFileToNextcloud = async (e) => {
  try {
    const fileContents = fs.readFileSync(filePath);
    const fileName = filePath.split('/').pop();

    const response = await axios.put(
      `https://next.nedviznost.mk/remote.php/dav/files/user/${remotePath}/${fileName}`,
      fileContents,
      {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/octet-stream',
          'OC-Chunked': 'true',
          'OC-Total-Length': fileContents.length.toString(),
        },
      }
    );

    if (response.status === 201) {
      console.log('File uploaded successfully.');
      console.log('File URL:', response.headers['oc-fileid']);
    } else {
      console.error('Failed to upload file.');
    }
  } catch (error) {
    console.error('Error uploading file:', error.message);
  }
};

// Usage example
const filePath = 'path/to/local/file/image.png';
const remotePath = 'path/to/remote/folder';
const authToken = 'YOUR_AUTH_TOKEN';

uploadFileToNextcloud(filePath);
