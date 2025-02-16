import { useEffect, useState } from 'react'
import './App.css'
import { Wrapper } from './components/Wrapper'
import { Box, Button, Slider } from '@mui/material'

function App() {
  // default settings
  const defaultValue = {
    defaultPlayers: 3,
    defaultSpies: 1,
    defaultTimer: 180,
    minPlayers: 3,
    maxPlayers: 20,
  }
  const sliderMarks = Array.from({ length: defaultValue.maxPlayers - defaultValue.minPlayers + 1 }, (_, index) => ({
    value: defaultValue.minPlayers + index,
    label: (defaultValue.minPlayers + index).toString(),
  }));

  // states
  const [currentId, setCurrentId] = useState("menu");
  const [players, setPlayers] = useState(() => {
    const savedPlayers = sessionStorage.getItem("players");
    return savedPlayers ? JSON.parse(savedPlayers) : defaultValue.defaultPlayers;
  });
  const [spies, setSpies] = useState(() => {
    const savedSpies = sessionStorage.getItem("spies");
    return savedSpies ? JSON.parse(savedSpies) : defaultValue.defaultSpies;
  });
  const [timer, setTimer] = useState(() => {
    const savedTimer = sessionStorage.getItem("timer");
    return savedTimer ? JSON.parse(savedTimer) : defaultValue.defaultTimer;
  });

  // functions
  function valuetext(value) {
    return `${value}`;
  }
  const handlePlayersChange = (value) => {
    setPlayers(value);
    sessionStorage.setItem("players", JSON.stringify(value));
  }

  useEffect(() => {
    console.log(players)
  }, [players])
  return (
    <>
      <Wrapper id="players" currentId={currentId}><Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      > <Slider
          value={players}
          onChange={(e, newValue) => handlePlayersChange(newValue)}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="auto"
          marks={sliderMarks}
          min={defaultValue.minPlayers}
          max={defaultValue.maxPlayers}
          valueLabelFormat={valuetext}
          sx={{ width: "360px" }}
        /> <Button onClick={() => setCurrentId("menu")}>Back to menu</Button></Box></Wrapper>
      <Wrapper id="spies" currentId={currentId}><Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >кол-во шпионов <Button onClick={() => setCurrentId("menu")}>Back to menu</Button></Box></Wrapper>
      <Wrapper id="timer" currentId={currentId}><Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >таймер <Button onClick={() => setCurrentId("menu")}>Back to menu</Button></Box></Wrapper>
      <Wrapper id="sets" currentId={currentId}><Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >наборы <Button onClick={() => setCurrentId("menu")}>Back to menu</Button></Box></Wrapper>
      <Wrapper id="start" currentId={currentId}><Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >начать <Button onClick={() => setCurrentId("menu")}>Back to menu</Button></Box></Wrapper>
      <Wrapper id="menu" currentId={currentId}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
          }}
        >
          <Button onClick={() => setCurrentId("players")}>players</Button>
          <Button onClick={() => setCurrentId("spies")}>spies</Button>
          <Button onClick={() => setCurrentId("timer")}>timer</Button>
          <Button onClick={() => setCurrentId("sets")}>sets</Button>
          <Button onClick={() => setCurrentId("menu")}>menu</Button>
        </Box>
      </Wrapper>
    </>
  )
}

export default App
