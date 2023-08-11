import { Container, Typography, Box } from "@mui/material";
import { Slide } from "@mui/material";
import { useState, useEffect } from "react";

export const Header = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Slide in={loaded} direction="right">
      <Box
        mt={[7, 8, 10]}
        py={6}
        style={{
          width: "100vw",
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        }}
      >
        <Container>
          <Typography mb={2} color="white" variant="h2">
            Want to have your say?
          </Typography>
          <Typography color="white" variant="h3">
            Select from the movies below to give us your thoughts!
          </Typography>
        </Container>
      </Box>
    </Slide>
  );
};
