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
import cardStyle from '@/styles/nc.module.css';
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
  const [UID, setUserID] = useState("");
  const [Password, setPassword] = useState("");
  const open = Boolean(anchorEl);

  useEffect(() => {
    axios
      .get("/settings")
      .then((response) => {
        const UID = response.data.partner.userID;
        setUserID(UID);
      })
      .catch((error) => {
        console.error("Error fetching Partner profile Settings:", error);
      });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [editMode, setEditMode] = React.useState(false);

  const handleSubmit = () => {
    if (editMode) {
      setEditMode(false)
      axios
        .put("password", {
          data: {
            password: Password,
          },
        })
        .then((response) => res.json(response.data))
        .catch((error) =>
          console.error(
            "Error in Updating Partner's Password",
            error
          )
        );
    } else {
      setEditMode(true);
    }
  }

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
                      Password
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
                          id="pwd"
                          label="Password"
                          name="pwd"
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                        />
                      ) : (
                        <Typography>********</Typography>
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
            {!editMode ? (
            <IconButton
              color="#79E0F3"
              aria-label="add"
              sx={{
                borderRadius: "50%",
                width: "56px",
                height: "56px",
                backgroundColor: "#ECFCFF",
              }}
              onClick={handleSubmit}
            >
              <EditIcon style={{ color: "#79E0F3" }} />
            </IconButton>
          ) : (
            <div className={cardStyle.buttonContainer} style={{marginLeft:'60%'}} onClick={handleSubmit}>
              <button className={cardStyle.button}>Submit</button>
            </div>
          )}
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
