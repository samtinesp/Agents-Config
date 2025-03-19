import React, { useState } from 'react';
import { 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Box, 
  Divider, 
  Grid,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Card,
  CardContent,
  Chip,
  IconButton,
  List,
  ListItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import BusinessIcon from '@mui/icons-material/Business';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import InsightsIcon from '@mui/icons-material/Insights';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const CompetitorMarketAnalyserConfig = ({ configData, onComplete }) => {
  const navigate = useNavigate();
  const [localConfig, setLocalConfig] = useState({
    companyDescription: configData.companyDescription || 'ZohoTech Solutions is a cloud-based SaaS company founded in 2010. We provide CRM, project management, and marketing automation tools for small to medium-sized businesses. Our flagship product is an all-in-one business management platform with integrated billing, customer support, and analytics capabilities. We currently serve 15,000+ customers primarily in North America and Europe, with plans to expand into Asian markets next year. Our target customers are businesses with 10-200 employees looking for affordable, scalable business solutions.',
    analysisType: configData.analysisType || 'market',
    competitors: configData.competitors || ['Salesforce', 'HubSpot', 'Monday.com', 'Asana', 'Freshworks'],
    analysisMode: configData.analysisMode || 'generic',
    instructions: configData.instructions || [],
    newCompetitor: '',
    newInstruction: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalConfig({
      ...localConfig,
      [name]: value
    });
  };

  const handleAddCompetitor = () => {
    if (localConfig.newCompetitor.trim()) {
      setLocalConfig({
        ...localConfig,
        competitors: [...localConfig.competitors, localConfig.newCompetitor.trim()],
        newCompetitor: ''
      });
    }
  };

  const handleRemoveCompetitor = (index) => {
    const updatedCompetitors = [...localConfig.competitors];
    updatedCompetitors.splice(index, 1);
    setLocalConfig({
      ...localConfig,
      competitors: updatedCompetitors
    });
  };

  const handleAddInstruction = () => {
    if (localConfig.newInstruction.trim()) {
      setLocalConfig({
        ...localConfig,
        instructions: [...localConfig.instructions, localConfig.newInstruction.trim()],
        newInstruction: ''
      });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare data for submission (remove temp fields)
    const { newCompetitor, newInstruction, ...submitData } = localConfig;
    
    onComplete(submitData);
  };

  // Get icon for analysis mode
  const getAnalysisModeIcon = (mode) => {
    switch (mode) {
      case 'customer':
        return <PeopleIcon />;
      case 'product':
        return <CategoryIcon />;
      case 'generic':
      default:
        return <InsightsIcon />;
    }
  };

  const isSubmitDisabled = () => {
    return !localConfig.companyDescription.trim() || 
           (localConfig.analysisType === 'competitor' && localConfig.competitors.length === 0);
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
          Competitor/Market Analyser Configuration
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1}>
        <Typography variant="h5" gutterBottom>
          Competitor/Market Analyser Configuration
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Configure the Competitor/Market Analyser Agent to gather insights on market trends and competitor activities
        </Typography>
        
        <form onSubmit={handleSubmit}>
          {/* Company Description */}
          <Typography variant="h6" gutterBottom sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
            <BusinessIcon sx={{ mr: 1 }} />
            Company Description
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Provide information about your company to help the analyser understand your business context
          </Typography>
          
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            name="companyDescription"
            value={localConfig.companyDescription}
            onChange={handleChange}
            placeholder="Describe your company, products/services, target market, and business goals..."
            sx={{ mb: 4 }}
          />

          <Divider sx={{ my: 3 }} />

          {/* Analysis Type */}
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <CompareArrowsIcon sx={{ mr: 1 }} />
            Analysis Type
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Select the type of analysis you want to perform
          </Typography>
          
          <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
            <RadioGroup
              name="analysisType"
              value={localConfig.analysisType}
              onChange={handleChange}
              row
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      mb: 2,
                      borderColor: localConfig.analysisType === 'market' ? 'primary.main' : 'divider',
                      bgcolor: localConfig.analysisType === 'market' ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
                      transition: '0.3s'
                    }}
                  >
                    <CardContent>
                      <FormControlLabel 
                        value="market" 
                        control={<Radio />} 
                        label={
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                              <TrendingUpIcon sx={{ mr: 1 }} />
                              Market Analysis
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Analyze market trends, opportunities, and challenges
                            </Typography>
                          </Box>
                        } 
                      />
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      mb: 2,
                      borderColor: localConfig.analysisType === 'competitor' ? 'primary.main' : 'divider',
                      bgcolor: localConfig.analysisType === 'competitor' ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
                      transition: '0.3s'
                    }}
                  >
                    <CardContent>
                      <FormControlLabel 
                        value="competitor" 
                        control={<Radio />} 
                        label={
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                              <CompareArrowsIcon sx={{ mr: 1 }} />
                              Competitor Analysis
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Analyze specific competitors and competitive positioning
                            </Typography>
                          </Box>
                        } 
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>

          {/* Competitors (Only shown for Competitor Analysis) */}
          {localConfig.analysisType === 'competitor' && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Key Competitors
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Add the names of your key competitors to analyze
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                {localConfig.competitors.map((competitor, index) => (
                  <Chip 
                    key={index}
                    label={competitor}
                    onDelete={() => handleRemoveCompetitor(index)}
                    sx={{ m: 0.5 }}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
              
              <Box sx={{ display: 'flex' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter competitor name"
                  value={localConfig.newCompetitor}
                  onChange={(e) => setLocalConfig({...localConfig, newCompetitor: e.target.value})}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleAddCompetitor}
                  startIcon={<AddIcon />}
                  disabled={!localConfig.newCompetitor.trim()}
                >
                  Add
                </Button>
              </Box>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          {/* Analysis Mode */}
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <InsightsIcon sx={{ mr: 1 }} />
            Mode of Analysis
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Select which aspect you want to focus on in your analysis
          </Typography>
          
          <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
            <RadioGroup
              name="analysisMode"
              value={localConfig.analysisMode}
              onChange={handleChange}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      borderColor: localConfig.analysisMode === 'customer' ? 'primary.main' : 'divider',
                      bgcolor: localConfig.analysisMode === 'customer' ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
                      transition: '0.3s'
                    }}
                  >
                    <CardContent>
                      <FormControlLabel 
                        value="customer" 
                        control={<Radio />} 
                        label={
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                              <PeopleIcon sx={{ mr: 1 }} />
                              Customer Base Analysis
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Focus on customer demographics, behaviors, and preferences
                            </Typography>
                          </Box>
                        } 
                      />
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      borderColor: localConfig.analysisMode === 'product' ? 'primary.main' : 'divider',
                      bgcolor: localConfig.analysisMode === 'product' ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
                      transition: '0.3s'
                    }}
                  >
                    <CardContent>
                      <FormControlLabel 
                        value="product" 
                        control={<Radio />} 
                        label={
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                              <CategoryIcon sx={{ mr: 1 }} />
                              Product Analysis
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Focus on product features, pricing, and positioning
                            </Typography>
                          </Box>
                        } 
                      />
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      borderColor: localConfig.analysisMode === 'generic' ? 'primary.main' : 'divider',
                      bgcolor: localConfig.analysisMode === 'generic' ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
                      transition: '0.3s'
                    }}
                  >
                    <CardContent>
                      <FormControlLabel 
                        value="generic" 
                        control={<Radio />} 
                        label={
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                              <InsightsIcon sx={{ mr: 1 }} />
                              Generic Analysis
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Comprehensive overview of all aspects
                            </Typography>
                          </Box>
                        } 
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>

          <Divider sx={{ my: 3 }} />

          {/* Instructions */}
          <Typography variant="h6" gutterBottom>
            Instructions for Agent
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Add specific instructions for how the agent should analyze the data and structure the output
          </Typography>
          
          <List sx={{ width: '100%', bgcolor: 'background.paper', mb: 2 }}>
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
                <Typography>{instruction}</Typography>
              </ListItem>
            ))}
            {localConfig.instructions.length === 0 && (
              <Typography variant="body2" color="textSecondary" sx={{ p: 2, textAlign: 'center' }}>
                No instructions added yet. Add some instructions to guide the analysis.
              </Typography>
            )}
          </List>
          
          <Box sx={{ display: 'flex', mb: 4 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter instruction"
              value={localConfig.newInstruction}
              onChange={(e) => setLocalConfig({...localConfig, newInstruction: e.target.value})}
              size="small"
              sx={{ mr: 1 }}
            />
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleAddInstruction}
              startIcon={<AddIcon />}
              disabled={!localConfig.newInstruction.trim()}
            >
              Add
            </Button>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              size="large"
              disabled={isSubmitDisabled()}
            >
              Complete
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default CompetitorMarketAnalyserConfig; 