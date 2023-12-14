import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Country from './Country'; // Import the Country component
import State from './State'; // Import the State component
import ReferenceMaster from './referenceMaster';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Country" value="1" />
            <Tab label="State" value="2" />
            <Tab label="Reference Master" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Country />
        </TabPanel>
        <TabPanel value="2">
          <State />
        </TabPanel>
        <TabPanel value="3">
          <ReferenceMaster />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
