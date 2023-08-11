import { Button } from "@mui/material";

interface RefreshButtonProps {
  data: any[];
  buttonText: string;
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({
  data,
  buttonText,
}) => {
  if (!data || data.length === 0) {
    return <p>No movies loaded yet</p>;
  }

  return (
    <Button variant="contained" color="secondary">
      {buttonText}
    </Button>
  );
};
