import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'

import { useAutocomplete } from './hooks/useAutocomplete'

export const AthletesAutocomplete = ({
  changeAutocomplete,
  autocompleteValue,
  autocompleteOptions,
  autocompleteError,
}) => {
  const {
    getOptionSelected,
    getOptionLabel,
    classes,
    renderGroup,
    renderInput,
    renderTags,
  } = useAutocomplete({ autocompleteError })

  return (
    <Autocomplete
      multiple
      id='tags-filled'
      options={autocompleteOptions}
      getOptionSelected={getOptionSelected}
      getOptionLabel={getOptionLabel}
      onChange={(event, value) => changeAutocomplete(value)}
      value={autocompleteValue}
      classes={{
        paper: classes.paper,
      }}
      groupBy={option => option.suggestion}
      renderGroup={renderGroup}
      renderTags={renderTags}
      renderInput={renderInput}
    />
  )
}
