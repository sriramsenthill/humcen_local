import React, { useState, useEffect } from "react";
import axios from 'axios';
import Link from "next/link";
import Button from "@mui/material/Button";
import {
  Box,
  Typography,
  Card,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  IconButton,
  useTheme,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from "prop-types";

function formatDate(date) {
  const options = { month: "long", day: "numeric", year: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
}

function getStatusColor(status) {
  if (status === "In Progress") {
    return ({
      background: "rgba(255, 255, 0, 0.1)", /* Yellow background with reduced opacity */
      borderRadius: "4px",
      fontWeight: "bold",
      color: "#ffbc2b", /* You can define your yellow color variable */
      padding: "5px 13px",
      display: "inline-block",
    });
    // Set the color to yellow for "in progress" status
  } else if (status === "Completed") {
    return ({
      background: "rgba(0, 182, 155, 0.1)",
      borderRadius: "4px",
      color: "#00b69b",
      fontWeight: "bold",
      padding: "5px 13px",
      display: "inline-block",
    })  // Set the color to green for "completed" status
  } else if (status === "Pending") {
    return ({
      background: "rgba(238,54,140,.1)",
      borderRadius: "4px",
      color: "#ee368c",
      padding: "5px 13px",
      display: "inline-block",
    })

  }

  return ""; // Default color if the status value is not matched
}

function RecentOrder(props) {
  const { count, page, rowsPerPage, onPageChange } = props;
  const theme = useTheme();

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handlePrevButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handlePrevButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

RecentOrder.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

async function fetchJobOrders() {
  try {
    const response = await axios.get('/job_order');
    console.log(response.data);
    const jobOrders = response.data; // Extract the jobOrders array from the response data

    if (Array.isArray(jobOrders)) {
      const filteredJobOrders = jobOrders.filter(order => order.Accepted === true);
      // console.log(filteredJobOrders);
      return filteredJobOrders;
    } else {
      console.error('Invalid data format: Expected an array');
      return [];
    }
  } catch (error) {
    console.error('Error fetching job orders:', error);
    return [];
  }
}


function RecentOrders() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchJobOrders();
      console.log(data);
      const sortedData = data.sort((a, b) => b.og_id - a.og_id); // Sort by job_no in descending order
      setCount(sortedData.length);
      setRows(sortedData);
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage);

  return (
    <>
      <Box>
        <TableContainer component={Paper} sx={{
          boxShadow: "none",
        }}>
          <Table sx={{ minWidth: 950 }} aria-label="custom pagination table" className="dark-table">
            <TableHead sx={{ background: "#F7FAFF" }}>
              <TableRow>
                <TableCell sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                  fontWeight: 'bold',
                  padding: "15px 10px",
                  textAlign: "center",
                }}>
                  Job No
                </TableCell>
                <TableCell sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                  fontWeight: 'bold',
                  width: "150px",
                  padding: "15px 10px",
                  textAlign: "left",
                }}>
                  Service
                </TableCell>
                <TableCell sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                  fontWeight: 'bold',
                  padding: "15px 10px",
                  textAlign: "center",
                }}>
                  Country
                </TableCell>
                <TableCell sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                  fontWeight: 'bold',
                  padding: "15px 10px",
                  textAlign: "center",
                }}>
                  Submitted Date
                </TableCell>
                <TableCell sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                  fontWeight: 'bold',
                  padding: "15px 10px",
                  textAlign: "center",
                }}>
                  Delivery Date
                </TableCell>
                <TableCell sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                  fontWeight: 'bold',
                  padding: "15px 10px",
                  textAlign: "center",
                }}>
                  Budget
                </TableCell>
                <TableCell sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                  fontWeight: 'bold',
                  padding: "15px 10px",
                  textAlign: "center",
                }}>
                  Verification
                </TableCell>
                <TableCell sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                  fontWeight: 'bold',
                  padding: "15px 10px",
                  textAlign: "center",
                }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.og_id}>
                    <TableCell sx={{
                      width: 100,
                      fontWeight: "bold",
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                      fontSize: "13px",
                      textAlign: "center",
                    }}>
                      {row._id.job_no}
                    </TableCell>
                    <TableCell sx={{
                      width: 150,
                      fontWeight: "bold",
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                      fontSize: "13px",
                      textAlign: "left",
                    }}>
                      {row.service}
                    </TableCell>
                    <TableCell sx={{
                      width: 100,
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                      fontSize: "13px",
                      textAlign: "center",
                    }}>
                      {row.country}
                    </TableCell>
                    <TableCell sx={{
                      width: 100,
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                      fontSize: "13px",
                      textAlign: "center",
                    }}>
                      {formatDate(row.start_date)}
                    </TableCell>
                    <TableCell sx={{
                      width: 100,
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                      fontSize: "13px",
                      textAlign: "center",
                    }}>
                      {formatDate(row.end_date)}
                    </TableCell>
                    <TableCell sx={{
                      width: 100,
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                      fontSize: "13px",
                      textAlign: "center",
                    }}>
                      {row.budget}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 500,
                        borderBottom: "1px solid #F7FAFF",
                        fontSize: "11px",
                        width: 120,
                        padding: "8px 10px",
                        textAlign: "center",
                      }}
                    >
                      <span style={getStatusColor(row.status)}>{row.status}</span>
                    </TableCell>
                    <TableCell sx={{
                      width: 100,
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                      fontSize: "13px",
                      textAlign: "center",
                    }}>
                      <Link href={`onGoingPatents/${row.og_id}`} passHref>
                        <Button
                          sx={{
                            background: "linear-gradient(270deg, #02E1B9 0%, #00ACF6 100%)",
                            color: "white",
                            borderRadius: "100px",
                            width: "100%",
                            height: "90%",
                            textTransform: "none",
                          }}
                        >
                          Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={9} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={9}
                  count={count}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default RecentOrders;
