import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemButton,
  Card,
  CardContent,
  Box,
  Divider,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const HomePage = () => {
  const navigate = useNavigate();
  const [configuredAgents, setConfiguredAgents] = useState({
    'sales-coach': true,
    'sdr-agent': true,
    'churn-agent': true,
    'acquisition-agent': false,
    'pricing-agent': false,
    'cross-sell-agent': false,
    'survey-generation': false,
    'forecast-agent': false,
    'analyser': false,
    'competitor-market': false,
    'email-parser': false,
    'record-generation': false,
    'voc-tracker': false,
    'rfp-agent': false,
    'enrichment-agent': false
  });

  // Check local storage for configured agents on component mount
  useEffect(() => {
    // Check if agents are configured in localStorage
    const salesCoachConfigured = localStorage.getItem('sales-coach-configured') === 'true';
    const sdrConfigured = localStorage.getItem('sdr-agent-configured') === 'true';
    const churnConfigured = localStorage.getItem('churn-agent-configured') === 'true';
    const acquisitionConfigured = localStorage.getItem('acquisition-agent-configured') === 'true';
    const pricingConfigured = localStorage.getItem('pricing-agent-configured') === 'true';
    const crossSellConfigured = localStorage.getItem('cross-sell-agent-configured') === 'true';
    const surveyGenerationConfigured = localStorage.getItem('survey-generation-agent-configured') === 'true';
    const forecastConfigured = localStorage.getItem('forecast-agent-configured') === 'true';
    const analyserConfigured = localStorage.getItem('analyser-agent-config') !== null;
    const competitorMarketConfigured = localStorage.getItem('competitor-market-config') !== null;
    const emailParserConfigured = localStorage.getItem('emailParserConfigComplete') === 'true';
    const recordGenerationConfigured = localStorage.getItem('record-generation-agent-configured') === 'true';
    const vocTrackerConfigured = localStorage.getItem('voc-tracker-configured') === 'true';
    const rfpAgentConfigured = localStorage.getItem('rfpConfig') !== null;
    const enrichmentAgentConfigured = localStorage.getItem('enrichment-agent-configured') === 'true';
    
    setConfiguredAgents({
      'sales-coach': salesCoachConfigured || true,
      'sdr-agent': sdrConfigured || true,
      'churn-agent': churnConfigured || true,
      'acquisition-agent': acquisitionConfigured || false,
      'pricing-agent': pricingConfigured || false,
      'cross-sell-agent': crossSellConfigured || false,
      'survey-generation': surveyGenerationConfigured || false,
      'forecast-agent': forecastConfigured || false,
      'analyser': analyserConfigured || false,
      'competitor-market': competitorMarketConfigured || false,
      'email-parser': emailParserConfigured || false,
      'record-generation': recordGenerationConfigured || false,
      'voc-tracker': vocTrackerConfigured || false,
      'rfp-agent': rfpAgentConfigured || false,
      'enrichment-agent': enrichmentAgentConfigured || false
    });
    
    // Set agents as configured if returning from configuration
    const checkConfigStatus = () => {
      const pathName = window.location.pathname;
      const referrer = document.referrer;
      
      // If we just came from the acquisition config page and are now on homepage
      if (pathName === '/' && referrer.includes('/acquisition/config')) {
        setConfiguredAgents(prev => ({
          ...prev,
          'acquisition-agent': true
        }));
        
        // Save to localStorage
        localStorage.setItem('acquisition-agent-configured', 'true');
      }
      
      // If we just came from the pricing config page and are now on homepage
      if (pathName === '/' && referrer.includes('/pricing/config')) {
        setConfiguredAgents(prev => ({
          ...prev,
          'pricing-agent': true
        }));
        
        // Save to localStorage
        localStorage.setItem('pricing-agent-configured', 'true');
      }
      
      // If we just came from the cross-sell config page and are now on homepage
      if (pathName === '/' && referrer.includes('/cross-sell/config')) {
        setConfiguredAgents(prev => ({
          ...prev,
          'cross-sell-agent': true
        }));
        
        // Save to localStorage
        localStorage.setItem('cross-sell-agent-configured', 'true');
      }
      
      // If we just came from the survey-generation config page and are now on homepage
      if (pathName === '/' && referrer.includes('/survey-generation/config')) {
        setConfiguredAgents(prev => ({
          ...prev,
          'survey-generation': true
        }));
        
        // Save to localStorage
        localStorage.setItem('survey-generation-agent-configured', 'true');
      }
      
      // If we just came from the forecast config page and are now on homepage
      if (pathName === '/' && referrer.includes('/forecast/config')) {
        setConfiguredAgents(prev => ({
          ...prev,
          'forecast-agent': true
        }));
        
        // Save to localStorage
        localStorage.setItem('forecast-agent-configured', 'true');
      }

      // If we just came from the analyser config page and are now on homepage
      if (pathName === '/' && referrer.includes('/config/analyser')) {
        setConfiguredAgents(prev => ({
          ...prev,
          'analyser': true
        }));
      }

      // If we just came from the competitor-market config page and are now on homepage
      if (pathName === '/' && referrer.includes('/config/competitor-market')) {
        setConfiguredAgents(prev => ({
          ...prev,
          'competitor-market': true
        }));
      }

      // If we just came from the rfp config page and are now on homepage
      if (pathName === '/' && referrer.includes('/rfp/config')) {
        setConfiguredAgents(prev => ({
          ...prev,
          'rfp-agent': true
        }));
      }

      // If we just came from the enrichment config page and are now on homepage
      if (pathName === '/' && referrer.includes('/enrichment/config')) {
        setConfiguredAgents(prev => ({
          ...prev,
          'enrichment-agent': true
        }));
      }
    };
    
    checkConfigStatus();
  }, []);

  const handleAgentSelect = (agentId) => {
    console.log(`Agent selected: ${agentId}`);
    
    if (agentId === 'sales-coach') {
      navigate('/sales-coach/config-one');
    } else if (agentId === 'sdr-agent') {
      navigate('/sdr/layout-selector');
    } else if (agentId === 'churn-agent') {
      navigate('/churn/config-one');
    } else if (agentId === 'acquisition-agent') {
      navigate('/acquisition/config-one');
    } else if (agentId === 'pricing-agent') {
      navigate('/pricing/config-one');
    } else if (agentId === 'cross-sell-agent') {
      navigate('/cross-sell/config-one');
    } else if (agentId === 'survey-generation') {
      navigate('/survey-generation/config-one');
    } else if (agentId === 'forecast-agent') {
      navigate('/forecast/config-one');
    } else if (agentId === 'analyser') {
      navigate('/config/analyser/page-one');
    } else if (agentId === 'competitor-market') {
      navigate('/config/competitor-market');
    } else if (agentId === 'email-parser') {
      navigate('/email-parser/config-one');
    } else if (agentId === 'record-generation') {
      navigate('/record-generation/config-one');
    } else if (agentId === 'voc-tracker') {
      navigate('/voc-tracker/config-one');
    } else if (agentId === 'rfp-agent') {
      navigate('/rfp/config-one');
    } else if (agentId === 'enrichment-agent') {
      navigate('/enrichment/config');
    } else {
      // For now, non-configured agents will show an alert
      alert(`Configuration for ${agentId} is coming soon!`);
    }
  };

  // Primary agents (Sales Coach and SDR)
  const primaryAgentTypes = [
    { id: 'sales-coach', name: 'Sales Coach Agent', description: 'Helps sales representatives improve their sales skills', configured: configuredAgents['sales-coach'] },
    { id: 'sdr-agent', name: 'SDR Agent', description: 'Assists Sales Development Representatives with lead qualification', configured: configuredAgents['sdr-agent'] },
  ];

  // Revenue Growth agent types
  const revenueGrowthAgentTypes = [
    { id: 'acquisition-agent', name: 'Acquisition', description: 'Helps identify and acquire new customers to drive revenue growth', configured: configuredAgents['acquisition-agent'] },
    { id: 'pricing-agent', name: 'Pricing', description: 'Optimizes pricing strategies to maximize revenue and customer value', configured: configuredAgents['pricing-agent'] },
    { id: 'churn-agent', name: 'Churn', description: 'Identifies customers at risk of churning and suggests retention strategies', configured: configuredAgents['churn-agent'] },
    { id: 'cross-sell-agent', name: 'Cross Sell / Up Sell', description: 'Identifies opportunities to increase revenue through cross-selling and up-selling to existing customers', configured: configuredAgents['cross-sell-agent'] || false },
    { id: 'sales-research-agent', name: 'Sales Research', description: 'Conducts market and customer research to identify sales opportunities and trends', configured: configuredAgents['sales-research-agent'] || false }
  ];

  // Other agent types
  const otherAgentTypes = [
    { id: 'survey-generation', name: 'Survey Generation Agent', description: 'Creates custom surveys for customer feedback collection', configured: configuredAgents['survey-generation'] || false },
    { id: 'forecast-agent', name: 'Forecast Agent', description: 'Generates sales, revenue and business forecasts with anomaly detection', configured: configuredAgents['forecast-agent'] || false },
    { id: 'analyser', name: 'Analyser Agent', description: 'Analyzes data and generates reports/presentations from individual records or bulk data', configured: configuredAgents['analyser'] || false },
    { id: 'competitor-market', name: 'Competitor/Market Analyser', description: 'Provides insights on market trends and competitor activities', configured: configuredAgents['competitor-market'] || false },
    { id: 'email-parser', name: 'Email Parser Agent', description: 'Parses emails based on rules and criteria to create or update records', configured: configuredAgents['email-parser'] },
    { id: 'record-generation', name: 'Record Generation Agent', description: 'Automates the creation of records from existing data across modules', configured: configuredAgents['record-generation'] || false },
    { id: 'voc-tracker', name: 'VOC Tracker', description: 'Tracks and analyzes Voice of Customer metrics from multiple sources', configured: configuredAgents['voc-tracker'] || false },
    { id: 'rfp-agent', name: 'RFP Agent', description: 'Assists with creating and responding to Requests for Proposals', configured: configuredAgents['rfp-agent'] || false },
    { id: 'enrichment-agent', name: 'Enrichment Agent', description: 'Enriches customer data with additional information from various sources', configured: configuredAgents['enrichment-agent'] || false }
  ];

  // Reusable component for rendering agent cards
  const renderAgentCard = (agent) => (
            <Grid item xs={12} sm={6} md={4} key={agent.id}>
              <Card 
                variant="outlined" 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  },
                  bgcolor: agent.configured ? '#f9fbff' : 'inherit'
                }}
                onClick={() => handleAgentSelect(agent.id)}
              >
                <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <Typography variant="h6" component="div">
                    {agent.name}
                  </Typography>
            {agent.id === 'forecast-agent' && <ShowChartIcon color="primary" />}
          </Box>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    {agent.description}
                  </Typography>
                  {agent.configured ? (
                    <Box sx={{ mt: 2, display: 'inline-block', px: 1, py: 0.5, bgcolor: '#e3f2fd', borderRadius: 1, fontSize: 12 }}>
                      Configured
                    </Box>
                  ) : (
                    <Box sx={{ mt: 2, display: 'inline-block', px: 1, py: 0.5, bgcolor: '#f5f5f5', borderRadius: 1, fontSize: 12 }}>
                      Not Configured
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
  );

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" className="page-title">
          Agent Configuration Portal
        </Typography>
        <IconButton 
          color="primary" 
          aria-label="settings"
          onClick={() => navigate('/settings')}
          sx={{ 
            bgcolor: 'rgba(25, 118, 210, 0.08)', 
            '&:hover': { 
              bgcolor: 'rgba(25, 118, 210, 0.12)' 
            } 
          }}
        >
          <SettingsIcon />
        </IconButton>
      </Box>
      
      <Paper className="form-container" elevation={1}>
        <Typography variant="h6" gutterBottom>
          Select an agent to configure:
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Choose one of the available agents below to set up its configuration.
        </Typography>
        
        <Divider sx={{ mb: 3 }} />
        
        {/* Primary Agents Section */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}>
          Primary Agents
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {primaryAgentTypes.map(agent => renderAgentCard(agent))}
        </Grid>
        
        {/* Revenue Growth Section */}
        <Accordion defaultExpanded sx={{ mb: 3 }}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{ bgcolor: '#f5f5f5', borderRadius: '4px' }}
            aria-controls="revenue-growth-content"
            id="revenue-growth-header"
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              Revenue Growth Agent
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              These features are specifically designed to help increase revenue through various strategies.
            </Typography>
            <Grid container spacing={2}>
              {revenueGrowthAgentTypes.map(agent => renderAgentCard(agent))}
            </Grid>
          </AccordionDetails>
        </Accordion>
        
        {/* Other Agents Section */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Other Agents
        </Typography>
        <Grid container spacing={2}>
          {otherAgentTypes
            .filter(agent => agent.id !== 'survey-description' && agent.id !== 'presentation-report')
            .map(agent => renderAgentCard(agent))}
        </Grid>
      </Paper>
    </div>
  );
};

export default HomePage; 