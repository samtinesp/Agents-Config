import React, { useState } from 'react';
import { 
  Typography, 
  Button, 
  Box, 
  Paper, 
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
  IconButton,
  Grid,
  FormGroup,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const VOCTrackerConfigPageOne = ({ onBack, onNext, onComplete }) => {
  const navigate = useNavigate();
  const [configData, setConfigData] = useState({
    functions: {
      monitorAndAlert: false,
      sendOutreach: false,
      connectWithOwner: false
    },
    dataSources: {
      email: false,
      social: false,
      calls: false
    }
  });

  const handleFunctionChange = (event) => {
    const { name, checked } = event.target;
    
    // Create a copy of the current functions state
    const updatedFunctions = {
      ...configData.functions,
      [name]: checked
    };
    
    // If sendOutreach is unchecked, also uncheck connectWithOwner
    if (name === 'sendOutreach' && !checked) {
      updatedFunctions.connectWithOwner = false;
    }
    
    setConfigData({
      ...configData,
      functions: updatedFunctions
    });
  };

  const handleDataSourceChange = (event) => {
    const { name, checked } = event.target;
    setConfigData({
      ...configData,
      dataSources: {
        ...configData.dataSources,
        [name]: checked
      }
    });
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  const needsSecondPage = () => {
    return configData.functions.sendOutreach || configData.functions.connectWithOwner;
  };

  const handleNext = () => {
    const configForStorage = {
      ...configData
    };
    
    localStorage.setItem('vocTrackerConfigOne', JSON.stringify(configForStorage));
    
    if (needsSecondPage()) {
      if (onNext) {
        onNext(configData);
      } else {
        navigate('/voc-tracker/config-two');
      }
    } else {
      // If only Monitor and Alert is selected, complete the configuration here
      if (onComplete) {
        onComplete(configData);
      } else {
        localStorage.setItem('voc-tracker-configured', 'true');
        navigate('/');
      }
    }
  };

  const isFormValid = () => {
    // Check if at least one function and one data source is selected
    return Object.values(configData.functions).some(value => value) && 
           Object.values(configData.dataSources).some(value => value);
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
          VOC Tracker Configuration
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1} sx={{ p: 3 }}>
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" className="section-title" gutterBottom>
                Functions
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Select the functions for your VOC Tracker
              </Typography>
              
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={configData.functions.monitorAndAlert}
                      onChange={handleFunctionChange}
                      name="monitorAndAlert"
                      color="primary"
                    />
                  }
                  label="Monitor and Alert"
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={configData.functions.sendOutreach}
                      onChange={handleFunctionChange}
                      name="sendOutreach"
                      color="primary"
                    />
                  }
                  label="Send Outreach"
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={configData.functions.connectWithOwner}
                      onChange={handleFunctionChange}
                      name="connectWithOwner"
                      color="primary"
                      disabled={!configData.functions.sendOutreach}
                    />
                  }
                  label="Connect with Sales Rep"
                />
              </FormGroup>
            </CardContent>
          </Card>
          
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" className="section-title" gutterBottom>
                Data Sources
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Select the data sources to monitor
              </Typography>
              
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={configData.dataSources.email}
                      onChange={handleDataSourceChange}
                      name="email"
                      color="primary"
                    />
                  }
                  label="Email"
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={configData.dataSources.social}
                      onChange={handleDataSourceChange}
                      name="social"
                      color="primary"
                    />
                  }
                  label="Social"
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={configData.dataSources.calls}
                      onChange={handleDataSourceChange}
                      name="calls"
                      color="primary"
                    />
                  }
                  label="Calls"
                />
              </FormGroup>
            </CardContent>
          </Card>
          
          <Box className="navigation-buttons" sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button 
              variant="contained" 
              color="primary"
              type="submit"
              size="large"
              disabled={!isFormValid()}
            >
              {needsSecondPage() ? 'Next' : 'Complete'}
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default VOCTrackerConfigPageOne; 