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
  Divider,
  Card,
  CardContent,
  Chip,
  List,
  ListItem
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

// Sample emails that can be loaded
const sampleEmails = [
  `From: john.smith@acme.com
To: support@company.com
Subject: Inquiry about your services

Hello,

I came across your company while researching solutions for our business needs. 
I'd like to learn more about your services and pricing options.

We are a mid-sized manufacturing company with approximately 150 employees. 
Our primary challenge is optimizing our inventory management process.

Could someone from your sales team contact me to discuss how your solutions might help us?

Best regards,
John Smith
Marketing Director
Acme Corporation
Phone: (555) 123-4567`,

  `From: sarah.jones@techinnovate.com
To: info@company.com
Subject: Request for Product Demo

Hi there,

We're currently evaluating different software solutions for our customer service department.
I'd like to schedule a demo of your platform at your earliest convenience.

Our team has 25 agents handling approximately 500 tickets daily.
We're particularly interested in your AI-powered routing capabilities.

Please let me know what times are available next week for a demo.

Thank you,
Sarah Jones
Head of Customer Experience
Tech Innovate Inc.
Phone: (555) 987-6543`,

  `From: procurement@globalenterprises.com
To: sales@company.com
Subject: RFP for Enterprise Solution

To whom it may concern,

Global Enterprises is seeking proposals for an enterprise-wide CRM solution.
We would like to formally invite your company to participate in our RFP process.

The attached document outlines our requirements and timeline.
Please submit your proposal by the end of the month.

Questions can be directed to me via email.

Regards,
Michael Chen
Procurement Manager
Global Enterprises
Phone: (555) 234-5678`
];

// Sample module fields that can be added
const moduleFields = {
  leads: [
    'First Name', 'Last Name', 'Title', 'Company', 'Email', 'Phone', 'Mobile', 
    'Address', 'City', 'State', 'Zip Code', 'Country', 'Industry', 'Lead Source'
  ],
  contacts: [
    'First Name', 'Last Name', 'Account Name', 'Email', 'Phone', 'Mobile', 
    'Title', 'Department', 'Reports To', 'Mailing Address', 'Other Address'
  ],
  accounts: [
    'Account Name', 'Account Number', 'Account Site', 'Type', 'Industry', 
    'Annual Revenue', 'Employees', 'Phone', 'Website', 'Billing Address', 'Shipping Address'
  ],
  opportunities: [
    'Opportunity Name', 'Account Name', 'Close Date', 'Stage', 'Amount', 
    'Probability', 'Type', 'Lead Source', 'Description', 'Next Step'
  ]
};

// Sample values for fields
const sampleValues = {
  'First Name': 'John',
  'Last Name': 'Smith',
  'Title': 'Marketing Director',
  'Company': 'Acme Corporation',
  'Email': 'john.smith@acme.com',
  'Phone': '(555) 123-4567',
  'Mobile': '(555) 987-6543',
  'Address': '123 Main St',
  'City': 'San Francisco',
  'State': 'CA',
  'Zip Code': '94105',
  'Country': 'USA',
  'Industry': 'Manufacturing',
  'Lead Source': 'Web',
  'Account Name': 'Acme Corporation',
  'Account Number': 'ACC-12345',
  'Type': 'Customer',
  'Annual Revenue': '$5,000,000',
  'Employees': '150',
  'Website': 'www.acme.com',
  'Opportunity Name': 'Acme Q2 Deal',
  'Close Date': '2023-09-30',
  'Stage': 'Proposal',
  'Amount': '$25,000',
  'Probability': '70%',
  'Description': 'Enterprise solution for Acme Corp',
  'Next Step': 'Schedule demo'
};

// Sample instructions for the parser
const sampleInstructions = [
  'Extract the sender\'s name and email from the "From" line',
  'Look for contact information in the signature area',
  'Identify the company name within the email',
  'Extract any phone numbers mentioned in the email',
  'Identify the purpose of the email (inquiry, demo request, etc.)',
  'Look for specific product mentions',
  'Extract any dates mentioned for meetings or deadlines'
];

const EmailParserConfigPageTwo = ({ onBack, onNext }) => {
  const navigate = useNavigate();
  const [configDataOne, setConfigDataOne] = useState(null);
  const [sampleEmail, setSampleEmail] = useState(sampleEmails[0]);
  const [instructions, setInstructions] = useState([sampleInstructions[0]]);
  const [newInstruction, setNewInstruction] = useState('');
  const [fields, setFields] = useState([]);
  const [availableFields, setAvailableFields] = useState([]);
  const [newField, setNewField] = useState('');
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    // Load data from previous page
    const storedData = localStorage.getItem('emailParserConfigOne');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setConfigDataOne(parsedData);
      
      // Set available fields based on module preference
      if (parsedData.modulePreference && !parsedData.withoutModuleAssociation && moduleFields[parsedData.modulePreference]) {
        setAvailableFields(moduleFields[parsedData.modulePreference]);
        
        // Initialize with sample fields and values
        const initialFields = moduleFields[parsedData.modulePreference].slice(0, 5).map(field => ({
          label: field,
          value: sampleValues[field] || `Sample ${field}`
        }));
        setFields(initialFields);
      } else {
        // For no module, initialize with generic fields
        setFields([
          { label: 'Name', value: 'John Smith' },
          { label: 'Email', value: 'john.smith@acme.com' },
          { label: 'Company', value: 'Acme Corporation' },
          { label: 'Position', value: 'Marketing Director' },
          { label: 'Phone', value: '(555) 123-4567' }
        ]);
      }
    }
  }, []);

  const handleRefreshEmail = () => {
    const randomIndex = Math.floor(Math.random() * sampleEmails.length);
    setSampleEmail(sampleEmails[randomIndex]);
  };

  const handleParse = () => {
    // Simulate parsing by populating fields with some values from the email
    const emailLines = sampleEmail.split('\n');
    const parsedFields = [...fields];
    
    // Simple parsing logic - extract email and possible name
    const fromLine = emailLines.find(line => line.startsWith('From:')) || '';
    const toLine = emailLines.find(line => line.startsWith('To:')) || '';
    const subjectLine = emailLines.find(line => line.startsWith('Subject:')) || '';
    
    const emailMatch = fromLine.match(/[\w.-]+@[\w.-]+\.\w+/);
    const toEmailMatch = toLine.match(/[\w.-]+@[\w.-]+\.\w+/);
    const subjectMatch = subjectLine.replace('Subject:', '').trim();
    
    const nameMatch = sampleEmail.match(/Best regards,\s*([^\n]+)/i) || 
                     sampleEmail.match(/Thank you,\s*([^\n]+)/i) ||
                     sampleEmail.match(/Regards,\s*([^\n]+)/i);
    
    // Extract any title/position information
    const titleMatch = sampleEmail.match(/([A-Za-z\s]+Director|Manager|CEO|CTO|President|Head of [A-Za-z\s]+)/i);
    
    // Extract company information
    const companyMatch = sampleEmail.match(/([A-Za-z\s]+Corporation|Inc\.|Company|Technologies|Solutions|Enterprises)/i);
    
    // Extract phone number
    const phoneMatch = sampleEmail.match(/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
    
    // Update existing fields with parsed values
    parsedFields.forEach((field, index) => {
      if (field.label.toLowerCase().includes('email') && emailMatch) {
        parsedFields[index] = { ...field, value: emailMatch[0] };
      } else if ((field.label.includes('Name') || field.label === 'Name') && nameMatch) {
        parsedFields[index] = { ...field, value: nameMatch[1].trim() };
      } else if (field.label === 'Company' || field.label.includes('Company')) {
        const companyValue = companyMatch ? companyMatch[0].trim() : 'Acme Corporation';
        parsedFields[index] = { ...field, value: companyValue };
      } else if (field.label.includes('Phone') && phoneMatch) {
        parsedFields[index] = { ...field, value: phoneMatch[0] };
      } else if ((field.label.includes('Title') || field.label.includes('Position')) && titleMatch) {
        parsedFields[index] = { ...field, value: titleMatch[0].trim() };
      } else if (field.label.includes('Subject')) {
        parsedFields[index] = { ...field, value: subjectMatch };
      }
    });
    
    // Create a list of field labels that already exist
    const existingLabels = parsedFields.map(field => field.label);
    
    // Add new fields based on what we've extracted if they don't already exist
    const newFieldsToAdd = [];
    
    // Add sender email if not already included
    if (emailMatch && !existingLabels.some(label => label.toLowerCase().includes('email') && !label.toLowerCase().includes('recipient'))) {
      newFieldsToAdd.push({ label: 'Sender Email', value: emailMatch[0] });
    }
    
    // Add recipient email if not already included
    if (toEmailMatch && !existingLabels.some(label => label.toLowerCase().includes('recipient'))) {
      newFieldsToAdd.push({ label: 'Recipient Email', value: toEmailMatch[0] });
    }
    
    // Add name if not already included
    if (nameMatch && !existingLabels.some(label => label.includes('Name'))) {
      newFieldsToAdd.push({ label: 'Name', value: nameMatch[1].trim() });
    }
    
    // Add company if not already included
    if (companyMatch && !existingLabels.some(label => label.includes('Company'))) {
      newFieldsToAdd.push({ label: 'Company', value: companyMatch[0].trim() });
    }
    
    // Add title/position if not already included
    if (titleMatch && !existingLabels.some(label => label.includes('Title') || label.includes('Position'))) {
      newFieldsToAdd.push({ label: 'Position', value: titleMatch[0].trim() });
    }
    
    // Add phone if not already included
    if (phoneMatch && !existingLabels.some(label => label.includes('Phone'))) {
      newFieldsToAdd.push({ label: 'Phone', value: phoneMatch[0] });
    }
    
    // Add subject if not already included
    if (subjectMatch && !existingLabels.some(label => label.includes('Subject'))) {
      newFieldsToAdd.push({ label: 'Subject', value: subjectMatch });
    }
    
    // Merge the existing fields (with updated values) and the new fields
    setFields([...parsedFields, ...newFieldsToAdd]);
  };

  const handleAddField = () => {
    let fieldToAdd = '';
    let valueToAdd = '';
    
    if (configDataOne && configDataOne.modulePreference && !configDataOne.withoutModuleAssociation) {
      // For module-based parsing, add from dropdown
      if (newField) {
        fieldToAdd = newField;
        valueToAdd = sampleValues[newField] || `Sample ${newField}`;
      }
    } else {
      // For custom parsing, use the text input
      fieldToAdd = newField;
      valueToAdd = newValue || 'Sample value';
    }
    
    if (fieldToAdd) {
      setFields([...fields, { label: fieldToAdd, value: valueToAdd }]);
      setNewField('');
      setNewValue('');
    }
  };

  const handleRemoveField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const handleFieldValueChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], value };
    setFields(updatedFields);
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
      navigate('/email-parser/config-one');
    }
  };

  const handleNext = () => {
    const configData = {
      sampleEmail,
      instructions,
      fields
    };
    
    if (onNext) {
      onNext(configData);
    } else {
      // Store data in localStorage for the next page
      localStorage.setItem('emailParserConfigTwo', JSON.stringify(configData));
      
      // Only proceed to page three if module is chosen
      if (configDataOne && configDataOne.modulePreference && !configDataOne.withoutModuleAssociation) {
        navigate('/email-parser/config-three');
      } else {
        // If no module, just complete the process
        localStorage.setItem('emailParserConfigComplete', 'true');
        navigate('/');
      }
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
          Email Parsing Configuration
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1} sx={{ p: 3 }}>
        <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
          {/* Sample Email */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" className="section-title" gutterBottom>
                Sample Email
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Preview a sample email or paste your own email content
              </Typography>
              
              <Box sx={{ position: 'relative', mb: 2 }}>
                <TextField
                  multiline
                  rows={10}
                  fullWidth
                  value={sampleEmail}
                  onChange={(e) => setSampleEmail(e.target.value)}
                  variant="outlined"
                  placeholder="Email content..."
                />
                
                <IconButton 
                  onClick={handleRefreshEmail} 
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
                  onClick={handleParse}
                >
                  Parse
                </Button>
              </Box>
            </CardContent>
          </Card>
          
          {/* Parser Instructions */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <div>
                  <Typography variant="h6" className="section-title" gutterBottom>
                    Parser Instructions
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Provide instructions for how the parser should extract information from emails
                  </Typography>
                </div>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={suggestInstruction}
                  color="secondary"
                  size="small"
                >
                  Suggest
                </Button>
              </Box>
              
              {/* Existing Instructions */}
              <List sx={{ mb: 2 }}>
                {instructions.map((instruction, index) => (
                  <ListItem 
                    key={index}
                    sx={{ 
                      p: 1, 
                      mb: 1, 
                      border: '1px solid', 
                      borderColor: 'divider',
                      borderRadius: 1,
                      backgroundColor: 'background.paper'
                    }}
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        aria-label="delete" 
                        onClick={() => handleRemoveInstruction(index)}
                        disabled={instructions.length === 1}
                        size="small"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <Typography variant="body2">
                      {instruction}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              
              {/* Add New Instruction */}
              <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 2, mb: 3 }}>
                <TextField
                  label="New Instruction"
                  fullWidth
                  value={newInstruction}
                  onChange={(e) => setNewInstruction(e.target.value)}
                  variant="outlined"
                  size="small"
                  placeholder="e.g., 'Extract contact information from the signature'"
                  sx={{ mr: 1, flex: 1 }}
                />
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleAddInstruction}
                  disabled={!newInstruction.trim()}
                  startIcon={<AddIcon />}
                  sx={{ height: 40 }}
                >
                  Add
                </Button>
              </Box>
            </CardContent>
          </Card>
          
          {/* Field Mapping */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <div>
                  <Typography variant="h6" className="section-title" gutterBottom>
                    {configDataOne && configDataOne.modulePreference && !configDataOne.withoutModuleAssociation
                      ? `${configDataOne.modulePreference.charAt(0).toUpperCase() + configDataOne.modulePreference.slice(1)} Fields`
                      : 'Field Mapping'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Map email content to fields
                  </Typography>
                </div>
              </Box>
              
              {/* Field Mapping Results */}
              {fields.map((field, index) => (
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
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label={field.label} 
                          color="primary" 
                          variant="outlined" 
                          sx={{ marginRight: 1, fontWeight: 'medium' }}
                        />
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={7}>
                      <TextField
                        label="Value"
                        fullWidth
                        value={field.value}
                        onChange={(e) => handleFieldValueChange(index, e.target.value)}
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <IconButton 
                        color="error" 
                        onClick={() => handleRemoveField(index)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              
              {/* Add New Field */}
              <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 3 }}>
                {configDataOne && configDataOne.modulePreference && !configDataOne.withoutModuleAssociation ? (
                  <FormControl variant="outlined" size="small" sx={{ mr: 1, flex: 1 }}>
                    <InputLabel>Add Field</InputLabel>
                    <Select
                      value={newField}
                      onChange={(e) => setNewField(e.target.value)}
                      label="Add Field"
                    >
                      <MenuItem value="">
                        <em>Select a field</em>
                      </MenuItem>
                      {availableFields.map((field) => (
                        <MenuItem 
                          key={field} 
                          value={field}
                          disabled={fields.some(f => f.label === field)}
                        >
                          {field}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    label="New Field Label"
                    value={newField}
                    onChange={(e) => setNewField(e.target.value)}
                    variant="outlined"
                    size="small"
                    sx={{ mr: 1, flex: 1 }}
                  />
                )}
                <TextField
                  label="Initial Value"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{ mr: 1, flex: 1 }}
                />
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleAddField}
                  disabled={!newField}
                  startIcon={<AddIcon />}
                  sx={{ height: 40 }}
                >
                  Add
                </Button>
              </Box>
            </CardContent>
          </Card>
          
          <Box className="navigation-buttons" sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button 
              variant="contained" 
              color="primary"
              type="submit"
              size="large"
            >
              {configDataOne && configDataOne.modulePreference && !configDataOne.withoutModuleAssociation 
                ? 'Next' 
                : 'Complete'}
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default EmailParserConfigPageTwo; 