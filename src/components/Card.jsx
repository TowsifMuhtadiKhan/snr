import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MediaCard = ({ title, description, imageUrl, onDelete, id, setSnackbarOpen, setSnackbarSeverity }) => {
  // slice the title to show limited title
  const truncatedTitle = title.length > 20 ? `${title.slice(0, 20)}...` : title;

//---------------------------------------------------------------------------------

  //Slice description
  // const [showFullDescription, setShowFullDescription] = useState(false);
  // const truncateDescription = (text, limit) => {
  //   const words = text.split(' ');
  //   return words.slice(0, limit).join(' ');
  // };

  // const truncatedDescription = showFullDescription ? description : truncateDescription(description, 10);

//--------------------------------------------------------------------------------

  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncateDescription = (text, lines) => {
    const paragraphs = text.split('\n');
    const truncatedParagraphs = paragraphs.slice(0, lines);
    return truncatedParagraphs.join('\n');
  };

  const truncatedDescription = showFullDescription ? description : truncateDescription(description, 2); // Adjust the number of lines as needed

  const handleReadMoreClick = () => {
    setShowFullDescription(true);
  };

  const handleReadLessClick = () => {
    setShowFullDescription(false);
  };

  const handleDelete = async () => {
    try {
      // Make a DELETE request to your API endpoint
      await axios.delete(`https://jsonplaceholder.typicode.com/${id}`);

      // Show a success message
      onDelete(id);
      setSnackbarOpen(true);
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Error deleting data:', error);

      // Show an error message in Snackbar
      setSnackbarOpen(true);
      setSnackbarSeverity('error');
    }
  };

  return (
    <Card sx={{ maxWidth: 300, display: 'flex', flexDirection: 'column' }}>
      <CardMedia sx={{ height: 150 }} image={imageUrl} />
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Typography gutterBottom variant="h5" component="div" title={title} fontWeight='500'>
            {truncatedTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign={'justify'} fontWeight='430'>
          {truncatedDescription}
          </Typography>
          {!showFullDescription && (
             <Button
             style={{ background: 'none', padding: 0, cursor: 'pointer', color:'#585858', fontWeight: 'bold', paddingTop:'10px' }}
             onClick={handleReadMoreClick}
          >
            Read More
           </Button>
              )}
              {showFullDescription && (
            <Button
              style={{ background: 'none', padding: 0, cursor: 'pointer', color: '#585858', fontWeight: 'bold', paddingTop:'10px'}}
              onClick={handleReadLessClick}
              
            >
            Read Less
            </Button>
          )}
        </div>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', width: '100%', gap: '10px' }}>
            <Link to={`/posts/${id}`} style={{ textDecoration: 'none', width: '48%' }}>
              <Button variant="contained" style={{ backgroundColor: '#50B0FA', color: 'white', flex: '1', width: '100%'}}>
                Edit
              </Button>
            </Link>
            <Button variant="contained" style={{ backgroundColor: '#FE5858', color: 'white', flex: '1' ,width: '48%'}} onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    // Fetch data from the JSONPlaceholder API
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setCards(response.data.slice(0, 100)); // Limit to the first 20 posts for this example
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = (deletedId) => {
    // Update the state to remove the deleted card
    setCards((prevCards) => prevCards.filter((card) => card.id !== deletedId));

    // Show a success message
    setSnackbarOpen(true);
    setSnackbarSeverity('success');
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', margin: '20px 20px', justifyContent: 'space-evenly' }}>
      {cards.map((card) => (
        <MediaCard
          key={card.id}
          title={card.title}
          description={card.body}
          id={card.id}
          imageUrl="https://instructor-academy.onlinecoursehost.com/content/images/2023/05/How-to-Create-an-Online-Course-For-Free--Complete-Guide--6.jpg"
          onDelete={handleDelete}
          setSnackbarOpen={setSnackbarOpen}
          setSnackbarSeverity={setSnackbarSeverity}
        />
      ))}
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000} // 3 seconds
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarSeverity === 'success' ? 'Deleted successfully!' : 'Error deleting data!'}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default CardList;
