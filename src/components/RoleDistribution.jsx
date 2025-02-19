import { Box, Button } from "@mui/material";
import { NeutralBox } from "./NeutralBox";
import { RoleBox } from "./RoleBox";

export const RoleDistribution = ({
  currentPlayer,
  neutralBoxText,
  handleChangeBoxInDistribution,
  currentPlace,
  isSpy,
  setCurrentId,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {!Number.isInteger(currentPlayer) ? (
        <NeutralBox
          text={neutralBoxText}
          onClick={handleChangeBoxInDistribution}
        />
      ) : (
        <RoleBox
          place={currentPlace}
          isSpy={isSpy}
          onClick={handleChangeBoxInDistribution}
        />
      )}
      <Button sx={{ color: "#1ABC9C" }} onClick={() => setCurrentId("menu")}>
        Exit
      </Button>
    </Box>
  );
};
