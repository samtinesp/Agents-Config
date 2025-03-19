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
  IconButton,
  Tabs,
  Tab,
  ListItemSecondaryAction,
  Chip,
  Collapse
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ComposedChart,
  Area 
} from 'recharts';

const ForecastConfigPageTwo = ({ configData, onNext, onBack }) => {
  const navigate = useNavigate();
  const [localConfig, setLocalConfig] = useState({
    instructions: configData.instructions || [
      'Include monthly and quarterly projections',
      'Highlight year-over-year growth rates'
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
    onNext(localConfig);
  };

  // Get forecast template label for display
  const getForecastTypeLabel = () => {
    if (localConfig.forecastType === 'template') {
      const templates = {
        'sales': 'Sales Forecast',
        'revenue': 'Revenue Forecast',
        'demand': 'Demand Forecast',
        'inventory': 'Inventory Forecast',
        'cash-flow': 'Cash Flow Forecast'
      };
      return templates[localConfig.templateType] || 'Custom Forecast';
    } else {
      // If custom, show the module
      const modules = {
        'sales': 'Sales Module',
        'service': 'Service Module',
        'marketing': 'Marketing Module',
        'operations': 'Operations Module',
        'finance': 'Finance Module'
      };
      return `Custom Forecast (${modules[localConfig.module] || 'General'})`;
    }
  };

  // Sample data for charts
  const getSalesData = () => [
    { month: 'Jan', sales: 1245000, lastYear: 1108800, growth: 12.3 },
    { month: 'Feb', sales: 1180000, lastYear: 1085500, growth: 8.7 },
    { month: 'Mar', sales: 1320000, lastYear: 1146000, growth: 15.2 },
    { month: 'Apr', sales: 1275000, lastYear: 1161200, growth: 9.8 },
    { month: 'May', sales: 1310000, lastYear: 1174900, growth: 11.5 },
    { month: 'Jun', sales: 1390000, lastYear: 1212000, growth: 14.7 },
    { month: 'Jul', sales: 1360000, lastYear: 1224000, growth: 11.1 },
    { month: 'Aug', sales: 1340000, lastYear: 1236800, growth: 8.3 },
    { month: 'Sep', sales: 1430000, lastYear: 1273800, growth: 12.3 },
    { month: 'Oct', sales: 1520000, lastYear: 1368000, growth: 11.1 },
    { month: 'Nov', sales: 1550000, lastYear: 1376000, growth: 12.6 },
    { month: 'Dec', sales: 1630000, lastYear: 1411700, growth: 15.5 }
  ];

  const getRevenueData = () => [
    { quarter: 'Q1', productA: 842000, productB: 625000, services: 405000, subscriptions: 380000, other: 92000 },
    { quarter: 'Q2', productA: 905000, productB: 640000, services: 440000, subscriptions: 410000, other: 95000 },
    { quarter: 'Q3', productA: 950000, productB: 690000, services: 470000, subscriptions: 450000, other: 98000 },
    { quarter: 'Q4', productA: 1120000, productB: 780000, services: 520000, subscriptions: 490000, other: 105000 }
  ];

  const getDemandData = () => [
    { month: 'Jan', forecast: 3200, actual: 3150, threshold: 3000 },
    { month: 'Feb', forecast: 3350, actual: 3280, threshold: 3000 },
    { month: 'Mar', forecast: 3500, actual: 3620, threshold: 3000 },
    { month: 'Apr', forecast: 3700, actual: 3580, threshold: 3000 },
    { month: 'May', forecast: 3850, actual: 3910, threshold: 3000 },
    { month: 'Jun', forecast: 4000, actual: 4120, threshold: 3000 },
    { month: 'Jul', forecast: 4200, actual: 4050, threshold: 3000 },
    { month: 'Aug', forecast: 4100, actual: 4230, threshold: 3000 },
    { month: 'Sep', forecast: 4300, actual: 4150, threshold: 3000 },
    { month: 'Oct', forecast: 4500, actual: null, threshold: 3000 },
    { month: 'Nov', forecast: 4700, actual: null, threshold: 3000 },
    { month: 'Dec', forecast: 5000, actual: null, threshold: 3000 }
  ];

  const getInventoryData = () => [
    { month: 'Jan', inventory: 2500, optimal: 2400, excess: 2800, shortage: 2200 },
    { month: 'Feb', inventory: 2450, optimal: 2400, excess: 2800, shortage: 2200 },
    { month: 'Mar', inventory: 2350, optimal: 2400, excess: 2800, shortage: 2200 },
    { month: 'Apr', inventory: 2150, optimal: 2400, excess: 2800, shortage: 2200 },
    { month: 'May', inventory: 2050, optimal: 2400, excess: 2800, shortage: 2200 },
    { month: 'Jun', inventory: 2700, optimal: 2400, excess: 2800, shortage: 2200 },
    { month: 'Jul', inventory: 2600, optimal: 2400, excess: 2800, shortage: 2200 },
    { month: 'Aug', inventory: 2500, optimal: 2400, excess: 2800, shortage: 2200 },
    { month: 'Sep', inventory: 2450, optimal: 2400, excess: 2800, shortage: 2200 },
    { month: 'Oct', inventory: 2600, optimal: 2400, excess: 2800, shortage: 2200 },
    { month: 'Nov', inventory: 2800, optimal: 2400, excess: 2800, shortage: 2200 },
    { month: 'Dec', inventory: 2750, optimal: 2400, excess: 2800, shortage: 2200 }
  ];

  const getCashFlowData = () => [
    { month: 'Jan', inflow: 1200000, outflow: 980000, net: 220000 },
    { month: 'Feb', inflow: 1150000, outflow: 1050000, net: 100000 },
    { month: 'Mar', inflow: 1350000, outflow: 1100000, net: 250000 },
    { month: 'Apr', inflow: 1280000, outflow: 1180000, net: 100000 },
    { month: 'May', inflow: 1320000, outflow: 1150000, net: 170000 },
    { month: 'Jun', inflow: 1420000, outflow: 1280000, net: 140000 },
    { month: 'Jul', inflow: 1380000, outflow: 1250000, net: 130000 },
    { month: 'Aug', inflow: 1350000, outflow: 1200000, net: 150000 },
    { month: 'Sep', inflow: 1450000, outflow: 1250000, net: 200000 },
    { month: 'Oct', inflow: 1550000, outflow: 1350000, net: 200000 },
    { month: 'Nov', inflow: 1600000, outflow: 1400000, net: 200000 },
    { month: 'Dec', inflow: 1650000, outflow: 1450000, net: 200000 }
  ];

  const getChartData = () => {
    if (localConfig.forecastType === 'template') {
      switch(localConfig.templateType) {
        case 'sales':
          return getSalesData();
        case 'revenue':
          return getRevenueData();
        case 'demand':
          return getDemandData();
        case 'inventory':
          return getInventoryData();
        case 'cash-flow':
          return getCashFlowData();
        default:
          return getSalesData();
      }
    } else {
      // For custom forecasts, just return sales data as example
      return getSalesData();
    }
  };

  // Render appropriate chart based on selected forecast type
  const renderForecastChart = () => {
    if (localConfig.forecastType === 'template') {
      switch(localConfig.templateType) {
        case 'sales':
          return (
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={getChartData()} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" tickFormatter={tick => `$${(tick/1000000).toFixed(1)}M`} />
                <YAxis yAxisId="right" orientation="right" tickFormatter={tick => `${tick}%`} />
                <Tooltip formatter={(value, name) => {
                  if (name === 'sales' || name === 'lastYear') {
                    return [`$${(value/1000000).toFixed(2)}M`, name === 'sales' ? 'Current Year' : 'Last Year'];
                  }
                  return [`${value}%`, 'YoY Growth'];
                }} />
                <Legend />
                <Bar yAxisId="left" dataKey="sales" name="Current Year" fill="#8884d8" barSize={20} />
                <Bar yAxisId="left" dataKey="lastYear" name="Last Year" fill="#82ca9d" barSize={20} />
                <Line yAxisId="right" type="monotone" dataKey="growth" name="YoY Growth %" stroke="#ff7300" activeDot={{ r: 8 }} />
              </ComposedChart>
            </ResponsiveContainer>
          );
        case 'revenue':
          return (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getChartData()} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis tickFormatter={tick => `$${(tick/1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value) => [`$${(value/1000000).toFixed(2)}M`]} />
                <Legend />
                <Bar dataKey="productA" name="Product A" stackId="a" fill="#8884d8" />
                <Bar dataKey="productB" name="Product B" stackId="a" fill="#82ca9d" />
                <Bar dataKey="services" name="Services" stackId="a" fill="#ffc658" />
                <Bar dataKey="subscriptions" name="Subscriptions" stackId="a" fill="#ff8042" />
                <Bar dataKey="other" name="Other" stackId="a" fill="#0088fe" />
              </BarChart>
            </ResponsiveContainer>
          );
        case 'demand':
          return (
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={getChartData()} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="actual" name="Actual" stroke="#82ca9d" strokeWidth={2} dot={{ r: 6 }} />
                <Line type="monotone" dataKey="threshold" name="Threshold" stroke="#ff0000" strokeDasharray="5 5" />
              </ComposedChart>
            </ResponsiveContainer>
          );
        case 'inventory':
          return (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getChartData()} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="inventory" name="Inventory Level" stroke="#8884d8" strokeWidth={3} />
                <Line type="monotone" dataKey="optimal" name="Optimal Level" stroke="#82ca9d" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="excess" name="Excess Threshold" stroke="#ff7300" strokeDasharray="3 3" />
                <Line type="monotone" dataKey="shortage" name="Shortage Risk" stroke="#ff0000" strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
          );
        case 'cash-flow':
          return (
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={getChartData()} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={tick => `$${(tick/1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value) => [`$${(value/1000000).toFixed(2)}M`]} />
                <Legend />
                <Bar dataKey="inflow" name="Cash Inflow" fill="#82ca9d" />
                <Bar dataKey="outflow" name="Cash Outflow" fill="#8884d8" />
                <Line type="monotone" dataKey="net" name="Net Cash Flow" stroke="#ff7300" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          );
        default:
          return (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getSalesData()} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="forecast" stroke="#8884d8" />
                <Line type="monotone" dataKey="actual" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          );
      }
    } else {
      // Default chart for custom forecast
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={getSalesData()} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={tick => `$${(tick/1000000).toFixed(1)}M`} />
            <Tooltip formatter={(value) => [`$${(value/1000000).toFixed(2)}M`]} />
            <Legend />
            <Line type="monotone" dataKey="sales" name="Forecast" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="lastYear" name="Previous Period" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      );
    }
  };
  
  // Update the typography styling for tables to ensure proper alignment
  const tableTypographyStyle = {
    whiteSpace: 'pre',
    fontFamily: 'Consolas, "Courier New", monospace',
    fontSize: '0.875rem',
    lineHeight: 1.5,
    overflow: 'visible',
    tabSize: 2
  };

  // Sample forecast preview based on selected type
  const getForecastPreview = () => {
    // Common header with date
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const header = `# ${getForecastTypeLabel()}
Generated on ${currentDate}`;

    // Base on template or module type
    if (localConfig.forecastType === 'template') {
      switch(localConfig.templateType) {
        case 'sales':
          return (
            <>
              <Typography variant="body2" component="pre" sx={{ 
                whiteSpace: 'pre-wrap', 
                fontFamily: 'monospace', 
                mb: 2,
                maxWidth: '100%'
              }}>
                {header}

## Sales Projection
              </Typography>
              
              {renderForecastChart()}
              
              <Box sx={{ overflowX: 'auto', mt: 3 }}>
                <Typography component="pre" sx={tableTypographyStyle}>
{`| Month | Sales    | Growth  |
|-------|----------|---------|
| Jan   | $1.2M    | +12.3%  |
| Feb   | $1.1M    | +8.7%   |
| Mar   | $1.3M    | +15.2%  |
| Q2    | $3.9M    | +12.1%  |
| Q3    | $4.2M    | +13.5%  |
| Q4    | $4.6M    | +15.2%  |`}
                </Typography>

                {localConfig.detectAnomalies && (
                  <Typography component="pre" sx={{ ...tableTypographyStyle, mt: 2 }}>
{`## Anomalies
• Feb: Lower growth than expected
• Q3: Accelerated growth vs. history`}
                  </Typography>
                )}

                {localConfig.suggestCorrections && (
                  <Typography component="pre" sx={{ ...tableTypographyStyle, mt: 2 }}>
{`## Actions
• Increase Feb marketing spend
• Prepare for Q3/Q4 demand surge`}
                  </Typography>
                )}

                {localConfig.includeEconomicData && (
                  <Typography component="pre" sx={{ ...tableTypographyStyle, mt: 2 }}>
{`## Economic Context
• Inflation: 2.8% 
• Consumer spending: +3.2%`}
                  </Typography>
                )}
              </Box>
            </>
          );

        case 'revenue':
          return (
            <>
              <Typography variant="body2" component="pre" sx={{ 
                whiteSpace: 'pre-wrap', 
                fontFamily: 'monospace', 
                mb: 2 
              }}>
                {header}
                
## Revenue Breakdown
              </Typography>
              
              {renderForecastChart()}
              
              <Box sx={{ overflowX: 'auto', mt: 3 }}>
                <Typography component="pre" sx={tableTypographyStyle}>
{`| Stream       | Q1      | Q2      | Q3      | Q4      | Total    | YoY     |
|--------------|---------|---------|---------|---------|----------|---------|
| Product A    | $0.84M  | $0.91M  | $0.95M  | $1.12M  | $3.82M   | +14.2%  |
| Product B    | $0.63M  | $0.64M  | $0.69M  | $0.78M  | $2.74M   | +8.5%   |
| Services     | $0.41M  | $0.44M  | $0.47M  | $0.52M  | $1.84M   | +22.3%  |
| **TOTAL**    | $2.34M  | $2.49M  | $2.66M  | $3.02M  | $10.5M   | +15.8%  |`}
                </Typography>

                {localConfig.detectAnomalies && (
                  <Typography component="pre" sx={{ ...tableTypographyStyle, mt: 2 }}>
{`## Insights
• Subscriptions growing 31.7% YoY
• Q4 Product A growth anomaly`}
                  </Typography>
                )}

                {localConfig.suggestCorrections && (
                  <Typography component="pre" sx={{ ...tableTypographyStyle, mt: 2 }}>
{`## Recommendations
• Boost subscription marketing
• Review Product B pricing`}
                  </Typography>
                )}

                {localConfig.includeEconomicData && (
                  <Typography component="pre" sx={{ ...tableTypographyStyle, mt: 2 }}>
{`## Market
• Market growth: 5.3% CAGR
• Increasing price competition`}
                  </Typography>
                )}
              </Box>
            </>
          );

        case 'demand':
        case 'inventory':
        case 'cash-flow':
          return (
            <>
              <Typography variant="body2" component="pre" sx={{ 
                whiteSpace: 'pre-wrap', 
                fontFamily: 'monospace', 
                mb: 2 
              }}>
                {header}
                
## Forecast Summary
              </Typography>
              
              {renderForecastChart()}
              
              <Box sx={{ overflowX: 'auto', mt: 3 }}>
                <Typography component="pre" sx={tableTypographyStyle}>
{`| Period   | Forecast | Change  |
|----------|----------|---------|
| Q1 2023  | ...      | ...     |
| Q2 2023  | ...      | ...     |
| Q3 2023  | ...      | ...     |
| Q4 2023  | ...      | ...     |`}
                </Typography>

                {localConfig.detectAnomalies && (
                  <Typography component="pre" sx={{ ...tableTypographyStyle, mt: 2 }}>
{`## Anomalies
• Key pattern 1
• Key pattern 2`}
                  </Typography>
                )}

                {localConfig.suggestCorrections && (
                  <Typography component="pre" sx={{ ...tableTypographyStyle, mt: 2 }}>
{`## Actions
• Recommended action 1
• Recommended action 2`}
                  </Typography>
                )}

                {localConfig.includeEconomicData && (
                  <Typography component="pre" sx={{ ...tableTypographyStyle, mt: 2 }}>
{`## Context
• Key indicator 1
• Key indicator 2`}
                  </Typography>
                )}
              </Box>
            </>
          );

        default:
          return (
            <>
              <Typography variant="body2" component="pre" sx={{ 
                whiteSpace: 'pre-wrap', 
                fontFamily: 'monospace', 
                mb: 2 
              }}>
                {header}
                
## Forecast Details
              </Typography>
              
              {renderForecastChart()}
              
              <Box sx={{ overflowX: 'auto', mt: 3 }}>
                <Typography component="pre" sx={tableTypographyStyle}>
{`| Period   | Value    | Change  |
|----------|----------|---------|
| Q1       | ...      | ...     |
| Q2       | ...      | ...     |
| Q3       | ...      | ...     |
| Q4       | ...      | ...     |`}
                </Typography>

                {localConfig.detectAnomalies && (
                  <Typography component="pre" sx={{ ...tableTypographyStyle, mt: 2 }}>
{`## Anomalies
• ...
• ...`}
                  </Typography>
                )}

                {localConfig.suggestCorrections && (
                  <Typography component="pre" sx={{ ...tableTypographyStyle, mt: 2 }}>
{`## Actions
• ...
• ...`}
                  </Typography>
                )}

                {localConfig.includeEconomicData && (
                  <Typography component="pre" sx={{ ...tableTypographyStyle, mt: 2 }}>
{`## Context
• ...
• ...`}
                  </Typography>
                )}
              </Box>
            </>
          );
      }
    } else {
      // Custom forecast
      return (
        <>
          <Typography variant="body2" component="pre" sx={{ 
            whiteSpace: 'pre-wrap', 
            fontFamily: 'monospace', 
            mb: 2 
          }}>
            {header}
            
## {localConfig.module?.toUpperCase() || 'Custom'} Module Forecast
          </Typography>
          
          {renderForecastChart()}
          
          <Box sx={{ overflowX: 'auto', mt: 3 }}>
            <Typography component="pre" sx={tableTypographyStyle}>
{`| KPI       | Current  | Target   | Change  |
|-----------|----------|----------|---------|
| KPI 1     | ...      | ...      | ...     |
| KPI 2     | ...      | ...      | ...     |
| KPI 3     | ...      | ...      | ...     |`}
            </Typography>

            {localConfig.detectAnomalies && (
              <Typography component="pre" sx={{ ...tableTypographyStyle, mt: 2 }}>
{`## Anomalies
• ...
• ...`}
              </Typography>
            )}

            {localConfig.suggestCorrections && (
              <Typography component="pre" sx={{ ...tableTypographyStyle, mt: 2 }}>
{`## Actions
• ...
• ...`}
              </Typography>
            )}

            {localConfig.includeEconomicData && (
              <Typography component="pre" sx={{ ...tableTypographyStyle, mt: 2 }}>
{`## Indicators
• ...
• ...`}
              </Typography>
            )}
          </Box>
        </>
      );
    }
  };

  // System prompt preview
  const systemPromptPreview = `You are a Forecast Generation Assistant specializing in ${getForecastTypeLabel()}.

Your task is to create data-driven forecasts based on historical information and current business metrics. The forecast should be:

${localConfig.forecastType === 'template' 
  ? `- Based on the ${getForecastTypeLabel()} template
- Following industry best practices for this forecast type`
  : `- Customized for the ${localConfig.module} module
- Tailored to specific business requirements`}

${localConfig.detectAnomalies 
  ? `- Include anomaly detection to identify unusual patterns or deviations
- Flag potential data inconsistencies and outliers` 
  : ''}

${localConfig.suggestCorrections 
  ? `- Provide actionable recommendations based on forecast insights
- Suggest specific corrective measures for addressing potential issues` 
  : ''}

${localConfig.includeEconomicData 
  ? `- Incorporate relevant economic indicators into the analysis
- Consider market trends and external factors that may impact forecasts` 
  : ''}

Specific Instructions:
${localConfig.instructions.map(instruction => `- ${instruction}`).join('\n')}

Present the forecast in a clear, structured format with appropriate tables, bullet points, and explanations. Include visual elements where helpful, and ensure all projections include confidence levels or ranges where appropriate.`;

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
          Forecast Agent: Instructions & Preview
        </Typography>
      </Box>
      
      <Paper className="form-container" elevation={1}>
        <Typography variant="h5" gutterBottom>
          Forecast Agent: Instructions & Preview
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Provide specific instructions for generating forecasts and review sample output.
        </Typography>
        
        <form onSubmit={handleSubmit}>
          {/* Instructions Section */}
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Forecast Instructions
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Add specific instructions for how the agent should generate forecasts
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
            Forecast Preview
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Preview how the forecast will look based on your settings
          </Typography>
          
          <Box sx={{ width: '100%', mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                aria-label="forecast preview tabs"
              >
                <Tab label="Forecast Sample" />
                <Tab label="System Prompt" />
              </Tabs>
            </Box>
            
            {activeTab === 0 && (
              <Box sx={{ pt: 2 }}>
                <Card variant="outlined" sx={{ bgcolor: '#f8f9fa', position: 'relative' }}>
                  <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                    <Button 
                      size="small" 
                      startIcon={<RefreshIcon />}
                      onClick={() => {}}
                    >
                      Refresh
                    </Button>
                  </Box>
                  <CardContent>
                    {getForecastPreview()}
                  </CardContent>
                </Card>
              </Box>
            )}
            
            {activeTab === 1 && (
              <Box sx={{ pt: 2 }}>
                <Card variant="outlined" sx={{ bgcolor: '#f5f5f5' }}>
                  <CardContent>
                    <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                      {systemPromptPreview}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            )}
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

export default ForecastConfigPageTwo; 