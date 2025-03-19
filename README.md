# Agent Configuration Portal

This is a prototype UI for configuring various AI agents for sales and business operations. The application consists of a home page, global settings page, and detailed configuration pages for each agent type.

## Available Agents

The portal currently includes the following agent types:
1. Sales Coach Agent (Fully Configured)
2. SDR Agent (Fully Configured with two layout options)
3. Churn Agent (Fully Configured)
4. Acquisition Agent (Fully Configured)
6. Pricing Agent (Placeholder)
7. Cross Sell / Up Sell Agent (Placeholder)
8. Sales Research Agent (Placeholder)
9. Survey Generation Agent (Placeholder)
10. Survey Description Agent (Placeholder)
11. Forecast Agent (Placeholder)
12. Competitor/Market Analyser Agent (Placeholder)
13. Email Parser Agent (Placeholder)
14. Quote Generation Agent (Placeholder)
15. Presentation/Report Generation Agent (Placeholder)
16. Customer NPS Tracker (Placeholder)
17. RFP Agent (Placeholder)
18. Enrichment Agent (Placeholder)

Currently, the Sales Coach, SDR, Churn, Acquisition, and Revenue Growth agents are fully implemented, while others are placeholders for future development.

## Home Page

The home page displays a grid of all available agent types, with visual indicators showing which are configured and which are not yet implemented. A settings icon in the top-right corner provides access to global configuration options.

Clicking on an agent card will:
- For the Sales Coach Agent: Navigate to its configuration pages
- For the SDR Agent: Navigate to the layout selector page
- For the Churn Agent: Navigate to its configuration pages
- For the Acquisition Agent: Navigate to its configuration pages
- For the Revenue Growth Agent: Navigate to its configuration pages
- For other agents: Show a notification that the configuration is not yet implemented

## Global Settings

The global settings page provides configuration options that apply to all agents:

### Resources Management
- Document library for uploading and managing resources that agents can access
- URL management for providing web resources that agents can reference

### Model Selection
- Select the default AI model for all agents (GPT-4o, Claude 3.7 Opus, etc.)
- View information about model capabilities and performance characteristics

### Global Permissions
- Configure system access permissions (CRM, Customer Data, Email, Calendar, etc.)
- Set action permissions (Web Search, Send Automated Emails, Create Tasks, etc.)

These global settings can be overridden in individual agent configurations when necessary.

## Sales Coach Configuration

### Page 1: Basic Configuration
- Module selection for agent deployment
- Profile access selection
- Feature selection with an interactive card-based interface
  - Practice a Pitch: Allow reps to practice their sales pitch and receive feedback
  - Roleplay: Simulate customer interactions with various scenarios
  - Skill Test: Test sales knowledge and identify areas for improvement
  - Feedback: Provide detailed feedback on sales conversations

### Page 2: Function & Instructions
- Function type selection (Practice a Pitch, Roleplay, Skill Test, Feedback)
- Multi-line instruction input with ability to add/remove instructions
- Preview tabs to toggle between:
  - Agent output view (with unresponsive reload button)
  - System prompt view

## SDR Agent Configuration

The SDR Agent offers two configuration layout options:

### Layout 1
A three-step configuration process:
1. **Basic Configuration**:
   - Module selection
   - Setup meeting option
   
2. **Outreach Configuration**:
   - Trigger criteria setup
   - Outreach mode selection
   - Custom outreach settings (business hours, contact timing, follow-ups)
   
3. **Instructions**:
   - Multi-line instructions for the agent
   - Preview of agent output and system prompt

### Layout 2
A different three-step approach with profile selection:
1. **Basic Configuration** (same as Layout 1)
   
2. **Agent Assignment & Outreach Settings**:
   - Profile selection (Administrator or Standard)
   - Compact outreach configuration
   
3. **User View**:
   - Agent instructions
   - Preview of agent output and system prompt

## Churn Agent Configuration

A three-step configuration process for customer retention:
1. **Basic Configuration**:
   - Customer types selection
   - Option to book meetings with record owners

2. **Retention Strategy**:
   - Retention activities configuration
   - Activity preferences for different churn states
   - Time-frame options for contacting different customer types

3. **Instructions & Preview**:
   - Churn type-specific instructions
   - Preview of agent responses

## Acquisition Agent Configuration

A two-step configuration process:
1. **Basic Configuration**:
   - Module selection (CRM Integration, Email Campaigns, etc.)
   - Feature selection (Content Personalization, Market Analysis)


## Getting Started

### Prerequisites
- Node.js (>= 14.0.0)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
cd Agents_config
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

The application will open in your browser at `http://localhost:3000`.

## Project Structure

```
Agents_config/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── HomePage.js                       # Home page with agent selection
│   │   ├── SettingsPage.js                   # Global settings page
│   │   ├── SalesCoachConfigPageOne.js        # First configuration page for Sales Coach
│   │   ├── SalesCoachConfigPageTwo.js        # Second configuration page for Sales Coach
│   │   ├── SDRConfigPageOne.js               # First configuration page for SDR
│   │   ├── SDRConfigPageTwo.js               # Second configuration page for SDR (Layout 1)
│   │   ├── SDRConfigPageThree.js             # Third configuration page for SDR (Layout 1)
│   │   ├── SDRLayoutSelector.js              # Layout selector for SDR Agent
│   │   ├── SDRConfigPageTwoLayout2.js        # Second configuration page for SDR (Layout 2)
│   │   ├── SDRConfigPageThreeLayout2.js      # Third configuration page for SDR (Layout 2)
│   │   ├── ChurnConfigPageOne.js             # First configuration page for Churn Agent
│   │   ├── ChurnConfigPageTwo.js             # Second configuration page for Churn Agent
│   │   ├── ChurnConfigPageThree.js           # Third configuration page for Churn Agent
│   │   ├── AcquisitionConfigPageOne.js       # First configuration page for Acquisition Agent
│   │   ├── AcquisitionConfigPageTwo.js       # Second configuration page for Acquisition Agent
│   │   ├── RevenueGrowthConfigPageOne.js     # First configuration page for Revenue Growth Agent
│   │   ├── RevenueGrowthConfigPageTwo.js     # Second configuration page for Revenue Growth Agent
│   │   └── RevenueGrowthConfigPageThree.js   # Third configuration page for Revenue Growth Agent
│   ├── App.js                                # Main application component with routing
│   ├── index.js                              # Application entry point
│   └── index.css                             # Global styles
├── package.json                              # Project dependencies and scripts
└── README.md                                 # Project documentation
```

## Future Improvements

1. **Improved Form Validation**: Add comprehensive validation for all configuration forms.
2. **Data Persistence**: Implement local storage or a backend service to save configurations.
3. **Separate State for Different Layouts**: Maintain isolated state for different SDR layout options.
4. **Mobile Responsiveness**: Enhance the mobile experience for all configuration pages.
5. **Dynamic Stepper**: Make the stepper component responsive to the current route and layout.
6. **Preview Enhancements**: Add more realistic and interactive agent output previews.
7. **Implement Remaining Agents**: Complete the configuration interfaces for the remaining placeholder agents.
8. **Multi-user Collaboration**: Allow multiple users to collaborate on agent configuration.
9. **Integration with External Systems**: Connect with CRM, email, and other business systems.
10. **Agent Performance Analytics**: Add dashboards for monitoring agent performance.

## Design Notes

This is a prototype UI intended for review and further development by design teams. Currently, the Sales Coach, SDR, Churn, Acquisition, and Revenue Growth agents are fully implemented, while other agent types are placeholders. The global settings page provides centralized configuration for model selection, permissions, and resource management.