import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  Button,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Rating from "@mui/material/Rating";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UnAssignedJobs from "pages/UnAssignedJobs";

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

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#68BDFD",
    fontSize: "10",
  },
});

function RecentPartner(props) {
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

RecentPartner.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

async function fetchPartnerData() {
  try {
    const response = await fetch("/api/admin/Unassigned");
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error fetching partner data:", error);
    return [];
  }
}

function UnAssignedJob() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPartnerData();
      setCount(data.length);
      setRows(data);
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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage);

  const sortedData = rows.sort((a, b) => parseInt(b._id.job_no) - parseInt(a._id.job_no));

  return (
    <Card>
      <Box sx={{ p: 2 }}>
        <TableContainer component={Paper} sx={{
          boxShadow: "none",
        }}>
          <Table aria-label="custom pagination table" className="dark-table">
            <TableHead sx={{ background: "#F7FAFF" }}>
              <TableRow>

                <TableCell sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                  fontWeight: 'bold',
                  padding: "15px 10px",
                  width: "100px",
                  textAlign: "center",
                }}>
                  Job No
                </TableCell>
                <TableCell sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                  fontWeight: 'bold',
                  padding: "15px 10px",
                  width: "250px",
                  textAlign: "center",
                }}>
                  Service
                </TableCell>
                <TableCell sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                  fontWeight: 'bold',
                  padding: "15px 10px",
                  width: "100px",
                  textAlign: "center",
                }}>
                  Full Name
                </TableCell>
                <TableCell sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                  fontWeight: 'bold',
                  padding: "15px 10px",
                  width: "150px",
                  textAlign: "center",
                }}>
                  Country
                </TableCell>
                <TableCell sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                  fontWeight: 'bold',
                  padding: "15px 10px",
                  width: "150px",
                  textAlign: "center",
                }}>
                  Budget
                </TableCell>
                <TableCell sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                  fontWeight: 'bold',
                  padding: "15px 10px",
                  width: "180px",
                  textAlign: "center",
                }}>
                  Status
                </TableCell>
                <TableCell sx={{
                  borderBottom: "1px solid #F7FAFF",
                  fontSize: "13.5px",
                  fontWeight: 'bold',
                  padding: "15px 10px",
                  width: "180px",
                  textAlign: "center",
                }}>
                  Assign Jobs
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row._id.userID}>
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
                      width: 250,
                      fontWeight: "bold",
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                      fontSize: "13px",
                      textAlign: "center",
                    }}>{row.service}</TableCell>
                    <TableCell sx={{
                      width: 100,
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                      fontSize: "13px",
                      textAlign: "center",
                    }}>
                      {row.customerName}
                    </TableCell>
                    <TableCell sx={{
                      width: 150,
                      borderBottom: "1px solid #F7FAFF",
                      padding: "8px 10px",
                      fontSize: "13px",
                      textAlign: "center",
                    }}>
                      {row.country}
                    </TableCell>
                    <TableCell sx={{
                      width: 180,
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
                        padding: "8px 10px",
                        textAlign: "center",
                      }}
                    >
                      <span style={getStatusColor(row.status)}>{row.status}</span>
                    </TableCell>

                    <TableCell>
                      <Link href={`assignJobs/${row.og_id}`} passHref>
                        <Button
                          sx={{
                            background: "#27AE60",
                            position: "relative",
                            left: "10%",
                            color: "white",
                            borderRadius: "100px",
                            width: "80%",
                            height: "88%",
                            textAlign: "center",
                            textTransform: "none",
                            "&:hover": {
                              background: "linear-gradient(90deg, #5F9EA0 0%, #7FFFD4 100%)",
                            },
                          }}
                        >
                          Assign
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={17} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={17}
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
    </Card>
  );
}

export default UnAssignedJob;
