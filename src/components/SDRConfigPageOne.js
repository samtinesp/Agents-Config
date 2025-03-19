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
  TextField,
  IconButton,
  Switch,
  FormControlLabel,
  FormGroup
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const SDRConfigPageOne = ({ configData, onNext }) => {
  const navigate = useNavigate();
  const [localConfig, setLocalConfig] = useState({
    module: configData.module || '',
    setupMeeting: configData.setupMeeting !== undefined ? configData.setupMeeting : true
  });

  // Sample data (in a real app, this would come from an API)
  const availableModules = [
    'Sales Pipeline', 
    'Lead Management', 
    'Account Management',
    'Opportunity Management',
    'Customer Service'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalConfig({
      ...localConfig,
      [name]: value
    });
  };

  const handleSetupMeetingChange = (e) => {
    setLocalConfig({
      ...localConfig,
      setupMeeting: e.target.checked
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
          SDR Agent Configuration
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1}>
        <form onSubmit={handleSubmit}>
          {/* Module Selection */}
          <Typography variant="h6" className="section-title">
            Module Deployment
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="module-label">Select Module</InputLabel>
            <Select
              labelId="module-label"
              id="module"
              name="module"
              value={localConfig.module}
              onChange={handleChange}
              label="Select Module"
              required
            >
              {availableModules.map((module) => (
                <MenuItem key={module} value={module}>
                  {module}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider sx={{ my: 3 }} />

          {/* Meeting Setup Toggle */}
          <Typography variant="h6" className="section-title">
            Meeting Setup
          </Typography>
          <FormGroup>
            <FormControlLabel 
              control={
                <Switch 
                  checked={localConfig.setupMeeting} 
                  onChange={handleSetupMeetingChange} 
                  name="setupMeeting" 
                />
              } 
              label="Allow agent to set up meetings with sales representatives" 
            />
          </FormGroup>

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

export default SDRConfigPageOne; 