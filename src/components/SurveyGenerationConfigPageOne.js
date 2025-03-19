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
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  TextField,
  IconButton,
  Card,
  CardContent,
  Collapse,
  Autocomplete,
  Switch,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BoltIcon from '@mui/icons-material/Bolt';
import { useNavigate } from 'react-router-dom';

const SurveyGenerationConfigPageOne = ({ configData, onNext }) => {
  const navigate = useNavigate();
  const [localConfig, setLocalConfig] = useState({
    surveyScope: configData.surveyScope || 'individual',
    surveyType: configData.surveyType || '',
    criteria: configData.criteria || [{ module: '', field: '', operator: '', value: '' }],
    individualModule: configData.individualModule || '',
    selectedRecord: configData.selectedRecord || null,
    personalizeResponsesMass: configData.personalizeResponsesMass || false,
    includeZiaInsights: configData.includeZiaInsights || false
  });

  // Mock data for records
  const [recordOptions, setRecordOptions] = useState([]);
  
  // Available modules for individual survey
  const individualModules = [
    { value: 'accounts', label: 'Accounts' },
    { value: 'contacts', label: 'Contacts' },
    { value: 'leads', label: 'Leads' },
    { value: 'opportunities', label: 'Opportunities' }
  ];

  // Available modules for criteria
  const moduleOptions = [
    { value: 'crm', label: 'CRM Module' },
    { value: 'customer-support', label: 'Customer Support' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' }
  ];

  // Mock records by module
  const mockRecords = {
    accounts: [
      { id: 'acc-001', name: 'Acme Corporation', industry: 'Manufacturing' },
      { id: 'acc-002', name: 'Globex', industry: 'Technology' },
      { id: 'acc-003', name: 'Wayne Enterprises', industry: 'Defense' }
    ],
    contacts: [
      { id: 'con-001', name: 'John Smith', title: 'CEO' },
      { id: 'con-002', name: 'Jane Doe', title: 'CTO' },
      { id: 'con-003', name: 'Alex Johnson', title: 'Product Manager' }
    ],
    leads: [
      { id: 'lead-001', name: 'Tom Wilson', company: 'Stark Industries' },
      { id: 'lead-002', name: 'Sarah Miller', company: 'Umbrella Corp' },
      { id: 'lead-003', name: 'David Brown', company: 'Initech' }
    ],
    opportunities: [
      { id: 'opp-001', name: 'Enterprise Software Deal', amount: '$250,000' },
      { id: 'opp-002', name: 'Hardware Upgrade', amount: '$75,000' },
      { id: 'opp-003', name: 'Consulting Services', amount: '$125,000' }
    ]
  };
  
  // Update record options when individual module changes
  useEffect(() => {
    if (localConfig.individualModule && localConfig.surveyScope === 'individual') {
      setRecordOptions(mockRecords[localConfig.individualModule] || []);
    }
  }, [localConfig.individualModule, localConfig.surveyScope]);

  // Survey types
  const surveyTypes = [
    { value: 'customer-satisfaction', label: 'Customer Satisfaction (CSAT)' },
    { value: 'nps', label: 'Net Promoter Score (NPS)' },
    { value: 'brand-tracking', label: 'Brand Tracking' },
    { value: 'price-optimization', label: 'Price Optimization' },
    { value: 'product-feedback', label: 'Product Feedback' },
    { value: 'market-research', label: 'Market Research' }
  ];

  // Available fields for criteria
  const availableFields = [
    { value: 'industry', label: 'Industry' },
    { value: 'company_size', label: 'Company Size' },
    { value: 'region', label: 'Region' },
    { value: 'product', label: 'Product' },
    { value: 'last_purchase_date', label: 'Last Purchase Date' },
    { value: 'customer_type', label: 'Customer Type' }
  ];

  // Available operators
  const availableOperators = [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'between', label: 'Between' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalConfig({
      ...localConfig,
      [name]: value
    });
    
    // Reset selected record when changing modules
    if (name === 'individualModule') {
      setLocalConfig(prev => ({
        ...prev,
        [name]: value,
        selectedRecord: null
      }));
    }
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setLocalConfig({
      ...localConfig,
      [name]: checked
    });
  };

  const handleCriteriaChange = (index, field, value) => {
    const updatedCriteria = [...localConfig.criteria];
    updatedCriteria[index] = { ...updatedCriteria[index], [field]: value };
    setLocalConfig({
      ...localConfig,
      criteria: updatedCriteria
    });
  };

  const handleAddCriteria = () => {
    setLocalConfig({
      ...localConfig,
      criteria: [...localConfig.criteria, { module: '', field: '', operator: '', value: '' }]
    });
  };

  const handleRemoveCriteria = (index) => {
    const updatedCriteria = [...localConfig.criteria];
    updatedCriteria.splice(index, 1);
    setLocalConfig({
      ...localConfig,
      criteria: updatedCriteria.length ? updatedCriteria : [{ module: '', field: '', operator: '', value: '' }]
    });
  };

  const handleRecordSelect = (event, newValue) => {
    setLocalConfig({
      ...localConfig,
      selectedRecord: newValue
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
          Survey Generation Agent: Basic Configuration
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1}>
        <form onSubmit={handleSubmit}>
          {/* Survey Scope Selection */}
          <Typography variant="h6" gutterBottom>
            Survey Scope
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Choose whether to generate surveys for individual customers or for mass distribution
          </Typography>
          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <RadioGroup
              row
              name="surveyScope"
              value={localConfig.surveyScope}
              onChange={handleChange}
            >
              <FormControlLabel 
                value="individual" 
                control={<Radio />} 
                label="Individual Survey" 
              />
              <FormControlLabel 
                value="mass" 
                control={<Radio />} 
                label="Mass Survey" 
              />
            </RadioGroup>
          </FormControl>

          {/* Individual Survey Selection */}
          <Collapse in={localConfig.surveyScope === 'individual'}>
            <Card variant="outlined" sx={{ mb: 4, mt: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Individual Survey Target
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  Select a specific record to generate a survey for
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="individual-module-label">Select Module</InputLabel>
                      <Select
                        labelId="individual-module-label"
                        value={localConfig.individualModule}
                        name="individualModule"
                        onChange={handleChange}
                        label="Select Module"
                      >
                        {individualModules.map((module) => (
                          <MenuItem key={module.value} value={module.value}>
                            {module.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} sm={8}>
                    <Autocomplete
                      id="record-select"
                      options={recordOptions}
                      getOptionLabel={(option) => option.name || ''}
                      value={localConfig.selectedRecord}
                      onChange={handleRecordSelect}
                      disabled={!localConfig.individualModule}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search for a record"
                          size="small"
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <>
                                <SearchIcon color="action" sx={{ ml: 1, mr: 0.5 }} />
                                {params.InputProps.startAdornment}
                              </>
                            )
                          }}
                        />
                      )}
                    />
                  </Grid>
                  
                  {localConfig.selectedRecord && (
                    <Grid item xs={12} sx={{ mt: 1 }}>
                      <Card variant="outlined">
                        <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
                          <Typography variant="subtitle2" component="div">
                            {localConfig.selectedRecord.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {localConfig.selectedRecord.industry || 
                             localConfig.selectedRecord.title || 
                             localConfig.selectedRecord.company || 
                             `Amount: ${localConfig.selectedRecord.amount}`}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Collapse>

          {/* Mass Survey Criteria */}
          <Collapse in={localConfig.surveyScope === 'mass'}>
            <Card variant="outlined" sx={{ mb: 4, mt: 2 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Mass Survey Criteria
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  Define criteria for selecting records to send the survey to
                </Typography>
                
                {localConfig.criteria.map((criterion, index) => (
                  <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={2}>
                      <FormControl fullWidth size="small">
                        <InputLabel id={`module-label-${index}`}>Module</InputLabel>
                        <Select
                          labelId={`module-label-${index}`}
                          value={criterion.module}
                          onChange={(e) => handleCriteriaChange(index, 'module', e.target.value)}
                          label="Module"
                        >
                          {moduleOptions.map((module) => (
                            <MenuItem key={module.value} value={module.value}>
                              {module.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth size="small">
                        <InputLabel id={`field-label-${index}`}>Field</InputLabel>
                        <Select
                          labelId={`field-label-${index}`}
                          value={criterion.field}
                          onChange={(e) => handleCriteriaChange(index, 'field', e.target.value)}
                          label="Field"
                          disabled={!criterion.module}
                        >
                          {availableFields.map((field) => (
                            <MenuItem key={field.value} value={field.value}>
                              {field.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <FormControl fullWidth size="small">
                        <InputLabel id={`operator-label-${index}`}>Operator</InputLabel>
                        <Select
                          labelId={`operator-label-${index}`}
                          value={criterion.operator}
                          onChange={(e) => handleCriteriaChange(index, 'operator', e.target.value)}
                          label="Operator"
                          disabled={!criterion.field}
                        >
                          {availableOperators.map((operator) => (
                            <MenuItem key={operator.value} value={operator.value}>
                              {operator.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Value"
                        value={criterion.value}
                        onChange={(e) => handleCriteriaChange(index, 'value', e.target.value)}
                        disabled={!criterion.operator}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveCriteria(index)}
                        disabled={localConfig.criteria.length === 1}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={handleAddCriteria}
                    variant="outlined"
                    size="small"
                  >
                    Add Criteria
                  </Button>
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={localConfig.personalizeResponsesMass}
                        onChange={handleSwitchChange}
                        name="personalizeResponsesMass"
                        color="primary"
                      />
                    }
                    label="Personalize surveys for each recipient"
                  />
                </Box>
              </CardContent>
            </Card>
          </Collapse>

          <Divider sx={{ my: 3 }} />

          {/* Survey Type */}
          <Typography variant="h6" gutterBottom>
            Survey Type
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Select the type of survey to generate
          </Typography>
          <FormControl fullWidth margin="normal" sx={{ mb: 4 }}>
            <InputLabel id="survey-type-label">Survey Type</InputLabel>
            <Select
              labelId="survey-type-label"
              id="surveyType"
              name="surveyType"
              value={localConfig.surveyType}
              onChange={handleChange}
              label="Survey Type"
              required
            >
              {surveyTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider sx={{ my: 3 }} />

          {/* Zia Insights Option */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <BoltIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">AI Assistance</Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Enhance your survey with AI-powered insights
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={localConfig.includeZiaInsights}
                  onChange={handleSwitchChange}
                  name="includeZiaInsights"
                  color="primary"
                />
              }
              label={
                <Box>
                  <Typography variant="subtitle1">Include Zia Insights</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Use our AI engine to suggest relevant questions and analyze responses
                  </Typography>
                </Box>
              }
            />
            
            {localConfig.includeZiaInsights && (
              <Card variant="outlined" sx={{ mt: 2, bgcolor: 'rgba(25, 118, 210, 0.04)' }}>
                <CardContent>
                  <Typography variant="body2">
                    <strong>Zia will:</strong>
                    <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: '8px' }}>
                      <li>Analyze customer data to suggest relevant questions</li>
                      <li>Personalize survey questions based on customer history</li>
                      <li>Provide real-time analysis of survey responses</li>
                      <li>Generate actionable insights from survey results</li>
                    </ul>
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>

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

export default SurveyGenerationConfigPageOne; 