import { useEffect, useState } from "react";
import "./App.css";
import { Wrapper } from "./components/Wrapper";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  Slider,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { EnglishSets } from "./assets/Sets";
import Countdown from "react-countdown";

function App() {
  // default settings
  const defaultValue = {
    defaultPlayers: 3,
    defaultSpies: 1,
    defaultTimer: 3,
    minPlayers: 3,
    maxPlayers: 20,
    minSpies: 1,
    maxTimer: 15,
    minTimer: 1,
    defaultSetChecked: "Basic",
  };

  // states
  const [currentId, setCurrentId] = useState("menu");
  const [players, setPlayers] = useState(() => {
    const savedPlayers = sessionStorage.getItem("players");
    return savedPlayers
      ? JSON.parse(savedPlayers)
      : defaultValue.defaultPlayers;
  });
  const [spies, setSpies] = useState(() => {
    const savedSpies = sessionStorage.getItem("spies");
    return savedSpies ? JSON.parse(savedSpies) : defaultValue.defaultSpies;
  });
  const [timer, setTimer] = useState(() => {
    const savedTimer = sessionStorage.getItem("timer");
    return savedTimer ? JSON.parse(savedTimer) : defaultValue.defaultTimer;
  });
  const [sets, setSets] = useState(() => {
    const savedSets = localStorage.getItem("sets");
    return savedSets ? JSON.parse(savedSets) : EnglishSets;
  });
  const [selectedSets, setSelectedSets] = useState(() => {
    const savedSelectedSets = sessionStorage.getItem("selectedSets");
    return savedSelectedSets ? JSON.parse(savedSelectedSets) : [EnglishSets[0]];
  });
  const [editedSet, setEditedSet] = useState(sets[0]);
  const [newPlace, setNewPlace] = useState("");
  const [newSet, setNewSet] = useState("");
  const [currentPlace, setCurrentPlace] = useState("");
  // const [currentPlace, setCurrentPlace] = useState(() => {
  //   const savedCurrentPlace = sessionStorage.getItem("currentPlace");
  //   const locationsFromSelectedSets = sets
  //     .filter((x) => selectedSets.map((x) => x.name).includes(x.name))
  //     .map((x) => x.locations)
  //     .flat();
  //   return savedCurrentPlace
  //     ? JSON.parse(savedCurrentPlace)
  //     : locationsFromSelectedSets[
  //         Math.floor(Math.random() * locationsFromSelectedSets.length)
  //       ];
  // });
  const [currentSpies, setCurrentSpies] = useState([]);
  // const [currentSpies, setCurrentSpies] = useState(() => {
  //   const savedCurrentSpies = sessionStorage.getItem("currentSpies");
  //   var curPlayers = Array.from({ length: players }, (_, i) => i + 1);
  //   var chosenSpies = [];
  //   for (let i = 0; i < spies; i++) {
  //     chosenSpies.push(
  //       curPlayers.splice(Math.floor(Math.random() * curPlayers.length), 1)[0]
  //     );
  //   }
  //   return savedCurrentSpies ? JSON.parse(savedCurrentSpies) : chosenSpies;
  // });

  // functions
  function valuetext(value) {
    return `${value}`;
  }
  function minutes(value) {
    return `${value} min`;
  }
  const handlePlayersChange = (value) => {
    setPlayers(value);
    sessionStorage.setItem("players", JSON.stringify(value));
  };
  const handleSpiesChange = (value) => {
    setSpies(value);
    sessionStorage.setItem("spies", JSON.stringify(value));
  };
  const handleTimerChange = (value) => {
    setTimer(value);
    sessionStorage.setItem("timer", JSON.stringify(value));
  };
  const handleSelectedSetsChange = (value, label) => {
    if (value) {
      setSelectedSets([...selectedSets, sets.find((x) => x.name === label)]);
      sessionStorage.setItem(
        "selectedSets",
        JSON.stringify([...selectedSets, sets.find((x) => x.name === label)])
      );
    } else {
      setSelectedSets(selectedSets.filter((x) => x.name !== label));
      sessionStorage.setItem(
        "selectedSets",
        JSON.stringify(selectedSets.filter((x) => x.name !== label))
      );
    }
  };
  const handleEditIconClick = (set) => {
    setEditedSet(set);
    setCurrentId("editSet");
  };
  const handleAddPlaceIconClick = () => {
    if (!newPlace.trim()) return;

    var newSets = sets.filter((x) => x.name !== editedSet.name);
    const newSet = {
      ...editedSet,
      locations: [...editedSet.locations, newPlace],
    };
    newSets.push(newSet);
    setSets(newSets);
    localStorage.setItem("sets", JSON.stringify(newSets));
    setEditedSet(newSet);
    setNewPlace("");
  };
  const handleDeletePlaceIconClick = (location) => {
    var newSets = sets.filter((x) => x.name !== editedSet.name);
    const newSet = {
      ...editedSet,
      locations: [...editedSet.locations.filter((x) => x !== location)],
    };
    newSets.push(newSet);
    setSets(newSets);
    localStorage.setItem("sets", JSON.stringify(newSets));
    setEditedSet(newSet);
    setNewPlace("");
  };
  const handleAddSetIconClick = () => {
    if (!newSet.trim()) return;
    const newS = { name: newSet, locations: [], default: false };
    const newSets = [...sets, newS];
    setSets(newSets);
    localStorage.setItem("sets", JSON.stringify(newSets));
    setNewSet("");
  };
  const handleRemoveSetIconClick = (set) => {
    setSets([...sets.filter((x) => x.name !== set.name)]);
    localStorage.setItem(
      "sets",
      JSON.stringify([...sets.filter((x) => x.name !== set.name)])
    );
  };
  const handleCountdownOnComplete = () => {
    setCurrentId("gameFinished");
  };
  const playersSliderMarks = Array.from(
    { length: defaultValue.maxPlayers - defaultValue.minPlayers + 1 },
    (_, index) => ({
      value: defaultValue.minPlayers + index,
      label: (defaultValue.minPlayers + index).toString(),
    })
  );
  const spiesSliderMarks = Array.from(
    {
      length: Math.round(players / 3) - defaultValue.minSpies + 1,
    },
    (_, index) => ({
      value: defaultValue.minSpies + index,
      label: (defaultValue.minSpies + index).toString(),
    })
  );
  const timerSliderMarks = Array.from(
    {
      length: defaultValue.maxTimer - defaultValue.minTimer + 1,
    },
    (_, index) => ({
      value: defaultValue.minTimer + index,
      label: (defaultValue.minTimer + index).toString(),
    })
  );
  const generatePlace = () => {
    const places = sets
      .filter((x) => selectedSets.map((x) => x.name).includes(x.name))
      .map((x) => x.locations)
      .flat();
    const place = places[Math.floor(Math.random() * places.length)];
    setCurrentPlace(place);
  };
  const generateSpies = () => {
    var curPlayers = Array.from({ length: players }, (_, i) => i + 1);
    var chosenSpies = [];
    for (let i = 0; i < spies; i++) {
      chosenSpies.push(
        curPlayers.splice(Math.floor(Math.random() * curPlayers.length), 1)[0]
      );
    }
    setCurrentSpies(chosenSpies);
  };

  useEffect(() => {
    if (currentId === "roleDistribution") {
      generatePlace();
      generateSpies();
    }
  }, [currentId]);

  return (
    <>
      <Wrapper id="players" currentId={currentId}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography>Number of players</Typography>
          <Slider
            value={players}
            onChange={(e, newValue) => handlePlayersChange(newValue)}
            getAriaValueText={valuetext}
            step={1}
            valueLabelDisplay="auto"
            marks={playersSliderMarks}
            min={defaultValue.minPlayers}
            max={defaultValue.maxPlayers}
            valueLabelFormat={valuetext}
            sx={{ width: "360px" }}
          />
          <Button onClick={() => setCurrentId("menu")}>Back to menu</Button>
        </Box>
      </Wrapper>
      <Wrapper id="spies" currentId={currentId}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography>Number of spies</Typography>
          <Slider
            value={spies}
            onChange={(e, newValue) => handleSpiesChange(newValue)}
            getAriaValueText={valuetext}
            step={1}
            valueLabelDisplay="auto"
            marks={spiesSliderMarks}
            min={defaultValue.minSpies}
            max={Math.round(players / 3)}
            valueLabelFormat={valuetext}
            sx={{ width: "360px" }}
          />
          <Button onClick={() => setCurrentId("menu")}>Back to menu</Button>
        </Box>
      </Wrapper>
      <Wrapper id="timer" currentId={currentId}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography>Timer</Typography>
          <Slider
            value={timer}
            onChange={(e, newValue) => handleTimerChange(newValue)}
            getAriaValueText={minutes}
            step={1}
            valueLabelDisplay="auto"
            marks={timerSliderMarks}
            min={defaultValue.minTimer}
            max={defaultValue.maxTimer}
            valueLabelFormat={minutes}
            sx={{ width: "360px" }}
          />
          <Button onClick={() => setCurrentId("menu")}>Back to menu</Button>
        </Box>
      </Wrapper>
      <Wrapper id="sets" currentId={currentId}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography>Sets</Typography>
          <FormGroup>
            {sets.map((x) => {
              return (
                <Box
                  key={x.name}
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <FormControlLabel
                    key={x.name}
                    control={
                      <Checkbox
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
                  <Tooltip title={x.locations.join(", ")}>
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                  <IconButton onClick={() => handleEditIconClick(x)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    sx={{ visibility: x.default ? "hidden" : "visible" }}
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
              value={newSet}
              onChange={(e) => setNewSet(e.target.value)}
              label="set name"
              variant="standard"
            />
            <IconButton onClick={handleAddSetIconClick}>
              <AddIcon />
            </IconButton>
          </Box>
          <Button onClick={() => setCurrentId("menu")}>Back to menu</Button>
        </Box>
      </Wrapper>
      <Wrapper id="editSet" currentId={currentId}>
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
                <IconButton onClick={() => handleDeletePlaceIconClick(x)}>
                  <ClearIcon />
                </IconButton>
              </Box>
            ))}
          </List>
          <Box>
            <TextField
              value={newPlace}
              onChange={(e) => setNewPlace(e.target.value)}
              label="place"
              variant="standard"
            />
            <IconButton onClick={handleAddPlaceIconClick}>
              <AddIcon />
            </IconButton>
          </Box>
          <Button onClick={() => setCurrentId("sets")}>Back to sets</Button>
        </Box>
      </Wrapper>
      <Wrapper id="roleDistribution" currentId={currentId}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* generate current place */}
          {/* generate spies */}
          {/* go through array of players */}
          {/* if index matches the spy, then don't show place */}
          {/* otherwise show place */}
          {/* alternate with a simple pic "pass to the next player" */}
          {/* if index is the last, "tap to start the game" setCurrentId=("countdown") */}
          {console.log(currentPlace)}
          {console.log(currentSpies)}
          {}
          <Button onClick={() => setCurrentId("countdown")}>Countdown</Button>
          <Button onClick={() => setCurrentId("menu")}>Back to menu</Button>
        </Box>
      </Wrapper>
      <Wrapper id="countdown" currentId={currentId}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {currentPlace}
          <Countdown
            renderer={({ minutes, seconds }) => (
              <Typography variant="h4">
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
              </Typography>
            )}
            date={Date.now() + timer * 60000}
            onComplete={handleCountdownOnComplete}
          />
          <Button onClick={() => setCurrentId("menu")}>Back to menu</Button>
        </Box>
      </Wrapper>
      <Wrapper id="gameFinished" currentId={currentId}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography>Game finished</Typography>
          <Button onClick={() => setCurrentId("menu")}>Menu</Button>
        </Box>
      </Wrapper>
      <Wrapper id="menu" currentId={currentId}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Button onClick={() => setCurrentId("players")}>players</Button>
          <Button onClick={() => setCurrentId("spies")}>spies</Button>
          <Button onClick={() => setCurrentId("timer")}>timer</Button>
          <Button onClick={() => setCurrentId("sets")}>sets</Button>
          <Button
            variant="contained"
            onClick={() => setCurrentId("roleDistribution")}
          >
            start
          </Button>
        </Box>
      </Wrapper>
    </>
  );
}

export default App;
