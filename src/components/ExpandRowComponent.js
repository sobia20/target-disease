import { Box,TableCell, Tabs, Tab } from '@mui/material';
import React, {useState} from 'react';
import CustomTabPanel from './CustomTabPanel';
import Chart from './Chart';


const ExpandRowComponent = ({row}) =>{
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const data = row.dataTypeScores.map(data => data.score);

  const formatLabels = (label) => {
    const words = label.split('_');
    const capitalizedWords = words.map((word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(' ');
  }

  const labels = row.dataTypeScores.map(data => formatLabels(data.id));

    return (
        <TableCell colSpan="3">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                <Tab label="Bar Chart" />
                <Tab label="Radar Chart"/>
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Chart data={data} labels={labels}  type="bar" target={row.approvedSymbol} styledValue={{ width: '600px', height: '300px' }}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
            <Chart data={data} labels={labels}  type="radar" target={row.approvedSymbol} styledValue={{ width: '600px', height: '600px' }}/>
            </CustomTabPanel>
        </TableCell>
    )
}

export default ExpandRowComponent;