'use client'
import { useQuery, ApolloProvider } from '@apollo/client';
import { gql } from 'graphql-tag';
import apolloClient from '../utils/apolloClient';
import { Typography, Link, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import ExpandableTableRow from '../components/ExpandableTableRow';
import ExpandComponent from '../components/ExpandRowComponent';

const GET_DATA = gql`
query lungCarcinomaAssociatedTargets {
  disease(efoId:"EFO_0001071"){
    associatedTargets (page:{index:0, size:25}){
      rows{
        target{
          id
          approvedSymbol
          approvedName
        }
        score
        datatypeScores{
          id
          score
        }
      }
    }
  }
}
`;

const Page = () => {
  const { loading, error, data } = useQuery(GET_DATA, {
    client: apolloClient,
  });

  if (loading || !data?.disease?.associatedTargets?.rows) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const populateRows = (data) => {
    const rowData = [...data.disease.associatedTargets.rows];
    rowData.sort((a, b) => b.score - a.score);
    const topTenRows = rowData.slice(0, 10);
    return topTenRows.map(row => ({ score: row.score, approvedName: row.target.approvedName, approvedSymbol: row.target.approvedSymbol, id: row.target.id, dataTypeScores: row.datatypeScores }))
  }
  const rows = populateRows(data);

  const columns = [{ name: 'approvedSymbol', label: 'Approved Symbol' }, { name: 'approvedName', label: 'Gene Name' }, { name: 'score', label: 'Overall Association Score' }]

  return (
    <ApolloProvider client={apolloClient}>
      <Typography variant="h4">10 Drug targets having highest association scores with Lung Carcinoma</Typography>
      <Box sx={{ width: '100%' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              {columns.map(col => (<TableCell key={col.label}>{col.label}</TableCell>))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <ExpandableTableRow key={row.id}
              expandComponent={
              <ExpandComponent row={row}/>}
            >
                <TableCell>
                  <Link target={'_blank'} href={`https://platform.opentargets.org/target/${row.id}`}>
                    {row.approvedSymbol}
                  </Link>
                </TableCell>
                <TableCell>
                  {row.approvedName}
                </TableCell>
                <TableCell>
                  {row.score}
                </TableCell>
              </ExpandableTableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </ApolloProvider>
  )
}

export default Page;