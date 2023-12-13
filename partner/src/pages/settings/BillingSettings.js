import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { styled } from "@mui/system";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  background: "#00ACF6",
  "&:hover": {
    background: "#00ACF6",
  },
  textTransform: "none",
  fontSize: "14px",
  fontWeight: "400",
}));

export default function Profile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [UsID, setUserID] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNum, setAccountNum] = useState("");
  const [accountName, setAccountName] = useState("");
  const [branch, setBranch] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [address, setAddress] = useState("");
  const [town, setTown] = useState("");
  const [postCode, setPostCode] = useState("");
  const [country, setCountry] = useState("");

  const open = Boolean(anchorEl);

  useEffect(() => {
      axios
        .get("/settings", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          const UsID = response.data.userID;
          setUserID(UsID);
          const bankName = response.data.bank.bankName;
          setBankName(bankName);
          const accountNum = response.data.bank.accountNum;
          setAccountNum(accountNum);
          const accountName = response.data.bank.accountName;
          setAccountName(accountName);
          const branch = response.data.bank.branch;
          setBranch(branch);
          const ifscCode = response.data.bank.ifscCode;
          setIfscCode(ifscCode);
          const address = response.data.bank.address;
          setAddress(address);
          const town = response.data.bank.town;
          setTown(town);
          const postCode = response.data.bank.postCode;
          setPostCode(postCode);
          const country = response.data.bank.country;
          setCountry(country);

        })
        .catch((error) => {
          console.error("Error fetching Partner's Bank Details Settings:", error);
        });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          mb: "15px",
          display: "flex",
          p: "12px 12px",
          flexDirection: "column",
          background: "white",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={8} style={{ flexBasis: "60%" }}>
            <TableContainer
              component={Paper}
              sx={{
                boxShadow: "none",
                background: "white",
              }}
            >
              <Table aria-label="simple table" className="dark-table">
                <TableHead></TableHead>

                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #F7FAFF",
                        fontSize: "14px",
                        padding: "8px 10px",
                        fontWeight: "600",
                        color: "#223345",
                      }}
                    >
                      Bank Name
                    </TableCell>

                    <TableCell
                      align="left"
                      sx={{
                        borderBottom: "2px solid #F7FAFF",
                        fontSize: "14px",
                        padding: "8px 10px",
                        fontWeight: "400",
                        color: "#828282",
                      }}
                    >
                      {editMode ? (
                        <TextField
                          required
                          fullWidth
                          id="bankName"
                          label="Bank Name"
                          name="bankName"
                          placeholder="Bank Name"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                        />
                      ) : (
                        <Typography>{bankName}</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #F7FAFF",
                        fontSize: "14px",
                        padding: "8px 10px",
                        fontWeight: "600",
                        color: "#223345",
                      }}
                    >
                      Account Number
                    </TableCell>

                    <TableCell
                      align="left"
                      sx={{
                        borderBottom: "2px solid #F7FAFF",
                        fontSize: "14px",
                        padding: "8px 10px",
                        fontWeight: "400",
                        color: "#828282",
                      }}
                    >
                      {editMode ? (
                        <TextField
                          required
                          fullWidth
                          id="accountNum"
                          label="Account Number"
                          name="accountNum"
                          placeholder="Account Number"
                          value={accountNum}
                          onChange={(e) => setAccountNum(e.target.value)}
                        />
                      ) : (
                        <Typography>{accountNum}</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #F7FAFF",
                        fontSize: "14px",
                        padding: "8px 10px",
                        fontWeight: "600",
                        color: "#223345",
                      }}
                    >
                      Account Name
                    </TableCell>

                    <TableCell
                      align="left"
                      sx={{
                        borderBottom: "2px solid #F7FAFF",
                        fontSize: "14px",
                        padding: "8px 10px",
                        fontWeight: "400",
                        color: "#828282",
                      }}
                    >
                      {editMode ? (
                        <TextField
                          required
                          fullWidth
                          id="accountName"
                          label="Account Name"
                          name="accountName"
                          placeholder="Account Name"
                          value={accountName}
                          onChange={(e) => setAccountName(e.target.value)}
                        />
                      ) : (
                        <Typography>{accountName}</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #F7FAFF",
                        fontSize: "14px",
                        padding: "8px 10px",
                        fontWeight: "600",
                        color: "#223345",
                      }}
                    >
                      Branch
                    </TableCell>

                    <TableCell
                      align="left"
                      sx={{
                        borderBottom: "2px solid #F7FAFF",
                        fontSize: "14px",
                        padding: "8px 10px",
                        fontWeight: "400",
                        color: "#828282",
                      }}
                    >
                      {editMode ? (
                        <TextField
                          required
                          fullWidth
                          id="branch"
                          label="Branch"
                          name="branch"
                          placeholder="Branch"
                          value={branch}
                          onChange={(e) => setBranch(e.target.value)}
                        />
                      ) : (
                        <Typography>{branch}</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #F7FAFF",
                        fontSize: "14px",
                        padding: "8px 10px",
                        fontWeight: "600",
                        color: "#223345",
                      }}
                    >
                      IFSC Code
                    </TableCell>

                    <TableCell
                      align="left"
                      sx={{
                        borderBottom: "2px solid #F7FAFF",
                        fontSize: "14px",
                        padding: "8px 10px",
                        fontWeight: "400",
                        color: "#828282",
                      }}
                    >
                      {editMode ? (
                        <TextField
                          required
                          fullWidth
                          id="ifscCode"
                          label="IFSC Code"
                          name="ifscCode"
                          placeholder="IFSC Code"
                          value={ifscCode}
                          onChange={(e) => setIfscCode(e.target.value)}
                        />
                      ) : (
                        <Typography>{ifscCode}</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #F7FAFF",
                        fontSize: "14px",
                        padding: "8px 10px",
                        fontWeight: "600",
                        color: "#223345",
                      }}
                    >
                      Address
                    </TableCell>

                    <TableCell
                      align="left"
                      sx={{
                        borderBottom: "1px solid #F7FAFF",
                        fontSize: "14px",
                        padding: "8px 10px",
                        fontWeight: "400",
                        color: "#828282",
                      }}
                    >
                      {editMode ? (
                        <TextField
                          required
                          fullWidth
                          id="address"
                          label="Address"
                          name="address"
                          placeholder="Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      ) : (
                        <Typography>{address}</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #F7FAFF",
                        fontSize: "14px",
                        padding: "8px 10px",
                        fontWeight: "600",
                        color: "#223345",
                      }}
                    >
                      Town
                    </TableCell>

                    <TableCell
                      align="left"
                      sx={{
                        borderBottom: "1px solid #F7FAFF",
                        fontSize: "14px",
                        padding: "8px 10px",
                        fontWeight: "400",
                        color: "#828282",
                      }}
                    >
                      {editMode ? (
                        <TextField
                          required
                          fullWidth
                          id="town"
                          label="Town"
                          name="town"
                          placeholder="Town"
                          value={town}
                          onChange={(e) => setTown(e.target.value)}
                        />
                      ) : (
                        <Typography>{town}</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  ></TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #F7FAFF",
                        fontSize: "14px",
                        padding: "8px 10px",
                        fontWeight: "600",
                        color: "#223345",
                      }}
                    >
                      Post Code
                    </TableCell>

                    <TableCell
                      align="left"
                      sx={{
                        borderBottom: "1px solid #F7FAFF",
                        fontSize: "14px",
                        padding: "8px 10px",
                        fontWeight: "400",
                        color: "#828282",
                      }}
                    >
                      {editMode ? (
                        <TextField
                          required
                          fullWidth
                          id="postCode"
                          label="Post Code"
                          name="postCode"
                          placeholder="Post Code"
                          value={postCode}
                          onChange={(e) => setPostCode(e.target.value)}
                        />
                      ) : (
                        <Typography>{postCode}</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #F7FAFF",
                        fontSize: "14px",
                        padding: "8px 10px",
                        fontWeight: "600",
                        color: "#223345",
                      }}
                    >
                      Country
                    </TableCell>

                    <TableCell
                      align="left"
                      sx={{
                        borderBottom: "2px solid #F7FAFF",
                        fontSize: "14px",
                        padding: "8px 10px",
                        fontWeight: "400",
                        color: "#828282",
                      }}
                    >
                      {editMode ? (
                        <TextField
                          required
                          fullWidth
                          id="country"
                          label="Country"
                          name="country"
                          placeholder="Country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      ) : (
                        <Typography>{country}</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            align="right"
            style={{ flexBasis: "40%" }}
          >
            <IconButton
              color="#79E0F3"
              aria-label="add"
              sx={{
                borderRadius: "50%",
                width: "56px",
                height: "56px",
                backgroundColor: "#ECFCFF",
              }}
              onClick={() => {
                if (editMode === true) {
                  setEditMode(false);
                  axios.put('/bank-settings', {
                    data: {
                      userId: UsID,
                      bankName: bankName,
                      accountNum: accountNum,
                      accountName: accountName,
                      branch: branch,
                      ifscCode: ifscCode,
                      address: address,
                      town: town,
                      postCode: postCode,
                      country: country
                    }
                  })
                    .then((response) => res.json(response.data))
                    .catch((error) =>
                      console.error(
                        "Error in Updating Partner's Bank Details Settings",
                        error
                      )
                    );
                } else {
                  setEditMode(true);
                }
              }}
            >
              <EditIcon style={{ color: "#79E0F3" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
