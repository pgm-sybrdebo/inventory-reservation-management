import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core'
import React from 'react'

interface ConfirmDialogProps {
  selectedRow: any
  title: string,
  message: string,
  open: boolean,
  handleClose: () => void,
  handleConfirm: (id:string) => void,
}

const ConfirmDialog = ({selectedRow, title, message, open, handleClose, handleConfirm }: ConfirmDialogProps) => {
  console.log("why",selectedRow)
  return (
    <Dialog open={open} >
      <Box
        sx={{ 
          width: '100%',
          padding: '1rem',
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography>
            {message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            size='large'
            fullWidth
            onClick={() => handleConfirm(selectedRow.id)}
            style={{
              backgroundColor: '#F58732',
              marginRight: '3rem',
              marginTop: '2rem'
            }}
          >
            Confirm
          </Button>
          <Button
            onClick={handleClose}
            variant='outlined'
            size='large'
            fullWidth
            style={{
              borderColor: '#ED0034',
              borderWidth: '2px',
              marginTop: '2rem' 
          }}
          >
            Cancel
          </Button> 
        </DialogActions>  
      </Box> 
    </Dialog>
  )
}

export default ConfirmDialog
