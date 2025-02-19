import { Box } from "@mui/material";

export const RoleBox = ({ place, isSpy, onClick }) => {
  return (
    <Box onClick={onClick}>
      {isSpy ? "YOU ARE A SPY! DON'T REVEAL YOURSELF!" : place}
    </Box>
  );
};
