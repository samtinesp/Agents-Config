import React, { useState } from 'react';
import { 
  Typography,
  Paper,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  IconButton,
  Grid,
  Divider,
  Checkbox,
  FormControlLabel,
  FormGroup
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const PricingConfigPageTwo = ({ configData, onNext, onBack }) => {
  const navigate = useNavigate();
  const [localConfig, setLocalConfig] = useState({
    companyDescription: configData.companyDescription || 'Our company specializes in software solutions for businesses of all sizes. We offer cloud-based applications, custom software development, and IT consulting services.',
    competitors: configData.competitors || [
      'TechSoft Solutions', 
      'Enterprise Cloud Systems', 
      'Agile Apps Inc.'
    ],
    pricingModels: configData.pricingModels || ['dynamic'],
    newCompetitor: ''
  });

  const handleDescriptionChange = (e) => {
    setLocalConfig({
      ...localConfig,
      companyDescription: e.target.value
    });
  };

  const handleNewCompetitorChange = (e) => {
    setLocalConfig({
      ...localConfig,
      newCompetitor: e.target.value
    });
  };

  const handleAddCompetitor = () => {
    if (localConfig.newCompetitor.trim() !== '') {
      setLocalConfig({
        ...localConfig,
        competitors: [...localConfig.competitors, localConfig.newCompetitor.trim()],
        newCompetitor: ''
      });
    }
  };

  const handleDeleteCompetitor = (index) => {
    const newCompetitors = [...localConfig.competitors];
    newCompetitors.splice(index, 1);
    setLocalConfig({
      ...localConfig,
      competitors: newCompetitors
    });
  };

  const handlePricingModelToggle = (modelValue) => {
    setLocalConfig({
      ...localConfig,
      pricingModels: localConfig.pricingModels.includes(modelValue)
        ? localConfig.pricingModels.filter(model => model !== modelValue)
        : [...localConfig.pricingModels, modelValue]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Remove temporary state field before submitting
    const { newCompetitor, ...configToSubmit } = localConfig;
    onNext(configToSubmit);
  };

  const pricingModels = [
    {
      value: 'dynamic',
      label: 'Dynamic Pricing',
      description: 'Adjust prices based on market demand, competitor pricing, and other external factors.'
    },
    {
      value: 'elastic',
      label: 'Elastic Pricing',
      description: 'Adapt prices based on customer willingness to pay and price sensitivity analysis.'
    },
    {
      value: 'ai-based',
      label: 'AI-based Pricing',
      description: 'Leverage machine learning algorithms to optimize pricing strategies and predict optimal price points.'
    }
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
          Pricing Agent: Company Information
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1}>
        <form onSubmit={handleSubmit}>
          {/* Company Description */}
          <Typography variant="h6" sx={{ mb: 1 }}>
            Company Description
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Provide a brief description of your company and its products/services
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={localConfig.companyDescription}
            onChange={handleDescriptionChange}
            variant="outlined"
            placeholder="Describe your company, products, and services..."
            sx={{ mb: 4 }}
          />

          <Divider sx={{ my: 3 }} />

          {/* Key Competitors */}
          <Typography variant="h6" sx={{ mb: 1 }}>
            Key Competitors
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            List your primary competitors in the market
          </Typography>
          
          <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {localConfig.competitors.map((competitor, index) => (
              <Chip
                key={index}
                label={competitor}
                onDelete={() => handleDeleteCompetitor(index)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
          
          <Box sx={{ display: 'flex', mb: 4 }}>
            <TextField
              fullWidth
              value={localConfig.newCompetitor}
              onChange={handleNewCompetitorChange}
              variant="outlined"
              placeholder="Add a competitor..."
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

          <Divider sx={{ my: 3 }} />

          {/* Pricing Models */}
          <Typography variant="h6" sx={{ mb: 1 }}>
            Pricing Models
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Select the pricing models that best fit your business needs (select all that apply)
          </Typography>
          
          <FormGroup>
            <Grid container spacing={2}>
              {pricingModels.map((model) => (
                <Grid item xs={12} key={model.value}>
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 2, 
                      cursor: 'pointer',
                      borderColor: localConfig.pricingModels.includes(model.value) ? '#1976d2' : 'rgba(0, 0, 0, 0.12)',
                      backgroundColor: localConfig.pricingModels.includes(model.value) ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                      '&:hover': {
                        boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
                      }
                    }}
                    onClick={() => handlePricingModelToggle(model.value)}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={localConfig.pricingModels.includes(model.value)} 
                          onChange={() => handlePricingModelToggle(model.value)}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="subtitle1">{model.label}</Typography>
                          <Typography variant="body2" color="textSecondary">{model.description}</Typography>
                        </Box>
                      }
                      sx={{ width: '100%', m: 0 }}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </FormGroup>

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
              disabled={localConfig.pricingModels.length === 0}
            >
              Finish
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default PricingConfigPageTwo; 