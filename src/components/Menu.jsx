import { Box, Button, Typography } from "@mui/material";

export const Menu = ({ setCurrentId, isEnglish, handleLanguageChange }) => {
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
        {isEnglish ? "Spy Game" : "Шпион"}
      </Typography>
      <Button sx={{ color: "#EAEAEA" }} onClick={() => setCurrentId("players")}>
        {isEnglish ? "players" : "игроки"}
      </Button>
      <Button sx={{ color: "#EAEAEA" }} onClick={() => setCurrentId("spies")}>
        {isEnglish ? "spies" : "шпионы"}
      </Button>
      <Button sx={{ color: "#EAEAEA" }} onClick={() => setCurrentId("timer")}>
        {isEnglish ? "timer" : "таймер"}
      </Button>
      <Button sx={{ color: "#EAEAEA" }} onClick={() => setCurrentId("sets")}>
        {isEnglish ? "sets" : "наборы"}
      </Button>
      <Button
        sx={{ backgroundColor: "#1ABC9C" }}
        variant="contained"
        onClick={() => setCurrentId("roleDistribution")}
      >
        {isEnglish ? "start" : "начать"}
      </Button>
      <Box>
        <Button
          sx={{ color: "#EAEAEA" }}
          onClick={() => handleLanguageChange()}
        >
          {isEnglish ? "RU" : "EN"}
        </Button>
      </Box>
    </Box>
  );
};
