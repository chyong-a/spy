import {
  Box,
  Button,
  IconButton,
  List,
  TextField,
  Typography,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

export const EditSet = ({
  editedSet,
  handleDeletePlaceIconClick,
  newPlace,
  setNewPlace,
  handleAddPlaceIconClick,
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
      <Typography>{editedSet.name}</Typography>
      <List dense={false}>
        {editedSet.locations.map((x, index) => (
          <Box
            key={index}
            alignItems="center"
            display="flex"
            flexDirection="row"
          >
            <ArrowRightIcon />
            <Typography>{x}</Typography>
            <IconButton
              sx={{
                color: "#EAEAEA",
                "&:hover": {
                  color: "#1ABC9C",
                  backgroundColor: "hsla(176, 94.60%, 56.30%, 0.10)",
                },
              }}
              onClick={() => handleDeletePlaceIconClick(x)}
            >
              <ClearIcon />
            </IconButton>
          </Box>
        ))}
      </List>
      <Box>
        <TextField
          sx={{
            "& label": {
              color: "#EAEAEA",
            },
            "& label.Mui-focused": {
              color: "#1ABC9C",
            },
            "& .MuiInputBase-input": {
              color: "#EAEAEA",
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: "#EAEAEA",
            },
            "& .MuiInput-underline:hover:before": {
              borderBottomColor: "#1ABC9C",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#1ABC9C",
            },
          }}
          value={newPlace}
          onChange={(e) => setNewPlace(e.target.value)}
          label={isEnglish ? "place" : "место"}
          variant="standard"
        />
        <IconButton
          sx={{
            color: "#EAEAEA",
            "&:hover": {
              color: "#1ABC9C",
              backgroundColor: "hsla(176, 94.60%, 56.30%, 0.10)",
            },
          }}
          onClick={handleAddPlaceIconClick}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Button sx={{ color: "#EAEAEA" }} onClick={() => setCurrentId("sets")}>
        {isEnglish ? "Back to sets" : "К наборам"}
      </Button>
    </Box>
  );
};
