import { Box, Typography } from "@mui/material";

export const RoleBox = ({ place, isSpy, onClick, isEnglish }) => {
  return (
    <Box onClick={onClick}>
      {isSpy ? (
        <Typography
          variant="h5"
          sx={{
            color: "#E94560",
            fontWeight: "bold",
            textTransform: "uppercase",
            textShadow: "0px 0px 10px rgba(255, 0, 0, 0.9)",
            mt: 4,
          }}
        >
          {isEnglish
            ? "YOU ARE A SPY! DON'T REVEAL YOURSELF!"
            : "ТЫ ШПИОН! СМОТРИ НЕ ПОПАДИСЬ"}
        </Typography>
      ) : (
        <Typography
          variant="h3"
          sx={{
            color: "#0F3460",
            fontWeight: "bold",
            textShadow: "2px 2px 8px rgba(15, 52, 96, 0.6)",
            mt: 2,
          }}
        >
          {place}
        </Typography>
      )}
    </Box>
  );
};
