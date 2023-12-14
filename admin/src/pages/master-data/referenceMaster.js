import { useEffect, useState } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'
import {
    Button,
    Grid,
    Box,
    Select,
    MenuItem,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Typography,
    TableFooter,
    TablePagination,
    Autocomplete,
    Stack
} from '@mui/material'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import CountryAutocomplete from '@/components/autocomplete/CountryAutocomplete'

export default function ReferenceMaster() {
    const rowsPerPage = 5
    const [open, setOpen] = useState(false)
    const [states, setStates] = useState([])
    const [tablePage, setTablePage] = useState(0)
    const [totalRecord, setSotalRecord] = useState(0)
    const [dataSaving, setDataSaving] = useState(true)
    const [dataLoading, setDataLoading] = useState(true)
    const [saveSnackbar, setSaveSnackbar] = useState(false)
    const [searchError, setSearchError] = useState('')
    const [saveError, setSaveError] = useState('')
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        countryId: null,
        descriptionReferenceMaster: "",
        nameReferenceValue: "",
        descriptionReferenceValue: "",
        isActive: false
    })
    const [searchData, setSearchData] = useState({
        code: '',
        name: '',
        countryId: null,
    })
    const [errorField, setErrorField] = useState({
        code: false,
        name: false,
        countryId: false,
        descriptionReferenceMaster: "",
        nameReferenceValue: "",
        descriptionReferenceValue: "",
        isActive: false
    })

    useEffect(() => {
        searchRecord(true)
    }, [])

    const handleSearchChange = (event) => {
        const { name, value } = event.target
        setSearchData({
            ...searchData,
            [name]: value
        })
    }

    const handleChange = (event) => {
        let { name, value } = event.target
        if (name === 'code' && value) value = value.toUpperCase()
        setFormData({
            ...formData,
            [name]: value
        })
        setErrorField({
            ...errorField,
            [name]: !value
        })
    }

    const newRecord = () => {
        setFormData({
            code: '',
            name: '',
            countryId: null,
            descriptionReferenceMaster: "",
            nameReferenceValue: "",
            descriptionReferenceValue: "",
            isActive: false
        })
        setDataSaving(false)
        setOpen(true)
    }

    const editRecord = (row) => {
        setFormData({
            code: row.code,
            name: row.name,
            countryId: row.countryId,
            descriptionReferenceMaster: row.descriptionReferenceMaster,
            nameReferenceValue: row.nameReferenceValue,
            descriptionReferenceValue: row.descriptionReferenceValue,
            isActive: false
        })
        setDataSaving(false)
        setOpen(true)
    }

    const searchRecord = async (getCount, pageNo) => {
        try {
            setDataLoading(true)
            if (getCount) {
                setSotalRecord(0)
                setTablePage(0)
                setStates([])
            }

            const res = await axios.post('/referenceMaster/search', {
                ...searchData,
                getCount,
                pageNo: pageNo + 1,
                limit: rowsPerPage
            })
            setDataLoading(false)
            setStates(res?.data?.states || [])
            getCount && setSotalRecord(res?.data?.total || 0)
        } catch (error) {
            setDataLoading(false)
            setSearchError(error.response?.data?.error || error.response?.statusText)
            console.error(error)
        }
    }

    const handleChangePage = (event, newPage) => {
        setTablePage(newPage)
        searchRecord(false, newPage)
    }

    const handleSave = async () => {
        setErrorField({
            code: !formData.code,
            name: !formData.name,
            countryId: !formData.countryId,
            descriptionReferenceMaster: !formData.descriptionReferenceMaster,
            nameReferenceValue: !formData.nameReferenceValue,
            descriptionReferenceValue: !formData.descriptionReferenceValue,
            isActive: !formData.isActive
        })
        if (!formData.code || !formData.name || !formData.countryId) return
        setDataSaving(true)
        setSaveError('')
        const url = `/referenceMaster/${formData._id ? 'update' : 'create'}`

        try {
            await axios.post(url, { ...formData })
            searchData.code = formData.code
            searchData.name = ''
            searchData.countryId = null
            setSearchData({
                code: formData.code,
                name: '',
                countryId: null
            })
            setFormData({
                code: '',
                name: '',
                countryId: null
            })
            setDataSaving(false)
            setSaveSnackbar(true)
            handleClose()
            searchRecord(true)
        } catch (error) {
            setDataSaving(false)
            setSaveError(error.response?.data?.error || error.response?.statusText)
            console.error(error)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return
        setSaveSnackbar(false)
    }

    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#fff',
                    p: '20px',
                    borderRadius: '10px 10px 0 0'
                }}
            >
                <Grid container spacing={3} justifyContent='flex-end'>
                    <Grid item sm={12} md={3}>
                        <TextField
                            autoFocus
                            fullWidth
                            label='Code'
                            name='code'
                            value={searchData.code}
                            onChange={handleSearchChange}
                        />
                    </Grid>
                    <Grid item sm={12} md={3}>
                        <TextField
                            fullWidth
                            label='Name'
                            name='name'
                            value={searchData.name}
                            onChange={handleSearchChange}
                        />
                    </Grid>
                    <Grid item sm={12} md={3}>
                        <CountryAutocomplete
                            AutocompleteProps={{
                                required: true,
                                onChange: (event, value) => {
                                    setSearchData({
                                        ...searchData,
                                        countryId: value && value._id
                                    })
                                }
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        sm={12}
                        md={3}
                        container
                        direction='row'
                        alignItems='flex-end'
                    >
                        {dataLoading ? <CircularProgress sx={{ margin: '0 20px' }} /> : ''}
                        <Button
                            variant='outlined'
                            onClick={() => searchRecord(true)}
                            disabled={dataLoading}
                            startIcon={<SearchIcon />}
                        >
                            Search
                        </Button>
                        <Button
                            variant='outlined'
                            onClick={newRecord}
                            sx={{ ml: '25px' }}
                            startIcon={<AddCircleOutlineIcon />}
                        >
                            New
                        </Button>
                    </Grid>
                    {searchError ? (
                        <Grid item sm={12} md={4}>
                            <span className='error-text'>{searchError}</span>
                        </Grid>
                    ) : (
                        ''
                    )}
                </Grid>
            </Box>
            {!dataLoading && !states.length && !searchError ? (
                <Typography variant='body2' color='error' align='center' sx={{ mb: 2 }}>
                    No record found
                </Typography>
            ) : (
                ''
            )}
            {states.length ? (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>SN.No</TableCell>
                                <TableCell>Code</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Country</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {states.map((row, index) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component='th' scope='row'>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{row.code}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>
                                        {row.countryId &&
                                            `${row.countryId.name} (${row.countryId.code})`}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => editRecord(row)}
                                            startIcon={<EditIcon />}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[rowsPerPage]}
                                    colSpan={4}
                                    count={totalRecord}
                                    rowsPerPage={rowsPerPage}
                                    page={tablePage}
                                    onPageChange={handleChangePage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            ) : (
                ''
            )}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>State</DialogTitle>
                <DialogContent>
                    <Box
                        component='form'
                        width='500px'
                        sx={{
                            '& .MuiTextField-root': { m: 1 }
                        }}
                        noValidate
                        autoComplete='off'
                    >
                        <TextField
                            autoFocus
                            required
                            label='code'
                            fullWidth
                            name='code'
                            disabled={formData._id}
                            value={formData.code}
                            error={errorField.code}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            label='name'
                            fullWidth
                            name='name'
                            value={formData.name}
                            error={errorField.name}
                            onChange={handleChange}
                        />
                        <CountryAutocomplete
                            InputProps={{
                                error: errorField.countryId
                            }}
                            AutocompleteProps={{
                                required: true,
                                defaultValue: formData.countryId,
                                onChange: (event, value) => {
                                    console.log(value)
                                    setFormData({
                                        ...formData,
                                        countryId: value && value._id
                                    })
                                }
                            }}
                        />
                        <TextField
                            required
                            label='ReferenceMaster Description'
                            fullWidth
                            name='descriptionReferenceMaster'
                            value={formData.descriptionReferenceMaster}
                            error={errorField.descriptionReferenceMaster}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            label='ReferenceValue Name'
                            fullWidth
                            name='nameReferenceValue'
                            value={formData.nameReferenceValue}
                            error={errorField.nameReferenceValue}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            label='ReferenceValue Description'
                            fullWidth
                            name='descriptionReferenceValue'
                            value={formData.descriptionReferenceValue}
                            error={errorField.descriptionReferenceValue}
                            onChange={handleChange}
                        />
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="isActive"
                            name="isActive"
                            value={formData.isActive}
                            onChange={handleChange}
                        >
                            <MenuItem value={true}>true</MenuItem>
                            <MenuItem value={false}>false</MenuItem>
                        </Select>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <span className='error-text'>{saveError}</span>
                    {dataSaving ? <CircularProgress sx={{ margin: '0 20px' }} /> : ''}
                    <Button
                        onClick={handleClose}
                        variant='outlined'
                        startIcon={<CloseIcon />}
                    >
                        Close
                    </Button>
                    <Button
                        onClick={handleSave}
                        variant='contained'
                        disabled={dataSaving}
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={saveSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity='success'
                    sx={{ width: '100%' }}
                >
                    State Saved Successfully
                </Alert>
            </Snackbar>
        </>
    )
}
