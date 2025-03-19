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
  ListItemText,
  OutlinedInput,
  Chip,
  Switch,
  List,
  ListItem,
  ListItemIcon,
  Card,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ChurnConfigPageOne = ({ configData, onNext }) => {
  const navigate = useNavigate();
  const [localConfig, setLocalConfig] = useState({
    churnType: configData.churnType || {
      churned: false,
      partiallyChurned: false,
      aboutToChurn: false,
      oneTimeBuyers: false
    },
    bookMeetingWithRecordOwner: configData.bookMeetingWithRecordOwner || false
  });

  const handleChurnTypeChange = (type) => (e) => {
    setLocalConfig({
      ...localConfig,
      churnType: {
        ...localConfig.churnType,
        [type]: e.target.checked
      }
    });
  };

  const handleBookMeetingChange = (e) => {
    setLocalConfig({
      ...localConfig,
      bookMeetingWithRecordOwner: e.target.checked
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
          Churn Agent Configuration
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1}>
        <form onSubmit={handleSubmit}>
          {/* Customer Type Selection */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" className="section-title">
              Customer Types
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Select the types of customers the agent should focus on
            </Typography>
            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={localConfig.churnType.churned}
                        onChange={handleChurnTypeChange('churned')}
                      />
                    }
                    label="Churned Customers"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={localConfig.churnType.partiallyChurned}
                        onChange={handleChurnTypeChange('partiallyChurned')}
                      />
                    }
                    label="Partially Churned Customers"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={localConfig.churnType.aboutToChurn}
                        onChange={handleChurnTypeChange('aboutToChurn')}
                      />
                    }
                    label="About to Churn Customers"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={localConfig.churnType.oneTimeBuyers}
                        onChange={handleChurnTypeChange('oneTimeBuyers')}
                      />
                    }
                    label="One Time Buyers"
                  />
                </Grid>
              </Grid>
            </FormGroup>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          {/* Book Meeting with Record Owner Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" className="section-title">
              Book a meeting with Record Owner
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Enable this option to allow the agent to book meetings with the record owner when the customer replies
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={localConfig.bookMeetingWithRecordOwner}
                  onChange={handleBookMeetingChange}
                />
              }
              label="Book meeting with record owner on customer reply"
            />
          </Box>
          
          <Box className="navigation-buttons">
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

export default ChurnConfigPageOne; 