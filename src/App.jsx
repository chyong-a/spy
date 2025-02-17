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
  Slider,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { EnglishSets } from "./assets/Sets";

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
      setSelectedSets([
        ...selectedSets,
        EnglishSets.find((x) => x.name === label),
      ]);
      sessionStorage.setItem(
        "selectedSets",
        JSON.stringify([
          ...selectedSets,
          EnglishSets.find((x) => x.name === label),
        ])
      );
    } else {
      setSelectedSets(selectedSets.filter((x) => x.name !== label));
      sessionStorage.setItem(
        "selectedSets",
        JSON.stringify(selectedSets.filter((x) => x.name !== label))
      );
    }
    console.log(value, label);
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
            {EnglishSets.map((x) => {
              return (
                <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                </Box>
              );
            })}
          </FormGroup>
          <Button onClick={() => setCurrentId("menu")}>Back to menu</Button>
        </Box>
      </Wrapper>
      <Wrapper id="start" currentId={currentId}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          начать
          <Button onClick={() => setCurrentId("menu")}>Back to menu</Button>
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
          <Button variant="contained" onClick={() => setCurrentId("start")}>
            start
          </Button>
        </Box>
      </Wrapper>
    </>
  );
}

export default App;
