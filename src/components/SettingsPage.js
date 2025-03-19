import React, { useState } from 'react';
import { 
  Typography, 
  Paper, 
  Box, 
  Divider, 
  Button, 
  TextField, 
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Grid,
  Chip,
  Card,
  CardContent,
  Tab,
  Tabs,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  
  // Resources state
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Sales Playbook.pdf', type: 'document' },
    { id: 2, name: 'Product Catalog.pdf', type: 'document' },
    { id: 3, name: 'Competitor Analysis.docx', type: 'document' },
  ]);
  const [urls, setUrls] = useState([
    { id: 1, url: 'https://www.company.com/knowledge-base', description: 'Knowledge Base' },
    { id: 2, url: 'https://www.company.com/pricing', description: 'Pricing Page' },
  ]);
  const [newUrl, setNewUrl] = useState('');
  const [newUrlDescription, setNewUrlDescription] = useState('');
  
  // Model selection state
  const [selectedModel, setSelectedModel] = useState('gpt4o');
  
  // Global permissions state
  const [permissions, setPermissions] = useState({
    accessCRM: true,
    accessCustomerData: true,
    accessEmailSystem: false,
    accessCalendar: false,
    accessResourceLibrary: true,
    webSearch: false,
    sendAutomatedEmails: false,
    createTasks: true,
    generateReports: true,
  });
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleAddUrl = () => {
    if (newUrl && newUrlDescription) {
      setUrls([...urls, { id: urls.length + 1, url: newUrl, description: newUrlDescription }]);
      setNewUrl('');
      setNewUrlDescription('');
    }
  };
  
  const handleDeleteUrl = (id) => {
    setUrls(urls.filter(url => url.id !== id));
  };
  
  const handleDeleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };
  
  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };
  
  const handlePermissionChange = (permission) => (event) => {
    setPermissions({
      ...permissions,
      [permission]: event.target.checked
    });
  };
  
  const handleUploadClick = () => {
    // In a real application, this would trigger a file upload dialog
    alert('File upload functionality would be implemented here.');
  };
  
  const handleSaveSettings = () => {
    // In a real application, this would save all settings to the backend
    alert('Settings saved successfully!');
    navigate('/');
  };

  return (
    <div>
      <Typography variant="h4" className="page-title" sx={{ mb: 3 }}>
        Global Settings
      </Typography>
      
      <Paper className="form-container" elevation={1}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant="fullWidth" 
          sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Resources" />
          <Tab label="Model Selection" />
          <Tab label="Global Permissions" />
        </Tabs>
        
        {/* Resources Tab */}
        {activeTab === 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Resource Management
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Manage document resources and URLs that agents can access.
            </Typography>
            
            {/* Document Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                Document Library
              </Typography>
              <List>
                {documents.map((doc) => (
                  <ListItem 
                    key={doc.id}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteDocument(doc.id)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                    <ListItemText primary={doc.name} />
                  </ListItem>
                ))}
                <ListItem>
                  <Button 
                    variant="outlined" 
                    startIcon={<UploadFileIcon />}
                    onClick={handleUploadClick}
                    fullWidth
                  >
                    Upload New Document
                  </Button>
                </ListItem>
              </List>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            {/* URL Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                URL Resources
              </Typography>
              <List>
                {urls.map((url) => (
                  <ListItem 
                    key={url.id}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteUrl(url.id)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemIcon>
                      <LinkIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={url.description} 
                      secondary={url.url} 
                    />
                  </ListItem>
                ))}
              </List>
              
              <Box sx={{ display: 'flex', mt: 2 }}>
                <TextField 
                  fullWidth
                  label="URL" 
                  variant="outlined"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  sx={{ mr: 1 }}
                />
                <TextField 
                  fullWidth
                  label="Description" 
                  variant="outlined"
                  value={newUrlDescription}
                  onChange={(e) => setNewUrlDescription(e.target.value)}
                  sx={{ mr: 1 }}
                />
                <Button 
                  variant="contained" 
                  onClick={handleAddUrl}
                >
                  Add URL
                </Button>
              </Box>
            </Box>
          </Box>
        )}
        
        {/* Model Selection Tab */}
        {activeTab === 1 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Model Selection
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Select the default AI model for all agents. This can be overridden in individual agent settings.
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel id="model-select-label">Default AI Model</InputLabel>
              <Select
                labelId="model-select-label"
                id="model-select"
                value={selectedModel}
                label="Default AI Model"
                onChange={handleModelChange}
              >
                <MenuItem value="gpt-3.5-turbo">GPT-3.5 Turbo</MenuItem>
                <MenuItem value="gpt4o">GPT-4o</MenuItem>
                <MenuItem value="gpt4o-mini">GPT-4o Mini</MenuItem>
                <MenuItem value="claude3-sonnet">Claude 3.7 Sonnet</MenuItem>
                <MenuItem value="claude3-opus">Claude 3.7 Opus</MenuItem>
              </Select>
            </FormControl>
            
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
              Model Capabilities
            </Typography>
            
            <Grid container spacing={2}>
              {/* Model cards */}
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ mb: 2, height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6">GPT-4o</Typography>
                    <Box sx={{ my: 1 }}>
                      <Chip size="small" label="Newest" color="primary" sx={{ mr: 1 }} />
                      <Chip size="small" label="Most Capable" color="success" />
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      The latest multimodal model from OpenAI. Can handle text, images, and complex reasoning.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ mb: 2, height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6">Claude 3.7 Opus</Typography>
                    <Box sx={{ my: 1 }}>
                      <Chip size="small" label="High Performance" color="primary" />
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      Anthropic's most capable model, excellent for complex tasks and detailed reasoning.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
        
        {/* Global Permissions Tab */}
        {activeTab === 2 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Global Permissions
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Configure default permissions that apply to all agents. These can be overridden in individual agent settings.
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                    System Access
                  </Typography>
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={permissions.accessCRM}
                        onChange={handlePermissionChange('accessCRM')}
                      />
                    }
                    label="Access CRM System"
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={permissions.accessCustomerData}
                        onChange={handlePermissionChange('accessCustomerData')}
                      />
                    }
                    label="Access Customer Data"
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={permissions.accessEmailSystem}
                        onChange={handlePermissionChange('accessEmailSystem')}
                      />
                    }
                    label="Access Email System"
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={permissions.accessCalendar}
                        onChange={handlePermissionChange('accessCalendar')}
                      />
                    }
                    label="Access Calendar"
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={permissions.accessResourceLibrary}
                        onChange={handlePermissionChange('accessResourceLibrary')}
                      />
                    }
                    label="Access Resource Library"
                  />
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Actions
                  </Typography>
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={permissions.webSearch}
                        onChange={handlePermissionChange('webSearch')}
                      />
                    }
                    label="Web Search"
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={permissions.sendAutomatedEmails}
                        onChange={handlePermissionChange('sendAutomatedEmails')}
                      />
                    }
                    label="Send Automated Emails"
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={permissions.createTasks}
                        onChange={handlePermissionChange('createTasks')}
                      />
                    }
                    label="Create Tasks/To-dos"
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={permissions.generateReports}
                        onChange={handlePermissionChange('generateReports')}
                      />
                    }
                    label="Generate Reports"
                  />
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            color="primary"
            size="large"
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default SettingsPage; 