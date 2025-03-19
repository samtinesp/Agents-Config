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
  List,
  ListItem,
  Divider,
  InputBase,
  Grid
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

// Sample assignment rules
const assignmentRules = [
  { id: 'rule1', name: 'Default Assignment Rule' },
  { id: 'rule2', name: 'Round Robin' },
  { id: 'rule3', name: 'Load Balancing' },
  { id: 'rule4', name: 'Territory Based Assignment' }
];

// Sample instructions
const sampleInstructions = [
  'Follow up with customers who have expressed concerns in their recent interactions',
  'Engage with customers who have mentioned our product on social media',
  'Reach out to customers who have had negative call experiences',
  'Connect with customers who have requested additional information',
  'Thank customers who have provided positive feedback'
];

const VOCTrackerConfigPageTwo = ({ onBack, onComplete }) => {
  const navigate = useNavigate();
  const [configDataOne, setConfigDataOne] = useState(null);
  const [ownershipOption, setOwnershipOption] = useState('carry');
  const [assignmentRule, setAssignmentRule] = useState('');
  const [instructions, setInstructions] = useState([sampleInstructions[0]]);
  const [newInstruction, setNewInstruction] = useState('');
  const [outreachPreview, setOutreachPreview] = useState('');
  const [promptPreview, setPromptPreview] = useState('');
  const [previewType, setPreviewType] = useState('output');

  useEffect(() => {
    // Load data from previous page
    const storedData = localStorage.getItem('vocTrackerConfigOne');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setConfigDataOne(parsedData);
      
      // Set some example content for the previews
      setOutreachPreview(
        "Hi [Customer Name],\n\nThank you for your recent feedback. We value your input and would like to address any concerns you may have regarding our services.\n\nCould we schedule a brief call to discuss your experience further?\n\nBest regards,\n[Agent Name]"
      );
      
      setPromptPreview(
        "Generate a personalized follow-up email for a customer who has expressed concerns about our product's performance. The email should acknowledge their specific issues, offer solutions, and invite them to discuss further. Use a professional but empathetic tone."
      );
    }
    
    // Default assignment rule
    if (assignmentRules.length > 0) {
      setAssignmentRule(assignmentRules[0].id);
    }
  }, []);

  const handleAddInstruction = () => {
    if (newInstruction.trim()) {
      setInstructions([...instructions, newInstruction]);
      setNewInstruction('');
    }
  };

  const handleRemoveInstruction = (index) => {
    const updatedInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(updatedInstructions);
  };

  const getRandomSampleInstruction = () => {
    const availableInstructions = sampleInstructions.filter(
      instruction => !instructions.includes(instruction)
    );
    if (availableInstructions.length === 0) return '';
    const randomIndex = Math.floor(Math.random() * availableInstructions.length);
    return availableInstructions[randomIndex];
  };

  const suggestInstruction = () => {
    const suggestion = getRandomSampleInstruction();
    if (suggestion) {
      setNewInstruction(suggestion);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/voc-tracker/config-one');
    }
  };

  const handleComplete = (e) => {
    if (e) e.preventDefault();
    
    const configData = {
      ownershipOption,
      assignmentRule: ownershipOption === 'rule' ? assignmentRule : '',
      instructions,
      outreachPreview,
      promptPreview
    };
    
    if (onComplete) {
      onComplete(configData);
    } else {
      // Store data in localStorage and mark as complete
      localStorage.setItem('vocTrackerConfigTwo', JSON.stringify(configData));
      localStorage.setItem('voc-tracker-configured', 'true');
      navigate('/');
    }
  };

  if (!configDataOne) {
    return <div>Loading...</div>;
  }

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
          VOC Tracker Configuration
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1} sx={{ p: 3 }}>
        <form onSubmit={handleComplete}>
          {/* Record Owner Configuration - Show if "Connect with Record Owner" is selected */}
          {configDataOne.functions.connectWithOwner && (
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" className="section-title" gutterBottom>
                  Sales Rep Configuration
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  Specify how sales rep ownership should be assigned
                </Typography>
                
                <FormControl component="fieldset" sx={{ mb: 3 }}>
                  <RadioGroup
                    value={ownershipOption}
                    onChange={(e) => setOwnershipOption(e.target.value)}
                  >
                    <FormControlLabel value="carry" control={<Radio />} label="Assign to sales rep" />
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
          )}
          
          {/* Outreach Configuration - Show if "Send Outreach" is selected */}
          {configDataOne.functions.sendOutreach && (
            <>
              {/* Instructions */}
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" className="section-title" gutterBottom>
                    Outreach Instructions
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    Add instructions to guide the outreach process
                  </Typography>
                  
                  <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="subtitle2" gutterBottom color="primary">
                      Current Instructions
                    </Typography>
                    {instructions.length > 0 ? (
                      instructions.map((instruction, index) => (
                        <Box 
                          key={index} 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            p: 1.5,
                            mb: 1,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                            border: '1px solid #e0e0e0'
                          }}
                        >
                          <Typography variant="body2">{instruction}</Typography>
                          <IconButton 
                            edge="end" 
                            size="small" 
                            onClick={() => handleRemoveInstruction(index)}
                            sx={{ ml: 1 }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        No instructions added yet. Add instructions below.
                      </Typography>
                    )}
                  </Box>
                  
                  <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }} color="primary">
                    Add New Instruction
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 1 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      placeholder="Type a new instruction here..."
                      value={newInstruction}
                      onChange={(e) => setNewInstruction(e.target.value)}
                      variant="outlined"
                      size="small"
                    />
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleAddInstruction}
                        disabled={!newInstruction.trim()}
                        startIcon={<AddIcon />}
                        sx={{ mb: 1 }}
                      >
                        Add
                      </Button>
                      <Button 
                        variant="outlined" 
                        color="primary"
                        onClick={suggestInstruction}
                        size="small"
                      >
                        Suggest
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              
              {/* Combined Preview Section */}
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <div>
                      <Typography variant="h6" className="section-title" gutterBottom>
                        Agent Configuration Preview
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Preview of the agent output and system prompt
                      </Typography>
                    </div>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        value={previewType}
                        onChange={(e) => setPreviewType(e.target.value)}
                      >
                        <FormControlLabel 
                          value="output" 
                          control={<Radio size="small" />} 
                          label="Agent Output" 
                        />
                        <FormControlLabel 
                          value="prompt" 
                          control={<Radio size="small" />} 
                          label="System Prompt" 
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  
                  {previewType === 'output' ? (
                    <Box sx={{ 
                      p: 3, 
                      bgcolor: '#f5f5f5', 
                      borderRadius: 1, 
                      border: '1px solid #e0e0e0',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      position: 'relative'
                    }}>
                      <Box sx={{
                        position: 'absolute',
                        top: -12,
                        left: 16,
                        bgcolor: '#f5f5f5',
                        px: 1,
                        borderRadius: 1
                      }}>
                        <Typography variant="caption" color="primary.main" fontWeight="medium">
                          Email Preview
                        </Typography>
                      </Box>
                      <Typography
                        component="pre"
                        sx={{ 
                          whiteSpace: 'pre-wrap',
                          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                          fontSize: '0.875rem',
                          lineHeight: 1.6
                        }}
                      >
                        {outreachPreview}
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ 
                      p: 3, 
                      bgcolor: '#f8f9fa', 
                      borderRadius: 1, 
                      border: '1px solid #e0e0e0',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      position: 'relative'
                    }}>
                      <Box sx={{
                        position: 'absolute',
                        top: -12,
                        left: 16,
                        bgcolor: '#f8f9fa',
                        px: 1,
                        borderRadius: 1
                      }}>
                        <Typography variant="caption" color="secondary.main" fontWeight="medium">
                          System Prompt
                        </Typography>
                      </Box>
                      <Typography
                        component="pre"
                        sx={{ 
                          whiteSpace: 'pre-wrap',
                          fontFamily: '"Roboto Mono", monospace',
                          fontSize: '0.875rem',
                          lineHeight: 1.6,
                          color: '#37474f'
                        }}
                      >
                        {promptPreview}
                      </Typography>
                    </Box>
                  )}
                  
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      color={previewType === 'output' ? 'primary' : 'secondary'}
                      onClick={() => {
                        if (previewType === 'output') {
                          setOutreachPreview(
                            "Hi [Customer Name],\n\nThank you for your recent feedback. We value your input and would like to address any concerns you may have regarding our services.\n\nCould we schedule a brief call to discuss your experience further?\n\nBest regards,\n[Agent Name]"
                          );
                        } else {
                          setPromptPreview(
                            "Generate a personalized follow-up email for a customer who has expressed concerns about our product's performance. The email should acknowledge their specific issues, offer solutions, and invite them to discuss further. Use a professional but empathetic tone."
                          );
                        }
                      }}
                    >
                      Reset to Default
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </>
          )}
          
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

export default VOCTrackerConfigPageTwo; 