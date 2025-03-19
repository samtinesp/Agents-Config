import React from 'react';
import {
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Box,
  Button
} from '@mui/material';

const SDRLayoutSelector = ({ onLayoutSelect }) => {
  return (
    <div>
      <Typography variant="h4" className="page-title">
        SDR Agent: Select Layout
      </Typography>
      
      <Paper className="form-container" elevation={1}>
        <Typography variant="h6" gutterBottom>
          Choose a configuration layout:
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Select one of the available layouts for configuring your SDR agent.
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card 
              variant="outlined" 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }
              }}
              onClick={() => onLayoutSelect('layout1')}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  Layout 1
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  Standard configuration with basic outreach settings.
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <Typography component="li" variant="body2">
                    Basic lead qualification criteria
                  </Typography>
                  <Typography component="li" variant="body2">
                    Simple outreach configuration
                  </Typography>
                  <Typography component="li" variant="body2">
                    Agent instructions and output preview
                  </Typography>
                </Box>
                <Button 
                  variant="outlined" 
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => onLayoutSelect('layout1')}
                >
                  Select Layout 1
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card 
              variant="outlined" 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }
              }}
              onClick={() => onLayoutSelect('layout2')}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  Layout 2
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  Advanced configuration with user and role selection.
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <Typography component="li" variant="body2">
                    Basic lead qualification criteria
                  </Typography>
                  <Typography component="li" variant="body2">
                    Compact outreach configuration
                  </Typography>
                  <Typography component="li" variant="body2">
                    User and role assignment
                  </Typography>
                  <Typography component="li" variant="body2">
                    Agent instructions and output preview
                  </Typography>
                </Box>
                <Button 
                  variant="outlined" 
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => onLayoutSelect('layout2')}
                >
                  Select Layout 2
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default SDRLayoutSelector; 