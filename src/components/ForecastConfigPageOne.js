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
  Card,
  CardContent,
  Radio,
  RadioGroup,
  Switch,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ForecastConfigPageOne = ({ configData, onNext }) => {
  const navigate = useNavigate();
  const [localConfig, setLocalConfig] = useState({
    forecastType: configData.forecastType || 'template',
    templateType: configData.templateType || 'sales',
    module: configData.module || '',
    detectAnomalies: configData.detectAnomalies || false,
    suggestCorrections: configData.suggestCorrections || false,
    includeEconomicData: configData.includeEconomicData || false,
    ...configData
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setLocalConfig({
      ...localConfig,
      [name]: value !== undefined ? value : checked
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(localConfig);
  };

  const forecastTemplates = [
    { value: 'sales', label: 'Sales Forecast', description: 'Project future sales based on historical trends and seasonality' },
    { value: 'revenue', label: 'Revenue Forecast', description: 'Predict revenue streams considering product mix and pricing' },
    { value: 'demand', label: 'Demand Forecast', description: 'Project future customer demand for products or services' },
    { value: 'inventory', label: 'Inventory Forecast', description: 'Optimize inventory levels based on demand predictions' },
    { value: 'cash-flow', label: 'Cash Flow Forecast', description: 'Project cash inflows and outflows for financial planning' }
  ];

  const modules = [
    { value: 'sales', label: 'Sales Module' },
    { value: 'service', label: 'Service Module' },
    { value: 'marketing', label: 'Marketing Module' },
    { value: 'operations', label: 'Operations Module' },
    { value: 'finance', label: 'Finance Module' }
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
          Forecast Agent Configuration
        </Typography>
      </Box>

      <Paper className="form-container" elevation={1}>
        <Typography variant="h5" gutterBottom>
          Forecast Agent Configuration
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Configure how the Forecast Agent will generate financial and business forecasts.
        </Typography>
        
        <form onSubmit={handleSubmit}>
          {/* Forecast Type Selection */}
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Forecast Type
          </Typography>
          <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
            <RadioGroup
              name="forecastType"
              value={localConfig.forecastType}
              onChange={handleChange}
            >
              <FormControlLabel 
                value="template" 
                control={<Radio />} 
                label="Choose from template forecasts" 
              />
              <FormControlLabel 
                value="custom" 
                control={<Radio />} 
                label="Enter custom forecast" 
              />
            </RadioGroup>
          </FormControl>

          {/* Template Selection */}
          {localConfig.forecastType === 'template' && (
            <Box sx={{ mb: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="template-type-label">Select Forecast Template</InputLabel>
                <Select
                  labelId="template-type-label"
                  id="template-type"
                  name="templateType"
                  value={localConfig.templateType}
                  onChange={handleChange}
                  label="Select Forecast Template"
                >
                  {forecastTemplates.map(template => (
                    <MenuItem key={template.value} value={template.value}>
                      {template.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {localConfig.templateType && (
                <Card variant="outlined" sx={{ mt: 2, bgcolor: '#f8f9fa' }}>
                  <CardContent>
                    <Typography variant="subtitle2" color="textSecondary">
                      Template Description
                    </Typography>
                    <Typography variant="body2">
                      {forecastTemplates.find(t => t.value === localConfig.templateType)?.description}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Box>
          )}

          {/* Module Selection for Custom Forecast */}
          {localConfig.forecastType === 'custom' && (
            <Box sx={{ mb: 4 }}>
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
                    <MenuItem key={module.value} value={module.value}>
                      {module.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          {/* Additional Options */}
          <Typography variant="h6" gutterBottom>
            Additional Features
          </Typography>
          <Grid container spacing={2}>
            {/* Anomaly Detection */}
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1">
                        Identify Anomalies & Deviations
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Detect unusual patterns or outliers in the forecast data
                      </Typography>
                    </Box>
                    <Switch
                      name="detectAnomalies"
                      checked={localConfig.detectAnomalies}
                      onChange={handleChange}
                      color="primary"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Corrective Actions */}
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1">
                        Suggest Corrective Actions
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Provide recommendations to address forecasted issues
                      </Typography>
                    </Box>
                    <Switch
                      name="suggestCorrections"
                      checked={localConfig.suggestCorrections}
                      onChange={handleChange}
                      color="primary"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Economic Data */}
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1">
                        Include Economic Data
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Consider external economic factors in the forecast
                      </Typography>
                    </Box>
                    <Switch
                      name="includeEconomicData"
                      checked={localConfig.includeEconomicData}
                      onChange={handleChange}
                      color="primary"
                    />
                  </Box>
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

export default ForecastConfigPageOne; 