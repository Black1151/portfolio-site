import React from "react";
import { Typography, Box } from "@mui/material";

interface MovieListItemProps {
  title: string;
  company: string;
  reviews: number[];
}

export const MovieListItem: React.FC<MovieListItemProps> = ({
  title,
  company,
  reviews,
}) => {
  const avgReview = (
    reviews.reduce((acc, r) => acc + r, 0) / reviews.length
  ).toFixed(1);

  return (
    <Box
      borderRadius={5}
      boxShadow={2}
      bgcolor="#f0f0f0"
      style={{
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      }}
      sx={{
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        },
      }}
    >
      <Box
        bgcolor="#a3346f"
        py={[1, 2]}
        px={[2, 3]}
        my={1}
        borderRadius="10px 10px 0 0"
      >
        <Typography color="#e8e6df" variant="h2">
          {title}
        </Typography>
      </Box>
      <Box my={1} px={[2, 3]} pt={1}>
        <Typography variant="h3">{company}</Typography>
      </Box>
      <Box my={1} px={[2, 3]} pb={2}>
        <Typography variant="body1" color="text.secondary">
          Avg. Review: {avgReview} / 10
        </Typography>
      </Box>
    </Box>
  );
};
