import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Paper, 
  FormControl, 
  InputLabel,
  Select,
  MenuItem,
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
  Tab
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const SalesCoachConfigPageTwo = ({ configData, onBack, onComplete }) => {
  const navigate = useNavigate();
  const [localConfig, setLocalConfig] = useState({
    instructionsList: configData.instructionsList || [''],
    functionType: configData.functionType || '',
    output: ''
  });
  
  const [activeTab, setActiveTab] = useState(0);

  // Sample function types (in a real app, this would come from an API)
  const availableFunctions = [
    { id: 'practice-pitch', name: 'Practice a Pitch', description: 'Helps sales reps practice their sales pitches' },
    { id: 'roleplay', name: 'Roleplay', description: 'Simulates customer interactions for practice' },
    { id: 'skill-test', name: 'Skill Test', description: 'Tests sales representatives on specific skills' },
    { id: 'feedback', name: 'Feedback', description: 'Provides feedback on sales performance' }
  ];

  const handleFunctionChange = (e) => {
    const newFunctionType = e.target.value;
    // Reset instructions when function type changes
    setLocalConfig({
      ...localConfig,
      functionType: newFunctionType,
      instructionsList: [''] // Reset to a single empty instruction
    });
  };

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
    let prompt = `You are a sales coach assistant powered by ${configData.model ? availableModels.find(m => m.id === configData.model)?.name : 'AI'}.\n\n`;
    
    if (localConfig.functionType) {
      const functionName = availableFunctions.find(f => f.id === localConfig.functionType)?.name;
      prompt += `Function: ${functionName}\n\n`;
    }
    
    prompt += "Your primary instructions are:\n";
    localConfig.instructionsList.forEach((instruction, index) => {
      if (instruction.trim()) {
        prompt += `${index + 1}. ${instruction}\n`;
      }
    });
    
    prompt += "\nAdditional context:\n";
    if (configData.module) {
      prompt += `- You are deployed in the ${configData.module} module\n`;
    }
    
    if (configData.features?.length > 0) {
      prompt += `- You should provide: ${configData.features.join(', ')}\n`;
    }
    
    // Add access permissions
    const permissions = [];
    if (configData.permissions?.accessMail) permissions.push("email conversations");
    if (configData.permissions?.accessRecords) permissions.push("record details");
    if (configData.permissions?.accessResources) permissions.push("uploaded resources");
    
    if (permissions.length > 0) {
      prompt += `- You have access to: ${permissions.join(', ')}\n`;
    }
    
    return prompt;
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

  // Available models for reference in the prompt generation
  const availableModels = [
    { id: 'claude3-sonnet', name: 'Claude 3.7 Sonnet' },
    { id: 'gpt4o-mini', name: 'GPT-4o Mini' },
    { id: 'claude3-opus', name: 'Claude 3.7 Opus' },
    { id: 'gpt4o', name: 'GPT-4o' }
  ];

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
          Sales Coach Agent: Advanced Settings
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1}>
        <form onSubmit={handleSubmit}>
          {/* Function Type Selection */}
          <Typography variant="h6" className="section-title">
            Select Function
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Choose the primary function this agent will perform.
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="function-label">Function Type</InputLabel>
            <Select
              labelId="function-label"
              id="functionType"
              name="functionType"
              value={localConfig.functionType}
              onChange={handleFunctionChange}
              label="Function Type"
              required
            >
              {availableFunctions.map((func) => (
                <MenuItem key={func.id} value={func.id}>
                  <Box>
                    <Typography variant="subtitle1">{func.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{func.description}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider sx={{ my: 3 }} />

          {/* Instructions List */}
          <Typography variant="h6" className="section-title">
            Agent Instructions
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Provide specific instructions for how your sales coach agent should behave and assist your team.
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

          {/* Simplified Preview Tabs */}
          <Typography variant="h6" className="section-title">
            Preview
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Preview the system prompt or where agent output will appear.
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
                  {activeTab === 0 ? "Preview of agent responses" : "Preview of system prompt"}
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
              <Typography 
                variant="body1" 
                component="pre" 
                sx={{ 
                  whiteSpace: 'pre-wrap',
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                }}
              >
                {activeTab === 0 
                  ? "Agent output will appear here."
                  : (configData.model ? generatePrompt() : "Select a model and provide instructions to see the system prompt.")}
              </Typography>
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
              disabled={!localConfig.functionType || !localConfig.instructionsList.some(instr => instr.trim() !== '')}
            >
              Complete Setup
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default SalesCoachConfigPageTwo; 