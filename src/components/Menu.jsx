import { Box, Button, Typography } from "@mui/material";

export const Menu = ({ setCurrentId }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: "#E94560",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "3px",
          textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
          mb: 2,
        }}
      >
        Spy Game
      </Typography>
      <Button sx={{ color: "#EAEAEA" }} onClick={() => setCurrentId("players")}>
        players
      </Button>
      <Button sx={{ color: "#EAEAEA" }} onClick={() => setCurrentId("spies")}>
        spies
      </Button>
      <Button sx={{ color: "#EAEAEA" }} onClick={() => setCurrentId("timer")}>
        timer
      </Button>
      <Button sx={{ color: "#EAEAEA" }} onClick={() => setCurrentId("sets")}>
        sets
      </Button>
      <Button
        sx={{ backgroundColor: "#1ABC9C" }}
        variant="contained"
        onClick={() => setCurrentId("roleDistribution")}
      >
        start
      </Button>
    </Box>
  );
};
