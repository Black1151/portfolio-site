import { Box, CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <Box mt={[10, 12, 15]} display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  );
};
