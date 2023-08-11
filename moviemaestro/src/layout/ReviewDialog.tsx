import { Dialog, Box, Typography } from "@mui/material";
import { ReviewForm } from "../components";

interface ReviewDialogProps {
  open: boolean;
  onClose: () => void;
  selectedMovie: any;
}

export const ReviewDialog: React.FC<ReviewDialogProps> = ({
  open,
  onClose,
  selectedMovie,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box p={4} bgcolor="#8f1d59" color="#e8e6df">
        <Typography variant="h2">Review for {selectedMovie?.title}</Typography>
      </Box>
      <Box p={2}>
        <ReviewForm selectedMovie={selectedMovie} closeForm={onClose} />
      </Box>
    </Dialog>
  );
};
