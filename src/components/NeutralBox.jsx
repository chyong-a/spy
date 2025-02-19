import { Box, Typography } from "@mui/material";

export const NeutralBox = ({ text, onClick }) => {
  return (
    <Box onClick={onClick}>
      <Typography
        variant="h5"
        sx={{
          color: "#EAEAEA",
          textTransform: "uppercase",
          letterSpacing: "2px",
          fontWeight: "bold",
          opacity: 0.8,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};
