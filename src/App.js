import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Stepper, Step, StepLabel, IconButton, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomePage from './components/HomePage';
import SalesCoachConfigPageOne from './components/SalesCoachConfigPageOne';
import SalesCoachConfigPageTwo from './components/SalesCoachConfigPageTwo';
import SDRConfigPageOne from './components/SDRConfigPageOne';
import SDRConfigPageTwo from './components/SDRConfigPageTwo';
import SDRConfigPageThree from './components/SDRConfigPageThree';
import SDRLayoutSelector from './components/SDRLayoutSelector';
import SDRConfigPageTwoLayout2 from './components/SDRConfigPageTwoLayout2';
import SDRConfigPageThreeLayout2 from './components/SDRConfigPageThreeLayout2';
import ChurnConfigPageOne from './components/ChurnConfigPageOne';
import ChurnConfigPageTwo from './components/ChurnConfigPageTwo';
import ChurnConfigPageThree from './components/ChurnConfigPageThree';
import AcquisitionConfigPageOne from './components/AcquisitionConfigPageOne';
import AcquisitionConfigPageTwo from './components/AcquisitionConfigPageTwo';
import SettingsPage from './components/SettingsPage';
import PricingConfigPageOne from './components/PricingConfigPageOne';
import PricingConfigPageTwo from './components/PricingConfigPageTwo';
import CrossSellConfigPageOne from './components/CrossSellConfigPageOne';
import CrossSellConfigPageTwo from './components/CrossSellConfigPageTwo';
import SurveyGenerationConfigPageOne from './components/SurveyGenerationConfigPageOne';
import SurveyGenerationConfigPageTwo from './components/SurveyGenerationConfigPageTwo';
import ForecastConfigPageOne from './components/ForecastConfigPageOne';
import ForecastConfigPageTwo from './components/ForecastConfigPageTwo';
import AnalyserConfigPageOne from './components/AnalyserConfigPageOne';
import AnalyserConfigPageTwo from './components/AnalyserConfigPageTwo';
import CompetitorMarketAnalyserConfig from './components/CompetitorMarketAnalyserConfig';
import EmailParserConfigPageOne from './components/EmailParserConfigPageOne';
import EmailParserConfigPageTwo from './components/EmailParserConfigPageTwo';
import EmailParserConfigPageThree from './components/EmailParserConfigPageThree';
import RecordGenerationConfigPageOne from './components/RecordGenerationConfigPageOne';
import RecordGenerationConfigPageTwo from './components/RecordGenerationConfigPageTwo';
import RecordGenerationConfigPageThree from './components/RecordGenerationConfigPageThree';
import VOCTrackerConfigPageOne from './components/VOCTrackerConfigPageOne';
import VOCTrackerConfigPageTwo from './components/VOCTrackerConfigPageTwo';
import RFPConfigPageOne from './components/RFPConfigPageOne';
import RFPConfigPageTwo from './components/RFPConfigPageTwo';
import EnrichmentAgentConfig from './components/EnrichmentAgentConfig';

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [configData, setConfigData] = useState({
    module: '',
    profiles: [],
    features: [],
    permissions: {
      accessMail: false,
      accessRecords: false,
      accessResources: false
    },
    model: '',
    instructionsList: [''],
    functionType: '',
    output: ''
  });
  
  // SDR config state
  const [sdrConfigData, setSdrConfigData] = useState({
    module: '',
    criteria: [{ field: '', operator: '', value: '' }],
    setupMeeting: false,
    model: '',
    permissions: {
      accessResources: false,
      accessRecordDetails: false
    },
    outreachMode: 'auto',
    outreachConfig: {
      businessHoursOnly: true,
      firstContactDelay: '24 hours',
      nudgeDelay: '3 days',
      maxNudges: 3
    },
    instructionsList: [''],
    profile: '',
    mandatoryInstructions: [],
    layout: ''
  });
  
  // Churn Agent config state
  const [churnConfigData, setChurnConfigData] = useState({
    model: 'gpt-4',
    churnType: {
      churned: false,
      partiallyChurned: false,
      aboutToChurn: false,
      oneTimeBuyers: false
    },
    permissions: {
      accessCRM: false,
      accessCustomerData: false,
      sendFollowupEmail: false
    },
    bookMeetingWithRecordOwner: false,
    activityPreferences: {
      churned: {
        sendPersonalisedEmail: false,
        sendPromotions: false,
        sendSurvey: false,
        provideOffer: false,
      },
      partiallyChurned: {
        sendPersonalisedEmail: false,
        sendPromotions: false,
        sendSurvey: false,
        provideOffer: false,
      },
      aboutToChurn: {
        sendPersonalisedEmail: false,
        sendPromotions: false,
        sendSurvey: false,
        provideOffer: false,
      },
      oneTimeBuyers: {
        sendPersonalisedEmail: false,
        sendPromotions: false,
        sendSurvey: false,
        provideOffer: false,
      }
    },
    timeframes: {
      churned: 6,
      partiallyChurned: 3,
      aboutToChurn: 1,
      oneTimeBuyers: 12
    },
    enableTimeframes: {
      churned: true,
      partiallyChurned: true,
      oneTimeBuyers: true
    },
    instructions: ""
  });

  // Acquisition Agent config state
  const [acquisitionConfigData, setAcquisitionConfigData] = useState({
    module: '',
    features: [],
    model: '',
    permissions: {
      crmData: false,
      conversations: false,
      resources: false,
      searchWeb: false
    },
    instructions: ''
  });

  // Initial state for pricing agent
  const [pricingConfigData, setPricingConfigData] = useState({
    features: [],
    companyDescription: '',
    competitors: [],
    pricingModels: ['dynamic']
  });

  // Initial state for cross-sell/up-sell
  const [crossSellConfigData, setCrossSellConfigData] = useState({
    sendMarketingEmail: false,
    suggestProductBundles: false,
    provideDiscounts: false,
    setupMeeting: false,
    minPurchaseProbability: 50,
    emailFrequency: 'monthly',
    instructions: ['Identify customers who have shown interest in complementary products', 'Focus on high-value customers with recent purchases']
  });

  // Initial state for survey generation agent
  const [surveyGenerationConfigData, setSurveyGenerationConfigData] = useState({
    module: '',
    surveyScope: 'individual',
    surveyType: '',
    criteria: [{ field: '', operator: '', value: '' }],
    instructions: ['Focus on gathering feedback about product usability', 'Keep questions concise and relevant']
  });

  // Initial state for forecast agent
  const [forecastConfigData, setForecastConfigData] = useState({
    forecastType: 'template',
    templateType: 'sales',
    module: '',
    detectAnomalies: false,
    suggestCorrections: false,
    includeEconomicData: false,
    instructions: ['Include monthly and quarterly projections', 'Highlight year-over-year growth rates']
  });

  // Initial state for analyser agent
  const [analyserConfigData, setAnalyserConfigData] = useState({
    analysisScope: 'individual',
    module: '',
    recordId: '',
    selectedModules: [],
    functionType: ['report'],
    includeZiaInsights: false,
    instructions: ['Extract key trends and patterns from the data', 'Include executive summary at the beginning']
  });

  // Initial state for competitor/market analyser
  const [competitorMarketConfigData, setCompetitorMarketConfigData] = useState({
    companyDescription: '',
    analysisType: 'market',
    competitors: [],
    analysisMode: 'generic',
    instructions: []
  });

  const [emailParserConfig, setEmailParserConfig] = useState({
    ruleName: '',
    modulePreference: '',
    emailCriteria: [''],
    sampleEmail: '',
    instructions: '',
    fields: [],
    assignmentRule: '',
    postParsingAction: 'createRecord',
    fieldUpdate: { name: '', value: '' }
  });

  // Initial state for record generation agent
  const [recordGenerationConfig, setRecordGenerationConfig] = useState({
    generateForModule: '',
    generateFromModule: '',
    includeConversation: false,
    includeNotes: false,
    recordData: {},
    instructions: [],
    previewRecord: '',
    creationApproval: 'create',
    ownershipOption: 'carry',
    assignmentRule: '',
    changeStatus: true,
    recordStatus: ''
  });

  // Add state for VOC Tracker
  const [vocTrackerConfig, setVOCTrackerConfig] = useState({
    functions: {
      monitorAndAlert: false,
      sendOutreach: false,
      connectWithOwner: false
    },
    dataSources: {
      email: false,
      social: false,
      calls: false
    },
    ownershipOption: 'carry',
    assignmentRule: '',
    instructions: [],
    outreachPreview: '',
    promptPreview: ''
  });

  // Add state for RFP Agent
  const [rfpAgentConfig, setRfpAgentConfig] = useState({
    ruleName: 'RFP Response Agent',
    emailCriteria: [{ field: 'subject', operator: 'contains', value: 'RFP' }],
    replyMode: 'draft',
    connectWithSalesRep: false,
    instructions: [
      'Acknowledge receipt of the RFP',
      'Confirm our interest in participating in the RFP process'
    ]
  });

  // Add state for Enrichment Agent
  const [enrichmentAgentConfig, setEnrichmentAgentConfig] = useState({
    name: 'Data Enrichment Agent',
    module: '',
    criteria: [{ field: '', operator: 'equals', value: '' }],
    dataSources: [],
    autoEnrich: true,
    scheduledEnrichment: false,
    enrichmentFrequency: 'weekly'
  });

  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  // Check if we're on a configuration page
  const isConfigPage = pathName.includes('/config/');
  
  // Variable to store active step index and stepper steps
  let stepIndex = 0;
  let steps = ['Step 1', 'Step 2'];

  // Determine which agent is being configured and set steps accordingly
  if (pathName === '/config/sales-coach/page-one' || pathName === '/config/sales-coach/page-two') {
    steps = ['Select Module', 'Choose Features', 'Review & Confirm'];
    stepIndex = pathName === '/config/sales-coach/page-one' ? 0 : 1;
  } else if (pathName === '/config/sdr-agent/page-one' || pathName === '/config/sdr-agent/page-two' || pathName === '/config/sdr-agent/page-three') {
    steps = ['Choose Template', 'Customize Template', 'Review & Complete'];
    stepIndex = pathName === '/config/sdr-agent/page-one' ? 0 : (pathName === '/config/sdr-agent/page-two' ? 1 : 2);
  } else if (pathName === '/config/survey-generator/page-one' || pathName === '/config/survey-generator/page-two') {
    steps = ['Configuration', 'Details & Preview'];
    stepIndex = pathName === '/config/survey-generator/page-one' ? 0 : 1;
  } else if (pathName === '/config/forecast/page-one' || pathName === '/config/forecast/page-two') {
    steps = ['Configuration', 'Instructions & Preview'];
    stepIndex = pathName === '/config/forecast/page-one' ? 0 : 1;
  }
  else if (
    pathName === '/config/analyser/page-one' ||
    pathName === '/config/analyser/page-two'
  ) {
    steps = ['Configuration', 'Instructions & Preview'];
    stepIndex = pathName === '/config/analyser/page-one' ? 0 : 1;
  }
  
  // Check if we're on SDR config pages
  const isSdrConfigPage = pathName.includes('/sdr/config') || 
                        pathName.includes('/sdr/layout2/config');
  
  // Check if we're on Churn config pages
  const isChurnConfigPage = pathName.includes('/churn/config');

  // Check if we're on Acquisition config pages
  const isAcquisitionConfigPage = pathName.includes('/acquisition/config');
  
  // Check if we're on Pricing config pages
  const isPricingConfigPage = pathName.includes('/pricing/config');
  
  // Check if we're on a settings page
  const isSettingsPage = pathName.includes('/settings');
  
  // Check if we're on Cross Sell / Up Sell config pages
  const isCrossSellConfigPage = pathName.includes('/cross-sell/config');
  
  // Check if we're on Survey Generation config pages
  const isSurveyGenerationConfigPage = pathName.includes('/survey-generation/config');
  
  // Check if we're on Forecast config pages
  const isForecastConfigPage = pathName.includes('/forecast/config');
  
  // Check if we're on Email Parser config pages
  const isEmailParserConfigPage = pathName.includes('/email-parser/config');
  
  // Check if we're on Record Generation config pages
  const isRecordGenerationConfigPage = pathName.includes('/record-generation/config');
  
  // Check if we're on VOC Tracker config pages
  const isVOCTrackerConfigPage = pathName.includes('/voc-tracker/config');
  
  // Helper function to determine the active step
  const getActiveStep = (isConfigPage, routes) => {
    if (!isConfigPage) return 0;
    
    const currentPath = pathName;
    for (let i = 0; i < routes.length; i++) {
      if (currentPath.includes(routes[i])) {
        return i;
      }
    }
    return 0;
  };
  
  // Determine which stepper to show
  const getStepperSteps = () => {
    if (pathName.includes('/sales-coach/config')) {
      return (
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Basic Configuration</StepLabel>
          </Step>
          <Step>
            <StepLabel>Function & Instructions</StepLabel>
          </Step>
        </Stepper>
      );
    } else if (pathName.includes('/sdr/config')) {
      if (pathName.includes('/layout-selector')) {
        return null;
      }
      return (
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Basic Configuration</StepLabel>
          </Step>
          <Step>
            <StepLabel>Outreach Settings</StepLabel>
          </Step>
          <Step>
            <StepLabel>Instructions</StepLabel>
          </Step>
        </Stepper>
      );
    } else if (pathName.includes('/churn/config')) {
      return (
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Basic Configuration</StepLabel>
          </Step>
          <Step>
            <StepLabel>Retention Strategy</StepLabel>
          </Step>
          <Step>
            <StepLabel>Instructions & Preview</StepLabel>
          </Step>
        </Stepper>
      );
    } else if (pathName.includes('/acquisition/config')) {
      return (
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Basic Configuration</StepLabel>
          </Step>
          <Step>
            <StepLabel>Instructions & Preview</StepLabel>
          </Step>
        </Stepper>
      );
    } else if (isPricingConfigPage) {
      return (
        <Stepper activeStep={getActiveStep(isPricingConfigPage, ['/pricing/config-one', '/pricing/config-two'])} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Feature Selection</StepLabel>
          </Step>
          <Step>
            <StepLabel>Company Information</StepLabel>
          </Step>
        </Stepper>
      );
    } else if (isCrossSellConfigPage) {
      return (
        <Stepper activeStep={getActiveStep(isCrossSellConfigPage, ['/cross-sell/config-one', '/cross-sell/config-two'])} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Basic Configuration</StepLabel>
          </Step>
          <Step>
            <StepLabel>Instructions & Review</StepLabel>
          </Step>
        </Stepper>
      );
    } else if (isSurveyGenerationConfigPage) {
      return (
        <Stepper activeStep={getActiveStep(isSurveyGenerationConfigPage, ['/survey-generation/config-one', '/survey-generation/config-two'])} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Basic Configuration</StepLabel>
          </Step>
          <Step>
            <StepLabel>Instructions & Preview</StepLabel>
          </Step>
        </Stepper>
      );
    } else if (isForecastConfigPage) {
      return (
        <Stepper activeStep={getActiveStep(isForecastConfigPage, ['/forecast/config-one', '/forecast/config-two'])} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Basic Configuration</StepLabel>
          </Step>
          <Step>
            <StepLabel>Instructions & Preview</StepLabel>
          </Step>
        </Stepper>
      );
    } else if (isEmailParserConfigPage) {
      return (
        <Stepper activeStep={getActiveStep(isEmailParserConfigPage, ['/email-parser/config-one', '/email-parser/config-two', '/email-parser/config-three'])} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Rule Setup</StepLabel>
          </Step>
          <Step>
            <StepLabel>Email Parsing</StepLabel>
          </Step>
          <Step>
            <StepLabel>Post-Parsing Actions</StepLabel>
          </Step>
        </Stepper>
      );
    } else if (isRecordGenerationConfigPage) {
      return (
        <Stepper activeStep={getActiveStep(isRecordGenerationConfigPage, ['/record-generation/config-one', '/record-generation/config-two', '/record-generation/config-three'])} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Module Setup</StepLabel>
          </Step>
          <Step>
            <StepLabel>Record Generation</StepLabel>
          </Step>
          <Step>
            <StepLabel>Post-Creation Actions</StepLabel>
          </Step>
        </Stepper>
      );
    } else if (isVOCTrackerConfigPage) {
      return (
        <Stepper activeStep={getActiveStep(isVOCTrackerConfigPage, ['/voc-tracker/config-one', '/voc-tracker/config-two'])} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Functions & Data Sources</StepLabel>
          </Step>
          <Step>
            <StepLabel>Configuration Details</StepLabel>
          </Step>
        </Stepper>
      );
    }
    return null;
  };
  
  const handleConfigUpdate = (newData) => {
    setConfigData(prevData => ({ ...prevData, ...newData }));
  };

  const handleSdrConfigUpdate = (newData) => {
    setSdrConfigData(prevData => ({ ...prevData, ...newData }));
  };
  
  const handleChurnConfigUpdate = (newData) => {
    setChurnConfigData(prevData => ({ ...prevData, ...newData }));
  };

  const handleAcquisitionConfigUpdate = (newData) => {
    setAcquisitionConfigData(prevData => ({ ...prevData, ...newData }));
  };

  const handleForecastConfigUpdate = (newData) => {
    setForecastConfigData(prevData => ({ ...prevData, ...newData }));
  };

  // Sales Coach Navigation Handlers
  const handleNext = (newData) => {
    handleConfigUpdate(newData);
    setActiveStep(1);
    navigate('/sales-coach/config-two');
  };

  const handleBack = () => {
    setActiveStep(0);
    navigate('/sales-coach/config-one');
  };

  // SDR Navigation Handlers
  const handleSdrLayoutSelect = (layout) => {
    setSdrConfigData(prevData => ({ ...prevData, layout }));
    
    if (layout === 'layout1') {
      navigate('/sdr/config-one');
    } else if (layout === 'layout2') {
      navigate('/sdr/layout2/config-one');
    }
  };

  const handleSdrNext = (newData, step) => {
    handleSdrConfigUpdate(newData);
    if (step === 1) {
      setActiveStep(1);
      navigate('/sdr/config-two');
    } else if (step === 2) {
      setActiveStep(2);
      navigate('/sdr/config-three');
    }
  };

  const handleSdrLayout2Next = (newData, step) => {
    handleSdrConfigUpdate(newData);
    if (step === 1) {
      setActiveStep(1);
      navigate('/sdr/layout2/config-two');
    } else if (step === 2) {
      setActiveStep(2);
      navigate('/sdr/layout2/config-three');
    }
  };

  const handleSdrBack = (step) => {
    if (step === 1) {
      setActiveStep(0);
      navigate('/sdr/config-one');
    } else if (step === 0) {
      setActiveStep(0);
      navigate('/');
    } else {
      setActiveStep(1);
      navigate('/sdr/config-two');
    }
  };
  
  const handleSdrLayout2Back = (step) => {
    if (step === 1) {
      setActiveStep(0);
      navigate('/sdr/layout2/config-one');
    } else if (step === 0) {
      setActiveStep(0);
      navigate('/');
    } else {
      setActiveStep(1);
      navigate('/sdr/layout2/config-two');
    }
  };
  
  // Churn Agent Navigation Handlers
  const handleChurnNext = (newData, step) => {
    handleChurnConfigUpdate(newData);
    if (step === 1) {
      setActiveStep(1);
      navigate('/churn/config-two');
    } else if (step === 2) {
      setActiveStep(2);
      navigate('/churn/config-three');
    }
  };

  const handleChurnBack = (step) => {
    if (step === 1) {
      setActiveStep(0);
      navigate('/churn/config-one');
    } else {
      setActiveStep(1);
      navigate('/churn/config-two');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
    setActiveStep(0);
  };

  const handleComplete = (newData) => {
    handleConfigUpdate(newData);
    console.log('Final Sales Coach Configuration:', configData);
    // Here would be code to submit the configuration
    alert('Sales Coach Configuration saved successfully!');
    // Navigate back to home page
    navigate('/');
  };
  
  const handleSdrComplete = (newData) => {
    handleSdrConfigUpdate(newData);
    console.log('Final SDR Configuration:', sdrConfigData);
    // Here would be code to submit the configuration
    alert('SDR Configuration saved successfully!');
    // Navigate back to home page
    navigate('/');
  };
  
  const handleChurnComplete = (newData) => {
    handleChurnConfigUpdate(newData);
    console.log('Final Churn Agent Configuration:', churnConfigData);
    // Here would be code to submit the configuration
    alert('Churn Agent Configuration saved successfully!');
    // Navigate back to home page
    navigate('/');
  };

  // Acquisition Agent Navigation Handlers
  const handleAcquisitionNext = (newData, step) => {
    handleAcquisitionConfigUpdate(newData);
    if (step === 1) {
      setActiveStep(1);
      navigate('/acquisition/config-two');
    }
  };

  const handleAcquisitionBack = (step) => {
    if (step === 1) {
      setActiveStep(0);
      navigate('/acquisition/config-one');
    }
  };

  const handleAcquisitionComplete = (newData) => {
    handleAcquisitionConfigUpdate(newData);
    console.log('Final Acquisition Agent Configuration:', acquisitionConfigData);
    
    // Mark the acquisition agent as configured in localStorage
    localStorage.setItem('acquisition-agent-configured', 'true');
    
    // Here would be code to submit the configuration
    alert('Acquisition Agent Configuration saved successfully!');
    // Navigate back to home page
    navigate('/');
  };

  // Forecast Agent Navigation Handlers
  const handleForecastNext = (newData, step) => {
    handleForecastConfigUpdate(newData);
    if (step === 1) {
      setActiveStep(1);
      navigate('/forecast/config-two');
    }
  };

  const handleForecastBack = (step) => {
    if (step === 1) {
      setActiveStep(0);
      navigate('/forecast/config-one');
    }
  };

  const handleForecastComplete = (newData) => {
    handleForecastConfigUpdate(newData);
    // Mark as configured in local storage
    localStorage.setItem('forecast-agent-configured', 'true');
    navigate('/');
  };

  const handleEmailParserNext = (step, data) => {
    setEmailParserConfig(prev => ({ ...prev, ...data }));
    if (step === 1) {
      navigate('/email-parser/config-two');
    } else if (step === 2) {
      // Only go to page three if module is selected
      if (emailParserConfig.modulePreference && emailParserConfig.modulePreference !== 'noModule') {
        navigate('/email-parser/config-three');
      } else {
        // Complete the process
        navigate('/');
      }
    }
  };

  const handleEmailParserComplete = (data) => {
    setEmailParserConfig(prev => ({ ...prev, ...data }));
    // Store in localStorage and mark as configured
    localStorage.setItem('emailParserConfigThree', JSON.stringify(data));
    localStorage.setItem('emailParserConfigComplete', 'true');
    navigate('/');
  };

  // Record Generation Navigation Handlers
  const handleRecordGenerationNext = (step, data) => {
    setRecordGenerationConfig(prev => ({ ...prev, ...data }));
    if (step === 1) {
      navigate('/record-generation/config-two');
    } else if (step === 2) {
      navigate('/record-generation/config-three');
    }
  };

  const handleRecordGenerationComplete = (data) => {
    setRecordGenerationConfig(prev => ({ ...prev, ...data }));
    // Store in localStorage and mark as configured
    localStorage.setItem('recordGenerationConfigThree', JSON.stringify(data));
    localStorage.setItem('record-generation-agent-configured', 'true');
    navigate('/');
  };

  // VOC Tracker Navigation Handlers
  const handleVOCTrackerNext = (data) => {
    setVOCTrackerConfig(prev => ({ ...prev, ...data }));
    navigate('/voc-tracker/config-two');
  };

  const handleVOCTrackerComplete = (data) => {
    setVOCTrackerConfig(data);
    localStorage.setItem('voc-tracker-configured', 'true');
    navigate('/');
  };

  // Handlers for RFP Agent
  const handleRFPAgentNext = (data) => {
    setRfpAgentConfig({...rfpAgentConfig, ...data});
    navigate('/rfp/config-two');
  };
  
  const handleRFPAgentComplete = (data) => {
    setRfpAgentConfig({...rfpAgentConfig, ...data});
    localStorage.setItem('rfpConfig', JSON.stringify({...rfpAgentConfig, ...data}));
    navigate('/');
  };

  // Handler for Enrichment Agent
  const handleEnrichmentAgentComplete = (data) => {
    setEnrichmentAgentConfig(data);
    localStorage.setItem('enrichment-agent-config', JSON.stringify(data));
    localStorage.setItem('enrichment-agent-configured', 'true');
    navigate('/');
  };

  return (
    <div>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          {(isConfigPage || isSettingsPage) && (
            <IconButton edge="start" color="inherit" onClick={() => navigate('/')} aria-label="back">
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h6" color="inherit" noWrap>
            Agent Configuration Portal
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {isConfigPage && (
          <Stepper activeStep={stepIndex} sx={{ mb: 4 }}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Settings Route */}
          <Route path="/settings" element={<SettingsPage />} />
          
          {/* Sales Coach Routes */}
          <Route 
            path="/sales-coach/config-one" 
            element={
              <SalesCoachConfigPageOne 
                configData={configData} 
                onNext={handleNext} 
              />
            } 
          />
          <Route 
            path="/sales-coach/config-two" 
            element={
              <SalesCoachConfigPageTwo 
                configData={configData}
                onBack={handleBack}
                onComplete={handleComplete}
              />
            } 
          />
          
          {/* SDR Agent Layout Selector */}
          <Route 
            path="/sdr/layout-selector" 
            element={
              <SDRLayoutSelector 
                onLayoutSelect={handleSdrLayoutSelect} 
              />
            } 
          />
          
          {/* SDR Agent Routes - Layout 1 */}
          <Route 
            path="/sdr/config-one" 
            element={
              <SDRConfigPageOne 
                configData={sdrConfigData} 
                onNext={(data) => handleSdrNext(data, 1)} 
              />
            } 
          />
          <Route 
            path="/sdr/config-two" 
            element={
              <SDRConfigPageTwo 
                configData={sdrConfigData}
                onBack={() => handleSdrBack(1)}
                onNext={(data) => handleSdrNext(data, 2)}
              />
            } 
          />
          <Route 
            path="/sdr/config-three" 
            element={
              <SDRConfigPageThree 
                configData={sdrConfigData}
                onBack={() => handleSdrBack(2)}
                onComplete={handleSdrComplete}
              />
            } 
          />
          
          {/* SDR Agent Routes - Layout 2 */}
          <Route 
            path="/sdr/layout2/config-one" 
            element={
              <SDRConfigPageOne 
                configData={sdrConfigData} 
                onNext={(data) => handleSdrLayout2Next(data, 1)} 
              />
            } 
          />
          <Route 
            path="/sdr/layout2/config-two" 
            element={
              <SDRConfigPageTwoLayout2 
                configData={sdrConfigData}
                onBack={() => handleSdrLayout2Back(1)}
                onNext={(data) => handleSdrLayout2Next(data, 2)}
              />
            } 
          />
          <Route 
            path="/sdr/layout2/config-three" 
            element={
              <SDRConfigPageThreeLayout2 
                configData={sdrConfigData}
                onBack={() => handleSdrLayout2Back(2)}
                onComplete={handleSdrComplete}
              />
            } 
          />
          
          {/* Churn Agent Routes */}
          <Route 
            path="/churn/config-one" 
            element={
              <ChurnConfigPageOne 
                configData={churnConfigData} 
                onNext={(data) => handleChurnNext(data, 1)} 
              />
            } 
          />
          <Route 
            path="/churn/config-two" 
            element={
              <ChurnConfigPageTwo 
                configData={churnConfigData}
                onBack={() => handleChurnBack(1)}
                onNext={(data) => handleChurnNext(data, 2)}
              />
            } 
          />
          <Route 
            path="/churn/config-three" 
            element={
              <ChurnConfigPageThree 
                configData={churnConfigData}
                onBack={() => handleChurnBack(2)}
                onConfigUpdate={handleChurnConfigUpdate}
              />
            } 
          />

          {/* Acquisition Agent Routes */}
          <Route 
            path="/acquisition/config-one" 
            element={
              <AcquisitionConfigPageOne 
                configData={acquisitionConfigData} 
                onNext={(data) => handleAcquisitionNext(data, 1)} 
              />
            } 
          />
          <Route 
            path="/acquisition/config-two" 
            element={
              <AcquisitionConfigPageTwo 
                configData={acquisitionConfigData}
                onBack={() => handleAcquisitionBack(1)}
                onComplete={handleAcquisitionComplete}
              />
            } 
          />

          {/* Pricing Agent Routes */}
          <Route 
            path="/pricing/config-one" 
            element={
              <PricingConfigPageOne 
                configData={pricingConfigData} 
                onNext={(data) => {
                  setPricingConfigData({...pricingConfigData, ...data});
                  navigate('/pricing/config-two');
                }} 
              />
            }
          />
          <Route 
            path="/pricing/config-two" 
            element={
              <PricingConfigPageTwo 
                configData={pricingConfigData} 
                onNext={(data) => {
                  setPricingConfigData({...pricingConfigData, ...data});
                  // Mark as configured in local storage
                  localStorage.setItem('pricing-agent-configured', 'true');
                  navigate('/');
                }} 
                onBack={() => navigate('/pricing/config-one')}
              />
            }
          />

          {/* Cross Sell / Up Sell Routes */}
          <Route 
            path="/cross-sell/config-one" 
            element={
              <CrossSellConfigPageOne 
                configData={crossSellConfigData} 
                onNext={(data) => {
                  setCrossSellConfigData({...crossSellConfigData, ...data});
                  navigate('/cross-sell/config-two');
                }} 
              />
            }
          />
          <Route 
            path="/cross-sell/config-two" 
            element={
              <CrossSellConfigPageTwo 
                configData={crossSellConfigData} 
                onNext={(data) => {
                  setCrossSellConfigData({...crossSellConfigData, ...data});
                  // Mark as configured in local storage
                  localStorage.setItem('cross-sell-agent-configured', 'true');
                  navigate('/');
                }} 
                onBack={() => navigate('/cross-sell/config-one')}
              />
            }
          />

          {/* Survey Generation Agent Routes */}
          <Route 
            path="/survey-generation/config-one" 
            element={
              <SurveyGenerationConfigPageOne 
                configData={surveyGenerationConfigData} 
                onNext={(data) => {
                  setSurveyGenerationConfigData({...surveyGenerationConfigData, ...data});
                  navigate('/survey-generation/config-two');
                }} 
              />
            }
          />
          <Route 
            path="/survey-generation/config-two" 
            element={
              <SurveyGenerationConfigPageTwo 
                configData={surveyGenerationConfigData} 
                onNext={(data) => {
                  setSurveyGenerationConfigData({...surveyGenerationConfigData, ...data});
                  // Mark as configured in local storage
                  localStorage.setItem('survey-generation-agent-configured', 'true');
                  navigate('/');
                }} 
                onBack={() => navigate('/survey-generation/config-one')}
              />
            }
          />

          {/* Forecast Agent Routes */}
          <Route 
            path="/forecast/config-one" 
            element={
              <ForecastConfigPageOne 
                configData={forecastConfigData} 
                onNext={(data) => handleForecastNext(data, 1)} 
              />
            }
          />
          <Route 
            path="/forecast/config-two" 
            element={
              <ForecastConfigPageTwo 
                configData={forecastConfigData}
                onBack={() => handleForecastBack(1)}
                onNext={handleForecastComplete}
              />
            }
          />

          {/* Analyser Agent Routes */}
          <Route 
            path="/config/analyser/page-one" 
            element={
              <AnalyserConfigPageOne 
                configData={analyserConfigData} 
                onNext={(data) => {
                  setAnalyserConfigData(data);
                  navigate('/config/analyser/page-two');
                }} 
              />
            } 
          />
          <Route 
            path="/config/analyser/page-two" 
            element={
              <AnalyserConfigPageTwo 
                configData={analyserConfigData}
                onBack={() => navigate('/config/analyser/page-one')}
                onComplete={(data) => {
                  setAnalyserConfigData(data);
                  localStorage.setItem('analyser-agent-config', JSON.stringify(data));
                  navigate('/');
                }}
              />
            } 
          />

          {/* Competitor/Market Analyser Route */}
          <Route 
            path="/config/competitor-market" 
            element={
              <CompetitorMarketAnalyserConfig 
                configData={competitorMarketConfigData}
                onComplete={(data) => {
                  setCompetitorMarketConfigData(data);
                  localStorage.setItem('competitor-market-config', JSON.stringify(data));
                  navigate('/');
                }}
              />
            } 
          />

          {/* Email Parser Routes */}
          <Route 
            path="/email-parser/config-one" 
            element={
              <EmailParserConfigPageOne 
                onBack={() => navigate('/')}
                onNext={(data) => handleEmailParserNext(1, data)}
              />
            }
          />
          <Route 
            path="/email-parser/config-two" 
            element={
              <EmailParserConfigPageTwo 
                onBack={() => navigate('/email-parser/config-one')}
                onNext={(data) => handleEmailParserNext(2, data)}
              />
            }
          />
          <Route 
            path="/email-parser/config-three" 
            element={
              <EmailParserConfigPageThree 
                onBack={() => navigate('/email-parser/config-two')}
                onComplete={handleEmailParserComplete}
              />
            }
          />

          {/* Record Generation Routes */}
          <Route 
            path="/record-generation/config-one" 
            element={
              <RecordGenerationConfigPageOne 
                onBack={() => navigate('/')}
                onNext={(data) => handleRecordGenerationNext(1, data)}
              />
            }
          />
          <Route 
            path="/record-generation/config-two" 
            element={
              <RecordGenerationConfigPageTwo 
                onBack={() => navigate('/record-generation/config-one')}
                onNext={(data) => handleRecordGenerationNext(2, data)}
              />
            }
          />
          <Route 
            path="/record-generation/config-three" 
            element={
              <RecordGenerationConfigPageThree 
                onBack={() => navigate('/record-generation/config-two')}
                onComplete={handleRecordGenerationComplete}
              />
            }
          />

          {/* VOC Tracker Routes */}
          <Route 
            path="/voc-tracker/config-one" 
            element={
              <VOCTrackerConfigPageOne 
                onBack={() => navigate('/')}
                onNext={handleVOCTrackerNext}
                onComplete={handleVOCTrackerComplete}
              />
            }
          />
          <Route 
            path="/voc-tracker/config-two" 
            element={
              <VOCTrackerConfigPageTwo 
                onBack={() => navigate('/voc-tracker/config-one')}
                onComplete={handleVOCTrackerComplete}
              />
            } 
          />
          
          {/* RFP Agent Routes */}
          <Route 
            path="/rfp/config-one" 
            element={
              <RFPConfigPageOne 
                onBack={() => navigate('/')}
                onNext={handleRFPAgentNext}
              />
            }
          />
          <Route 
            path="/rfp/config-two" 
            element={
              <RFPConfigPageTwo 
                onBack={() => navigate('/rfp/config-one')}
                onComplete={handleRFPAgentComplete}
              />
            } 
          />
          
          {/* Enrichment Agent Route */}
          <Route 
            path="/enrichment/config" 
            element={
              <EnrichmentAgentConfig 
                onComplete={handleEnrichmentAgentComplete}
              />
            } 
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App; 