// Edit.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { updatePost } from '../features/cardSlice';
import { API_BASE_URL } from '../constants/apiConstants';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    id: '',
    title: '',
    description: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const { title, body } = await response.json();

        setPostData({
          id,
          title,
          description: body,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const httpMethod = id ? 'put' : 'post';

    fetch(`${API_BASE_URL}/posts${id ? `/${id}` : ''}`, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(`${httpMethod.toUpperCase()} request successful:`, data);

        dispatch(updatePost(postData));

        setSnackbarSeverity('success');
        setSnackbarMessage('Form submitted successfully!');
        setOpenSnackbar(true);

        setTimeout(() => {
          setOpenSnackbar(false);
          navigate(-1);
        }, 2000);
      })
      .catch((error) => {
        console.error(`Error ${httpMethod}ting form:`, error);

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
