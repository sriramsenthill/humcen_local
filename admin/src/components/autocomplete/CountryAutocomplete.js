import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material'
import axios from 'axios'

export default function CountryAutocomplete(props) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await axios.post('/country/search', {
          codeOrName: inputValue,
          limit: 5
        })
        return res?.data?.countries || []
      } catch (e) {
        console.error(e)
      }
      return []
    }

    let active = true
    setLoading(true)

    const delay = setTimeout(async () => {
      const optionsFromServer = await getCountries()

      if (active) {
        setOptions(optionsFromServer)
        setLoading(false)
      }
    }, 500)

    // Cleanup function to clear the timeout if the component unmounts or inputValue changes
    return () => {
      active = false
      clearTimeout(delay)
    }
  }, [inputValue])

  const InputProps = props.InputProps || {}
  const AutocompleteProps = props.AutocompleteProps || {}

  return (
    <Autocomplete
      {...AutocompleteProps}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box
          component='li'
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.name} ({option.code})
        </Box>
      )}
      options={options}
      loading={loading}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Country'
          InputProps={{
            ...params.InputProps,
            ...InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color='inherit' size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  )
}
