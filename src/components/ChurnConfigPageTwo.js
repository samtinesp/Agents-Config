import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Box,
  Button,
  Divider,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormLabel,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  Switch,
  IconButton,
  RadioGroup,
  Radio,
  Tabs,
  Tab,
  Card,
  CardContent
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ChurnConfigPageTwo = ({ configData, onNext, onBack }) => {
  const navigate = useNavigate();
  const [selectedChurnType, setSelectedChurnType] = useState('churned');
  const [localConfig, setLocalConfig] = useState({
    activityPreferences: configData.activityPreferences || {
      churned: {
        sendPersonalisedEmail: false,
        sendPromotions: false,
        sendSurvey: false,
        provideOffer: false,
      },
      partiallyChurned: {
        sendPersonalisedEmail: false,
        sendPromotions: false,
        sendSurvey: false,
        provideOffer: false,
      },
      aboutToChurn: {
        sendPersonalisedEmail: false,
        sendPromotions: false,
        sendSurvey: false,
        provideOffer: false,
      },
      oneTimeBuyers: {
        sendPersonalisedEmail: false,
        sendPromotions: false,
        sendSurvey: false,
        provideOffer: false,
      }
    },
    timeframes: configData.timeframes || {
      churned: 6,
      partiallyChurned: 3,
      aboutToChurn: 1,
      oneTimeBuyers: 12
    },
    enableTimeframes: configData.enableTimeframes || {
      churned: true,
      partiallyChurned: true,
      oneTimeBuyers: true
    },
    emailMode: configData.emailMode || {
      churned: 'send',
      partiallyChurned: 'send',
      aboutToChurn: 'send',
      oneTimeBuyers: 'send'
    },
    criteria: configData.criteria || {
      churned: {
        module: 'accounts',
        field: 'Last Purchase',
        operator: 'before',
        value: '180'
      },
      partiallyChurned: {
        module: 'accounts',
        field: 'Activity Level',
        operator: 'less_than',
        value: '30'
      },
      aboutToChurn: {
        module: 'accounts',
        field: 'Risk Score',
        operator: 'greater_than',
        value: '70'
      },
      oneTimeBuyers: {
        module: 'accounts',
        field: 'Purchase Count',
        operator: 'equals',
        value: '1'
      }
    }
  });

  // Available months options
  const monthOptions = [1, 2, 3, 6, 9, 12, 18, 24, 36];
  
  // Available modules
  const moduleOptions = [
    { value: 'accounts', label: 'Accounts' },
    { value: 'contacts', label: 'Contacts' },
    { value: 'leads', label: 'Leads' },
    { value: 'opportunities', label: 'Opportunities' }
  ];
  
  // Available fields by module
  const fieldOptions = {
    accounts: [
      { value: 'Last Purchase', label: 'Last Purchase' },
      { value: 'Purchase Count', label: 'Purchase Count' },
      { value: 'Activity Level', label: 'Activity Level' },
      { value: 'Risk Score', label: 'Risk Score' },
      { value: 'Total Spend', label: 'Total Spend' },
      { value: 'Login Frequency', label: 'Login Frequency' }
    ],
    contacts: [
      { value: 'Last Interaction', label: 'Last Interaction' },
      { value: 'Response Rate', label: 'Response Rate' },
      { value: 'Engagement Score', label: 'Engagement Score' }
    ],
    leads: [
      { value: 'Last Activity', label: 'Last Activity' },
      { value: 'Lead Score', label: 'Lead Score' }
    ],
    opportunities: [
      { value: 'Close Date', label: 'Close Date' },
      { value: 'Stage', label: 'Stage' },
      { value: 'Win Probability', label: 'Win Probability' }
    ]
  };
  
  // Available operators
  const operatorOptions = [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'before', label: 'Before' },
    { value: 'after', label: 'After' },
    { value: 'contains', label: 'Contains' },
    { value: 'not_contains', label: 'Does Not Contain' }
  ];
  
  // Available units
  const unitOptions = {
    time: ['days', 'weeks', 'months', 'years'],
    percentage: ['%'],
    count: [''],
    currency: ['$', '€', '£'],
    default: ['']
  };

  const handleActivityPreferenceChange = (churnType, activity) => (e) => {
    setLocalConfig({
      ...localConfig,
      activityPreferences: {
        ...localConfig.activityPreferences,
        [churnType]: {
          ...localConfig.activityPreferences[churnType],
          [activity]: e.target.checked
        }
      }
    });
  };

  const handleTimeframeChange = (churnType) => (e) => {
    setLocalConfig({
      ...localConfig,
      timeframes: {
        ...localConfig.timeframes,
        [churnType]: parseInt(e.target.value) || 1
      }
    });
  };

  const handleEnableTimeframeChange = (churnType) => (e) => {
    setLocalConfig({
      ...localConfig,
      enableTimeframes: {
        ...localConfig.enableTimeframes,
        [churnType]: e.target.checked
      }
    });
  };

  const handleEmailModeChange = (churnType, mode) => {
    setLocalConfig({
      ...localConfig,
      emailMode: {
        ...localConfig.emailMode,
        [churnType]: mode
      }
    });
  };

  // Handlers
  const handleModuleChange = (churnType, value) => {
    setLocalConfig({
      ...localConfig,
      criteria: {
        ...localConfig.criteria,
        [churnType]: {
          ...localConfig.criteria[churnType],
          module: value,
          field: fieldOptions[value][0].value // Set default field for selected module
        }
      }
    });
  };
  
  const handleFieldChange = (churnType, value) => {
    setLocalConfig({
      ...localConfig,
      criteria: {
        ...localConfig.criteria,
        [churnType]: {
          ...localConfig.criteria[churnType],
          field: value
        }
      }
    });
  };
  
  const handleOperatorChange = (churnType, value) => {
    setLocalConfig({
      ...localConfig,
      criteria: {
        ...localConfig.criteria,
        [churnType]: {
          ...localConfig.criteria[churnType],
          operator: value
        }
      }
    });
  };
  
  const handleValueChange = (churnType, value) => {
    setLocalConfig({
      ...localConfig,
      criteria: {
        ...localConfig.criteria,
        [churnType]: {
          ...localConfig.criteria[churnType],
          value: value
        }
      }
    });
  };

  const handleChurnTypeChange = (event, newValue) => {
    setSelectedChurnType(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(localConfig);
  };

  // Define churn type options for the tabs
  const churnTypes = [
    { value: 'churned', label: 'Churned Customers' },
    { value: 'partiallyChurned', label: 'Partially Churned' },
    { value: 'aboutToChurn', label: 'About to Churn' },
    { value: 'oneTimeBuyers', label: 'One Time Buyers' }
  ];

  // The content for the current selected churn type
  const renderChurnTypeContent = () => {
    // Description texts for each churn type
    const descriptions = {
      churned: 'Configure retention activities for customers who have already churned',
      partiallyChurned: 'Configure retention activities for customers who have partially churned',
      aboutToChurn: 'Configure retention activities for customers who are at risk of churning',
      oneTimeBuyers: 'Configure retention activities for customers who have made only one purchase'
    };

    return (
      <Card variant="outlined" sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            {descriptions[selectedChurnType]}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>Selection Criteria:</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Module</InputLabel>
                  <Select
                    value={localConfig.criteria[selectedChurnType].module}
                    onChange={(e) => handleModuleChange(selectedChurnType, e.target.value)}
                    label="Module"
                  >
                    {moduleOptions.map(option => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Field</InputLabel>
                  <Select
                    value={localConfig.criteria[selectedChurnType].field}
                    onChange={(e) => handleFieldChange(selectedChurnType, e.target.value)}
                    label="Field"
                  >
                    {fieldOptions[localConfig.criteria[selectedChurnType].module]?.map(option => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Operator</InputLabel>
                  <Select
                    value={localConfig.criteria[selectedChurnType].operator}
                    onChange={(e) => handleOperatorChange(selectedChurnType, e.target.value)}
                    label="Operator"
                  >
                    {operatorOptions.map(option => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Value"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={localConfig.criteria[selectedChurnType].value}
                  onChange={(e) => handleValueChange(selectedChurnType, e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Email Handling:</Typography>
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={localConfig.emailMode[selectedChurnType]}
                onChange={(e) => handleEmailModeChange(selectedChurnType, e.target.value)}
              >
                <FormControlLabel value="send" control={<Radio />} label="Send Emails" />
                <FormControlLabel value="draft" control={<Radio />} label="Create Drafts" />
              </RadioGroup>
            </FormControl>
          </Box>
          
          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <FormLabel component="legend">Select activities:</FormLabel>
            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={localConfig.activityPreferences[selectedChurnType].sendPersonalisedEmail}
                        onChange={handleActivityPreferenceChange(selectedChurnType, 'sendPersonalisedEmail')}
                      />
                    }
                    label="Personalised Email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={localConfig.activityPreferences[selectedChurnType].sendPromotions}
                        onChange={handleActivityPreferenceChange(selectedChurnType, 'sendPromotions')}
                      />
                    }
                    label="Cross Sell/Up Sell Promotions"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={localConfig.activityPreferences[selectedChurnType].sendSurvey}
                        onChange={handleActivityPreferenceChange(selectedChurnType, 'sendSurvey')}
                      />
                    }
                    label="Personalised Survey Form"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={localConfig.activityPreferences[selectedChurnType].provideOffer}
                        onChange={handleActivityPreferenceChange(selectedChurnType, 'provideOffer')}
                      />
                    }
                    label="Suggest Offers"
                  />
                </Grid>
              </Grid>
            </FormGroup>
          </FormControl>
        </CardContent>
      </Card>
    );
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
          Churn Agent: Model Configuration
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" className="section-title">
            Retention Strategy by Customer Type
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Configure which retention activities to use for each type of customer
          </Typography>
          
          {/* Churn Type Selector */}
          <Tabs
            value={selectedChurnType}
            onChange={handleChurnTypeChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            aria-label="churn type tabs"
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
          >
            {churnTypes.map(type => (
              <Tab 
                key={type.value} 
                value={type.value} 
                label={type.label}
                id={`churn-tab-${type.value}`}
                aria-controls={`churn-tabpanel-${type.value}`}
              />
            ))}
          </Tabs>
          
          {/* Content for selected churn type */}
          <div
            role="tabpanel"
            id={`churn-tabpanel-${selectedChurnType}`}
            aria-labelledby={`churn-tab-${selectedChurnType}`}
          >
            {renderChurnTypeContent()}
          </div>

          <Box className="navigation-buttons" sx={{ mt: 4 }}>
            <Button 
              variant="outlined"
              color="primary"
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

export default ChurnConfigPageTwo; 