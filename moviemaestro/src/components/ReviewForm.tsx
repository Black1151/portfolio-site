import { useState } from "react";
import { Button, TextField, Box, Typography, Rating } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Movie } from "../types";
import { submitReview } from "../api/api";
import Dialog from "@mui/material/Dialog";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  review: yup
    .string()
    .max(100, "Review can't exceed 100 characters")
    .required("Review is required"),
  rating: yup
    .number()
    .min(1, "Rating should be between 1 and 10")
    .max(10, "Rating should be between 1 and 10")
    .required("Rating is required"),
});

interface ReviewFormProps {
  selectedMovie: Movie;
  closeForm: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  selectedMovie,
  closeForm,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogMessage("");
    closeForm();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      review: "",
      rating: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      formik.resetForm();
      const submission = {
        movieId: selectedMovie.id,
        message: values.review,
        rating: values.rating,
        name: values.name,
      };

      try {
        const result = await submitReview(submission);
        setDialogMessage(result.message);
        setDialogOpen(true);
      } catch (error) {
        setDialogMessage("Error submitting review. Please try again later.");
        setDialogOpen(true);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          label="Review"
          name="review"
          multiline
          rows={4}
          value={formik.values.review}
          onChange={formik.handleChange}
          error={formik.touched.review && Boolean(formik.errors.review)}
          helperText={formik.touched.review && formik.errors.review}
          inputProps={{ maxLength: 100 }}
        />
        <Typography variant="body1" color="textSecondary">
          {formik.values.review.length}/100
        </Typography>

        <Typography variant="body1" gutterBottom>
          Rating:
        </Typography>
        <Rating
          name="rating"
          max={10}
          value={formik.values.rating}
          onChange={(_, newValue) => {
            formik.setFieldValue("rating", newValue);
          }}
          precision={1}
        />
        {formik.touched.rating && Boolean(formik.errors.rating) && (
          <Typography color="error" variant="body2">
            {formik.errors.rating}
          </Typography>
        )}

        <Button type="submit" variant="contained" color="primary">
          Submit Review
        </Button>
      </Box>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <Box padding={4}>
          <Typography variant="h6">{dialogMessage}</Typography>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            style={{ marginTop: "1rem" }}
          >
            Close
          </Button>
        </Box>
      </Dialog>
    </form>
  );
};
