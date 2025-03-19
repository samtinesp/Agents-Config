import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  IconButton,
  Grid,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Checkbox,
  Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

// Module fields that can be used in criteria
const moduleOptions = [
  { value: 'leads', label: 'Leads' },
  { value: 'contacts', label: 'Contacts' },
  { value: 'accounts', label: 'Accounts' },
  { value: 'opportunities', label: 'Opportunities' },
  { value: 'deals', label: 'Deals' }
];

// Operators that can be used in criteria
const operators = [
  { value: 'equals', label: 'Equals' },
  { value: 'not_equals', label: 'Does Not Equal' },
  { value: 'contains', label: 'Contains' },
  { value: 'not_contains', label: 'Does Not Contain' },
  { value: 'starts_with', label: 'Starts With' },
  { value: 'ends_with', label: 'Ends With' },
  { value: 'greater_than', label: 'Greater Than' },
  { value: 'less_than', label: 'Less Than' }
];

// Data sources for enrichment
const dataSources = [
  { id: 'company_database', name: 'Company Database', description: 'Enrich with business information like industry, size, revenue, etc.' },
  { id: 'contact_database', name: 'Contact Database', description: 'Enrich with personal information like job title, seniority, etc.' },
  { id: 'social_media', name: 'Social Media', description: 'Enrich with data from social media profiles' },
  { id: 'news_articles', name: 'News Articles', description: 'Enrich with recent news and press releases' },
  { id: 'web_data', name: 'Web Data', description: 'Enrich with information scraped from websites' },
  { id: 'third_party_apis', name: 'Third-Party APIs', description: 'Enrich with data from external APIs' }
];

// Module fields that can be used in criteria for each module
const moduleFields = {
  leads: [
    { value: 'first_name', label: 'First Name' },
    { value: 'last_name', label: 'Last Name' },
    { value: 'company', label: 'Company' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'lead_source', label: 'Lead Source' },
    { value: 'lead_status', label: 'Lead Status' }
  ],
  contacts: [
    { value: 'first_name', label: 'First Name' },
    { value: 'last_name', label: 'Last Name' },
    { value: 'account_name', label: 'Account Name' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'title', label: 'Title' },
    { value: 'department', label: 'Department' }
  ],
  accounts: [
    { value: 'account_name', label: 'Account Name' },
    { value: 'account_site', label: 'Account Site' },
    { value: 'industry', label: 'Industry' },
    { value: 'annual_revenue', label: 'Annual Revenue' },
    { value: 'employees', label: 'Employees' },
    { value: 'website', label: 'Website' }
  ],
  opportunities: [
    { value: 'opportunity_name', label: 'Opportunity Name' },
    { value: 'account_name', label: 'Account Name' },
    { value: 'stage', label: 'Stage' },
    { value: 'amount', label: 'Amount' },
    { value: 'close_date', label: 'Close Date' },
    { value: 'probability', label: 'Probability' }
  ],
  deals: [
    { value: 'deal_name', label: 'Deal Name' },
    { value: 'account_name', label: 'Account Name' },
    { value: 'stage', label: 'Stage' },
    { value: 'amount', label: 'Amount' },
    { value: 'close_date', label: 'Close Date' },
    { value: 'probability', label: 'Probability' }
  ]
};

const EnrichmentAgentConfig = ({ onComplete }) => {
  const navigate = useNavigate();
  const [configData, setConfigData] = useState({
    module: '',
    criteria: [{ field: '', operator: 'equals', value: '' }],
    dataSources: [],
    autoEnrich: true,
    scheduledEnrichment: false,
    enrichmentFrequency: 'weekly'
  });

  const handleInputChange = (field, value) => {
    setConfigData({
      ...configData,
      [field]: value
    });
  };

  const handleModuleChange = (value) => {
    setConfigData({
      ...configData,
      module: value,
      criteria: [{ field: '', operator: 'equals', value: '' }]
    });
  };

  const handleCriteriaChange = (index, field, value) => {
    const updatedCriteria = [...configData.criteria];
    updatedCriteria[index] = { ...updatedCriteria[index], [field]: value };
    setConfigData({
      ...configData,
      criteria: updatedCriteria
    });
  };

  const addCriteria = () => {
    setConfigData({
      ...configData,
      criteria: [...configData.criteria, { field: '', operator: 'equals', value: '' }]
    });
  };

  const removeCriteria = (index) => {
    const updatedCriteria = configData.criteria.filter((_, i) => i !== index);
    setConfigData({
      ...configData,
      criteria: updatedCriteria
    });
  };

  const handleDataSourceToggle = (sourceId) => {
    const currentSources = [...configData.dataSources];
    const sourceIndex = currentSources.indexOf(sourceId);
    
    if (sourceIndex === -1) {
      currentSources.push(sourceId);
    } else {
      currentSources.splice(sourceIndex, 1);
    }
    
    setConfigData({
      ...configData,
      dataSources: currentSources
    });
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleComplete = () => {
    // Create a copy of the config data to clean up
    const finalConfig = { ...configData };
    
    // Filter out incomplete criteria
    if (finalConfig.criteria && finalConfig.criteria.length > 0) {
      finalConfig.criteria = finalConfig.criteria.filter(
        criteria => criteria.field && criteria.operator && criteria.value
      );
      
      // If all criteria were removed, keep an empty array
      if (finalConfig.criteria.length === 0) {
        finalConfig.criteria = [];
      }
    }
    
    // Save to localStorage
    localStorage.setItem('enrichment-agent-config', JSON.stringify(finalConfig));
    localStorage.setItem('enrichment-agent-configured', 'true');
    
    if (onComplete) {
      onComplete(finalConfig);
    } else {
      navigate('/');
    }
  };

  const isFormValid = () => {
    return (
      configData.module &&
      configData.dataSources.length > 0
    );
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
          Enrichment Agent Configuration
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1} sx={{ p: 3 }}>
        <form onSubmit={(e) => { e.preventDefault(); handleComplete(); }}>
          {/* Module Selection */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" className="section-title" gutterBottom>
                Module to Enrich
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Select which module's records should be enriched
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Module</InputLabel>
                <Select
                  value={configData.module}
                  onChange={(e) => handleModuleChange(e.target.value)}
                  label="Module"
                  required
                >
                  <MenuItem value="">
                    <em>Select a module</em>
                  </MenuItem>
                  {moduleOptions.map((module) => (
                    <MenuItem key={module.value} value={module.value}>
                      {module.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
          
          {/* Criteria Section - Optional */}
          {configData.module && (
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <div>
                    <Typography variant="h6" className="section-title" gutterBottom>
                      Record Criteria (Optional)
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Define which records should be enriched
                    </Typography>
                  </div>
                  <Button 
                    variant="outlined" 
                    startIcon={<AddIcon />} 
                    onClick={addCriteria}
                    color="primary"
                  >
                    Add Criteria
                  </Button>
                </Box>
                
                {configData.criteria.map((criteria, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      p: 2, 
                      mb: 2, 
                      border: '1px solid', 
                      borderColor: 'divider',
                      borderRadius: 1,
                      backgroundColor: 'background.paper'
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={3}>
                        <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel>Field</InputLabel>
                          <Select
                            value={criteria.field}
                            onChange={(e) => handleCriteriaChange(index, 'field', e.target.value)}
                            label="Field"
                          >
                            <MenuItem value="">
                              <em>Select a field</em>
                            </MenuItem>
                            {moduleFields[configData.module] && moduleFields[configData.module].map((field) => (
                              <MenuItem key={field.value} value={field.value}>
                                {field.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      <Grid item xs={12} sm={3}>
                        <FormControl fullWidth variant="outlined" size="small">
                          <InputLabel>Operator</InputLabel>
                          <Select
                            value={criteria.operator}
                            onChange={(e) => handleCriteriaChange(index, 'operator', e.target.value)}
                            label="Operator"
                          >
                            {operators.map((op) => (
                              <MenuItem key={op.value} value={op.value}>
                                {op.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      <Grid item xs={12} sm={5}>
                        <TextField
                          fullWidth
                          label="Value"
                          variant="outlined"
                          size="small"
                          value={criteria.value}
                          onChange={(e) => handleCriteriaChange(index, 'value', e.target.value)}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton 
                          onClick={() => removeCriteria(index)}
                          disabled={configData.criteria.length <= 1}
                          color="error"
                          aria-label="remove criteria"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
                
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                  If no criteria is specified, all records in the selected module will be enriched.
                </Typography>
              </CardContent>
            </Card>
          )}
          
          {/* Data Sources */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" className="section-title" gutterBottom>
                Data Sources
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Select which sources to use for data enrichment
              </Typography>
              
              <Grid container spacing={2}>
                {dataSources.map((source) => (
                  <Grid item xs={12} sm={6} key={source.id}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        p: 2, 
                        cursor: 'pointer',
                        bgcolor: configData.dataSources.includes(source.id) ? '#e3f2fd' : 'background.paper',
                        border: configData.dataSources.includes(source.id) ? '1px solid #2196f3' : '1px solid rgba(0, 0, 0, 0.12)',
                        '&:hover': {
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                      onClick={() => handleDataSourceToggle(source.id)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <FormControlLabel
                          control={
                            <Checkbox 
                              checked={configData.dataSources.includes(source.id)}
                              onChange={() => handleDataSourceToggle(source.id)}
                              color="primary"
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="subtitle1" component="div" sx={{ fontWeight: 500 }}>
                                {source.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {source.description}
                              </Typography>
                            </Box>
                          }
                          sx={{ m: 0, width: '100%' }}
                        />
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
          
          {/* Enrichment Settings */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" className="section-title" gutterBottom>
                Enrichment Settings
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Configure how and when enrichment should occur
              </Typography>
              
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={configData.autoEnrich}
                    onChange={(e) => handleInputChange('autoEnrich', e.target.checked)}
                    color="primary"
                  />
                }
                label="Automatically enrich data when new records are created"
                sx={{ display: 'block', mb: 1 }}
              />
              
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={configData.scheduledEnrichment}
                    onChange={(e) => handleInputChange('scheduledEnrichment', e.target.checked)}
                    color="primary"
                  />
                }
                label="Schedule regular enrichment for existing records"
                sx={{ display: 'block', mb: 1 }}
              />
              
              {configData.scheduledEnrichment && (
                <FormControl sx={{ mt: 2, ml: 4 }} size="small">
                  <InputLabel>Frequency</InputLabel>
                  <Select
                    value={configData.enrichmentFrequency}
                    onChange={(e) => handleInputChange('enrichmentFrequency', e.target.value)}
                    label="Frequency"
                  >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="quarterly">Quarterly</MenuItem>
                  </Select>
                </FormControl>
              )}
            </CardContent>
          </Card>
          
          {/* Preview Section */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" className="section-title" gutterBottom>
                Configuration Summary
              </Typography>
              
              <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="body2" gutterBottom>
                  <strong>Module to enrich:</strong> {configData.module ? moduleOptions.find(m => m.value === configData.module)?.label : 'Not selected'}
                </Typography>
                
                <Typography variant="body2" gutterBottom>
                  <strong>Data sources:</strong> {' '}
                  {configData.dataSources.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                      {configData.dataSources.map(sourceId => (
                        <Chip 
                          key={sourceId} 
                          label={dataSources.find(s => s.id === sourceId)?.name} 
                          size="small" 
                          color="primary" 
                          variant="outlined" 
                        />
                      ))}
                    </Box>
                  ) : 'None selected'}
                </Typography>
                
                <Typography variant="body2" gutterBottom>
                  <strong>Enrichment triggers:</strong> {' '}
                  {configData.autoEnrich && 'New record creation'}
                  {configData.autoEnrich && configData.scheduledEnrichment && ', '}
                  {configData.scheduledEnrichment && `Scheduled (${configData.enrichmentFrequency})`}
                  {!configData.autoEnrich && !configData.scheduledEnrichment && 'None selected'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button 
              variant="outlined" 
              color="primary"
              onClick={handleBack}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="contained" 
              color="primary"
              size="large"
              disabled={!isFormValid()}
            >
              Finish
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default EnrichmentAgentConfig; 