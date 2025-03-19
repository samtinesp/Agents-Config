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
  FormControlLabel,
  Switch,
  IconButton,
  Card,
  CardContent,
  Tooltip,
  Radio,
  RadioGroup,
  Chip,
  OutlinedInput,
  Checkbox,
  ListItemText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';

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

const SDRConfigPageTwoLayout2 = ({ configData, onNext, onBack }) => {
  const [localConfig, setLocalConfig] = useState({
    outreachMode: configData.outreachMode || 'auto',
    outreachConfig: configData.outreachConfig || {
      businessHoursOnly: true,
      firstContactDelay: '10 minutes',
      nudgeDelay: '3 days',
      maxNudges: 4
    },
    profile: configData.profile || '',
  });

  // Available field names for criteria
  const availableFields = [
    'Revenue',
    'Company Size',
    'Industry',
    'Lead Score',
    'Country',
    'Last Activity Date',
    'Number of Employees',
    'Deal Size'
  ];

  // Available operators for criteria
  const availableOperators = [
    'equals',
    'not equals',
    'greater than',
    'less than',
    'contains',
    'starts with',
    'ends with',
    'is empty',
    'is not empty'
  ];

  const firstContactOptions = [
    '5 minutes',
    '10 minutes',
    '30 minutes',
    '1 hour',
    '2 hours',
    '1 day'
  ];

  const nudgeDelayOptions = [
    '1 day',
    '2 days',
    '3 days',
    '5 days',
    '1 week'
  ];

  const maxNudgesOptions = [1, 2, 3, 4, 5];

  // Available profiles for dropdown
  const availableProfiles = [
    'Administrator',
    'Standard'
  ];

  const handleOutreachModeChange = (event, newMode) => {
    if (newMode !== null) {
      setLocalConfig({
        ...localConfig,
        outreachMode: newMode
      });
    }
  };

  const handleBusinessHoursChange = (e) => {
    setLocalConfig({
      ...localConfig,
      outreachConfig: {
        ...localConfig.outreachConfig,
        businessHoursOnly: e.target.checked
      }
    });
  };

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setLocalConfig({
      ...localConfig,
      outreachConfig: {
        ...localConfig.outreachConfig,
        [name]: value
      }
    });
  };

  const handleProfileChange = (event) => {
    setLocalConfig({
      ...localConfig,
      profile: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(localConfig);
  };

  return (
    <div>
      <Typography variant="h4" className="page-title">
        SDR Agent: Configuration
      </Typography>

      <Paper className="form-container" elevation={1}>
        <form onSubmit={handleSubmit}>
          {/* Profile Selection */}
          <Typography variant="h6" className="section-title">
            Agent Assignment
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Select the profile that should have access to this SDR agent
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="profile-label">Select Profile</InputLabel>
                <Select
                  labelId="profile-label"
                  id="profile"
                  value={localConfig.profile}
                  onChange={handleProfileChange}
                  input={<OutlinedInput label="Select Profile" />}
                >
                  {availableProfiles.map((profile) => (
                    <MenuItem key={profile} value={profile}>
                      {profile}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Compact Outreach Configuration */}
          <Typography variant="h6" className="section-title">
            Outreach Configuration
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Configure how the SDR agent reaches out to prospects
          </Typography>

          <Grid container spacing={2}>
            {/* Mode Selection */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={localConfig.outreachMode === 'auto'}
                        onChange={(e) => handleOutreachModeChange(e, 'auto')}
                        value="auto"
                        name="outreach-mode-radio"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: localConfig.outreachMode === 'auto' ? 600 : 400 }}>Let Zia decide</Typography>
                        <Tooltip 
                          title="Our AI will analyze your leads and determine the optimal outreach strategy" 
                          placement="top"
                          arrow
                        >
                          <InfoIcon color="action" fontSize="small" sx={{ ml: 1 }} />
                        </Tooltip>
                      </Box>
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={localConfig.outreachMode === 'custom'}
                        onChange={(e) => handleOutreachModeChange(e, 'custom')}
                        value="custom"
                        name="outreach-mode-radio"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: localConfig.outreachMode === 'custom' ? 600 : 400 }}>Customize</Typography>
                        <Tooltip 
                          title="Take full control of your outreach strategy" 
                          placement="top"
                          arrow
                        >
                          <InfoIcon color="action" fontSize="small" sx={{ ml: 1 }} />
                        </Tooltip>
                      </Box>
                    }
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Custom Outreach Settings */}
            {localConfig.outreachMode === 'custom' && (
              <Grid item xs={12}>
                <Card variant="outlined" sx={{ mt: 2, p: 2 }}>
                  <Grid container spacing={2}>
                    {/* Business Hours Switch */}
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ height: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500, mr: 1 }}>Business Hours</Typography>
                          <Tooltip 
                            title="When enabled, the agent will only send messages during business hours" 
                            placement="top"
                            arrow
                          >
                            <InfoIcon color="action" fontSize="small" />
                          </Tooltip>
                        </Box>
                        <FormControlLabel
                          control={
                            <Switch
                              size="small"
                              checked={localConfig.outreachConfig.businessHoursOnly}
                              onChange={handleBusinessHoursChange}
                              name="businessHoursOnly"
                            />
                          }
                          label="Only business hours"
                        />
                      </Box>
                    </Grid>

                    {/* First Contact Setting */}
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="first-contact-label">First Contact</InputLabel>
                        <Select
                          labelId="first-contact-label"
                          id="firstContactDelay"
                          name="firstContactDelay"
                          value={localConfig.outreachConfig.firstContactDelay}
                          onChange={handleConfigChange}
                          label="First Contact"
                        >
                          {firstContactOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Nudge Delay Setting */}
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="nudge-delay-label">Follow-up</InputLabel>
                        <Select
                          labelId="nudge-delay-label"
                          id="nudgeDelay"
                          name="nudgeDelay"
                          value={localConfig.outreachConfig.nudgeDelay}
                          onChange={handleConfigChange}
                          label="Follow-up"
                        >
                          {nudgeDelayOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Max Nudges Setting */}
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="max-nudges-label">Max Follow-ups</InputLabel>
                        <Select
                          labelId="max-nudges-label"
                          id="maxNudges"
                          name="maxNudges"
                          value={localConfig.outreachConfig.maxNudges}
                          onChange={handleConfigChange}
                          label="Max Follow-ups"
                        >
                          {maxNudgesOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            )}
          </Grid>

          {/* Navigation Buttons */}
          <Box className="navigation-buttons" sx={{ mt: 4 }}>
            <Button 
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => onBack()}
            >
              Back
            </Button>
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

export default SDRConfigPageTwoLayout2; 