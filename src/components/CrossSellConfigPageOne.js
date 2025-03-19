import React, { useState } from 'react';
import { 
  Typography, 
  Paper, 
  FormControlLabel, 
  Switch, 
  FormGroup, 
  Button, 
  Box,
  Slider,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Grid,
  Card,
  CardContent,
  IconButton,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const CrossSellConfigPageOne = ({ configData, onNext }) => {
  const navigate = useNavigate();
  const [localConfig, setLocalConfig] = useState({
    suggestProductBundles: configData.suggestProductBundles || false,
    provideDiscounts: configData.provideDiscounts || false,
    setupMeeting: configData.setupMeeting || false,
    minPurchaseProbability: configData.minPurchaseProbability || 50,
    emailFrequency: configData.emailFrequency || 'monthly',
    emailMode: configData.emailMode || 'send',
    criteria: configData.criteria || {
      module: 'accounts',
      field: 'Total Spend',
      operator: 'greater_than',
      value: '1000'
    }
  });

  // Criteria selection options
  const moduleOptions = [
    { value: 'accounts', label: 'Accounts' },
    { value: 'contacts', label: 'Contacts' },
    { value: 'leads', label: 'Leads' },
    { value: 'opportunities', label: 'Opportunities' }
  ];
  
  const fieldOptions = {
    accounts: [
      { value: 'Last Purchase', label: 'Last Purchase' },
      { value: 'Purchase Count', label: 'Purchase Count' },
      { value: 'Total Spend', label: 'Total Spend' },
      { value: 'Product Category', label: 'Product Category' },
      { value: 'Customer Tier', label: 'Customer Tier' }
    ],
    contacts: [
      { value: 'Last Interaction', label: 'Last Interaction' },
      { value: 'Engagement Score', label: 'Engagement Score' },
      { value: 'Position', label: 'Position' }
    ],
    leads: [
      { value: 'Lead Score', label: 'Lead Score' },
      { value: 'Interest Level', label: 'Interest Level' }
    ],
    opportunities: [
      { value: 'Stage', label: 'Stage' },
      { value: 'Close Date', label: 'Close Date' },
      { value: 'Amount', label: 'Amount' }
    ]
  };
  
  const operatorOptions = [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'contains', label: 'Contains' },
    { value: 'not_contains', label: 'Does Not Contain' },
    { value: 'before', label: 'Before' },
    { value: 'after', label: 'After' }
  ];

  const handleSwitchChange = (event) => {
    setLocalConfig({
      ...localConfig,
      [event.target.name]: event.target.checked
    });
  };

  const handleSliderChange = (event, newValue) => {
    setLocalConfig({
      ...localConfig,
      minPurchaseProbability: newValue
    });
  };

  const handleSelectChange = (event) => {
    setLocalConfig({
      ...localConfig,
      [event.target.name]: event.target.value
    });
  };

  const handleEmailModeChange = (event) => {
    setLocalConfig({
      ...localConfig,
      emailMode: event.target.value
    });
  };

  const handleModuleChange = (value) => {
    setLocalConfig({
      ...localConfig,
      criteria: {
        ...localConfig.criteria,
        module: value,
        field: fieldOptions[value][0].value // Set default field for selected module
      }
    });
  };
  
  const handleFieldChange = (value) => {
    setLocalConfig({
      ...localConfig,
      criteria: {
        ...localConfig.criteria,
        field: value
      }
    });
  };
  
  const handleOperatorChange = (value) => {
    setLocalConfig({
      ...localConfig,
      criteria: {
        ...localConfig.criteria,
        operator: value
      }
    });
  };
  
  const handleValueChange = (value) => {
    setLocalConfig({
      ...localConfig,
      criteria: {
        ...localConfig.criteria,
        value: value
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(localConfig);
  };

  const frequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

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
          Cross-Sell Agent Configuration
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Customer Selection Criteria */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Customer Selection Criteria
              </Typography>
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    Define which customers to target for cross-selling and up-selling
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={3}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Module</InputLabel>
                          <Select
                            value={localConfig.criteria.module}
                            onChange={(e) => handleModuleChange(e.target.value)}
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
                            value={localConfig.criteria.field}
                            onChange={(e) => handleFieldChange(e.target.value)}
                            label="Field"
                          >
                            {fieldOptions[localConfig.criteria.module]?.map(option => (
                              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      <Grid item xs={12} sm={3}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Operator</InputLabel>
                          <Select
                            value={localConfig.criteria.operator}
                            onChange={(e) => handleOperatorChange(e.target.value)}
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
                          value={localConfig.criteria.value}
                          onChange={(e) => handleValueChange(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Email & Engagement Features Section (Combined) */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Customer Engagement
              </Typography>
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Grid container spacing={3}>
                    {/* Email Features */}
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>Email Handling</Typography>
                      <Box sx={{ mb: 3 }}>
                        <FormControl component="fieldset">
                          <RadioGroup
                            row
                            value={localConfig.emailMode}
                            onChange={handleEmailModeChange}
                          >
                            <FormControlLabel value="send" control={<Radio />} label="Send Emails" />
                            <FormControlLabel value="draft" control={<Radio />} label="Create Drafts" />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                      
                      <Box sx={{ my: 2 }}>
                        <Divider />
                      </Box>
                      
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch 
                              checked={localConfig.setupMeeting}
                              onChange={handleSwitchChange}
                              name="setupMeeting"
                              color="primary"
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="subtitle1">Set Up Meeting with Record Owner</Typography>
                              <Typography variant="body2" color="textSecondary">
                                Allow scheduling meetings with the customer's record owner for personalized follow-up
                              </Typography>
                            </Box>
                          }
                        />
                      </FormGroup>
                    </Grid>
                    
                    {/* Email Settings */}
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>Email Settings</Typography>
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          Only target customers with at least this probability of making a purchase
                        </Typography>
                        <Box sx={{ px: 2, pt: 2 }}>
                          <Slider
                            value={localConfig.minPurchaseProbability}
                            onChange={handleSliderChange}
                            aria-labelledby="min-purchase-probability-slider"
                            valueLabelDisplay="on"
                            step={5}
                            marks={[
                              { value: 0, label: '0%' },
                              { value: 25, label: '25%' },
                              { value: 50, label: '50%' },
                              { value: 75, label: '75%' },
                              { value: 100, label: '100%' }
                            ]}
                            min={0}
                            max={100}
                          />
                        </Box>
                      </Box>

                      <FormControl fullWidth>
                        <InputLabel id="email-frequency-label">Email Frequency</InputLabel>
                        <Select
                          labelId="email-frequency-label"
                          id="emailFrequency"
                          name="emailFrequency"
                          value={localConfig.emailFrequency}
                          onChange={handleSelectChange}
                          label="Email Frequency"
                        >
                          {frequencyOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Product Recommendation Section - Kept separate */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Product Recommendations
              </Typography>
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={localConfig.suggestProductBundles}
                          onChange={handleSwitchChange}
                          name="suggestProductBundles"
                          color="primary"
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="subtitle1">Suggest Product Bundles</Typography>
                          <Typography variant="body2" color="textSecondary">
                            Recommend complementary products based on purchase history and browsing behavior
                          </Typography>
                        </Box>
                      }
                    />

                    <Box sx={{ my: 2 }}>
                      <Divider />
                    </Box>

                    <FormControlLabel
                      control={
                        <Switch 
                          checked={localConfig.provideDiscounts}
                          onChange={handleSwitchChange}
                          name="provideDiscounts"
                          color="primary"
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="subtitle1">Provide Discounts</Typography>
                          <Typography variant="body2" color="textSecondary">
                            Offer personalized discounts to incentivize additional purchases
                          </Typography>
                        </Box>
                      }
                    />
                  </FormGroup>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
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

export default CrossSellConfigPageOne; 