// CardList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVisibleCards, fetchCards, deleteCard, setSnackbar,setSnackbarOpen, setSnackbarSeverity } from '../features/cardSlice';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MediaCard = ({ title, description, imageUrl, onDelete, id, setSnackbarOpen, setSnackbarSeverity }) => {
    const [showFullDescription, setShowFullDescription] = React.useState(false);
    const truncatedTitle = title.length > 20 ? `${title.slice(0, 20)}...` : title;
    const truncateDescription = (text, lines) => {
      const paragraphs = text.split('\n');
      const truncatedParagraphs = paragraphs.slice(0, lines);
      return truncatedParagraphs.join('\n');
  };

  const truncatedDescription = showFullDescription ? description : truncateDescription(description, 2);

  const handleReadMoreClick = () => {
    setShowFullDescription(true);
  };

  const handleReadLessClick = () => {
    setShowFullDescription(false);
  };

  const handleDeleteClick = () => {
    onDelete(id);
    setSnackbarOpen(true);
    setSnackbarSeverity('success');
  };

  return (
    <Card sx={{ maxWidth: 250, display: 'flex', flexDirection: 'column' }}>
      <CardMedia sx={{ height: 150 }} image={imageUrl} />
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Typography gutterBottom variant="h6" component="div" title={title} fontWeight="500">
            {truncatedTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign={'justify'} fontWeight="450">
            {truncatedDescription}
          </Typography>
          {!showFullDescription && (
            <Button
              style={{ background: 'none', padding: 0, cursor: 'pointer', color: '#52a8ff', fontWeight: '300', paddingTop: '10px' }}
              onClick={handleReadMoreClick}
            >
              Read More<ArrowCircleDownOutlinedIcon style={{ fontSize: 15, marginLeft: 4, color: '#52a8ff' }} />
            </Button>
          )}
          {showFullDescription && (
            <Button
              style={{ background: 'none', padding: 0, cursor: 'pointer', color: '#52a8ff', fontWeight: '300', paddingTop: '10px' }}
              onClick={handleReadLessClick}
            >
              Read Less<ArrowCircleUpOutlinedIcon style={{ fontSize: 15, marginLeft: 4, color: '#52a8ff' }} />
            </Button>
          )}
        </div>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', width: '100%', gap: '10px' }}>
            <Link to={`/posts/${id}`} style={{ textDecoration: 'none', width: '48%' }}>
              <Button variant="contained" style={{ backgroundColor: '#1171B9', color: 'white', flex: '1', width: '100%' }}>
                Edit
              </Button>
            </Link>
            <Button variant="contained" style={{ backgroundColor: '#FE5858', color: 'white', flex: '1', width: '48%' }} onClick={handleDeleteClick}>
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CardList = () => {
  const dispatch = useDispatch();
  const { cards, visibleCards, snackbarOpen, snackbarSeverity } = useSelector((state) => state.cards);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const handleDelete = (deletedId) => {
    dispatch(deleteCard(deletedId));
  };

  const handleCloseSnackbar = () => {
    dispatch(setSnackbar({ open: false, severity: 'success' }));
  };

  const handleLoadMoreClick = () => {
    dispatch(setVisibleCards(visibleCards + 5));
  };

  const handleLoadLessClick = () => {
    dispatch(setVisibleCards(Math.max(5, visibleCards - 5)));
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'space-evenly', width: '80%', margin: '0 auto', marginTop: '20px', marginBottom: '20px' }}>
        {cards.slice(0, visibleCards).map((card) => (
          <MediaCard
          key={card.id}
          title={card.title}
          description={card.body}
          id={card.id}
          imageUrl="https://instructor-academy.onlinecoursehost.com/content/images/2023/05/How-to-Create-an-Online-Course-For-Free--Complete-Guide--6.jpg"
          onDelete={handleDelete}
          setSnackbarOpen={setSnackbarOpen}  // Pass the function as a prop
          setSnackbarSeverity={setSnackbarSeverity}   // Ensure that setSnackbarSeverity is defined in your component
        />
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {visibleCards < cards.length && (
          <Button onClick={handleLoadMoreClick} style={{ margin: '20px' }}>
          Load More <ArrowCircleDownOutlinedIcon style={{ fontSize: 15, marginLeft: 4, color: '#52a8ff' }}/>
        </Button>
        )}
        {visibleCards > 5 && (
           <Button onClick={handleLoadLessClick} style={{ margin: '20px' }}>
           Load Less< ArrowCircleUpOutlinedIcon style={{ fontSize: 15, marginLeft: 4, color: '#52a8ff' }}/>
         </Button>
        )}
      </div>

      {snackbarOpen && (
     
         <Snackbar
           open={snackbarOpen}
           autoHideDuration={2000} // 3 seconds
           onClose={handleCloseSnackbar}
         >
           <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
             {snackbarSeverity === 'success' ? 'Deleted successfully!' : 'Error deleting data!'}
           </Alert>
         </Snackbar>
     
      )}
    </div>
  );
};

export default CardList;
