import React, { useState } from 'react';
import { 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Box,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  IconButton,
  Tabs,
  Tab,
  Avatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const SDRConfigPageThree = ({ configData, onBack, onComplete }) => {
  const navigate = useNavigate();
  const [localConfig, setLocalConfig] = useState({
    instructionsList: configData.instructionsList || [''],
  });
  
  const [activeTab, setActiveTab] = useState(0);

  // Mock conversation data for the agent output preview
  const mockConversation = [
    { 
      sender: 'agent', 
      name: 'SDR Agent', 
      message: "Hi there! I noticed you recently expressed interest in our premium CRM solution. I'd be happy to provide more information about how it could help streamline your sales processes. Would you like to learn more about specific features or pricing?",
      time: '10:32 AM'
    },
    { 
      sender: 'user', 
      name: 'Potential Customer', 
      message: "Thanks for reaching out. We're actually evaluating several CRM solutions right now. What makes yours different?",
      time: '10:45 AM'
    },
    { 
      sender: 'agent', 
      name: 'SDR Agent', 
      message: "Great question! Unlike other CRMs, our solution offers AI-powered lead scoring that's proven to increase conversion rates by 37% on average. We also provide seamless integration with over 200 business tools and a customizable dashboard that adapts to your team's workflow. Would you like me to arrange a demo with one of our specialists to show you these features in action?",
      time: '10:47 AM'
    },
    { 
      sender: 'user', 
      name: 'Potential Customer', 
      message: "That sounds interesting. A demo might be helpful. What's the process for that?",
      time: '11:03 AM'
    },
    { 
      sender: 'agent', 
      name: 'SDR Agent', 
      message: "I'd be happy to set that up for you! I can schedule a 30-minute demo with our product specialist, Sarah, who specializes in helping businesses in your industry. Would you prefer a meeting this week or next? Once we find a time that works, I'll send over a calendar invite with all the details and a link to join the call.",
      time: '11:05 AM'
    }
  ];

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...localConfig.instructionsList];
    updatedInstructions[index] = value;
    setLocalConfig({
      ...localConfig,
      instructionsList: updatedInstructions
    });
  };

  const addInstruction = () => {
    setLocalConfig({
      ...localConfig,
      instructionsList: [...localConfig.instructionsList, '']
    });
  };

  const removeInstruction = (index) => {
    if (localConfig.instructionsList.length > 1) {
      const updatedInstructions = [...localConfig.instructionsList];
      updatedInstructions.splice(index, 1);
      setLocalConfig({
        ...localConfig,
        instructionsList: updatedInstructions
      });
    }
  };

  const generatePrompt = () => {
    let prompt = `You are an SDR (Sales Development Representative) assistant powered by ${configData.model ? getModelName(configData.model) : 'AI'}.\n\n`;
    
    prompt += "Your primary role is to send outreach emails to potential customers, respond to their queries, ";
    prompt += configData.setupMeeting ? "and set up meetings with sales representatives when appropriate.\n\n" : "and engage with them in a helpful manner.\n\n";
    
    prompt += "Trigger criteria:\n";
    configData.criteria?.forEach((criterion, index) => {
      if (criterion.field && criterion.operator) {
        let criterionText = `${index + 1}. ${criterion.field} ${criterion.operator}`;
        if (criterion.operator !== 'is empty' && criterion.operator !== 'is not empty' && criterion.value) {
          criterionText += ` ${criterion.value}`;
        }
        prompt += `${criterionText}\n`;
      }
    });
    
    prompt += "\nOutreach configuration:\n";
    if (configData.outreachMode === 'auto') {
      prompt += "- Optimized automatically by system\n";
    } else {
      prompt += `- Contact in business hours only: ${configData.outreachConfig?.businessHoursOnly ? 'Yes' : 'No'}\n`;
      prompt += `- First contact after assignment: ${configData.outreachConfig?.firstContactDelay}\n`;
      prompt += `- Follow-up timing: ${configData.outreachConfig?.nudgeDelay}\n`;
      prompt += `- Maximum follow-ups: ${configData.outreachConfig?.maxNudges}\n`;
    }
    
    prompt += "\nYour instructions are:\n";
    localConfig.instructionsList.forEach((instruction, index) => {
      if (instruction.trim()) {
        prompt += `${index + 1}. ${instruction}\n`;
      }
    });
    
    return prompt;
  };

  const getModelName = (modelId) => {
    const modelMap = {
      'claude3-sonnet': 'Claude 3.7 Sonnet',
      'gpt4o-mini': 'GPT-4o Mini',
      'claude3-opus': 'Claude 3.7 Opus',
      'gpt4o': 'GPT-4o'
    };
    return modelMap[modelId] || modelId;
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleReload = () => {
    // This is intentionally unresponsive - just for UI mockup purposes
    console.log('Reload button clicked (unresponsive by design)');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter out empty instructions
    const filteredInstructions = localConfig.instructionsList.filter(instr => instr.trim() !== '');
    onComplete({ 
      ...localConfig, 
      instructionsList: filteredInstructions
    });
  };

  // Render mock conversation component
  const renderConversation = () => {
    return (
      <Box sx={{ p: 2, height: '400px', overflowY: 'auto', bgcolor: '#fafafa', borderRadius: 1 }}>
        {mockConversation.map((msg, index) => (
          <Box 
            key={index} 
            sx={{ 
              display: 'flex', 
              justifyContent: msg.sender === 'agent' ? 'flex-start' : 'flex-end',
              mb: 2
            }}
          >
            {msg.sender === 'agent' && (
              <Avatar 
                sx={{ 
                  bgcolor: 'primary.main',
                  width: 36, 
                  height: 36,
                  mr: 1,
                  fontSize: '0.9rem'
                }}
              >
                SDR
              </Avatar>
            )}
            <Box 
              sx={{
                maxWidth: '70%',
                p: 2,
                borderRadius: 2,
                bgcolor: msg.sender === 'agent' ? '#e3f2fd' : '#f0f4c3',
                boxShadow: 1,
                position: 'relative'
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                {msg.name}
              </Typography>
              <Typography variant="body2">
                {msg.message}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  position: 'absolute', 
                  bottom: 4, 
                  right: 8, 
                  color: 'text.secondary' 
                }}
              >
                {msg.time}
              </Typography>
            </Box>
            {msg.sender === 'user' && (
              <Avatar 
                sx={{ 
                  bgcolor: '#9ccc65',
                  width: 36, 
                  height: 36,
                  ml: 1,
                  fontSize: '0.9rem'
                }}
              >
                PC
              </Avatar>
            )}
          </Box>
        ))}
      </Box>
    );
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
          SDR Agent: Preview & Instructions
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1}>
        <form onSubmit={handleSubmit}>
          {/* Instructions List */}
          <Typography variant="h6" className="section-title">
            Agent Instructions
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Provide specific instructions for how your SDR agent should engage with prospects
          </Typography>
          
          <List>
            {localConfig.instructionsList.map((instruction, index) => (
              <ListItem 
                key={index} 
                disableGutters
                sx={{ 
                  display: 'flex',
                  alignItems: 'flex-start',
                  py: 1
                }}
              >
                <Typography sx={{ mt: 2, mr: 1 }}>{index + 1}.</Typography>
                <TextField
                  value={instruction}
                  onChange={(e) => handleInstructionChange(index, e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  placeholder="Enter an instruction for the agent"
                />
                <IconButton 
                  onClick={() => removeInstruction(index)}
                  disabled={localConfig.instructionsList.length === 1}
                  sx={{ ml: 1, mt: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          
          <Button 
            startIcon={<AddIcon />}
            onClick={addInstruction}
            variant="outlined"
            sx={{ mt: 1, mb: 3 }}
          >
            Add Instruction
          </Button>

          <Divider sx={{ my: 3 }} />

          {/* Preview Tabs */}
          <Typography variant="h6" className="section-title">
            Preview
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Preview the system prompt or where agent output will appear
          </Typography>
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="preview tabs">
              <Tab label="Agent Output" />
              <Tab label="System Prompt" />
            </Tabs>
          </Box>
          
          <Card variant="outlined" sx={{ bgcolor: '#f8f9fa' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  {activeTab === 0 ? "Preview of conversation with SDR agent" : "Preview of system prompt"}
                </Typography>
                {activeTab === 0 && (
                  <IconButton 
                    size="small" 
                    onClick={handleReload}
                    title="Reload (unresponsive by design)"
                  >
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
              
              {activeTab === 0 
                ? renderConversation()
                : (
                  <Typography 
                    variant="body1" 
                    component="pre" 
                    sx={{ 
                      whiteSpace: 'pre-wrap',
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                    }}
                  >
                    {generatePrompt()}
                  </Typography>
                )
              }
            </CardContent>
          </Card>

          <Box className="navigation-buttons">
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
              disabled={!localConfig.instructionsList.some(instr => instr.trim() !== '')}
            >
              Complete Setup
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default SDRConfigPageThree; 