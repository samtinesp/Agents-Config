import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  FormControlLabel,
  Radio,
  RadioGroup,
  Card,
  CardContent,
  IconButton,
  Grid,
  FormLabel,
  Checkbox
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

// Sample assignment rules
const assignmentRules = [
  { id: 'rule1', name: 'Default Assignment Rule' },
  { id: 'rule2', name: 'Round Robin' },
  { id: 'rule3', name: 'Load Balancing' },
  { id: 'rule4', name: 'Territory Based Assignment' }
];

// Sample statuses for different modules
const moduleStatuses = {
  leads: ['New', 'Contacted', 'Qualified', 'Unqualified', 'Converted'],
  contacts: ['Active', 'Inactive'],
  accounts: ['Active', 'Inactive', 'Prospect', 'Customer'],
  deals: ['Qualification', 'Needs Analysis', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'],
  quotes: ['Draft', 'Presented', 'Accepted', 'Rejected', 'Expired']
};

const RecordGenerationConfigPageThree = ({ onBack, onComplete }) => {
  const navigate = useNavigate();
  const [configDataOne, setConfigDataOne] = useState(null);
  const [creationApproval, setCreationApproval] = useState('create');
  const [ownershipOption, setOwnershipOption] = useState('carry');
  const [assignmentRule, setAssignmentRule] = useState('');
  const [changeStatus, setChangeStatus] = useState(true);
  const [recordStatus, setRecordStatus] = useState('');
  const [availableStatuses, setAvailableStatuses] = useState([]);

  useEffect(() => {
    // Load data from previous pages
    const storedDataOne = localStorage.getItem('recordGenerationConfigOne');
    if (storedDataOne) {
      const parsedDataOne = JSON.parse(storedDataOne);
      setConfigDataOne(parsedDataOne);
      
      // Set available statuses based on the module to generate for
      if (parsedDataOne.generateForModule && moduleStatuses[parsedDataOne.generateForModule]) {
        const statuses = moduleStatuses[parsedDataOne.generateForModule];
        setAvailableStatuses(statuses);
        
        // Set default status (usually the first one)
        if (statuses.length > 0) {
          setRecordStatus(statuses[0]);
        }
      } else {
        // Default to generic statuses
        setAvailableStatuses(['New', 'In Progress', 'Completed']);
        setRecordStatus('New');
      }
    }
    
    // Default assignment rule
    if (assignmentRules.length > 0) {
      setAssignmentRule(assignmentRules[0].id);
    }
  }, []);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/record-generation/config-two');
    }
  };

  const handleComplete = (e) => {
    if (e) e.preventDefault();
    
    const configData = {
      creationApproval,
      ownershipOption,
      assignmentRule: ownershipOption === 'rule' ? assignmentRule : '',
      changeStatus,
      recordStatus: changeStatus ? recordStatus : ''
    };
    
    if (onComplete) {
      onComplete(configData);
    } else {
      // Store data in localStorage and mark as complete
      localStorage.setItem('recordGenerationConfigThree', JSON.stringify(configData));
      localStorage.setItem('record-generation-agent-configured', 'true');
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
          Record Generation Configuration
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1} sx={{ p: 3 }}>
        <form onSubmit={handleComplete}>
          {/* Record Creation Options */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" className="section-title" gutterBottom>
                Record Creation Options
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Configure how records should be created
              </Typography>
              
              <FormControl component="fieldset" sx={{ mb: 3 }}>
                <FormLabel component="legend">Record Creation Approval</FormLabel>
                <RadioGroup
                  value={creationApproval}
                  onChange={(e) => setCreationApproval(e.target.value)}
                >
                  <FormControlLabel value="create" control={<Radio />} label="Create record directly" />
                  <FormControlLabel value="approval" control={<Radio />} label="Send for approval" />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
          
          {/* Record Ownership */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" className="section-title" gutterBottom>
                Record Ownership
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Specify how record ownership should be assigned
              </Typography>
              
              <FormControl component="fieldset" sx={{ mb: 3 }}>
                <FormLabel component="legend">Ownership Assignment</FormLabel>
                <RadioGroup
                  value={ownershipOption}
                  onChange={(e) => setOwnershipOption(e.target.value)}
                >
                  <FormControlLabel value="carry" control={<Radio />} label="Carry record owner from source record" />
                  <FormControlLabel value="rule" control={<Radio />} label="Use assignment rule" />
                </RadioGroup>
              </FormControl>
              
              {ownershipOption === 'rule' && (
                <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                  <InputLabel>Assignment Rule</InputLabel>
                  <Select
                    value={assignmentRule}
                    onChange={(e) => setAssignmentRule(e.target.value)}
                    label="Assignment Rule"
                  >
                    {assignmentRules.map((rule) => (
                      <MenuItem key={rule.id} value={rule.id}>
                        {rule.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </CardContent>
          </Card>
          
          {/* Record Status */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" className="section-title" gutterBottom>
                Update Field After Creation
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Specify which field should be updated after record creation
              </Typography>
              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={changeStatus}
                    onChange={(e) => setChangeStatus(e.target.checked)}
                    color="primary"
                  />
                }
                label="Update status after record creation"
                sx={{ display: 'block', mb: 2 }}
              />
              
              {changeStatus && (
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={5}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Status Field</InputLabel>
                      <Select
                        value="Status"
                        disabled
                        label="Status Field"
                      >
                        <MenuItem value="Status">Status</MenuItem>
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
                      <InputLabel>Status Value</InputLabel>
                      <Select
                        value={recordStatus}
                        onChange={(e) => setRecordStatus(e.target.value)}
                        label="Status Value"
                      >
                        {availableStatuses.map((status) => (
                          <MenuItem key={status} value={status}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
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

export default RecordGenerationConfigPageThree; 