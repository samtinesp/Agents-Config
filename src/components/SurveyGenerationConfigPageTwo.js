import React, { useState } from 'react';
import { 
  Typography, 
  Paper, 
  Button, 
  Box, 
  TextField, 
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Tab,
  Tabs,
  IconButton,
  ListItemSecondaryAction
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const SurveyGenerationConfigPageTwo = ({ configData, onNext, onBack }) => {
  const navigate = useNavigate();
  const [localConfig, setLocalConfig] = useState({
    instructions: configData.instructions || ['Focus on gathering feedback about product usability', 'Keep questions concise and relevant'],
    ...configData
  });
  
  const [activePreviewTab, setActivePreviewTab] = useState(0);
  const [newInstruction, setNewInstruction] = useState('');
  
  const handleTabChange = (event, newValue) => {
    setActivePreviewTab(newValue);
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...localConfig.instructions];
    updatedInstructions[index] = value;
    setLocalConfig({
      ...localConfig,
      instructions: updatedInstructions
    });
  };

  const handleAddInstruction = () => {
    if (newInstruction.trim() !== '') {
      setLocalConfig({
        ...localConfig,
        instructions: [...localConfig.instructions, newInstruction]
      });
      setNewInstruction('');
    }
  };

  const handleRemoveInstruction = (index) => {
    const updatedInstructions = [...localConfig.instructions];
    updatedInstructions.splice(index, 1);
    setLocalConfig({
      ...localConfig,
      instructions: updatedInstructions
    });
  };

  const handleNewInstructionChange = (e) => {
    setNewInstruction(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(localConfig);
  };

  // Get survey type label for display
  const getSurveyTypeLabel = (value) => {
    const surveyTypes = {
      'customer-satisfaction': 'Customer Satisfaction (CSAT)',
      'nps': 'Net Promoter Score (NPS)',
      'brand-tracking': 'Brand Tracking',
      'price-optimization': 'Price Optimization',
      'product-feedback': 'Product Feedback',
      'market-research': 'Market Research'
    };
    return surveyTypes[value] || value;
  };
  
  // Sample survey preview based on selected type
  const getSurveyPreview = () => {
    switch(localConfig.surveyType) {
      case 'nps':
        return `# Net Promoter Score Survey

Dear [Customer Name],

We value your feedback and would appreciate if you could answer the following questions to help us improve our services.

## Overall Satisfaction

1. On a scale of 0-10, how likely are you to recommend our [Product/Service] to a friend or colleague?
   [0] [1] [2] [3] [4] [5] [6] [7] [8] [9] [10]
   Not at all likely                     Extremely likely

2. What is the primary reason for your score?
   [Text field]

3. What could we do to improve your experience?
   [Text field]

Thank you for taking the time to complete this survey. Your feedback is invaluable to us.`;

      case 'customer-satisfaction':
        return `# Customer Satisfaction Survey

Dear [Customer Name],

We'd love to hear about your recent experience with our [Product/Service]. Please take a moment to complete this short survey.

## Your Recent Experience

1. How satisfied were you with your recent experience?
   □ Very Satisfied
   □ Satisfied
   □ Neutral
   □ Dissatisfied
   □ Very Dissatisfied

2. Did our [Product/Service] meet your expectations?
   □ Exceeded expectations
   □ Met expectations
   □ Somewhat met expectations
   □ Did not meet expectations

3. How easy was it to use our [Product/Service]?
   □ Very easy
   □ Easy
   □ Neutral
   □ Difficult
   □ Very difficult

4. Is there anything specific you'd like us to improve?
   [Text field]

Thank you for your valuable feedback!`;

      case 'price-optimization':
        return `# Price Optimization Survey

Dear [Customer Name],

We're evaluating our pricing structure and would value your input.

## Value & Pricing

1. How would you rate the value you receive from our [Product/Service] relative to its price?
   □ Excellent value
   □ Good value
   □ Fair value
   □ Poor value

2. If our [Product/Service] were priced at [Price +10%], how likely would you be to purchase?
   □ Very likely
   □ Likely
   □ Neutral
   □ Unlikely
   □ Very unlikely

3. Which of these pricing models would you prefer for our [Product/Service]?
   □ Monthly subscription
   □ Annual subscription (10% discount)
   □ Pay-per-use
   □ Tiered pricing based on features

4. What price would you consider to be a good value for our [Product/Service]?
   [Text field]

Thank you for helping us better understand your pricing preferences.`;

      default:
        return `# ${getSurveyTypeLabel(localConfig.surveyType) || 'Custom'} Survey

Dear [Customer Name],

We appreciate your willingness to provide feedback on our [Product/Service].

## Your Feedback

1. [First question based on survey type]
   □ Option 1
   □ Option 2
   □ Option 3
   □ Option 4

2. [Second question based on survey type]
   □ Option 1
   □ Option 2
   □ Option 3
   □ Option 4

3. [Open-ended question]
   [Text field]

Thank you for taking the time to complete this survey.`;
    }
  };

  // System prompt preview
  const systemPromptPreview = `You are a Survey Generation Assistant designed to create effective surveys for ${getSurveyTypeLabel(localConfig.surveyType) || 'customer feedback'}.

Survey Scope: ${localConfig.surveyScope === 'individual' ? 'Individual survey tailored to a specific customer' : 'Mass survey to be distributed to multiple customers'}

${localConfig.surveyScope === 'mass' && localConfig.criteria.length > 0 ? `Target Criteria: 
${localConfig.criteria.map(c => c.field && c.operator && c.value ? `- ${c.field} ${c.operator} ${c.value}` : '').filter(Boolean).join('\n')}` : ''}

Instructions:
${localConfig.instructions.map(instruction => `- ${instruction}`).join('\n')}

Your task is to create a concise, well-structured survey that collects actionable feedback while respecting the respondent's time. Include a mix of quantitative questions (scales, multiple choice) and qualitative questions (open-ended) as appropriate.`;
  
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
          Survey Generation Agent: Survey Design
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1}>
        <form onSubmit={handleSubmit}>
          {/* Instructions Section */}
          <Typography variant="h6" gutterBottom>
            Survey Generation Instructions
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Provide specific instructions on how to generate the survey
          </Typography>
          
          {/* Multiple Instructions */}
          <List sx={{ width: '100%', mb: 2 }}>
            {localConfig.instructions.map((instruction, index) => (
              <ListItem 
                key={index}
                sx={{ 
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  mb: 1,
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <TextField
                  fullWidth
                  value={instruction}
                  onChange={(e) => handleInstructionChange(index, e.target.value)}
                  variant="standard"
                  placeholder="Enter instruction..."
                  InputProps={{ disableUnderline: true }}
                  sx={{ px: 1 }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleRemoveInstruction(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          
          <Box sx={{ display: 'flex', mb: 3 }}>
            <TextField
              fullWidth
              value={newInstruction}
              onChange={handleNewInstructionChange}
              variant="outlined"
              placeholder="Add a new instruction..."
              size="small"
              sx={{ mr: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddInstruction}
              startIcon={<AddIcon />}
              disabled={!newInstruction.trim()}
            >
              Add
            </Button>
          </Box>
          
          <Divider sx={{ my: 3 }} />

          {/* Survey Preview Section */}
          <Typography variant="h6" gutterBottom>
            Survey Preview
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Preview the generated survey based on your configuration
          </Typography>
          
          <Box sx={{ width: '100%', mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activePreviewTab} onChange={handleTabChange} aria-label="agent preview tabs">
                <Tab label="Survey Sample" />
                <Tab label="System Prompt" />
              </Tabs>
            </Box>
            
            <Box sx={{ position: 'relative' }}>
              {activePreviewTab === 0 && (
                <Card variant="outlined" sx={{ mt: 2, bgcolor: '#fafafa' }}>
                  <CardContent>
                    <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                      <Button 
                        size="small" 
                        startIcon={<RefreshIcon />}
                        onClick={() => {}} // This is just a mock button
                      >
                        Reload
                      </Button>
                    </Box>
                    <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', mt: 2 }}>
                      {getSurveyPreview()}
                    </Typography>
                  </CardContent>
                </Card>
              )}
              
              {activePreviewTab === 1 && (
                <Card variant="outlined" sx={{ mt: 2, bgcolor: '#f5f5f5' }}>
                  <CardContent>
                    <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                      {systemPromptPreview}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={onBack}
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

export default SurveyGenerationConfigPageTwo; 