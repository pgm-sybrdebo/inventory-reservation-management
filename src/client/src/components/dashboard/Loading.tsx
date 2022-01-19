import { Box, CircularProgress } from '@material-ui/core';

const Loading = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <CircularProgress />
    </Box>
  )
}

export default Loading
