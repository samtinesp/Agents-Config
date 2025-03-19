import React, { useState } from 'react';
import { 
  Typography,
  Paper,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Checkbox,
  Divider,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const PricingConfigPageOne = ({ configData, onNext }) => {
  const navigate = useNavigate();
  const [localConfig, setLocalConfig] = useState({
    features: configData.features || []
  });

  // Available features
  const availableFeatures = [
    {
      id: 'market-analysis',
      name: 'Market Analysis',
      description: 'Analyze market trends, competition, and customer segments to inform pricing strategies.'
    },
    {
      id: 'pricing-suggestion',
      name: 'Pricing / Discount Suggestion',
      description: 'Get data-driven recommendations for optimal pricing and strategic discount offers.'
    },
    {
      id: 'ab-testing',
      name: 'A/B Testing',
      description: 'Design and evaluate pricing experiments to determine the most effective approach.'
    }
  ];

  const handleFeatureToggle = (featureId) => {
    setLocalConfig({
      ...localConfig,
      features: localConfig.features.includes(featureId)
        ? localConfig.features.filter(id => id !== featureId)
        : [...localConfig.features, featureId]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(localConfig);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton 
          color="primary" 
          onClick={() => navigate('/')} 
          aria-label="back to home"
          sx={{ mr: 1 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" className="page-title">
          Pricing Agent Configuration
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Available Features
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Select the pricing features you would like to enable for this agent
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {availableFeatures.map((feature) => (
              <Grid item xs={12} key={feature.id}>
                <Card 
                  variant="outlined"
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    bgcolor: localConfig.features.includes(feature.id) ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                    border: localConfig.features.includes(feature.id) ? '1px solid #1976d2' : '1px solid rgba(0, 0, 0, 0.12)',
                    '&:hover': {
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                  onClick={() => handleFeatureToggle(feature.id)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Checkbox
                        checked={localConfig.features.includes(feature.id)}
                        sx={{ padding: '0', marginRight: '8px', marginTop: '-2px' }}
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="500">
                          {feature.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              size="large"
              disabled={localConfig.features.length === 0}
            >
              Next
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default PricingConfigPageOne; 