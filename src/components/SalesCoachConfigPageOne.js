import React, { useState } from 'react';
import { 
  Typography, 
  Paper, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Checkbox, 
  FormGroup, 
  FormControlLabel, 
  Button, 
  Box,
  Chip,
  OutlinedInput,
  ListItemText,
  Grid,
  Divider,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const SalesCoachConfigPageOne = ({ configData, onNext }) => {
  const navigate = useNavigate();
  const [localConfig, setLocalConfig] = useState({
    module: configData.module || '',
    profiles: configData.profiles || [],
    features: configData.features || []
  });

  // Sample data (in a real app, this would come from an API)
  const availableModules = [
    'Sales Pipeline', 
    'Lead Management', 
    'Account Management',
    'Opportunity Management',
    'Customer Service'
  ];

  const availableProfiles = [
    'Sales Representative',
    'Sales Manager',
    'Account Executive',
    'Business Development',
    'Sales Operations',
    'Sales Director'
  ];

  const availableFeatures = [
    { id: 'practice-pitch', name: 'Practice a Pitch', description: 'Allow reps to practice their sales pitch and receive feedback' },
    { id: 'roleplay', name: 'Roleplay', description: 'Simulate customer interactions with various scenarios' },
    { id: 'skill-test', name: 'Skill Test', description: 'Test sales knowledge and identify areas for improvement' },
    { id: 'feedback', name: 'Feedback', description: 'Provide detailed feedback on sales conversations' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalConfig({
      ...localConfig,
      [name]: value
    });
  };

  const handleProfileChange = (event) => {
    const {
      target: { value },
    } = event;
    setLocalConfig({
      ...localConfig,
      profiles: typeof value === 'string' ? value.split(',') : value,
    });
  };

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
          Sales Coach Agent Configuration
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1}>
        <form onSubmit={handleSubmit}>
          {/* Module Selection */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="module-label">Module Deployment</InputLabel>
            <Select
              labelId="module-label"
              id="module"
              name="module"
              value={localConfig.module}
              onChange={handleChange}
              label="Module Deployment"
              required
            >
              {availableModules.map((module) => (
                <MenuItem key={module} value={module}>
                  {module}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Profile Access */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="profiles-label">Profile Access</InputLabel>
            <Select
              labelId="profiles-label"
              id="profiles"
              multiple
              name="profiles"
              value={localConfig.profiles}
              onChange={handleProfileChange}
              input={<OutlinedInput label="Profile Access" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {availableProfiles.map((profile) => (
                <MenuItem key={profile} value={profile}>
                  <Checkbox checked={localConfig.profiles.indexOf(profile) > -1} />
                  <ListItemText primary={profile} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider sx={{ my: 3 }} />

          {/* Feature Selection - Grid Card Layout */}
          <Typography variant="h6" sx={{ mb: 2 }}>
            Agent Features
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Select which features to enable for this sales coach agent
          </Typography>
          
          <Grid container spacing={2}>
            {availableFeatures.map((feature) => (
              <Grid item xs={12} sm={6} key={feature.id}>
                <Card 
                  variant="outlined"
                  sx={{ 
                    cursor: 'pointer',
                    height: '100%',
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

          <Box className="navigation-buttons" sx={{ mt: 4 }}>
            <div></div> {/* Empty div for flex spacing */}
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              size="large"
            >
              Next
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default SalesCoachConfigPageOne; 