import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Edit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here, such as sending data to a server
    console.log('Form data submitted:', formData);

    // Display success message using Snackbar
    setOpenSnackbar(true);

    // Redirect to the previous page after a delay
    setTimeout(() => {
      setOpenSnackbar(false);
      navigate(-1); // Go back to the previous page
    }, 2000); // Adjust the delay as needed
  };

  return (
    <div>
      <div style={{ width: '50%', margin: 'auto' }}>
        <h1>Enter Title and Description</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ width: '50%', margin: 'auto' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
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
          value={formData.description}
          onChange={handleChange}
          style={{ width: '100%', boxSizing: 'border-box', marginTop: '8px' }}
        ></textarea>

        <br />

        <input type="submit" value="Submit" style={{ marginTop: '15px' }} />
      </form>

      {/* Snackbar for displaying success message */}
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
          Form submitted successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Edit;
