import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

export const AppCard = () => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="Card Title"
        subheader="Subheader"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This is the content of the card. You can put any information here.
        </Typography>
      </CardContent>
    </Card>
  );
};
