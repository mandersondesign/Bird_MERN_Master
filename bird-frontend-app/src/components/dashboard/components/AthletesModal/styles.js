import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  autocompleteInput: {
    marginBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    display: 'flex',
    justifyContent: 'center',
    border: ({ autocompleteError }) =>
      autocompleteError ? '2px solid red' : '1px solid #828282',
    minHeight: 48,
    borderRadius: 6,
  },
  autocompleteChip: {
    border: '1px solid #828282',
    borderRadius: 8,
    marginRight: 8,
    fontSize: 11,
  },
  chipCloseIcon: {
    color: 'black',
    fontSize: 20,
    width: 12,
    height: 12,
  },
  chipAvatar: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  paper: {
    border: '1px solid #828282',
    boxSizing: 'border-box',
    borderRadius: 6,
  },
}))
