import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper, 
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  Card,
  CardContent,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

// Sample assignment rules
const sampleAssignmentRules = [
  { id: 'rule1', name: 'Round Robin Assignment' },
  { id: 'rule2', name: 'Load Balancing' },
  { id: 'rule3', name: 'Territory Based Assignment' },
  { id: 'rule4', name: 'Skills Based Routing' }
];

// Sample fields with values for each module
const sampleFields = {
  leads: [
    { 
      name: 'Lead Status', 
      values: ['Not Contacted', 'Working - Contacted', 'Closed - Converted', 'Closed - Not Converted'] 
    },
    { 
      name: 'Rating', 
      values: ['Hot', 'Warm', 'Cold'] 
    },
    { 
      name: 'Lead Source', 
      values: ['Web', 'Phone Inquiry', 'Partner Referral', 'Purchased List', 'Other'] 
    }
  ],
  contacts: [
    { 
      name: 'Contact Status', 
      values: ['Active', 'Inactive'] 
    },
    { 
      name: 'Level', 
      values: ['Primary', 'Secondary', 'Tertiary'] 
    }
  ],
  accounts: [
    { 
      name: 'Account Type', 
      values: ['Customer', 'Prospect', 'Partner'] 
    },
    { 
      name: 'Active', 
      values: ['Yes', 'No'] 
    }
  ],
  opportunities: [
    { 
      name: 'Stage', 
      values: ['Prospecting', 'Qualification', 'Needs Analysis', 'Value Proposition', 'Closed Won', 'Closed Lost'] 
    },
    { 
      name: 'Type', 
      values: ['New Business', 'Existing Business'] 
    }
  ]
};

// Fallback fields and values if module data isn't available
const fallbackFields = [
  { name: 'Status', values: ['New', 'In Progress', 'Completed'] },
  { name: 'Priority', values: ['High', 'Medium', 'Low'] }
];

const EmailParserConfigPageThree = ({ onBack, onComplete }) => {
  const navigate = useNavigate();
  const [configDataOne, setConfigDataOne] = useState(null);
  const [assignmentRule, setAssignmentRule] = useState('rule1'); // Default to first rule
  const [postParsingAction, setPostParsingAction] = useState('createRecord');
  const [updateFieldName, setUpdateFieldName] = useState('');
  const [updateFieldValue, setUpdateFieldValue] = useState('');
  const [availableFields, setAvailableFields] = useState([]);
  const [availableValues, setAvailableValues] = useState([]);
  const [selectedModule, setSelectedModule] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadConfigData();
  }, []);

  const loadConfigData = () => {
    try {
      // Load data from first page to get module preference
      const storedData = localStorage.getItem('emailParserConfigOne');
      console.log('Stored config data:', storedData);
      
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setConfigDataOne(parsedData);
        
        // Check if module preference exists and module association is enabled
        if (parsedData.modulePreference && !parsedData.withoutModuleAssociation) {
          const moduleKey = parsedData.modulePreference;
          console.log('Selected module:', moduleKey);
          setSelectedModule(moduleKey);
          
          // Check if we have sample fields for this module
          if (sampleFields[moduleKey] && sampleFields[moduleKey].length > 0) {
            console.log('Available fields for module:', sampleFields[moduleKey]);
            setAvailableFields(sampleFields[moduleKey]);
            
            // Default to Lead Status = Not Contacted for leads
            if (moduleKey === 'leads') {
              const leadStatusField = sampleFields[moduleKey].find(f => f.name === 'Lead Status');
              if (leadStatusField) {
                console.log('Setting default Lead Status field');
                setUpdateFieldName('Lead Status');
                setAvailableValues(leadStatusField.values);
                setUpdateFieldValue('Not Contacted');
              } else {
                setDefaultFieldValues(moduleKey);
              }
            } else {
              setDefaultFieldValues(moduleKey);
            }
          } else {
            console.log('No sample fields found for module, using fallback');
            setAvailableFields(fallbackFields);
            setUpdateFieldName(fallbackFields[0].name);
            setAvailableValues(fallbackFields[0].values);
            setUpdateFieldValue(fallbackFields[0].values[0]);
          }
        } else {
          // No module preference or module association is disabled
          console.log('No module preference or module association disabled, using fallback');
          setAvailableFields(fallbackFields);
          setUpdateFieldName(fallbackFields[0].name);
          setAvailableValues(fallbackFields[0].values);
          setUpdateFieldValue(fallbackFields[0].values[0]);
        }
      } else {
        console.log('No stored config data found, using fallback');
        setAvailableFields(fallbackFields);
        setUpdateFieldName(fallbackFields[0].name);
        setAvailableValues(fallbackFields[0].values);
        setUpdateFieldValue(fallbackFields[0].values[0]);
      }
    } catch (error) {
      console.error('Error loading configuration data:', error);
      setError('Error loading configuration data. Using default values.');
      setAvailableFields(fallbackFields);
      setUpdateFieldName(fallbackFields[0].name);
      setAvailableValues(fallbackFields[0].values);
      setUpdateFieldValue(fallbackFields[0].values[0]);
    }
  };

  const setDefaultFieldValues = (moduleKey) => {
    try {
      // Set first field and value as default
      if (sampleFields[moduleKey] && sampleFields[moduleKey].length > 0) {
        const firstField = sampleFields[moduleKey][0];
        console.log('Setting default field:', firstField.name);
        setUpdateFieldName(firstField.name);
        setAvailableValues(firstField.values);
        if (firstField.values.length > 0) {
          console.log('Setting default value:', firstField.values[0]);
          setUpdateFieldValue(firstField.values[0]);
        }
      }
    } catch (error) {
      console.error('Error setting default field values:', error);
      setError('Error setting default field values. Using fallback values.');
    }
  };

  const handleFieldNameChange = (value) => {
    try {
      console.log('Field name changed to:', value);
      setUpdateFieldName(value);
      
      // Find the field object that matches the selected name
      const field = availableFields.find(f => f.name === value);
      console.log('Found field:', field);
      
      if (field && field.values && field.values.length > 0) {
        console.log('Setting available values:', field.values);
        setAvailableValues(field.values);
        
        // Set the first value as default
        console.log('Setting default value:', field.values[0]);
        setUpdateFieldValue(field.values[0]);
      } else {
        console.log('No values found for field, using empty array');
        setAvailableValues([]);
        setUpdateFieldValue('');
      }
    } catch (error) {
      console.error('Error handling field name change:', error);
      setError('Error changing field. Please try again.');
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/email-parser/config-two');
    }
  };

  const handleComplete = (e) => {
    if (e) e.preventDefault();
    
    const configData = {
      assignmentRule,
      postParsingAction,
      fieldUpdate: {
        name: updateFieldName,
        value: updateFieldValue
      }
    };
    
    if (onComplete) {
      onComplete(configData);
    } else {
      // Store data in localStorage and mark as complete
      localStorage.setItem('emailParserConfigThree', JSON.stringify(configData));
      localStorage.setItem('emailParserConfigComplete', 'true');
      navigate('/');
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
          Post-Parsing Actions
        </Typography>
      </Box>
      
      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Paper className="form-container" elevation={1} sx={{ p: 3 }}>
        <form onSubmit={handleComplete}>
          {/* Assignment Rules */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" className="section-title" gutterBottom>
                Assignment Rules
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Choose how records should be assigned after parsing
              </Typography>
              
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel>Assignment Rule</InputLabel>
                <Select
                  value={assignmentRule}
                  onChange={(e) => setAssignmentRule(e.target.value)}
                  label="Assignment Rule"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {sampleAssignmentRules.map((rule) => (
                    <MenuItem key={rule.id} value={rule.id}>
                      {rule.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
          
          {/* Post-Parsing Action */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" className="section-title" gutterBottom>
                Post-Parsing Action
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Select what should happen after an email is parsed
              </Typography>
              
              <RadioGroup
                value={postParsingAction}
                onChange={(e) => setPostParsingAction(e.target.value)}
              >
                <FormControlLabel 
                  value="createRecord" 
                  control={<Radio />} 
                  label="Create record immediately" 
                />
                <FormControlLabel 
                  value="sendForApproval" 
                  control={<Radio />} 
                  label="Send for approval before creating record" 
                />
              </RadioGroup>
            </CardContent>
          </Card>
          
          {/* Field Update */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" className="section-title" gutterBottom>
                Update Field After Parsing
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Specify which field should be updated after parsing
              </Typography>
              
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={5}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Field to Update</InputLabel>
                    <Select
                      value={updateFieldName}
                      onChange={(e) => handleFieldNameChange(e.target.value)}
                      label="Field to Update"
                    >
                      {availableFields.map((field) => (
                        <MenuItem key={field.name} value={field.name}>
                          {field.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    to
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={5}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>New Value</InputLabel>
                    <Select
                      value={updateFieldValue}
                      onChange={(e) => setUpdateFieldValue(e.target.value)}
                      label="New Value"
                      disabled={availableValues.length === 0}
                    >
                      {availableValues.map((value) => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              
              {availableValues.length === 0 && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  No values available for this field. Please select a different field.
                </Alert>
              )}
            </CardContent>
          </Card>
          
          <Box className="navigation-buttons" sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button 
              variant="contained" 
              color="primary"
              type="submit"
              size="large"
            >
              Complete
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default EmailParserConfigPageThree; 