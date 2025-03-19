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
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
  Tab,
  Tabs,
  IconButton,
  Tooltip
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SpeedIcon from '@mui/icons-material/Speed';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const CrossSellConfigPageTwo = ({ configData, onNext, onBack }) => {
  const [localConfig, setLocalConfig] = useState({
    instructions: configData.instructions || ['Identify customers who have shown interest in complementary products', 'Focus on high-value customers with recent purchases'],
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

  // Function to format options for display
  const getFrequencyLabel = (value) => {
    const frequencyOptions = {
      'daily': 'Daily',
      'weekly': 'Weekly',
      'biweekly': 'Bi-weekly',
      'monthly': 'Monthly',
      'quarterly': 'Quarterly'
    };
    return frequencyOptions[value] || value;
  };
  
  // Sample agent preview text - updated to focus on email outreach
  const agentPreviewText = `Subject: Enhance Your Experience with Our Premium Add-Ons

Dear John,

I hope this email finds you well. As a valued customer of ABC Corp who has been using our Base CRM Package for the past 6 months, I wanted to share some exciting opportunities that could significantly enhance your experience.

Based on your team's extensive use of our reporting features, our Enterprise Analytics Add-on would provide valuable insights that could help drive your business decisions:

- Advanced data visualization dashboards
- Custom report scheduling
- Predictive analytics and trend forecasting
- Integration with your existing data warehouse

As a valued customer, we're offering a special 15% discount if you upgrade in the next 30 days.

Would you be interested in a brief demonstration? I'd be happy to schedule a call with your account manager to discuss how these features could benefit your specific workflow.

Best regards,
Cross-Sell Assistant
ABC Software Solutions`;

  // Updated system prompt to focus on email outreach
  const systemPromptPreview = `You are a Cross Sell / Up Sell assistant designed to help the sales team identify opportunities for additional product sales to existing customers and create compelling email outreach.

Your objectives:
${localConfig.sendMarketingEmail ? '- Create personalized email content for cross-selling and up-selling opportunities.' : ''}
${localConfig.suggestProductBundles ? '- Suggest relevant product bundles based on customer purchase history and behavior.' : ''}
${localConfig.provideDiscounts ? '- Recommend appropriate discount offers to incentivize additional purchases.' : ''}
${localConfig.setupMeeting ? '- Facilitate scheduling meetings between customers and their record owners for personalized follow-up.' : ''}

Email settings:
- Only target customers with a purchase probability of at least ${localConfig.minPurchaseProbability}%
- Send follow-up emails ${getFrequencyLabel(localConfig.emailFrequency)}

Instructions:
${localConfig.instructions.map(instruction => `- ${instruction}`).join('\n')}`;
  
  return (
    <div>
      <Typography variant="h4" className="page-title">
        Cross Sell / Up Sell: Instructions & Preview
      </Typography>
      
      <Paper className="form-container" elevation={1}>
        <form onSubmit={handleSubmit}>
          {/* Instructions Section */}
          <Typography variant="h6" gutterBottom>
            Agent Instructions
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Provide specific instructions for how the Cross Sell / Up Sell agent should compose emails and identify opportunities
          </Typography>
          
          {/* Multiple Instructions */}
          <List sx={{ width: '100%', mb: 2 }}>
            {localConfig.instructions.map((instruction, index) => (
              <ListItem 
                key={index}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleRemoveInstruction(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
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

          {/* Agent Preview Section */}
          <Typography variant="h6" gutterBottom>
            Email Preview
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Preview how the agent will compose emails based on your configuration
          </Typography>
          
          <Box sx={{ width: '100%', mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activePreviewTab} onChange={handleTabChange} aria-label="agent preview tabs">
                <Tab label="Email Sample" />
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
                      {agentPreviewText}
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

          <Divider sx={{ my: 3 }} />
          
          {/* Configuration Summary */}
          <Typography variant="h6" gutterBottom>
            Configuration Summary
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Email & Marketing Features
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        {localConfig.sendMarketingEmail ? 
                          <CheckCircleIcon color="success" /> : 
                          <CancelIcon color="disabled" />}
                      </ListItemIcon>
                      <ListItemText 
                        primary="Send Personalized Marketing Emails" 
                        secondary={localConfig.sendMarketingEmail ? "Enabled" : "Disabled"}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Product Recommendations
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        {localConfig.suggestProductBundles ? 
                          <CheckCircleIcon color="success" /> : 
                          <CancelIcon color="disabled" />}
                      </ListItemIcon>
                      <ListItemText 
                        primary="Suggest Product Bundles" 
                        secondary={localConfig.suggestProductBundles ? "Enabled" : "Disabled"}
                      />
                    </ListItem>
                    <Divider component="li" variant="inset" />
                    <ListItem>
                      <ListItemIcon>
                        {localConfig.provideDiscounts ? 
                          <CheckCircleIcon color="success" /> : 
                          <CancelIcon color="disabled" />}
                      </ListItemIcon>
                      <ListItemText 
                        primary="Provide Discounts" 
                        secondary={localConfig.provideDiscounts ? "Enabled" : "Disabled"}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Customer Engagement
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        {localConfig.setupMeeting ? 
                          <CheckCircleIcon color="success" /> : 
                          <CancelIcon color="disabled" />}
                      </ListItemIcon>
                      <ListItemText 
                        primary="Set Up Meeting with Record Owner" 
                        secondary={localConfig.setupMeeting ? "Enabled" : "Disabled"}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Email Settings
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <SpeedIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Minimum Purchase Probability" 
                        secondary={`${localConfig.minPurchaseProbability}%`}
                      />
                    </ListItem>
                    <Divider component="li" variant="inset" />
                    <ListItem>
                      <ListItemIcon>
                        <AutorenewIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Email Frequency" 
                        secondary={getFrequencyLabel(localConfig.emailFrequency)}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
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

export default CrossSellConfigPageTwo; 