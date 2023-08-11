// ErrorComponent.tsx
import { Box, Button, Typography } from "@mui/material";

interface ErrorComponentProps {
  error: string;
  handleRefresh: () => void;
}

export const ErrorComponent: React.FC<ErrorComponentProps> = ({
  error,
  handleRefresh,
}) => {
  return (
    <Box mt={[10, 12, 15]} textAlign="center">
      <Typography variant="h6" color="error">
        {error}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRefresh}
        style={{ marginTop: "1rem" }}
      >
        Try Again
      </Button>
    </Box>
  );
};
