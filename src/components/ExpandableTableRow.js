import AddIcon from '@mui/icons-material/Add';
import { TableRow, TableCell, IconButton } from '@mui/material';
import React, {useState} from 'react';


const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    return (
      <>
        <TableRow {...otherProps}>
        <TableCell padding="checkbox" style={{backgroundColor: '#2196f3'}}>
            <IconButton style={{color: 'white'}} onClick={() => setIsExpanded(!isExpanded)}>
              <AddIcon />
            </IconButton>
          </TableCell>
          {children}
        </TableRow>
        {isExpanded && (
          <TableRow>
            <TableCell padding="checkbox" />
            {expandComponent}
          </TableRow>
        )}
      </>
    );
  };

  export default ExpandableTableRow;