import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

export const Sets = ({
  sets,
  selectedSets,
  handleSelectedSetsChange,
  handleEditIconClick,
  handleRemoveSetIconClick,
  newSet,
  setNewSet,
  handleAddSetIconClick,
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
          mb: 1,
        }}
      >
        {isEnglish ? "Sets" : "Наборы"}
      </Typography>
      <FormGroup>
        {sets.map((x) => {
          return (
            <Box key={x.name} sx={{ display: "flex", flexDirection: "row" }}>
              <FormControlLabel
                key={x.name}
                control={
                  <Checkbox
                    sx={{
                      color: "#EAEAEA",
                      "&.Mui-checked": {
                        color: "#1ABC9C",
                      },
                    }}
                    defaultChecked={selectedSets
                      .map((x) => x.name)
                      .includes(x.name)}
                    onChange={(e, value) =>
                      handleSelectedSetsChange(value, x.name)
                    }
                  />
                }
                label={x.name}
              />
              <IconButton
                sx={{
                  color: "#EAEAEA",
                  "&:hover": {
                    color: "#1ABC9C",
                    backgroundColor: "hsla(176, 94.60%, 56.30%, 0.10)",
                  },
                }}
                onClick={() => handleEditIconClick(x)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: "#EAEAEA",
                  "&:hover": {
                    color: "#1ABC9C",
                    backgroundColor: "hsla(176, 94.60%, 56.30%, 0.10)",
                  },
                  visibility: x.default ? "hidden" : "visible",
                }}
                onClick={() => handleRemoveSetIconClick(x)}
              >
                <ClearIcon />
              </IconButton>
            </Box>
          );
        })}
      </FormGroup>
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
          value={newSet}
          onChange={(e) => setNewSet(e.target.value)}
          label={isEnglish ? "set name" : "название набора"}
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
          onClick={handleAddSetIconClick}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Button sx={{ color: "#EAEAEA" }} onClick={() => setCurrentId("menu")}>
        {isEnglish ? "Back to menu" : "Назад"}
      </Button>
    </Box>
  );
};
