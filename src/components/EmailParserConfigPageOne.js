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
  Divider,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

// Email fields that can be used in criteria
const emailFields = [
  { value: 'from', label: 'From' },
  { value: 'to', label: 'To' },
  { value: 'cc', label: 'CC' },
  { value: 'bcc', label: 'BCC' },
  { value: 'subject', label: 'Subject' },
  { value: 'body', label: 'Body' },
  { value: 'attachments', label: 'Attachments' }
];

// Operators that can be used in criteria
const operators = [
  { value: 'contains', label: 'Contains' },
  { value: 'equals', label: 'Equals' },
  { value: 'starts_with', label: 'Starts With' },
  { value: 'ends_with', label: 'Ends With' },
  { value: 'not_contains', label: 'Does Not Contain' },
  { value: 'not_equals', label: 'Does Not Equal' }
];

const EmailParserConfigPageOne = ({ onBack, onNext }) => {
  const navigate = useNavigate();
  const [configData, setConfigData] = useState({
    ruleName: '',
    modulePreference: '',
    withoutModuleAssociation: false,
    emailCriteria: [{ field: 'from', operator: 'contains', value: '' }]
  });

  const handleInputChange = (field, value) => {
    setConfigData({
      ...configData,
      [field]: value
    });
  };

  const handleModuleAssociationChange = (event) => {
    const checked = event.target.checked;
    setConfigData({
      ...configData,
      withoutModuleAssociation: checked,
      modulePreference: checked ? '' : configData.modulePreference
    });
  };

  const handleCriteriaChange = (index, field, value) => {
    const updatedCriteria = [...configData.emailCriteria];
    updatedCriteria[index] = { ...updatedCriteria[index], [field]: value };
    setConfigData({
      ...configData,
      emailCriteria: updatedCriteria
    });
  };

  const addCriteria = () => {
    setConfigData({
      ...configData,
      emailCriteria: [...configData.emailCriteria, { field: 'from', operator: 'contains', value: '' }]
    });
  };

  const removeCriteria = (index) => {
    const updatedCriteria = configData.emailCriteria.filter((_, i) => i !== index);
    setConfigData({
      ...configData,
      emailCriteria: updatedCriteria
    });
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext(configData);
    } else {
      // Store data in localStorage for the next page
      localStorage.setItem('emailParserConfigOne', JSON.stringify(configData));
      navigate('/email-parser/config-two');
    }
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
          Email Parser Configuration
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1} sx={{ p: 3 }}>
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          {/* Rule Information */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" className="section-title" gutterBottom>
                Rule Information
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Enter a name for this parsing rule
              </Typography>
              
              <TextField
                label="Rule Name"
                fullWidth
                value={configData.ruleName}
                onChange={(e) => handleInputChange('ruleName', e.target.value)}
                margin="normal"
                variant="outlined"
                required
                sx={{ mb: 2 }}
              />
            </CardContent>
          </Card>
          
          {/* Module Preference */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" className="section-title" gutterBottom>
                Module Preference
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Select which module to associate with this rule
              </Typography>
              
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={configData.withoutModuleAssociation}
                    onChange={handleModuleAssociationChange}
                    color="primary"
                  />
                }
                label="Create parser without module association"
                sx={{ mb: 2, display: 'block' }}
              />
              
              {!configData.withoutModuleAssociation && (
                <FormControl fullWidth variant="outlined" disabled={configData.withoutModuleAssociation}>
                  <InputLabel>Module</InputLabel>
                  <Select
                    value={configData.modulePreference}
                    onChange={(e) => handleInputChange('modulePreference', e.target.value)}
                    label="Module"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="leads">Leads</MenuItem>
                    <MenuItem value="contacts">Contacts</MenuItem>
                    <MenuItem value="accounts">Accounts</MenuItem>
                    <MenuItem value="opportunities">Opportunities</MenuItem>
                  </Select>
                </FormControl>
              )}
            </CardContent>
          </Card>
          
          {/* Email Criteria */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <div>
                  <Typography variant="h6" className="section-title" gutterBottom>
                    Email Criteria
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Define conditions for emails that should be parsed
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
              
              {configData.emailCriteria.map((criteria, index) => (
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
                          {emailFields.map((field) => (
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
                          {operators.map((operator) => (
                            <MenuItem key={operator.value} value={operator.value}>
                              {operator.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} sm={5}>
                      <TextField
                        label="Value"
                        fullWidth
                        value={criteria.value}
                        onChange={(e) => handleCriteriaChange(index, 'value', e.target.value)}
                        variant="outlined"
                        size="small"
                        placeholder="e.g., 'company.com' or 'order confirmation'"
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <IconButton 
                        color="error" 
                        onClick={() => removeCriteria(index)}
                        disabled={configData.emailCriteria.length === 1}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </CardContent>
          </Card>
          
          <Box className="navigation-buttons" sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button 
              variant="contained" 
              color="primary"
              type="submit"
              size="large"
              disabled={!configData.ruleName.trim()}
            >
              Next
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default EmailParserConfigPageOne; 