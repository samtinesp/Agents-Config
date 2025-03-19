import React, { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  Button,
  Box,
  Divider,
  TextField,
  Tabs,
  Tab,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

// TabPanel component for displaying tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AcquisitionConfigPageTwo = ({ configData, onBack, onComplete }) => {
  const navigate = useNavigate();
  const [localConfig, setLocalConfig] = useState({
    instructions: configData.instructions || '',
  });
  const [tabValue, setTabValue] = useState(0);
  const [generatedOutput, setGeneratedOutput] = useState({
    agentOutput: '',
    systemPrompt: ''
  });

  // Generate example output whenever instructions change
  useEffect(() => {
    // In a real application, this would call a real API
    generateExampleOutput(localConfig.instructions);
  }, [localConfig.instructions]);

  // This simulates an API call to generate outputs
  const generateExampleOutput = (instructions) => {
    // This is just placeholder text - in a real application, this would be generated by an AI
    let output = '';
    let prompt = '';
    
    // Generate different example output based on selected features
    const hasContentPersonalization = configData.features?.includes('content-personalization');
    const hasMarketAnalysis = configData.features?.includes('market-analysis');
    const module = configData.module || '';
    
    // Sample output for acquisition agent
    output = `Hello Sarah,

I noticed from our research that your company, TechInnovate, has been experiencing rapid growth in the enterprise software sector - congratulations on your recent expansion to the European market!

Based on your role as CTO and your recent LinkedIn posts about AI integration challenges, I believe our Enterprise AI Platform would align perfectly with your scaling needs. The platform offers seamless integration with your existing tech stack (specifically your PostgreSQL databases and Node.js architecture that I noticed from your tech blog).

What particularly stands out is how our solution has helped similar companies in your industry reduce integration time by 60% while improving data processing efficiency.

Would you be open to a brief 15-minute call this week to discuss how our platform could specifically address the scaling challenges you mentioned in your recent industry panel? I'm happy to share some case studies from companies with similar architecture beforehand.

Best regards,
Acquisition Agent`;

    // System prompt example
    prompt = `You are an Acquisition Agent specializing in identifying and reaching out to potential new customers. Your goal is to create personalized outreach that demonstrates understanding of the prospect's business and presents a compelling value proposition.

Module: ${module}
Features: ${hasContentPersonalization ? 'Content Personalization, ' : ''}${hasMarketAnalysis ? 'Market Analysis' : ''}

When crafting your response:
- Begin with a personalized introduction that shows you've done research
- Reference specific details about their company, role, or recent activities
- Highlight how your product/service solves a specific problem they're likely facing
- Include relevant data points or success stories from similar companies
- End with a clear, low-friction call to action

Instructions: ${instructions || '[No specific instructions provided]'}

Keep the tone professional but conversational. Focus on value rather than features.`;
    
    setGeneratedOutput({
      agentOutput: output,
      systemPrompt: prompt
    });
  };

  const handleInstructionsChange = (e) => {
    setLocalConfig({
      ...localConfig,
      instructions: e.target.value
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete({
      ...configData,
      ...localConfig
    });
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
          Acquisition Agent: Instructions
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1}>
        <form onSubmit={handleSubmit}>
          {/* Instructions Input */}
          <Typography variant="h6" className="section-title">
            Agent Instructions
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Provide specific instructions for the agent when reaching out to potential customers
          </Typography>
          <TextField
            fullWidth
            label="Instructions"
            multiline
            rows={5}
            value={localConfig.instructions}
            onChange={handleInstructionsChange}
            placeholder="Enter specific instructions for the agent to follow when creating outreach messages for new prospects..."
            margin="normal"
            sx={{ mb: 3 }}
          />

          <Divider sx={{ my: 3 }} />
          
          {/* Output Preview */}
          <Typography variant="h6" className="section-title">
            Preview
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            See how the agent will create outreach messages for potential customers
          </Typography>
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="preview tabs">
              <Tab label="Agent Output" />
              <Tab label="System Prompt" />
            </Tabs>
          </Box>
          
          <TabPanel value={tabValue} index={0}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-line' }}>
                  {generatedOutput.agentOutput}
                </Typography>
              </CardContent>
            </Card>
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="body2" component="div" sx={{ whiteSpace: 'pre-line', fontFamily: 'monospace' }}>
                  {generatedOutput.systemPrompt}
                </Typography>
              </CardContent>
            </Card>
          </TabPanel>

          <Box className="navigation-buttons" sx={{ mt: 4 }}>
            <Button 
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => onBack()}
            >
              Back
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              size="large"
            >
              Finish
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default AcquisitionConfigPageTwo; 