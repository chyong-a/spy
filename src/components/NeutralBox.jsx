import { Box } from "@mui/material";

export const NeutralBox = ({ text, onClick }) => {
  return <Box onClick={onClick}>{text}</Box>;
};
