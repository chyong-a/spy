import { Box, Button, Typography } from "@mui/material";
import Countdown from "react-countdown";

export const CountdownComponent = ({
  handleCountdownOnComplete,
  setCurrentId,
  timer,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Countdown
        renderer={({ minutes, seconds }) => (
          <Typography sx={{ color: "#1ABC9C" }} variant="h4">
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </Typography>
        )}
        date={Date.now() + timer * 60000}
        onComplete={handleCountdownOnComplete}
      />
      <Button sx={{ color: "#EAEAEA" }} onClick={() => setCurrentId("menu")}>
        Back to menu
      </Button>
    </Box>
  );
};
