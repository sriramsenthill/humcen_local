import { useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Grid, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from "axios";

export default function Country() {
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [saveSnackbar, setSaveSnackbar] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [formData, setFormData] = useState({
    _id: null,
    code: "",
    name: "",
  });
  const [searchData, setSearchData] = useState({
    code: "",
    name: "",
  });
  const [errorField, setErrorField] = useState({
    code: false,
    name: false,
  });

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchData({
      ...searchData,
      [name]: value,
    });
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === 'code' && value) value = value.toUpperCase();
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorField({
      ...errorField,
      [name]: !value,
    });
  };

  const newRecord = () => {
    setFormData({
      _id: null,
      code: "",
      name: "",
    });
    setOpen(true);
  };

  const editRecord = (row) => {
    setFormData({
      _id: row._id,
      code: row.code,
      name: row.name,
    });
    setOpen(true);
  }

  const searchRecord = async () => {
    try {
      const res = await axios.post('/country/search', {
        ...formData,
      });
      setCountries(res?.data?.countries || []);
    } catch (error) {
      setSearchError(error.response?.data?.error || error.response?.statusText);
      console.error(error);
    }
  }

  const handleSave = async () => {
    setErrorField({
      code: !formData.code,
      name: !formData.name,
    });
    if (!formData.code || !formData.name) return;
    const url = `/country/${formData._id ? 'update' : 'create'}`

    try {
      await axios.post(url, { ...formData });
      setFormData({
        code: "",
        name: "",
      });
      setSaveSnackbar(true);
      handleClose();
      searchRecord();
    } catch (error) {
      setSaveError(error.response?.data?.error || error.response?.statusText);
      console.error(error);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSaveSnackbar(false);
  }

  return <><Box
    sx={{
      backgroundColor: "#fff",
      p: "20px",
      borderRadius: "10px 10px 0 0",
    }}>
    <Grid container spacing={3} justifyContent="flex-end">
      <Grid item sm={12} md="4">
        <TextField
          autoFocus
          required
          fullWidth
          label="Code"
          name="code"
          value={searchData.code}
          onChange={handleSearchChange} />
      </Grid>
      <Grid item sm={12} md="4">
        <TextField
          required
          fullWidth
          label="Name"
          name="name"
          value={searchData.name}
          onChange={handleSearchChange} />
      </Grid>
      <Grid item sm={12} md="4"
        container
        direction="row"
        alignItems="flex-end">
        <Button variant="outlined" onClick={searchRecord} startIcon={<SearchIcon />}>
          Search
        </Button>
        <Button variant="outlined" onClick={newRecord} sx={{ ml: '25px' }} startIcon={<AddCircleOutlineIcon />}>
          New
        </Button>
      </Grid>
      {searchError ?
        <Grid item sm={12} md="4">
          <div className="error-text">{searchError}</div>
        </Grid>
        : ''}

    </Grid>
  </Box>
    {countries.length ?
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>SN.No</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map((row, index) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <Button onClick={() => editRecord(row)} startIcon={<EditIcon />}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      : ''}
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Country</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          width='500px'
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            autoFocus
            required
            label="Code"
            fullWidth
            name="code"
            disabled={formData._id}
            value={formData.code}
            error={errorField.code}
            onChange={handleChange} />
          <TextField
            required
            label="Name"
            fullWidth
            name="name"
            value={formData.name}
            error={errorField.name}
            onChange={handleChange} />
        </Box>
      </DialogContent>
      <DialogActions>
        <div className="error-text">{saveError}</div>
        <Button onClick={handleClose} variant="outlined" startIcon={<CloseIcon />}>Close</Button>
        <Button onClick={handleSave} variant="contained" startIcon={<SaveIcon />}>Save</Button>
      </DialogActions>
    </Dialog>
    <Snackbar open={saveSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
        Country Saved Successfully
      </Alert>
    </Snackbar>
  </>
}