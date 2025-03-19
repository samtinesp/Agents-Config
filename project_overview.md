# Agent Configuration Portal Project Overview

## Project Summary
A React-based web application for configuring and managing various AI agents for business use cases. The portal allows users to set up, customize, and deploy different specialized agents across business modules.

## Technical Stack
- React
- Material-UI component library
- React Router for navigation
- Local storage for configuration persistence

## Architecture
- Single page application with component-based architecture
- Multi-step configuration flows for each agent
- Centralized state management in App.js
- Responsive design patterns

## Agent Types
Primary Agents :
1. **Sales Coach Agent** - Trains and assists sales representatives
2. **SDR (Sales Development Representative) Agent** - Handles lead outreach and qualification
        There are two layouts : layout 1 and 2

Revenue Growth Agents :
3. **Acquisition Agent** - Assist user in customer acquisition
4. **Pricing Agent** - Assist user in deciding right price for their product
5. **Churn Agent** - Assist user in modelling churn and retention
6. **Cross sell / Up sell Agent** - Assist user in increasing revenue through recommendation

Other Agents
7. **Survey Generation Agent** - Creates personalised customer surveys
8. **Forecast Agent** - Generates financial and business forecasts
9. **Analyser Agent** - Combines survey description and report generation
10. **Competitor/Market Analyser** - Provides competitive and market analysis

## Common UI Patterns
- Multi-step configuration wizards with back/next navigation
- Form-based configuration pages with consistent styling
- Preview sections showing agent output
- Instructions management interfaces
- Card-based selection interfaces
- Back navigation icons for returning to home

## Key Features
- Module selection for agent deployment
- Custom instruction management
- Configuration previews
- System prompt generation
- Simulation of agent outputs
- Configuration status tracking
- Responsive layouts

## Page Structure
1. **HomePage** - Displays all available agents with configuration status
2. **Configuration Pages** - Multi-step forms for each agent type
3. **Settings Page** - Global application settings

## Navigation Flow
- Home → Agent Selection → Configuration Steps → Completion → Return to Home
- Back buttons available on all configuration pages
- Stepper component shows progress through multi-step forms

## Data Management
- Configuration data stored in App.js state
- Persistent storage via localStorage
- Data passed between components via props
