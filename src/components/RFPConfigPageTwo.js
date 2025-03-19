import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper, 
  IconButton,
  Grid,
  Divider,
  Card,
  CardContent,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CodeIcon from '@mui/icons-material/Code';
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate } from 'react-router-dom';

// Sample RFP emails
const sampleEmails = [
  `From: procurement@globalenterprises.com
To: sales@company.com
Subject: RFP for Enterprise CRM Solution

To whom it may concern,

Global Enterprises is seeking proposals for an enterprise-wide CRM solution to streamline our sales and customer service operations. We would like to formally invite your company to participate in our RFP process.

Key requirements:
- Cloud-based solution with on-premise option
- Integration capabilities with our ERP system (SAP)
- Advanced analytics and reporting
- Mobile access for field sales team
- Customer service ticketing system

The full RFP document is attached. Please submit your proposal by July 15, 2023.

Questions can be directed to me via email.

Regards,
Michael Chen
Procurement Manager
Global Enterprises
Phone: (555) 234-5678`,

  `From: tenders@citygovernment.gov
To: bids@company.com
Subject: Request for Proposal: Municipal Website Redesign

Hello,

The City of Springfield is seeking proposals for a complete redesign of our municipal website to improve citizen engagement and service delivery.

Project scope includes:
- Responsive design for all devices
- ADA compliance
- Integration with payment systems
- Document management system
- Citizen service request portal
- Calendar and event management

Proposals must be submitted by August 30, 2023. A bidders conference will be held on July 25, 2023.

Please see attached for the complete RFP document with technical specifications.

Best regards,
Sarah Johnson
Director of IT Services
City of Springfield
sjohnson@citygovernment.gov`,

  `From: sourcing@healthcareinc.org
To: proposals@company.com
Subject: RFP: Healthcare Management Software System

Dear Vendor,

Healthcare Inc. is issuing this RFP to identify a qualified vendor to provide a comprehensive healthcare management software system for our network of 12 hospitals and 45 clinics.

Requirements overview:
- Electronic health record management
- Appointment scheduling
- Billing and insurance processing
- Pharmacy management
- Laboratory integration
- Telehealth capabilities
- HIPAA compliance

Important dates:
- RFP questions due: September 5, 2023
- Responses to questions: September 12, 2023
- Proposals due: October 3, 2023
- Vendor selection: November 15, 2023
- Project kickoff: January 2024

Please acknowledge receipt of this RFP and your intent to bid by August 25, 2023.

Sincerely,
Dr. Robert Williams
Chief Information Officer
Healthcare Inc.
rwilliams@healthcareinc.org
(555) 789-0123`
];

// Sample instructions for the RFP agent
const sampleInstructions = [
  'Acknowledge receipt of the RFP',
  'Confirm our interest in participating in the RFP process',
  'Include our company\'s relevant experience in similar projects',
  'Address specific requirements mentioned in the RFP',
  'Request any additional information needed',
  'Provide contact information for follow-up questions',
  'Mention availability for meetings or presentations',
  'Include estimated timeline for submitting the full proposal'
];

const RFPConfigPageTwo = ({ onBack, onComplete }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [configDataOne, setConfigDataOne] = useState(null);
  const [sampleEmail, setSampleEmail] = useState(sampleEmails[0]);
  const [instructions, setInstructions] = useState([
    'Acknowledge receipt of the RFP',
    'Confirm our interest in participating in the RFP process'
  ]);
  const [newInstruction, setNewInstruction] = useState('');
  
  useEffect(() => {
    // Load data from previous page
    const storedData = localStorage.getItem('rfpConfigOne');
    if (storedData) {
      setConfigDataOne(JSON.parse(storedData));
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleRefreshEmail = () => {
    const randomIndex = Math.floor(Math.random() * sampleEmails.length);
    setSampleEmail(sampleEmails[randomIndex]);
  };

  const handleAddInstruction = () => {
    if (newInstruction.trim()) {
      setInstructions([...instructions, newInstruction.trim()]);
      setNewInstruction('');
    }
  };

  const handleRemoveInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleSuggestInstruction = () => {
    // Find an instruction that's not already in the list
    const availableInstructions = sampleInstructions.filter(
      instr => !instructions.includes(instr)
    );
    
    if (availableInstructions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableInstructions.length);
      setInstructions([...instructions, availableInstructions[randomIndex]]);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/rfp/config-one');
    }
  };

  const handleComplete = () => {
    const completeConfig = {
      ...configDataOne,
      instructions,
      sampleEmail
    };
    
    if (onComplete) {
      onComplete(completeConfig);
    } else {
      // Store complete configuration
      localStorage.setItem('rfpConfig', JSON.stringify(completeConfig));
      navigate('/');
    }
  };

  // Generate a sample reply based on the email and instructions
  const getSampleReply = () => {
    // Extract info from the email
    const fromLine = sampleEmail.split('\n')[0] || '';
    const senderEmail = fromLine.match(/[\w.-]+@[\w.-]+\.\w+/) ? fromLine.match(/[\w.-]+@[\w.-]+\.\w+/)[0] : 'sender@example.com';
    
    // Try to extract sender name from signature
    const emailLines = sampleEmail.split('\n');
    let senderName = 'Sir/Madam';
    
    // Look for common signature patterns
    for (let i = 0; i < emailLines.length; i++) {
      if (emailLines[i].match(/Regards|Sincerely|Best|Thank/i) && i + 1 < emailLines.length) {
        senderName = emailLines[i + 1].trim();
        break;
      }
    }
    
    // Extract subject
    const subjectLine = sampleEmail.split('\n').find(line => line.startsWith('Subject:')) || '';
    const subject = subjectLine.replace('Subject:', '').trim();
    
    // Look for the RFP topic
    let rfpTopic = 'your RFP';
    if (subject.includes('RFP')) {
      rfpTopic = subject.replace('RFP:', '').replace('Request for Proposal:', '').replace('RFP for', '').trim();
    }
    
    // Generate reply
    return `
Dear ${senderName},

Thank you for reaching out to us regarding ${rfpTopic}. We are pleased to acknowledge receipt of your Request for Proposal.

${configDataOne && configDataOne.connectWithSalesRep ? 
  'I have included our senior sales representative in this communication to ensure your requirements receive proper attention.' : ''}

Our team at [Company Name] is very interested in participating in your RFP process. With over 10 years of experience providing solutions similar to your requirements, we are confident in our ability to meet your needs.

We have reviewed the initial requirements outlined in your email and believe our solution offers:
- Comprehensive functionality aligned with your stated needs
- Scalable architecture to support your organization
- Proven implementation methodology
- Dedicated support and maintenance

${instructions.includes('Request any additional information needed') ? 
  'Could you please provide any additional documentation regarding your technical environment and integration requirements to help us prepare the most accurate proposal?' : ''}

${instructions.includes('Provide contact information for follow-up questions') ? 
  'If you have any questions before the submission deadline, please contact me directly at john.doe@company.com or (555) 123-4567.' : ''}

${instructions.includes('Mention availability for meetings or presentations') ? 
  'Our team is available for any preliminary meetings or presentations you might require as part of the evaluation process.' : ''}

${instructions.includes('Include estimated timeline for submitting the full proposal') ? 
  'We anticipate submitting our complete proposal by the deadline specified in your RFP document.' : ''}

We look forward to the opportunity to work with your organization.

Best regards,
John Doe
Solutions Consultant
[Company Name]
john.doe@company.com
(555) 123-4567
    `;
  };

  // Generate system prompt preview
  const getSystemPromptPreview = () => {
    return `You are an RFP Response Assistant for [Company Name]. Your job is to create professional, engaging responses to Requests for Proposals (RFPs) that come in via email.

For this email, you should:
${instructions.map(instruction => `- ${instruction}`).join('\n')}

When responding to RFPs, follow these general guidelines:
1. Maintain a professional and enthusiastic tone
2. Highlight our company's relevant experience and strengths
3. Address specific requirements mentioned in the RFP
4. Be concise but comprehensive
5. Avoid making promises we cannot keep
6. Include appropriate contact information

${configDataOne && configDataOne.connectWithSalesRep ? 
  'Always include a note that you\'ve connected the sender with a sales representative for further discussion.' : 
  'Do not connect the sender with a sales representative unless specifically requested.'}

${configDataOne && configDataOne.replyMode === 'draft' ? 
  'Create a draft email that will be reviewed before sending.' : 
  'Create a response that can be sent immediately without further review.'}

Our company specializes in [industry-specific] solutions with particular strengths in:
- Enterprise software implementation
- Custom software development
- System integration
- Data migration and analytics
- Ongoing support and maintenance

Ensure your response is directly relevant to the specific RFP and addresses their unique requirements.`;
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
          RFP Agent Configuration
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Sample Email Section */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Sample RFP Email
              </Typography>
              <Button 
                startIcon={<RefreshIcon />} 
                onClick={handleRefreshEmail}
                variant="outlined"
              >
                Load Different Example
              </Button>
            </Box>
            
            <Card variant="outlined" sx={{ mb: 3, backgroundColor: '#f5f5f5' }}>
              <CardContent>
                <Typography 
                  variant="body2" 
                  component="pre" 
                  sx={{ 
                    whiteSpace: 'pre-wrap', 
                    fontFamily: 'monospace',
                    fontSize: '0.9rem'
                  }}
                >
                  {sampleEmail}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Instructions Section */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Agent Instructions
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Add specific instructions for how the RFP agent should respond
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <List>
                {instructions.map((instruction, index) => (
                  <ListItem 
                    key={index} 
                    sx={{ 
                      py: 1, 
                      px: 2, 
                      mb: 1, 
                      border: '1px solid', 
                      borderColor: 'divider', 
                      borderRadius: 1,
                      bgcolor: 'background.paper'
                    }}
                  >
                    <ListItemText primary={instruction} />
                    <ListItemSecondaryAction>
                      <IconButton 
                        edge="end" 
                        aria-label="delete" 
                        onClick={() => handleRemoveInstruction(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              
              <Box sx={{ display: 'flex', mt: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="New instruction"
                  value={newInstruction}
                  onChange={(e) => setNewInstruction(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleAddInstruction}
                  disabled={!newInstruction.trim()}
                  startIcon={<AddCircleIcon />}
                >
                  Add
                </Button>
              </Box>
              
              <Button 
                variant="outlined" 
                color="secondary"
                onClick={handleSuggestInstruction}
                sx={{ mt: 1 }}
              >
                Suggest Instruction
              </Button>
            </Box>
          </Grid>
          
          {/* Preview Section */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Response Preview
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Preview how the RFP agent will respond based on your settings
            </Typography>
            
            <Box sx={{ width: '100%', mb: 3 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  aria-label="preview tabs"
                >
                  <Tab 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DescriptionIcon fontSize="small" sx={{ mr: 1 }} />
                        <span>Response Preview</span>
                      </Box>
                    } 
                  />
                  <Tab 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CodeIcon fontSize="small" sx={{ mr: 1 }} />
                        <span>System Prompt</span>
                      </Box>
                    } 
                  />
                </Tabs>
              </Box>
              
              <Box sx={{ pt: 2 }}>
                <Card variant="outlined">
                  {activeTab === 0 ? (
                    <CardContent>
                      <Typography 
                        variant="body2" 
                        component="pre" 
                        sx={{ 
                          whiteSpace: 'pre-wrap', 
                          fontFamily: 'inherit'
                        }}
                      >
                        {getSampleReply()}
                      </Typography>
                    </CardContent>
                  ) : (
                    <CardContent>
                      <Typography 
                        variant="body2" 
                        component="pre" 
                        sx={{ 
                          whiteSpace: 'pre-wrap', 
                          fontFamily: 'monospace',
                          fontSize: '0.9rem',
                          bgcolor: '#f5f5f5',
                          p: 2,
                          borderRadius: 1
                        }}
                      >
                        {getSystemPromptPreview()}
                      </Typography>
                    </CardContent>
                  )}
                </Card>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button 
            variant="outlined" 
            color="primary"
            onClick={handleBack}
          >
            Back
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleComplete}
            size="large"
            disabled={instructions.length === 0}
          >
            Finish
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default RFPConfigPageTwo; 