import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    id: '',
    title: '',
    description: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // Fetch data for the specified post ID
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        const { title, body } = response.data;
        setPostData({
          id,
          title,
          description: body,
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Determine the HTTP method based on the presence of the id
    const httpMethod = id ? 'put' : 'post';
  
    // Send the appropriate request to your API endpoint
    axios({
      method: httpMethod,
      url: id ? `https://jsonplaceholder.typicode.com/posts/${id}` : 'https://jsonplaceholder.typicode.com/posts',
      data: postData,
    })
      .then((response) => {
        console.log(`${httpMethod.toUpperCase()} request successful:`, response.data);
  
        // Display success message using Snackbar
        setSnackbarSeverity('success');
        setSnackbarMessage('Form submitted successfully!');
        setOpenSnackbar(true);
  
        // Redirect to the previous page after a delay
        setTimeout(() => {
          setOpenSnackbar(false);
          navigate(-1); // Go back to the previous page
        }, 2000); // Adjust the delay as needed
      })
      .catch((error) => {
        console.error(`Error ${httpMethod}ting form:`, error);
  
        // Display error message using Snackbar
        setSnackbarSeverity('error');
        setSnackbarMessage(`Error ${httpMethod}ting form. Please try again.`);
        setOpenSnackbar(true);
      });
  };
  
  return (
    <div>
      <div style={{ width: '50%', margin: 'auto' }}>
        <h1>Edit Post</h1>
      </div>
      <form onSubmit={handleSubmit} style={{ width: '50%', margin: 'auto' }}> 
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            value={postData.title}
            onChange={handleChange}
            style={{ width: '100%', boxSizing: 'border-box', padding: '8px', marginTop: '8px' }}
          />
        </div>
        <label htmlFor="description">Description:</label>
        <br />
        <textarea
          id="description"
          name="description"
          rows="5"
          cols="50"
          value={postData.description}
          onChange={handleChange}
          style={{ width: '100%', boxSizing: 'border-box', marginTop: '8px' }}
        ></textarea>
        <br />
        <input type="submit" value="Submit" style={{ marginTop: '15px' }} />
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Edit;
