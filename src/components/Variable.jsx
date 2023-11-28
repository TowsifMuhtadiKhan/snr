import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';

export default function VariableTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchData = async () => {
    // Assuming x-api-key and accesstoken are stored in local storage
    const xApiKey = localStorage.getItem('x-api-key');
    const accesstoken = localStorage.getItem('accesstoken'); // Adjust the key here

    try {
      setLoading(true);
      const response = await fetch(
        'https://test-api.day2communications.com/campaign-building/content-mgmt/variables',
        {
          method: 'GET',
          headers: {
            'x-api-key': xApiKey,
            'accesstoken': `${accesstoken}`, // Adjust the header key here
          },
        }
      );
      const result = await response.json();

      // Check if the result has the expected structure
      if (result.status === '200' && result.data && result.data.localData && result.data.localData.items) {
        setData(result.data.localData.items);
      } else {
        console.error('Received unexpected data structure:', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <Button
  variant="contained"
  color="primary"
  onClick={fetchData}
  sx={{ display: 'block', margin: 'auto', mt: 2 }}
>
  Fetch Data
</Button>
      <TableContainer component={Paper} sx={{ width: '80%', margin:'auto', marginTop: '10px', marginBottom:'10px'}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Serial Number</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4}>Loading...</TableCell>
              </TableRow>
            ) : (
              data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                  <TableCell>{row.userId}</TableCell>
                  <TableCell>{row.fullName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}
