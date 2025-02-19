import { Box, Button, Typography } from "@mui/material";

export const GameFinished = ({ setCurrentId }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#FF5733",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "2px",
          textShadow: "3px 3px 10px rgba(0, 0, 0, 0.8)",
          mt: 3,
        }}
      >
        Game Finished
      </Typography>
      <Button sx={{ color: "#EAEAEA" }} onClick={() => setCurrentId("menu")}>
        Menu
      </Button>
    </Box>
  );
};
