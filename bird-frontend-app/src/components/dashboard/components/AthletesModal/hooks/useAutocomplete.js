import React from 'react'

import { Chip, TextField, Avatar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { useStyles } from '../styles'
import {
  PopperContent,
  PopperGroup,
  PopperItem,
  PopperItemName,
  PopperItemPlan,
  StartAdornment,
} from '../modal-styled'

export const useAutocomplete = ({ autocompleteError }) => {
  const classes = useStyles({ autocompleteError })
  const isAthlete = ({ option, group }) =>
    (option?.suggestion || group) === 'SUGGESTED ATHLETES'
  const isSingular = amount => (amount > 1 ? 'athletes' : 'athlete')

  const getStartAdornment = inputProps => {
    if (inputProps.startAdornment) {
      return [...inputProps.startAdornment]
    }
    return []
  }

  const getOptionLabel = option => {
    if (isAthlete({ option })) {
      return `${option.name}*${option.plan.name}*${option.avatar}`
    } else {
      return `${option.name}*${option.amount} ${isSingular(option.amount)}`
    }
  }

  const getOptionSelected = (option, value) => {
    if (isAthlete({ option: value })) {
      return option.userId === value.userId
    } else {
      return option.planTemplateId === value.planTemplateId
    }
  }

  const renderGroup = ({ key, group, children }) => {
    return (
      <PopperContent key={key}>
        <PopperGroup>{group}</PopperGroup>
        {children.map(liElement => (
          <PopperItem key={liElement.key} {...liElement.props}>
            {isAthlete({ group }) ? (
              <Avatar
                className={classes.chipAvatar}
                variant='rounded'
                src={liElement.props.children.split('*')[2]}
              />
            ) : null}

            <PopperItemName>
              {liElement.props.children.split('*')[0]}
            </PopperItemName>
            <PopperItemPlan>
              {liElement.props.children.split('*')[1]}
            </PopperItemPlan>
          </PopperItem>
        ))}
      </PopperContent>
    )
  }
  const renderTags = (value, getTagProps) => {
    return value.map((option, index) => {
      return (
        <Chip
          key={value}
          variant='outlined'
          label={
            isAthlete({ option })
              ? option.name
              : `${option.name} (${option.amount})`
          }
          {...getTagProps({ index })}
          className={classes.autocompleteChip}
          deleteIcon={<CloseIcon className={classes.chipCloseIcon} />}
          avatar={
            isAthlete({ option }) ? (
              <Avatar
                className={classes.chipAvatar}
                variant='rounded'
                src={option.avatar}
              />
            ) : null
          }
        />
      )
    })
  }

  const renderInput = params => {
    const startAdornment = getStartAdornment(params.InputProps)
    startAdornment.unshift(<StartAdornment>To: </StartAdornment>)

    return (
      <TextField
        {...params}
        InputProps={{
          ...params.InputProps,
          disableUnderline: true,
          startAdornment: startAdornment,
        }}
        className={classes.autocompleteInput}
      />
    )
  }

  return {
    getOptionSelected,
    getOptionLabel,
    renderGroup,
    renderTags,
    renderInput,
    classes,
  }
}
