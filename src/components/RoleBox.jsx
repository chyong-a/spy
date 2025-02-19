import { Box, Typography } from "@mui/material";

export const RoleBox = ({ place, isSpy, onClick }) => {
  return (
    <Box onClick={onClick}>
      {isSpy ? (
        <Typography style={{ color: "#E94560" }}>
          YOU ARE A SPY! DON'T REVEAL YOURSELF!
        </Typography>
      ) : (
        <Typography style={{ color: "#0F3460" }}>{place}</Typography>
      )}
    </Box>
  );
};
