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
  Divider,
  IconButton,
  Tabs,
  Tab,
  Grid
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import CodeIcon from '@mui/icons-material/Code';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const AnalyserConfigPageTwo = ({ configData, onComplete, onBack }) => {
  const navigate = useNavigate();
  const [localConfig, setLocalConfig] = useState({
    instructions: configData.instructions || [
      'Extract key trends and patterns from the data',
      'Include executive summary at the beginning'
    ],
    ...configData
  });
  
  const [newInstruction, setNewInstruction] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddInstruction = () => {
    if (newInstruction.trim()) {
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

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...localConfig.instructions];
    updatedInstructions[index] = value;
    setLocalConfig({
      ...localConfig,
      instructions: updatedInstructions
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete(localConfig);
  };

  // Get module and record information for preview
  const getModuleInfo = () => {
    // Sample modules data
    const modules = {
      'sales': 'Sales',
      'marketing': 'Marketing',
      'service': 'Service',
      'surveys': 'Surveys',
      'projects': 'Projects',
      'analytics': 'Analytics'
    };
    
    if (localConfig.analysisScope === 'individual') {
      return modules[localConfig.module] || 'Selected Module';
    } else {
      const moduleNames = localConfig.selectedModules.map(id => modules[id] || id);
      return moduleNames.join(', ');
    }
  };

  const getRecordInfo = () => {
    if (localConfig.analysisScope !== 'individual') return null;
    
    // Sample records data
    const recordsByModule = {
      'sales': [
        { id: 'sales-001', name: 'Q2 Sales Report' },
        { id: 'sales-002', name: 'Annual Sales Performance' },
        { id: 'sales-003', name: 'Regional Sales Analysis' }
      ],
      'marketing': [
        { id: 'marketing-001', name: 'Campaign Performance Data' },
        { id: 'marketing-002', name: 'Lead Generation Metrics' },
        { id: 'marketing-003', name: 'Market Research Findings' }
      ]
    };
    
    const records = recordsByModule[localConfig.module] || [];
    const record = records.find(r => r.id === localConfig.recordId);
    return record ? record.name : localConfig.recordId;
  };

  // Generate sample output preview
  const getOutputPreview = () => {
    // For Report preview
    const getReportPreview = () => {
      return (
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            {localConfig.analysisScope === 'individual' 
              ? `Analysis Report: ${getRecordInfo()}`
              : `Multi-Module Analysis Report: ${getModuleInfo()}`
            }
          </Typography>
          
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
            Executive Summary
          </Typography>
          <Typography variant="body2" paragraph>
            This analysis examines {localConfig.analysisScope === 'individual' 
              ? `the ${getRecordInfo()} record from the ${getModuleInfo()} module` 
              : `data across ${localConfig.selectedModules.length} different modules (${getModuleInfo()})`
            }. Our findings indicate several key trends and opportunities for improvement.
            {localConfig.includeZiaInsights && " Enhanced with AI insights for deeper pattern recognition and predictive analysis."}
            {localConfig.includeEmails && " Email communication patterns have been analyzed to provide context."}
            {localConfig.includeNotes && " Historical notes have been incorporated for comprehensive context."}
          </Typography>
          
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
            Key Metrics
          </Typography>
          <Typography variant="body2">
            <ul>
              <li>Overall performance increased by 12% compared to previous period</li>
              <li>Customer satisfaction score: 8.7/10 (up 0.5 points)</li>
              <li>Response time reduced by 15% across all tracked interactions</li>
            </ul>
          </Typography>
          
          {localConfig.includeZiaInsights && (
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
                Zia Insights
              </Typography>
              <Card variant="outlined" sx={{ bgcolor: '#f5f9ff', mb: 2 }}>
                <CardContent>
                  <Typography variant="body2">
                    AI analysis detected a strong correlation between response time and overall customer satisfaction. 
                    For every 10% reduction in response time, satisfaction scores improved by approximately 0.3 points.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}
          
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
            Recommendations
          </Typography>
          <Typography variant="body2">
            <ol>
              <li>Implement automated responses for common inquiries to further reduce response times</li>
              <li>Focus training resources on the areas showing slowest improvement</li>
              <li>Establish a quarterly review process to track ongoing improvements</li>
            </ol>
          </Typography>
        </Box>
      );
    };
    
    // For Presentation preview
    const getPresentationPreview = () => {
      // Build a list of included data sources for the presentation
      const dataSources = [];
      if (localConfig.includeZiaInsights) dataSources.push("AI Insights");
      if (localConfig.includeEmails) dataSources.push("Email Communications");
      if (localConfig.includeNotes) dataSources.push("Notes & Records");
      
      const dataSourcesText = dataSources.length > 0 
        ? `Incorporating ${dataSources.join(', ')}` 
        : '';

      return (
        <Box sx={{ p: 2 }}>
          <Card variant="outlined" sx={{ mb: 3, p: 2, bgcolor: '#f8f9fa' }}>
            <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
              Slide 1: Executive Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
              {localConfig.analysisScope === 'individual' 
                ? `Analysis of ${getRecordInfo()}`
                : `Multi-Module Analysis Overview`
              }
            </Typography>
            <Typography variant="body2" component="div">
              <ul>
                <li>Analysis covers {localConfig.analysisScope === 'individual' 
                  ? `data from ${getModuleInfo()} module` 
                  : `multiple modules: ${getModuleInfo()}`
                }</li>
                <li>Overall performance up 12% from previous period</li>
                <li>Key opportunities identified in 3 areas</li>
                {dataSourcesText && <li>{dataSourcesText}</li>}
              </ul>
            </Typography>
          </Card>
          
          <Card variant="outlined" sx={{ mb: 3, p: 2, bgcolor: '#f8f9fa' }}>
            <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
              Slide 2: Key Metrics
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2} sx={{ textAlign: 'center' }}>
              <Grid item xs={4}>
                <Typography variant="h5" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                  +12%
                </Typography>
                <Typography variant="body2">
                  Performance
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h5" sx={{ color: '#2196f3', fontWeight: 'bold' }}>
                  8.7
                </Typography>
                <Typography variant="body2">
                  Satisfaction
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h5" sx={{ color: '#ff9800', fontWeight: 'bold' }}>
                  -15%
                </Typography>
                <Typography variant="body2">
                  Response Time
                </Typography>
              </Grid>
            </Grid>
          </Card>
          
          {localConfig.includeZiaInsights && (
            <Card variant="outlined" sx={{ mb: 3, p: 2, bgcolor: '#f8f9fa' }}>
              <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
                Slide 3: AI Insights
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ p: 1, bgcolor: '#e3f2fd', borderRadius: 1, mb: 2 }}>
                <Typography variant="body2" sx={{ fontStyle: 'italic', textAlign: 'center' }}>
                  "For every 10% reduction in response time, satisfaction scores improved by approximately 0.3 points."
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                AI correlation analysis reveals direct link between response time and satisfaction
              </Typography>
            </Card>
          )}
          
          <Card variant="outlined" sx={{ p: 2, bgcolor: '#f8f9fa' }}>
            <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
              Slide 4: Recommendations
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" component="div">
              <ol>
                <li>Implement automated responses</li>
                <li>Focus training on slow-improvement areas</li>
                <li>Establish quarterly review process</li>
              </ol>
            </Typography>
          </Card>
        </Box>
      );
    };
    
    // For System Prompt preview
    const getSystemPromptPreview = () => {
      const outputTypes = localConfig.functionType.map(type => 
        type === 'report' ? 'detailed analysis report' : 'presentation slides'
      ).join(' and ');
      
      // Build array of additional data sources included
      const additionalDataSources = [];
      if (localConfig.includeZiaInsights) additionalDataSources.push('AI insights');
      if (localConfig.includeEmails) additionalDataSources.push('emails');
      if (localConfig.includeNotes) additionalDataSources.push('notes');
      
      const additionalDataText = additionalDataSources.length > 0 
        ? `Include the following additional data sources: ${additionalDataSources.join(', ')}.` 
        : 'Do not include any additional data sources in your analysis.';
      
      return (
        <Box sx={{ 
          p: 2, 
          fontFamily: 'monospace', 
          whiteSpace: 'pre-wrap', 
          bgcolor: '#f5f5f5',
          fontSize: '0.9rem',
          borderRadius: 1
        }}>
{`You are an Analysis Assistant specializing in creating ${outputTypes} from ${localConfig.analysisScope === 'individual' ? 'individual records' : 'bulk data'}.

Your task is to analyze ${localConfig.analysisScope === 'individual' ? 
  `the ${getRecordInfo()} record from the ${getModuleInfo()} module` : 
  `data across multiple modules (${getModuleInfo()})`
} and provide clear, actionable insights.

${additionalDataText}

Specific instructions:
${localConfig.instructions.map(instruction => `- ${instruction}`).join('\n')}

${localConfig.functionType.includes('report') ? 
`For the report format:
- Include an executive summary at the beginning
- Present key metrics with context and comparison to previous periods
- Include data visualizations where appropriate
- Provide specific, actionable recommendations` : ''}

${localConfig.functionType.includes('presentation') ? 
`For the presentation format:
- Create clear, concise slides with minimal text
- Use visual elements to represent key data points
- Ensure each slide has a clear purpose and message
- Include speaker notes with additional context` : ''}

Your analysis should be data-driven, insightful, and focused on providing actionable recommendations.`}
        </Box>
      );
    };
    
    // Return the appropriate preview based on active tab
    if (activeTab === 0) {
      if (localConfig.functionType.includes('report')) {
        return getReportPreview();
      } else if (localConfig.functionType.includes('presentation')) {
        return getPresentationPreview();
      } else {
        return (
          <Typography variant="body2" color="textSecondary" sx={{ p: 2, textAlign: 'center' }}>
            Please select at least one output format on the previous page to see a preview.
          </Typography>
        );
      }
    } else {
      return getSystemPromptPreview();
    }
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
          Analyser Configuration
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1}>
        <Typography variant="h5" gutterBottom>
          Analysis Instructions
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Add specific instructions and preview the Analyser Agent output
        </Typography>
        
        <form onSubmit={handleSubmit}>
          {/* Instructions Section */}
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Add specific instructions for how the agent should analyze data and structure output
          </Typography>
          
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {localConfig.instructions.map((instruction, index) => (
              <ListItem 
                key={index}
                secondaryAction={
                  <IconButton 
                    edge="end" 
                    aria-label="delete" 
                    onClick={() => handleRemoveInstruction(index)}
                  >
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
                  InputProps={{ disableUnderline: true }}
                />
              </ListItem>
            ))}
          </List>
          
          <Box sx={{ display: 'flex', mt: 2, mb: 3 }}>
            <TextField
              fullWidth
              label="New instruction"
              variant="outlined"
              value={newInstruction}
              onChange={(e) => setNewInstruction(e.target.value)}
              size="small"
              sx={{ mr: 1 }}
            />
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleAddInstruction}
              startIcon={<AddCircleIcon />}
              disabled={!newInstruction.trim()}
            >
              Add
            </Button>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          {/* Preview Section */}
          <Typography variant="h6" gutterBottom>
            Output Preview
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Preview how the analysis will look based on your settings
          </Typography>
          
          <Box sx={{ width: '100%', mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                aria-label="output preview tabs"
              >
                <Tab 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {localConfig.functionType.includes('report') 
                        ? <DescriptionIcon fontSize="small" sx={{ mr: 1 }} />
                        : <SlideshowIcon fontSize="small" sx={{ mr: 1 }} />
                      }
                      <span>Output Preview</span>
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
                {getOutputPreview()}
              </Card>
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
              disabled={localConfig.instructions.length === 0}
            >
              Finish
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default AnalyserConfigPageTwo; 