import { Box, Button, Slider, Typography } from "@mui/material";

export const Players = ({
  players,
  handlePlayersChange,
  valuetext,
  playersSliderMarks,
  min,
  max,
  setCurrentId,
  isEnglish,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#F5F5F5",
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontWeight: "600",
          textShadow: "1px 1px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        {isEnglish ? "Number of players" : "Число игроков"}
      </Typography>
      <Slider
        value={players}
        onChange={(e, newValue) => handlePlayersChange(newValue)}
        getAriaValueText={valuetext}
        step={1}
        valueLabelDisplay="auto"
        marks={playersSliderMarks}
        min={min}
        max={max}
        valueLabelFormat={valuetext}
        sx={{
          color: "#EAEAEA",
          width: "340px",
          "& .MuiSlider-markLabel": {
            color: "#EAEAEA",
            fontSize: "14px",
          },
          "& .MuiSlider-markLabelActive": {
            color: "#1ABC9C",
            fontWeight: "bold",
          },
        }}
      />
      <Button sx={{ color: "#EAEAEA" }} onClick={() => setCurrentId("menu")}>
        {isEnglish ? "Back to menu" : "Назад"}
      </Button>
    </Box>
  );
};
