import React, { useState } from 'react';
import { 
  Typography, 
  Paper, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  Box,
  Divider,
  Grid,
  Checkbox,
  FormGroup,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Chip,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const AcquisitionConfigPageOne = ({ configData, onNext }) => {
  const navigate = useNavigate();
  const [localConfig, setLocalConfig] = useState({
    module: configData.module || '',
    features: configData.features || []
  });

  // Available modules
  const availableModules = [
    { value: 'crm', label: 'CRM Integration' },
    { value: 'email', label: 'Email Campaigns' },
    { value: 'social', label: 'Social Media Outreach' },
    { value: 'website', label: 'Website Lead Generation' }
  ];

  // Available features
  const availableFeatures = [
    { value: 'content-personalization', label: 'Content Personalisation' },
    { value: 'market-analysis', label: 'Market Analysis' }
  ];

  const handleModuleChange = (e) => {
    setLocalConfig({
      ...localConfig,
      module: e.target.value
    });
  };

  const handleFeatureToggle = (feature) => {
    setLocalConfig({
      ...localConfig,
      features: localConfig.features.includes(feature)
        ? localConfig.features.filter(f => f !== feature)
        : [...localConfig.features, feature]
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
          Acquisition Agent Configuration
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1}>
        <form onSubmit={handleSubmit}>
          {/* Module Selection */}
          <Typography variant="h6" className="section-title">
            Module to Deploy
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Select which module this agent should be deployed to
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="module-label">Module</InputLabel>
            <Select
              labelId="module-label"
              id="module"
              value={localConfig.module}
              onChange={handleModuleChange}
              label="Module"
              required
            >
              {availableModules.map((module) => (
                <MenuItem key={module.value} value={module.value}>
                  {module.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider sx={{ my: 3 }} />

          {/* Feature Selection */}
          <Typography variant="h6" className="section-title">
            Required Features
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Select the features required for this agent
          </Typography>
          <List>
            {availableFeatures.map((feature) => (
              <ListItem key={feature.value} disablePadding>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Checkbox
                    edge="start"
                    checked={localConfig.features.includes(feature.value)}
                    onChange={() => handleFeatureToggle(feature.value)}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText 
                  primary={feature.label}
                />
              </ListItem>
            ))}
          </List>

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

export default AcquisitionConfigPageOne; 