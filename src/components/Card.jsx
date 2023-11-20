
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const MediaCard = ({ title, description, imageUrl }) => {
    return (
      <Card sx={{ maxWidth: 250 }}>
        <CardMedia sx={{ height: 140 }} image={imageUrl} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    );
  };
  
  const CardList = () => {
    const [cards, setCards] = useState([]);
  
    useEffect(() => {
      // Fetch data from the JSONPlaceholder API
      axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          setCards(response.data.slice(0, 20)); // Limit to the first 20 posts for this example
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', margin: '20px 0', justifyContent: 'space-evenly' }}>
        {cards.map(card => (
          <MediaCard
            key={card.id}
            title={card.title}
            description={card.body}
            imageUrl="https://instructor-academy.onlinecoursehost.com/content/images/2023/05/How-to-Create-an-Online-Course-For-Free--Complete-Guide--6.jpg"
          />
        ))}
      </div>
    );
  };
  
  export default CardList;