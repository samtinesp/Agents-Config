import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper, 
  IconButton,
  Grid,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  Divider,
  InputBase
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

// Sample record data for each module
const sampleRecordData = {
  leads: {
    firstName: 'John',
    lastName: 'Smith',
    company: 'Acme Corporation',
    title: 'Marketing Director',
    email: 'john.smith@acme.com',
    phone: '(555) 123-4567',
    leadSource: 'Website',
    status: 'New'
  },
  contacts: {
    firstName: 'Sarah',
    lastName: 'Jones',
    accountName: 'Tech Innovate Inc.',
    title: 'Customer Success Manager',
    email: 'sarah.jones@techinnovate.com',
    phone: '(555) 987-6543',
    department: 'Customer Success'
  },
  accounts: {
    accountName: 'Global Systems Ltd.',
    industry: 'Technology',
    type: 'Customer',
    phone: '(555) 789-0123',
    website: 'www.globalsystems.com',
    employees: '250',
    annualRevenue: '$10M'
  },
  deals: {
    dealName: 'Enterprise Software Package',
    stage: 'Proposal',
    amount: '$75,000',
    expectedCloseDate: '2023-11-30',
    accountName: 'Global Systems Ltd.',
    contactName: 'Robert Johnson',
    probability: '70%'
  },
  quotes: {
    quoteName: 'Q-2023-001',
    stage: 'Draft',
    validUntil: '2023-12-15',
    total: '$12,500',
    accountName: 'Acme Corporation',
    contactName: 'John Smith'
  }
};

// Sample instructions
const sampleInstructions = [
  'Generate a detailed record based on the source record information',
  'Include all relevant details from the conversation history',
  'Ensure product specifications match client requirements mentioned in notes',
  'Include pricing information based on approved discount levels',
  'Keep the tone professional and concise'
];

const RecordGenerationConfigPageTwo = ({ onBack, onNext }) => {
  const navigate = useNavigate();
  const [configDataOne, setConfigDataOne] = useState(null);
  const [recordData, setRecordData] = useState({});
  const [instructions, setInstructions] = useState([sampleInstructions[0]]);
  const [newInstruction, setNewInstruction] = useState('');
  const [previewRecord, setPreviewRecord] = useState('');

  useEffect(() => {
    // Load data from previous page
    const storedData = localStorage.getItem('recordGenerationConfigOne');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setConfigDataOne(parsedData);
      
      // Set initial record data based on the selected "generate from module"
      if (parsedData.generateFromModule && sampleRecordData[parsedData.generateFromModule]) {
        setRecordData(sampleRecordData[parsedData.generateFromModule]);
      } else {
        // Default to leads if module not found
        setRecordData(sampleRecordData.leads);
      }
    }
  }, []);

  const handleRefreshRecord = () => {
    // In a real app, this would fetch new record data
    // For now, we'll just use the sample data
    if (configDataOne && configDataOne.generateFromModule && sampleRecordData[configDataOne.generateFromModule]) {
      setRecordData({...sampleRecordData[configDataOne.generateFromModule]});
    }
  };

  const handleGeneratePreview = () => {
    // In a real app, this would call an API to generate a preview
    // For now, we'll create a formatted sample based on available data
    const sourceModule = configDataOne ? configDataOne.generateFromModule : 'leads';
    const targetModule = configDataOne ? configDataOne.generateForModule : 'quotes';
    
    let previewContent = '';
    
    if (targetModule === 'quotes') {
      previewContent = `Quote Name: New Quote for ${recordData.company || recordData.accountName || 'Client'}\n`;
      previewContent += `Valid Until: ${new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]}\n`;
      previewContent += `Total: $10,000.00\n`;
      previewContent += `Status: Draft\n\n`;
      previewContent += `This quote is based on requirements discussed with ${recordData.firstName || ''} ${recordData.lastName || ''}`;
      if (configDataOne && configDataOne.includeConversation) {
        previewContent += ` during our recent conversations.\n`;
      } else {
        previewContent += `.\n`;
      }
      if (configDataOne && configDataOne.includeNotes) {
        previewContent += `\nNotes included in the record creation process suggest customized pricing for their specific needs.`;
      }
    } else if (targetModule === 'deals') {
      previewContent = `Deal Name: New Deal with ${recordData.company || recordData.accountName || 'Client'}\n`;
      previewContent += `Stage: Qualification\n`;
      previewContent += `Amount: $15,000.00\n`;
      previewContent += `Expected Close Date: ${new Date(Date.now() + 45*24*60*60*1000).toISOString().split('T')[0]}\n`;
      previewContent += `Probability: 40%\n\n`;
      previewContent += `This deal was created based on interaction with ${recordData.firstName || ''} ${recordData.lastName || ''}`;
      if (configDataOne && configDataOne.includeConversation) {
        previewContent += ` and includes information from conversation history.\n`;
      } else {
        previewContent += `.\n`;
      }
      if (configDataOne && configDataOne.includeNotes) {
        previewContent += `\nNotes suggest this client is also interested in our premium services.`;
      }
    } else {
      previewContent = `New ${targetModule.charAt(0).toUpperCase() + targetModule.slice(1)} Record\n\n`;
      previewContent += `Created from ${sourceModule} data of ${recordData.firstName || ''} ${recordData.lastName || ''} ${recordData.company || recordData.accountName || ''}\n\n`;
      previewContent += `This is a preview of the generated record including key information`;
      if (configDataOne) {
        if (configDataOne.includeConversation) previewContent += ` and conversation history`;
        if (configDataOne.includeNotes) previewContent += ` and notes`;
      }
      previewContent += `.`;
    }
    
    setPreviewRecord(previewContent);
  };

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

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/record-generation/config-one');
    }
  };

  const handleNext = () => {
    const configData = {
      recordData,
      instructions,
      previewRecord
    };
    
    if (onNext) {
      onNext(configData);
    } else {
      // Store data in localStorage for the next page
      localStorage.setItem('recordGenerationConfigTwo', JSON.stringify(configData));
      navigate('/record-generation/config-three');
    }
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
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          {/* Source Record Data */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" className="section-title" gutterBottom>
                Source Record Details
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Record data from {configDataOne?.generateFromModule || 'source module'}
              </Typography>
              
              <Box sx={{ position: 'relative', mb: 2 }}>
                <Grid container spacing={2}>
                  {recordData && Object.entries(recordData).map(([key, value]) => (
                    <Grid item xs={12} sm={6} md={4} key={key}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" color="textSecondary" component="div">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </Typography>
                        <Typography variant="body1">
                          {value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
                
                <IconButton 
                  onClick={handleRefreshRecord} 
                  color="primary"
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                  size="small"
                >
                  <RefreshIcon />
                </IconButton>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleGeneratePreview}
                >
                  Generate
                </Button>
              </Box>
            </CardContent>
          </Card>
          
          {/* Instructions */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" className="section-title" gutterBottom>
                Generation Instructions
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Add instructions to guide the record generation process
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
              
              <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom color="primary">
                  Tips for Effective Instructions
                </Typography>
                <Typography variant="body2">
                  • Be specific about what data should be included in the generated record<br />
                  • Specify any formatting preferences for fields like name, dates, or currency values<br />
                  • Include instructions for handling missing data from the source record<br />
                  • Mention any business rules that should be applied during record generation
                </Typography>
              </Box>
            </CardContent>
          </Card>
          
          {/* Preview */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" className="section-title" gutterBottom>
                Record Preview
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Preview of the record that will be generated
              </Typography>
              
              <Box 
                sx={{ 
                  bgcolor: 'background.paper',
                  p: 2,
                  borderRadius: 1,
                  minHeight: '150px',
                  whiteSpace: 'pre-line'
                }}
              >
                {previewRecord ? (
                  <Typography variant="body2">{previewRecord}</Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    Click the Generate button above to see a preview of the generated record
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
          
          <Box className="navigation-buttons" sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button 
              variant="contained" 
              color="primary"
              type="submit"
              size="large"
              disabled={!previewRecord}
            >
              Next
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default RecordGenerationConfigPageTwo; 