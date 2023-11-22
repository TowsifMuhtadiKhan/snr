import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        marginTop: '40px', 
        textAlign: 'center',     
      }}
    >
      <Typography variant="body2" color="#1171B9" fontWeight={500}>
        Sense & Respond Software LLC | 545 Metro Place South, Suite 100, Dublin, Ohio, 43017 | Phone:(614) 334-3082
      </Typography>
      <Box sx={{ mt: 2 }}>
      
        <Link href="https://www.your-website.com" target="_blank" rel="noopener noreferrer" color="inherit">
          <LanguageIcon sx={{ fontSize: 30, mr: 1, color: '#1171B9' }} />
        </Link>
      
        <Link href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer" color="inherit">
          <LinkedInIcon sx={{ fontSize: 30, ml: 1, color: '#1171B9' }} />
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
