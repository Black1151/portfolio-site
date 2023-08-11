import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import { Logo } from "../svg/Logo";
import { Box, Container } from "@mui/material";
import Slide from "@mui/material/Slide";

export const Navbar = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Slide in={loaded} direction="down">
      <AppBar>
        <Container>
          <Box py={2} maxWidth={[150, 200, 300]}>
            <Logo />
          </Box>
        </Container>
      </AppBar>
    </Slide>
  );
};
