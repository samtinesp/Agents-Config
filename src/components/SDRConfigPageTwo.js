import React, { useState, useEffect } from 'react';
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
  ToggleButton,
  ToggleButtonGroup,
  FormControlLabel,
  Switch,
  FormHelperText,
  IconButton,
  Card,
  CardContent,
  Tooltip,
  Radio,
  RadioGroup
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const SDRConfigPageTwo = ({ configData, onNext, onBack }) => {
  const navigate = useNavigate();
  const [localConfig, setLocalConfig] = useState({
    criteria: configData.criteria || [{ field: '', operator: '', value: '' }],
    outreachMode: configData.outreachMode || 'auto',
    outreachConfig: configData.outreachConfig || {
      businessHoursOnly: true,
      firstContactDelay: '10 minutes',
      nudgeDelay: '3 days',
      maxNudges: 4
    }
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

  const handleCriteriaChange = (index, field, value) => {
    const updatedCriteria = [...localConfig.criteria];
    updatedCriteria[index] = { 
      ...updatedCriteria[index], 
      [field]: value 
    };
    setLocalConfig({
      ...localConfig,
      criteria: updatedCriteria
    });
  };

  const addCriteria = () => {
    setLocalConfig({
      ...localConfig,
      criteria: [...localConfig.criteria, { field: '', operator: '', value: '' }]
    });
  };

  const removeCriteria = (index) => {
    if (localConfig.criteria.length > 1) {
      const updatedCriteria = [...localConfig.criteria];
      updatedCriteria.splice(index, 1);
      setLocalConfig({
        ...localConfig,
        criteria: updatedCriteria
      });
    }
  };

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
          SDR Agent: Configuration
        </Typography>
      </Box>

      <Paper className="form-container" elevation={1}>
        <form onSubmit={handleSubmit}>
          {/* Trigger Criteria */}
          <Typography variant="h6" className="section-title">
            Trigger Criteria
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Define when the SDR Agent should engage with a lead
          </Typography>
          
          {localConfig.criteria.map((criterion, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={3.5}>
                <FormControl fullWidth>
                  <InputLabel id={`field-label-${index}`}>Field</InputLabel>
                  <Select
                    labelId={`field-label-${index}`}
                    value={criterion.field}
                    onChange={(e) => handleCriteriaChange(index, 'field', e.target.value)}
                    label="Field"
                    required
                  >
                    {availableFields.map((field) => (
                      <MenuItem key={field} value={field}>
                        {field}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3.5}>
                <FormControl fullWidth>
                  <InputLabel id={`operator-label-${index}`}>Operator</InputLabel>
                  <Select
                    labelId={`operator-label-${index}`}
                    value={criterion.operator}
                    onChange={(e) => handleCriteriaChange(index, 'operator', e.target.value)}
                    label="Operator"
                    required
                  >
                    {availableOperators.map((operator) => (
                      <MenuItem key={operator} value={operator}>
                        {operator}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3.5}>
                <TextField
                  fullWidth
                  label="Value"
                  value={criterion.value}
                  onChange={(e) => handleCriteriaChange(index, 'value', e.target.value)}
                  required={criterion.operator !== 'is empty' && criterion.operator !== 'is not empty'}
                  disabled={criterion.operator === 'is empty' || criterion.operator === 'is not empty'}
                />
              </Grid>
              <Grid item xs={12} sm={1.5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton 
                  color="error" 
                  onClick={() => removeCriteria(index)}
                  disabled={localConfig.criteria.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          
          <Button 
            startIcon={<AddIcon />}
            onClick={addCriteria}
            variant="outlined"
            sx={{ mt: 1, mb: 3 }}
          >
            Add Criteria
          </Button>

          <Divider sx={{ my: 3 }} />

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

          <Box className="navigation-buttons">
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

export default SDRConfigPageTwo; 