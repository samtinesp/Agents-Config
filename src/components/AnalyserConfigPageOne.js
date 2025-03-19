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
  FormGroup,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Card,
  CardContent,
  Switch,
  TextField,
  Autocomplete,
  Chip,
  IconButton
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EmailIcon from '@mui/icons-material/Email';
import NotesIcon from '@mui/icons-material/Notes';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const AnalyserConfigPageOne = ({ configData, onNext }) => {
  const navigate = useNavigate();
  const [localConfig, setLocalConfig] = useState({
    analysisScope: configData.analysisScope || 'individual',
    module: configData.module || '',
    recordId: configData.recordId || '',
    selectedModules: configData.selectedModules || [],
    functionType: configData.functionType || ['report'],
    includeZiaInsights: configData.includeZiaInsights || false,
    includeEmails: configData.includeEmails || false,
    includeNotes: configData.includeNotes || false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'analysisScope' && value === 'bulk') {
      // Reset individual record selection when switching to bulk
      setLocalConfig({
        ...localConfig,
        [name]: value,
        module: '',
        recordId: ''
      });
    } else if (name === 'analysisScope' && value === 'individual') {
      // Reset bulk module selection when switching to individual
      setLocalConfig({
        ...localConfig,
        [name]: value,
        selectedModules: []
      });
    } else if (name === 'module') {
      // Reset record selection when changing module
      setLocalConfig({
        ...localConfig,
        [name]: value,
        recordId: ''
      });
    } else {
      setLocalConfig({
        ...localConfig,
        [name]: value
      });
    }
  };

  const handleFunctionTypeChange = (event) => {
    const { value, checked } = event.target;
    
    if (checked) {
      setLocalConfig({
        ...localConfig,
        functionType: [...localConfig.functionType, value]
      });
    } else {
      // Only remove if at least one function remains selected
      if (localConfig.functionType.length > 1) {
        setLocalConfig({
          ...localConfig,
          functionType: localConfig.functionType.filter(type => type !== value)
        });
      }
    }
  };

  const handleModulesChange = (event, newValue) => {
    setLocalConfig({
      ...localConfig,
      selectedModules: newValue.map(item => item.id)
    });
  };

  const handleSwitchChange = (event) => {
    const { name, checked } = event.target;
    setLocalConfig({
      ...localConfig,
      [name]: checked
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(localConfig);
  };

  // Sample data for modules
  const modules = [
    { id: 'sales', name: 'Sales' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'service', name: 'Service' },
    { id: 'surveys', name: 'Surveys' },
    { id: 'projects', name: 'Projects' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'leads', name: 'Leads' }
  ];

  // Sample data for records based on module
  const getRecords = (moduleId) => {
    const recordsByModule = {
      'sales': [
        { id: 'sales-001', name: 'Q2 Sales Report' },
        { id: 'sales-002', name: 'Annual Sales Performance' },
        { id: 'sales-003', name: 'Regional Sales Analysis' }
      ],
      'marketing': [
        { id: 'marketing-001', name: 'Campaign Performance Data' },
        { id: 'marketing-002', name: 'Lead Generation Metrics' },
        { id: 'marketing-003', name: 'Market Research Findings' }
      ],
      'service': [
        { id: 'service-001', name: 'Customer Satisfaction Survey Results' },
        { id: 'service-002', name: 'Support Ticket Analysis' },
        { id: 'service-003', name: 'Service Level Agreement Review' }
      ],
      'surveys': [
        { id: 'survey-001', name: 'NPS Survey Results' },
        { id: 'survey-002', name: 'Product Feedback Survey' },
        { id: 'survey-003', name: 'Employee Satisfaction Survey' }
      ],
      'projects': [
        { id: 'project-001', name: 'Product Launch Analysis' },
        { id: 'project-002', name: 'Development Sprint Data' },
        { id: 'project-003', name: 'Resource Allocation Review' }
      ],
      'analytics': [
        { id: 'analytics-001', name: 'Website Traffic Analysis' },
        { id: 'analytics-002', name: 'Conversion Rate Report' },
        { id: 'analytics-003', name: 'User Engagement Metrics' }
      ],
      'leads': [
        { id: 'lead-001', name: 'Boston Motors' },
        { id: 'lead-002', name: 'TechSolutions Inc.' },
        { id: 'lead-003', name: 'Global Retail Group' }
      ]
    };
    
    return recordsByModule[moduleId] || [];
  };

  // Check if the form is valid for submission
  const isNextDisabled = () => {
    if (localConfig.analysisScope === 'individual') {
      return !localConfig.module || !localConfig.recordId || localConfig.functionType.length === 0;
    } else {
      return localConfig.selectedModules.length === 0 || localConfig.functionType.length === 0;
    }
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
          Analyser Agent Configuration
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1}>
        <Typography variant="h5" gutterBottom>
          Analyser Agent Configuration
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Configure the Analyser agent to analyze data and generate reports/presentations
        </Typography>
        
        <form onSubmit={handleSubmit}>
          {/* Analysis Scope Selection */}
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Analysis Scope
          </Typography>
          <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
            <RadioGroup
              name="analysisScope"
              value={localConfig.analysisScope}
              onChange={handleChange}
            >
              <FormControlLabel 
                value="individual" 
                control={<Radio />} 
                label="Individual Record Analysis" 
              />
              <FormControlLabel 
                value="bulk" 
                control={<Radio />} 
                label="Bulk Data Analysis" 
              />
            </RadioGroup>
          </FormControl>

          {/* Module Selection for Individual Record */}
          {localConfig.analysisScope === 'individual' && (
            <Box sx={{ mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="module-label">Select Module</InputLabel>
                    <Select
                      labelId="module-label"
                      id="module"
                      name="module"
                      value={localConfig.module}
                      onChange={handleChange}
                      label="Select Module"
                    >
                      {modules.map(module => (
                        <MenuItem key={module.id} value={module.id}>
                          {module.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth disabled={!localConfig.module}>
                    <InputLabel id="record-label">Select Record</InputLabel>
                    <Select
                      labelId="record-label"
                      id="recordId"
                      name="recordId"
                      value={localConfig.recordId}
                      onChange={handleChange}
                      label="Select Record"
                    >
                      {getRecords(localConfig.module).map(record => (
                        <MenuItem key={record.id} value={record.id}>
                          {record.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Multiple Module Selection for Bulk Analysis */}
          {localConfig.analysisScope === 'bulk' && (
            <Box sx={{ mb: 4 }}>
              <Autocomplete
                multiple
                id="modules-multi-select"
                options={modules}
                getOptionLabel={(option) => option.name}
                value={modules.filter(module => localConfig.selectedModules.includes(module.id))}
                onChange={handleModulesChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select Modules to Analyse"
                    placeholder="Select multiple modules"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option.name}
                      {...getTagProps({ index })}
                      color="primary"
                      variant="outlined"
                    />
                  ))
                }
              />
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          {/* Additional Data Section (renamed from AI Insights) */}
          <Typography variant="h6" gutterBottom>
            Additional Data
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Include additional data sources in the analysis
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LightbulbIcon sx={{ mr: 2, color: localConfig.includeZiaInsights ? 'primary.main' : 'action.disabled' }} />
                      <Box>
                        <Typography variant="subtitle1">
                          AI Insights
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Include AI-powered insights
                        </Typography>
                      </Box>
                    </Box>
                    <Switch
                      checked={localConfig.includeZiaInsights}
                      onChange={handleSwitchChange}
                      name="includeZiaInsights"
                      color="primary"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmailIcon sx={{ mr: 2, color: localConfig.includeEmails ? 'primary.main' : 'action.disabled' }} />
                      <Box>
                        <Typography variant="subtitle1">
                          Emails
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Include related emails
                        </Typography>
                      </Box>
                    </Box>
                    <Switch
                      checked={localConfig.includeEmails}
                      onChange={handleSwitchChange}
                      name="includeEmails"
                      color="primary"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <NotesIcon sx={{ mr: 2, color: localConfig.includeNotes ? 'primary.main' : 'action.disabled' }} />
                      <Box>
                        <Typography variant="subtitle1">
                          Notes
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Include related notes
                        </Typography>
                      </Box>
                    </Box>
                    <Switch
                      checked={localConfig.includeNotes}
                      onChange={handleSwitchChange}
                      name="includeNotes"
                      color="primary"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Output Type Selection (renamed from Function Type) */}
          <Typography variant="h6" gutterBottom>
            Presentation Type
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Select how you want the analysis to be presented
          </Typography>

          <FormGroup sx={{ mb: 4 }}>
            <Card 
              variant="outlined" 
              sx={{ 
                mb: 2,
                borderColor: localConfig.functionType.includes('report') ? 'primary.main' : 'divider',
                bgcolor: localConfig.functionType.includes('report') ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
                transition: '0.3s'
              }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={localConfig.functionType.includes('report')}
                      onChange={handleFunctionTypeChange}
                      name="report"
                      value="report"
                      color="primary"
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <DescriptionIcon color="primary" sx={{ mr: 1 }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          Report
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Generate detailed analysis reports with data visualization and insights
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </CardContent>
            </Card>

            <Card 
              variant="outlined" 
              sx={{ 
                borderColor: localConfig.functionType.includes('presentation') ? 'primary.main' : 'divider',
                bgcolor: localConfig.functionType.includes('presentation') ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
                transition: '0.3s'
              }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={localConfig.functionType.includes('presentation')}
                      onChange={handleFunctionTypeChange}
                      name="presentation"
                      value="presentation"
                      color="primary"
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <SlideshowIcon color="primary" sx={{ mr: 1 }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          Presentation
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Create presentation slides with key points and visualizations
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </CardContent>
            </Card>
          </FormGroup>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              size="large"
              disabled={isNextDisabled()}
            >
              Next
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default AnalyserConfigPageOne; 