import React, { useState } from 'react';
import { 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
  IconButton,
  Grid
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const modules = [
  'Leads',
  'Contacts',
  'Accounts',
  'Deals',
  'Tasks',
  'Meetings',
  'Calls',
  'Products',
  'Quotes',
  'Sales Orders',
  'Purchase Orders',
  'Invoices'
];

const RecordGenerationConfigPageOne = ({ onBack, onNext }) => {
  const navigate = useNavigate();
  const [configData, setConfigData] = useState({
    generateForModule: '',
    generateFromModule: '',
    includeConversation: false,
    includeNotes: false
  });

  const handleInputChange = (field, value) => {
    setConfigData({
      ...configData,
      [field]: value
    });
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext(configData);
    } else {
      // Store data in localStorage for the next page
      localStorage.setItem('recordGenerationConfigOne', JSON.stringify(configData));
      navigate('/record-generation/config-two');
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton 
          color="primary" 
          onClick={handleBack} 
          aria-label="back"
          sx={{ mr: 1 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" className="page-title">
          Record Generation Configuration
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1} sx={{ p: 3 }}>
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" className="section-title" gutterBottom>
                Module Configuration
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Select which modules to use for record generation
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                    <InputLabel>Generate For Module</InputLabel>
                    <Select
                      value={configData.generateForModule}
                      onChange={(e) => handleInputChange('generateForModule', e.target.value)}
                      label="Generate For Module"
                      required
                    >
                      <MenuItem value="">
                        <em>Select a module</em>
                      </MenuItem>
                      {modules.map((module) => (
                        <MenuItem key={module} value={module.toLowerCase()}>
                          {module}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                    <InputLabel>Generate From Module</InputLabel>
                    <Select
                      value={configData.generateFromModule}
                      onChange={(e) => handleInputChange('generateFromModule', e.target.value)}
                      label="Generate From Module"
                      required
                    >
                      <MenuItem value="">
                        <em>Select a module</em>
                      </MenuItem>
                      {modules.map((module) => (
                        <MenuItem key={module} value={module.toLowerCase()}>
                          {module}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              
              <Typography variant="h6" className="section-title" gutterBottom sx={{ mt: 2 }}>
                Additional Information
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Select what additional information to include in the generation process
              </Typography>
              
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={configData.includeConversation}
                    onChange={(e) => handleInputChange('includeConversation', e.target.checked)}
                    color="primary"
                  />
                }
                label="Include Conversation History"
                sx={{ display: 'block', mb: 1 }}
              />
              
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={configData.includeNotes}
                    onChange={(e) => handleInputChange('includeNotes', e.target.checked)}
                    color="primary"
                  />
                }
                label="Include Notes"
                sx={{ display: 'block' }}
              />
            </CardContent>
          </Card>
          
          <Box className="navigation-buttons" sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button 
              variant="contained" 
              color="primary"
              type="submit"
              size="large"
              disabled={!configData.generateForModule || !configData.generateFromModule}
            >
              Next
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default RecordGenerationConfigPageOne; 