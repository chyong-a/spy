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
          isEnglish={isEnglish}
        />
      )}
      <Button sx={{ color: "#1ABC9C" }} onClick={() => setCurrentId("menu")}>
        {isEnglish ? "Exit" : "Выход"}
      </Button>
    </Box>
  );
};
